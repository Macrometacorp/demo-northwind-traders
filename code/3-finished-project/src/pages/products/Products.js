import { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    Box,
    Button,
    Spinner,
    Stack,
    Text,
    useColorModeValue,
    useToast,
} from "@chakra-ui/react";

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
import {DataView} from "./DataView";
import {Instructions} from "./Instructions";

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
    const [isReady, setIsReady] = useState(false);
    const pageSize = 10;

    const [products, setProducts] = useState({
        totalDocuments: 0,
        data: [],
    });
    const [productsListChange, setProductsListChange] = useState(false);

    const toast = useToast();
    const changeToastId = "change-toast-id";
    const deleteToastId = "delete-toast-id";

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
            if (!toast.isActive(deleteToastId)) {
                toast({
                    id: changeToastId,
                    title: "Product deleted.",
                    position: "top-right",
                    status: "warning",
                    duration: 9000,
                    isClosable: true,
                });
            }
            setProductsListChange(true);
        };
        add().catch(console.error);
        setProductsListChange(false);
    };

    // This method is called when the component/product page is mounted
    // we are opening a websocket connection to the collection,
    // and we are listening for changes
    // To enable this feature we need to enable the stream in the collection
    // We can go to the console and select the collection -> settings -> enable stream
    const establishStreamConsumerConnection = async () => {
        try {
            const otpConsumer = await fetch(`${ctx.baseUrl}/apid/otp`, {
                method: "POST",
                headers: {
                    Authorization: `bearer ${ctx.token}`,
                    accept: "application/json",
                },
            });
            const otp = await otpConsumer.json();
            const consumerUrl = `wss://${ctx.baseUrl.replace(
                "https://",
                "",
            )}/_ws/ws/v2/reader/persistent/${ctx.email.replace(
                "@",
                "_",
            )}/c8local._system/products?otp=${otp.otp}`;
            const consumer = new WebSocket(consumerUrl);
            consumer.onmessage = (event) => {
                // It is possible to get payload and messageId from the event.data
                //const { payload, messageId } = JSON.parse(event.data);
                setProductsListChange(true);
                if (!toast.isActive(changeToastId)) {
                    toast({
                        id: changeToastId,
                        title: "Products list updated.",
                        position: "top-right",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    });
                }
            };
        } catch (error) {
            console.error("error", error);
        }
    };

    const onApiRequestError = () => {
        console.error("Api request error");
        setIsReady(true)
    }

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
                                colorScheme='red'
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
            setIsReady(true);
        };
        get().catch(onApiRequestError);
        setProductsListChange(false);
    }, [currentPage, productsListChange, ctx.baseUrl, ctx.token]);

    useEffect(() => {
        const init = async () => {
            // This method enables us to establish a connection with the products collection
            // and listen for changes in the collection
            // At Macrometa each collection can be a stream
            // (Every collection is a stream and stream is a collection)
            await establishStreamConsumerConnection();
        };
        init().catch(console.error);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box p="6" bg={useColorModeValue("white", "gray.800")} rounded="lg">
            {!isReady ? (
                    <Spinner />
                ) :
                products.totalDocuments > 0 ? (
                    <DataView
                        onSaveProductData={onSaveProductData}
                        products={products}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        pageSize={pageSize}
                        categories={categories}
                        suppliers={suppliers}
                        columns={columns}
                    />
                ) : (
                    <Instructions />
                )}
        </Box>
    );
}


