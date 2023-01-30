import { useState } from "react";
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

    const [modalButtonClicked, setModalButtonClicked] = useState(false);

    const modalOpened = () => {
        setModalButtonClicked(true);
        onOpen();
    };

    return (
        <Box>
            <Button variant="solid" onClick={modalOpened}>
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
