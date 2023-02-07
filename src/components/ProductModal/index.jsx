import {
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Box,
} from "@chakra-ui/react";

import ProductForm from "../ProductForm";

export default function ProductModal(props) {
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
                    <ModalCloseButton />
                    <ModalBody>
                        <ProductForm
                            closeModal={onClose}
                            onUpdate={props.onUpdate}
                            onSave={props.onSave}
                            dataKey={props.dataKey}
                            categories={props.categories}
                            suppliers={props.suppliers}
                            buttonTitle={props.buttonTitle}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
}
