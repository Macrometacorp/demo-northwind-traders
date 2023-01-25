import { useEffect, useState } from "react";
import { Flex, IconButton, Tooltip, Text } from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Pagination({
    currentPage,
    setCurrentPage,
    totalItems,
    ItemsPerPage,
}) {
    const totalPages = Math.ceil(totalItems / ItemsPerPage);

    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoNext, setCanGoNext] = useState(true);

    const onPreviousPage = () => setCurrentPage(currentPage - 1);
    const onNextPage = () => setCurrentPage(currentPage + 1);

    useEffect(() => {
        if (currentPage === 1) {
            setCanGoBack(false);
        } else {
            setCanGoBack(true);
        }

        if (totalPages === currentPage) {
            setCanGoNext(false);
        } else {
            setCanGoNext(true);
        }
    }, [totalPages, currentPage]);

    return (
        <Flex mt={4} align="center" justify="space-between">
            <Flex>
                <Tooltip label="Previous Page">
                    <IconButton
                        onClick={onPreviousPage}
                        isDisabled={!canGoBack}
                        icon={<FiChevronLeft />}
                        colorScheme="gray"
                        mr={3}
                    />
                </Tooltip>
                <Tooltip label="Next Page">
                    <IconButton
                        onClick={onNextPage}
                        isDisabled={!canGoNext}
                        icon={<FiChevronRight />}
                        colorScheme="gray"
                        mr={3}
                    />
                </Tooltip>
            </Flex>
            <Text>{`Page ${currentPage} of ${totalPages}`}</Text>
        </Flex>
    );
}
