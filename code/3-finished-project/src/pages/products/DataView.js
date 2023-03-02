import {Box, Flex, Spacer} from "@chakra-ui/react";
import CustomModal from "../../components/CustomModal";
import MyTable from "../../components/MyTable";
import Pagination from "../../components/Pagination";

export function DataView({onSaveProductData, products, currentPage, setCurrentPage, pageSize, categories, suppliers, columns}) {
    return (
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
    )
}