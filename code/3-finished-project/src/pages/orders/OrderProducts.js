import { Link } from "react-router-dom";
import { Box, useColorModeValue } from "@chakra-ui/react";

import MyTable from "../../components/MyTable";

const columns = [
    {
        Header: "Product",
        accessor: "ProductName",
        Cell: (info) => {
            return (
                <Link to={`/products/${info.row.original._key}`}>
                    {info.value}
                </Link>
            );
        },
    },
    {
        Header: "Quantity",
        accessor: "Quantity",
    },
    {
        Header: "Order Price",
        accessor: "UnitPrice",
        Cell: ({ value }) => {
            return `$${value.toFixed(2)}`;
        },
    },
    {
        Header: "Total Price",
        accessor: "TotalPrice",
        Cell: ({ value }) => {
            return `$${value.toFixed(2)}`;
        },
    },
    {
        Header: "Discount",
        accessor: "Discount",
        Cell: ({ value }) => {
            return `${(value * 100).toFixed(2)}%`;
        },
    },
];

export function OrderProducts({ data }) {
    return (
        <Box
            mt="6"
            p="6"
            bg={useColorModeValue("white", "gray.800")}
            rounded="lg"
        >
            <MyTable title="Products in Order" columns={columns} data={data} />
        </Box>
    );
}
