import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    Box,
    Button,
    Flex,
    Spacer,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";

import MyTable from "../../components/MyTable";
import Pagination from "../../components/Pagination";
import MyButton from "../../components/MyButton";

import {
    addProduct,
    deleteProduct,
    getAllCategories,
    getAllSuppliers,
    getProducts,
    updateProduct,
} from "../../services";

function GetProductDataType(data) {
    return {
        CategoryID: +data.category,
        Discontinued: "0",
        ProductName: data.name,
        QuantityPerUnit: data.quantityPerUnit,
        ReorderLevel: 0,
        SupplierID: +data.supplier,
        UnitPrice: data.price,
        UnitsInStock: data.stock,
        UnitsOnOrder: 0,
    };
}

export function Products() {
    const [suppliers, setSuppliers] = useState([]);
    const [categories, setCategories] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const [products, setProducts] = useState({
        totalDocuments: 0,
        data: [],
    });

    const [productsListChange, setProductsListChange] = useState(false);


    const onUpdateProductData = (data) => {
        const productData = GetProductDataType(data);
        const update = async () => {
            await updateProduct(productData, data.key);
            setProductsListChange(true);
        };
        update().catch(console.error);
        setProductsListChange(false);
    };

    const onSaveProductData = (data) => {
        const productData = GetProductDataType(data);
        const add = async () => {
            await addProduct(productData);
            setProductsListChange(true);
        };
        add().catch(console.error);
        setProductsListChange(false);
    };

    const onDeleteProductData = (key) => {
        const add = async () => {
            await deleteProduct(key);
            setProductsListChange(true);
        };
        add().catch(console.error);
        setProductsListChange(false);
    };

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
            {
                Header: "Actions",
                Cell: (info) => {
                    return (
                        <Stack direction="row" spacing={4} align="center">
                            <MyButton
                                onUpdate={onUpdateProductData}
                                title={"Update"}
                                modalTitle={"Update Product"}
                                categories={categories}
                                suppliers={suppliers}
                                dataKey={info.row.original._key}
                            />
                            <Button
                                variant="solid"
                                onClick={() =>
                                    onDeleteProductData(info.row.original._key)
                                }
                            >
                                Delete
                            </Button>
                        </Stack>
                    );
                },
            },
        ],
        [categories, suppliers],
    );

    useEffect(() => {
        const getSuppliers = async () => {
            const _suppliers = await getAllSuppliers();
            setSuppliers(_suppliers);
        };
        getSuppliers().catch(console.error);

        const getCategories = async () => {
            const _categories = await getAllCategories();
            setCategories(_categories);
        };
        getCategories().catch(console.error);
    }, []);

    useEffect(() => {
        const get = async () => {
            const _products = await getProducts({
                page: currentPage,
                pageSize,
            });
            setProducts(_products);
        };
        get().catch(console.error);
    }, [currentPage, productsListChange]);

    return (
        <Box p="6" bg={useColorModeValue("white", "gray.800")} rounded="lg">
            <Flex minWidth="min-content" alignItems="left" gap="1">
                <Spacer />
                <MyButton
                    onSave={onSaveProductData}
                    title={"Add Product"}
                    modalTitle={"Add Product"}
                    categories={categories}
                    suppliers={suppliers}
                />
            </Flex>
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
