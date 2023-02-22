import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    FormErrorMessage,
    useColorModeValue,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import authContext from "../../context/auth-context";

function Auth() {
    const ctx = useContext(authContext);

    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [isError, setIsError] = useState(false);

    const submitHandler = () => {
        ctx.onLogin(enteredEmail, enteredPassword);

        setTimeout(function () {
            if (ctx.isLoggedIn) {
                setIsError(false);
            } else {
                setIsError(true);
            }
        }, 400);
    };

    const debouncedSetEnteredEmail = debounce(setEnteredEmail, 500);
    const debounceSetEnteredPassword = debounce(setEnteredPassword, 500);

    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading textAlign={"center"} fontSize={"4xl"}>
                        Sign in to Northwind Traders
                    </Heading>
                    <Text fontSize={"lg"} color={"gray.600"}>
                        to order a new product ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <Stack spacing={4}>
                        <FormControl id="email" isRequired isInvalid={isError}>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                onChange={(e) =>
                                    debouncedSetEnteredEmail(e.target.value)
                                }
                            />
                        </FormControl>
                        <FormControl
                            id="password"
                            isRequired
                            isInvalid={isError}
                        >
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                name="password"
                                onChange={(e) =>
                                    debounceSetEnteredPassword(e.target.value)
                                }
                            />
                            {isError && (
                                <FormErrorMessage>
                                    Login Error! Please check your credentials. Status code: 500
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        <Stack spacing={10}>
                            <Button onClick={submitHandler}>Sign In</Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}

function debounce(callback, wait) {
    let timeoutId = null;
    return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
            callback.apply(null, args);
        }, wait);
    };
}

export default Auth;
