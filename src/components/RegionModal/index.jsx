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
import SelectRegion from "../SelectRegion";

export default function RegionModal(props) {
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
                        <SelectRegion closeModal={onClose}></SelectRegion>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
}
