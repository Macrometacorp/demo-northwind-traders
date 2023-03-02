import {
    Box,
    ListItem,
    OrderedList,
    Text
} from "@chakra-ui/react";

export function Instructions() {
    return(
    <Box>
        <Text fontSize="lg" as="b">
            No products found ! We apologize, but it seems that no
            products have been found in the Macrometa GDN. 😓
        </Text>
        <Text fontSize="lg" my={4}>
            To populate the GDN, please follow these steps:
        </Text>
        <OrderedList spacing={3} my={4}>
            <ListItem fontSize="lg">
                Create a new document store collection called
                "products.".
            </ListItem>
            <ListItem fontSize="lg">
                Import the data from the "products.json" file
                located in the `extraFiles` folder in this project
                into the newly created collection. Before you
                confirm make sure you select `ProductID` as the key.
            </ListItem>
            <ListItem fontSize="lg">
                Create additional document store collections for
                "categories" and "suppliers."
            </ListItem>
            <ListItem fontSize="lg">
                Import categories.json and suppliers.json files
                located in the `extraFiles` folder in this project
                to the created collections. Before you confirm make
                sure you select `CategoryID` as the key for
                categories and `SupplierID` as the key for
                suppliers.
            </ListItem>
            <ListItem fontSize="lg">
                Import the corresponding data from "categories.json"
                and "suppliers.json" into their respective
                collections.
            </ListItem>
            <ListItem fontSize="lg">
                Finally, navigate to the Query Workers section and
                import the queries from "ImportQueryWorker.json" to
                begin querying the GDN."
            </ListItem>
        </OrderedList>
    </Box>
    )
}
