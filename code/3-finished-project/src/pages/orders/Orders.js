import { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";

import MyTable from "../../components/MyTable";
import Pagination from "../../components/Pagination";
import { getOrders } from "../../services";
import authContext from "../../context/auth-context";

export function Orders() {
    const ctx = useContext(authContext);

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "_key",
                Cell: ({ value }) => {
                    return (
                        <Link to={`/orders/${value}`}>
                            <Text
                                color={useColorModeValue(
                                    "primary.500",
                                    "primary.200",
                                )}
                            >
                                {value}
                            </Text>
                        </Link>
                    );
                },
            },
            {
                Header: "Total Price",
                accessor: "Products.TotalPrice",
                Cell: ({ value }) => {
                    return `$${value.toFixed(2)}`;
                },
            },
            {
                Header: "Products",
                accessor: "Products.DifferentProductCount",
            },
            {
                Header: "Quantity",
                accessor: "Products.TotalQuantity",
            },
            {
                Header: "Shipped",
                accessor: "ShippedDate",
            },
            {
                Header: "Ship Name",
                accessor: "ShipName",
            },
            {
                Header: "City",
                accessor: "ShipCity",
            },
            {
                Header: "Country",
                accessor: "ShipCountry",
            },
        ],
        [],
    );

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const [orders, setOrders] = useState({
        totalDocuments: 0,
        data: [],
    });

    useEffect(() => {
        const get = async () => {
            const _orders = await getOrders(
                {
                    page: currentPage,
                    pageSize,
                },
                ctx.baseUrl,
                ctx.token,
            );

            setOrders(_orders);
        };

        get().catch(console.error);
    }, [currentPage, ctx.token, ctx.baseUrl]);

    return (
        <Box p="6" bg={useColorModeValue("white", "gray.800")} rounded="lg">
            <MyTable title="Orders" columns={columns} data={orders.data} />
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalItems={orders.totalDocuments}
                ItemsPerPage={pageSize}
            />
        </Box>
    );
}
