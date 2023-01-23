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
    FormControl,
    FormLabel,
    NumberInput,
    NumberInputField,
    Input,
    VStack,
    Box,
    ButtonGroup,
    Select,
} from "@chakra-ui/react";

import {
    GetDocumentData,
} from "../../services";

export default function MyButton(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [enteredCategory, setEnteredCategory] = useState(0);
    const [enteredName, setEnteredName] = useState("");
    const [enteredQuantityPerUnit, setEnteredQuantityPerUnit] = useState("");
    const [enteredSupplier, setEnteredSupplier] = useState(0);
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
            key: props.dataKey,
            category: +enteredCategory,
            name: enteredName,
            quantityPerUnit: enteredQuantityPerUnit,
            supplier: +enteredSupplier,
            stock: +enteredStock,
            price: +enteredPrice,
        };
        if (props.dataKey) {
            props.onUpdate(newProductData);
        } else {
            props.onSave(newProductData);
        }
        setEnteredCategory(0);
        setEnteredName("");
        setEnteredQuantityPerUnit("");
        setEnteredSupplier(0);
        setEnteredStock(0);
        setEnteredPrice(0);
        onClose();
    };

    const close = () => {
        setEnteredCategory(0);
        setEnteredName("");
        setEnteredQuantityPerUnit("");
        setEnteredSupplier(0);
        setEnteredStock(0);
        setEnteredPrice(0);
        onClose();
    };

    const modalOpened = () => {
        if (props.dataKey) {
            const get = async () => {
                const response = await GetDocumentData(
                    "products",
                    props.dataKey,
                );

                const filteredSuppliers = props.suppliers.filter((supplier) => {
                    return supplier.key === response.SupplierID.toString();
                });

                const filteredCategory = props.categories.filter((category) => {
                    return category.key === response.CategoryID.toString();
                });

                setEnteredCategory(+filteredCategory[0].key);
                setEnteredName(response.ProductName);
                setEnteredQuantityPerUnit(response.QuantityPerUnit);
                setEnteredSupplier(+filteredSuppliers[0].key);
                setEnteredStock(+response.UnitsInStock);
                setEnteredPrice(+response.UnitPrice);
            };
            get().catch(console.error);
        }
        onOpen();
    };


    return (
        <Box>
            <Button variant="solid" onClick={modalOpened}>
                {props.title}
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                closeOnOverlayClick={false}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{props.title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={submitHandler}>
                            <FormControl>
                                <VStack spacing={2} align="stretch">
                                    <FormLabel>Category</FormLabel>
                                    <Select
                                        value={enteredCategory}
                                        placeholder="Select option"
                                        onChange={categoryChangeHandler}
                                    >
                                        {props.categories.map((data) => (
                                            <option
                                                key={data.key + "cat"}
                                                value={data.key}
                                                label={data.category}
                                            />
                                        ))}
                                    </Select>
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
                                    <Select
                                        value={enteredSupplier}
                                        placeholder="Select option"
                                        onChange={supplierChangeHandler}
                                    >
                                        {props.suppliers.map((data) => (
                                            <option
                                                key={data.key + "sup"}
                                                value={data.key}
                                                label={data.companyName}
                                            />
                                        ))}
                                    </Select>
                                    <FormLabel>Stock</FormLabel>
                                    <NumberInput min={1} value={enteredStock}>
                                        <NumberInputField
                                            onChange={stockChangeHandler}
                                        />
                                    </NumberInput>
                                    <FormLabel>Price</FormLabel>
                                    <NumberInput min={1} value={enteredPrice}>
                                        <NumberInputField
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
                                                {props.modalTitle}
                                            </Button>
                                        </ButtonGroup>
                                    </Box>
                                </VStack>
                            </FormControl>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
}
