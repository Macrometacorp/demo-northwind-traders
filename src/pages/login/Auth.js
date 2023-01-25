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
    useColorModeValue,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import authContext from "../../context/auth-context";

function Auth() {
    const ctx = useContext(authContext);

    const [enteredEmail, setEnteredEmail] = useState();
    const [enteredPassword, setEnteredPassword] = useState();

    //todo
    //  we render the thing on every change :(
    //  form debounce
    //  console.log(ctx);

    const emailInputHandler = (event) => {
        setEnteredEmail(event.target.value);
    };

    const passwordInputHandler = (event) => {
        setEnteredPassword(event.target.value);
    };

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
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" onChange={emailInputHandler} />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                onChange={passwordInputHandler}
                            />
                        </FormControl>
                        <Stack spacing={10}>
                            <Button
                                onClick={() =>
                                    ctx.onLogin(enteredEmail, enteredPassword)
                                }
                            >
                                Sign In
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}

export default Auth;
