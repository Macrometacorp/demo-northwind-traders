import { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";

import MyTable from "../../components/MyTable";
import Pagination from "../../components/Pagination";
import { getSuppliers } from "../../services";
import authContext from "../../context/auth-context";

export function Suppliers() {
    const ctx = useContext(authContext);

    const columns = useMemo(
        () => [
            {
                Header: "Company",
                accessor: "CompanyName",
                Cell: (info) => {
                    return (
                        <Link to={`/suppliers/${info.row.original._key}`}>
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
                Header: "Contact",
                accessor: "ContactName",
            },
            {
                Header: "Title",
                accessor: "ContactTitle",
            },
            {
                Header: "City",
                accessor: "City",
            },
            {
                Header: "Country",
                accessor: "Country",
            },
        ],
        [],
    );

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const [suppliers, setSuppliers] = useState({
        totalDocuments: 0,
        data: [],
    });

    useEffect(() => {
        const get = async () => {
            const _suppliers = await getSuppliers(
                {
                    page: currentPage,
                    pageSize,
                },
                ctx.baseUrl,
                ctx.token,
            );

            setSuppliers(_suppliers);
        };

        get().catch(console.error);
    }, [currentPage, ctx.token, ctx.baseUrl]);

    return (
        <Box p="6" bg={useColorModeValue("white", "gray.800")} rounded="lg">
            <MyTable
                title="Suppliers"
                columns={columns}
                data={suppliers.data}
            />
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalItems={suppliers.totalDocuments}
                ItemsPerPage={pageSize}
            />
        </Box>
    );
}
