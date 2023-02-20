import {
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    Box,
} from "@chakra-ui/react";
import SelectRegion from "../SelectRegion";
import ProductForm from "../ProductForm";

export default function CustomModal(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box>
            <Button variant="solid" onClick={onOpen}>
                {props.buttonTitle}
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                closeOnOverlayClick={false}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{props.modalTitle}</ModalHeader>
                    <ModalBody>
                        {props.selectRegion && (
                            <SelectRegion closeModal={onClose}></SelectRegion>
                        )}
                        {props.productForm && (
                            <ProductForm
                                closeModal={onClose}
                                onUpdate={props.onUpdate}
                                onSave={props.onSave}
                                dataKey={props.dataKey}
                                categories={props.categories}
                                suppliers={props.suppliers}
                                buttonTitle={props.buttonTitle}
                            />
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
}
