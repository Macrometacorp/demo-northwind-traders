import { useState } from "react";
import {
    Button,
    Flex,
    Spacer,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Input,
    VStack,
    Box,
    ButtonGroup,
} from "@chakra-ui/react";

export default function MyButton(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [enteredCategory, setEnteredCategory] = useState("");
    const [enteredName, setEnteredName] = useState("");
    const [enteredQuantityPerUnit, setEnteredQuantityPerUnit] = useState("");
    const [enteredSupplier, setEnteredSupplier] = useState("");
    const [enteredStock, setEnteredStock] = useState(0);
    const [enteredPrice, setEnteredPrice] = useState(0);

    const categoryChangeHandler = (event) => {
        setEnteredCategory(event.target.value);
    };

    const nameChangeHandler = (event) => {
        setEnteredName(event.target.value);
    };

    const quantityPerUnitChangeHandler = (event) => {
        setEnteredQuantityPerUnit(event.target.value);
    };

    const supplierChangeHandler = (event) => {
        setEnteredSupplier(event.target.value);
    };

    const stockChangeHandler = (event) => {
        setEnteredStock(event.target.value);
    };

    const priceChangeHandler = (event) => {
        setEnteredPrice(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const newProductData = {
            category: enteredCategory,
            name: enteredName,
            quantityPerUnit: enteredQuantityPerUnit,
            supplier: enteredSupplier,
            stock: +enteredStock, // enforce a number conversion
            price: +enteredPrice,
        };
        setEnteredCategory("");
        setEnteredName("");
        setEnteredQuantityPerUnit("");
        setEnteredSupplier("");
        setEnteredStock(0);
        setEnteredPrice(0);
        props.onSave(newProductData);
        onClose();
    };

    const close = () => {
        setEnteredCategory("");
        setEnteredName("");
        setEnteredQuantityPerUnit("");
        setEnteredSupplier("");
        setEnteredStock(0);
        setEnteredPrice(0);
        onClose();
    };

    return (
        <Flex minWidth="max-content" alignItems="center" gap="2">
            <Spacer />
            <Button onClick={onOpen}>Add New Product</Button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                closeOnOverlayClick={false}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add New Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={submitHandler}>
                            <FormControl>
                                <VStack spacing={2} align="stretch">
                                    <FormLabel>Category</FormLabel>
                                    <Input
                                        type="text"
                                        value={enteredCategory}
                                        onChange={categoryChangeHandler}
                                    />
                                    <FormLabel>Name</FormLabel>
                                    <Input
                                        type="text"
                                        value={enteredName}
                                        onChange={nameChangeHandler}
                                    />
                                    <FormLabel>Quantity Per Unit</FormLabel>
                                    <Input
                                        type="text"
                                        value={enteredQuantityPerUnit}
                                        onChange={quantityPerUnitChangeHandler}
                                    />
                                    <FormLabel>Supplier</FormLabel>
                                    <Input
                                        type="text"
                                        value={enteredSupplier}
                                        onChange={supplierChangeHandler}
                                    />
                                    <FormLabel>Stock</FormLabel>
                                    <NumberInput min={1}>
                                        <NumberInputField
                                            value={enteredStock}
                                            onChange={stockChangeHandler}
                                        />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                    <FormLabel>Price</FormLabel>
                                    <NumberInput min={1}>
                                        <NumberInputField
                                            value={enteredPrice}
                                            onChange={priceChangeHandler}
                                        />
                                    </NumberInput>
                                    <Box
                                        display="flex"
                                        alignItems="right"
                                        justifyContent="right"
                                        width="100%"
                                    >
                                        <ButtonGroup gap="2">
                                            <Button
                                                variant="ghost"
                                                onClick={close}
                                            >
                                                Close
                                            </Button>
                                            <Button type="submit">
                                                Add Product
                                            </Button>
                                        </ButtonGroup>
                                    </Box>
                                </VStack>
                            </FormControl>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Flex>
    );
}
