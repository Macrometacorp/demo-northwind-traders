import { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    Box,
    Button,
    Flex,
    ListItem,
    OrderedList,
    Spacer,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";

import MyTable from "../../components/MyTable";
import Pagination from "../../components/Pagination";

import {
    addProductData,
    deleteProductData,
    getAllCategories,
    getAllSuppliers,
    getProducts,
    updateProductData,
} from "../../services";
import authContext from "../../context/auth-context";
import CustomModal from "../../components/CustomModal";

function getProductDataInstance(data) {
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
    const ctx = useContext(authContext);

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
        const productData = getProductDataInstance(data);
        productData["_key"] = data.key;
        const update = async () => {
            await updateProductData(productData, ctx.baseUrl, ctx.token);
            setProductsListChange(true);
        };
        update().catch(console.error);
        setProductsListChange(false);
    };

    const onSaveProductData = (data) => {
        const productData = getProductDataInstance(data);
        const add = async () => {
            await addProductData(productData, ctx.baseUrl, ctx.token);
            setProductsListChange(true);
        };
        add().catch(console.error);
        setProductsListChange(false);
    };

    const onDeleteProductData = (key) => {
        const add = async () => {
            const productData = { _key: key };
            await deleteProductData(productData, ctx.baseUrl, ctx.token);
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
                            <CustomModal
                                productForm={true}
                                onUpdate={onUpdateProductData}
                                buttonTitle={"Update"}
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
        ], // eslint-disable-next-line react-hooks/exhaustive-deps
        [categories, suppliers],
    );

    useEffect(() => {
        const getSuppliers = async () => {
            const _suppliers = await getAllSuppliers(ctx.baseUrl, ctx.token);
            setSuppliers(_suppliers);
        };
        getSuppliers().catch(console.error);

        const getCategories = async () => {
            const _categories = await getAllCategories(ctx.baseUrl, ctx.token);
            setCategories(_categories);
        };
        getCategories().catch(console.error);
    }, [ctx.baseUrl, ctx.token]);

    useEffect(() => {
        const get = async () => {
            const _products = await getProducts(
                {
                    page: currentPage,
                    pageSize,
                },
                ctx.baseUrl,
                ctx.token,
            );
            setProducts(_products);
        };
        get().catch(console.error);
    }, [currentPage, productsListChange, ctx.baseUrl, ctx.token]);

    return (
        <Box p="6" bg={useColorModeValue("white", "gray.800")} rounded="lg">
            {products.totalDocuments > 0 && (
                <Box>
                    <Flex minWidth="min-content" alignItems="left" gap="1">
                        <Spacer />
                        <CustomModal
                            productForm={true}
                            onSave={onSaveProductData}
                            buttonTitle={"Add Product"}
                            modalTitle={"Add Product"}
                            categories={categories}
                            suppliers={suppliers}
                        />
                    </Flex>
                    <MyTable
                        title="Products"
                        columns={columns}
                        data={products.data}
                    />
                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalItems={products.totalDocuments}
                        ItemsPerPage={pageSize}
                    />
                </Box>
            )}
            {products.totalDocuments === 0 && (
                <Box>
                    <Text fontSize="lg" as="b">
                        No products found ! We apologize, but it seems that no
                        products have been found in the Macrometa GDN. 😓
                    </Text>
                    <Text fontSize="lg" my={4}>
                        To populate the GDN, please follow these steps:
                    </Text>
                    <OrderedList spacing={3} my={4}>
                        <ListItem fontSize="lg">
                            Create a new document store collection called
                            "products.".
                        </ListItem>
                        <ListItem fontSize="lg">
                            Import the data from the "products.json" file into
                            the newly created collection.
                        </ListItem>
                        <ListItem fontSize="lg">
                            Create additional document store collections for
                            "categories" and "suppliers."
                        </ListItem>
                        <ListItem fontSize="lg">
                            Import categories.json and suppliers.json to the
                            created collections.
                        </ListItem>
                        <ListItem fontSize="lg">
                            Import the corresponding data from "categories.json"
                            and "suppliers.json" into their respective
                            collections.
                        </ListItem>
                        <ListItem fontSize="lg">
                            Finally, navigate to the Query Workers section and
                            import the queries from "ImportQueryWorker.json" to
                            begin querying the GDN."
                        </ListItem>
                    </OrderedList>
                </Box>
            )}
        </Box>
    );
}
