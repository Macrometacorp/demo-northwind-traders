import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";

import MyTable from "../../components/MyTable";
import Pagination from "../../components/Pagination";
import MyButton from "../../components/MyButton";

import { getProducts, addProduct } from "../../services";

export function Products() {
    const columns = useMemo(
        () => [
            {
                Header: "Name",
                accessor: "ProductName",
                Cell: (info) => {
                    return (
                        <Link to={`/products/${info.row.original._key}`}>
                            <Text
                                color={useColorModeValue(
                                    "primary.500",
                                    "primary.200",
                                )}
                            >
                                {info.value}
                            </Text>
                        </Link>
                    );
                },
            },
            {
                Header: "Qt per unit",
                accessor: "QuantityPerUnit",
            },
            {
                Header: "Price",
                accessor: "UnitPrice",
                Cell: ({ value }) => {
                    return `$${value.toFixed(2)}`;
                },
            },
            {
                Header: "Stock",
                accessor: "UnitsInStock",
            },
            {
                Header: "Orders",
                accessor: "UnitsOnOrder",
            },
        ],
        [],
    );

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const [products, setProducts] = useState({
        totalDocuments: 0,
        data: [],
    });

    const [lastKey, setLastKey] = useState(0);

    useEffect(() => {
        const get = async () => {
            const _products = await getProducts({
                page: currentPage,
                pageSize,
            });
            setProducts(_products);
        };
        get().catch(console.error);
    }, [currentPage, lastKey]);

    const onSaveProductData = (data) => {
        const newKey = +products.totalDocuments + 1;
        const productData = {
            _key: newKey.toString(),
            CategoryID: data.category,
            Discontinued: "0",
            ProductName: data.name,
            QuantityPerUnit: data.quantityPerUnit,
            ReorderLevel: 0,
            SupplierID: data.supplier,
            UnitPrice: data.price,
            UnitsInStock: data.stock,
            UnitsOnOrder: 0,
        };
        setLastKey(newKey);
        const add = async () => {
            await addProduct(productData);
        };
        add().catch(console.error);
    };

    return (
        <Box p="6" bg={useColorModeValue("white", "gray.800")} rounded="lg">
            <MyButton onSave={onSaveProductData} />
            <MyTable title="Products" columns={columns} data={products.data} />
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalItems={products.totalDocuments}
                ItemsPerPage={pageSize}
            />
        </Box>
    );
}
