import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Flex,
    Heading,
    IconButton,
    Text,
    Tooltip,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import {
    FiChevronsLeft,
    FiChevronLeft,
    FiChevronRight,
    FiChevronsRight,
} from "react-icons/fi";

export default function DataTable({ title, columns, data }) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <>
            <Heading size="md" mb={4}>
                {title}
            </Heading>
            <TableContainer>
                <Table>
                    <Thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <Th key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {table.getRowModel().rows.map((row) => (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <Td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <Flex mt={4} align="center" justify="space-between">
                <Flex>
                    <Tooltip label="First Page">
                        <IconButton
                            onClick={() => table.setPageIndex(0)}
                            isDisabled={!table.getCanPreviousPage()}
                            icon={<FiChevronsLeft />}
                            colorScheme="gray"
                            mr={3}
                        />
                    </Tooltip>
                    <Tooltip label="Previous Page">
                        <IconButton
                            onClick={() => {
                                table.previousPage();
                            }}
                            isDisabled={!table.getCanPreviousPage()}
                            icon={<FiChevronLeft />}
                            colorScheme="gray"
                            mr={3}
                        />
                    </Tooltip>
                    <Tooltip label="Next Page">
                        <IconButton
                            onClick={() => table.nextPage()}
                            isDisabled={!table.getCanNextPage()}
                            icon={<FiChevronRight />}
                            colorScheme="gray"
                            mr={3}
                        />
                    </Tooltip>
                    <Tooltip label="Last Page">
                        <IconButton
                            onClick={() =>
                                table.setPageIndex(table.getPageCount() - 1)
                            }
                            isDisabled={!table.getCanNextPage()}
                            icon={<FiChevronsRight />}
                            colorScheme="gray"
                        />
                    </Tooltip>
                </Flex>

                <Text>
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </Text>
            </Flex>
        </>
    );
}
