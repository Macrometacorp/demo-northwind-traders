import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Center,
    Heading,
    Image,
    Link,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";

import northwindTraders from "../northwind-traders.png";
import { useContext } from "react";
import authContext from "../context/auth-context";

function Home() {
    const ctx = useContext(authContext);

    return (
        <Box p="6" bg={useColorModeValue("white", "gray.800")} rounded="lg">
            <Button onClick={ctx.onLogout}>Log Out</Button>
            <Heading size="lg" mb={4}>
                Macrometa Northwind Traders Demo
            </Heading>
            <Text fontSize="lg">
                Northwind Traders Access database is a sample database that
                shipped with the Microsoft Office suite in 1997. The Northwind
                database contains sales data for a fictitious company called
                Northwind Traders, which imports and exports specialty foods
                from around the world.
            </Text>

            <Center my={6}>
                <Image src={northwindTraders} alt="Northwind Traders" />
            </Center>

            <Text fontSize="lg">
                Northwind Traders has become a "Hello World" example for any
                database, and this demo shows that we can have that data
                distributed across more than 175 locations globally. Integration
                with Akamai Edge Workers delivers data closer to the users,
                cutting down latency times.
            </Text>
            <Text fontSize="lg" my={4}>
                This application architecture enables developers to build truly
                distributed applications with maximum performance worldwide.
                Everything can be built inside Macrometa PaaS. The platform is
                self-serve and you can try it out in our playground.
            </Text>
            <Link
                href="https://play.paas.macrometa.io/"
                fontSize="lg"
                color={useColorModeValue("primary.500", "primary.200")}
                isExternal
            >
                Macrometa playground <ExternalLinkIcon mx="2px" />
            </Link>
        </Box>
    );
}

export default Home;
