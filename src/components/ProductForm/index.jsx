import { useContext, useEffect, useState } from "react";
import {
    Box,
    Button,
    ButtonGroup,
    FormControl,
    FormLabel,
    Input,
    NumberInput,
    NumberInputField,
    Select,
    VStack,
} from "@chakra-ui/react";
import { GetDocumentData } from "../../services";
import authContext from "../../context/auth-context";

export default function ProductForm(props) {
    const ctx = useContext(authContext);

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
        props.closeModal();
    };

    const close = () => {
        setEnteredCategory(0);
        setEnteredName("");
        setEnteredQuantityPerUnit("");
        setEnteredSupplier(0);
        setEnteredStock(0);
        setEnteredPrice(0);
        props.closeModal();
    };

    useEffect(() => {
        if (props.dataKey) {
            const get = async () => {
                const response = await GetDocumentData(
                    "products",
                    props.dataKey,
                    ctx.token,
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
    }, [
        props.categories,
        props.dataKey,
        props.suppliers,
        props.buttonClicked,
        ctx.token,
    ]);

    return (
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
                        <NumberInputField onChange={stockChangeHandler} />
                    </NumberInput>
                    <FormLabel>Price</FormLabel>
                    <NumberInput min={1} value={enteredPrice}>
                        <NumberInputField onChange={priceChangeHandler} />
                    </NumberInput>
                    <Box
                        display="flex"
                        alignItems="right"
                        justifyContent="right"
                        width="100%"
                    >
                        <ButtonGroup gap="2">
                            <Button variant="ghost" onClick={close}>
                                Close
                            </Button>
                            <Button type="submit">{props.buttonTitle}</Button>
                        </ButtonGroup>
                    </Box>
                </VStack>
            </FormControl>
        </form>
    );
}
