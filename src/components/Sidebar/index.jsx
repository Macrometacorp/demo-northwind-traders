import {
    IconButton,
    Box,
    CloseButton,
    Flex,
    Icon,
    useColorModeValue,
    Drawer,
    DrawerContent,
    useDisclosure,
} from "@chakra-ui/react";
import {
    FaBars,
    FaHome,
    //FaTachometerAlt,
    FaTruckLoading,
    FaBox,
    FaShoppingCart,
    FaIdBadge,
    FaUserFriends,
    FaSearch,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import Logotype from "../Logotype";

const LinkItems = [
    { name: "Home", icon: FaHome, path: "/" },
    //{ name: "Dashboard", icon: FaTachometerAlt, path: "/dashboard" },
    { name: "Suppliers", icon: FaTruckLoading, path: "/suppliers" },
    { name: "Products", icon: FaBox, path: "/products" },
    { name: "Orders", icon: FaShoppingCart, path: "/orders" },
    { name: "Employees", icon: FaIdBadge, path: "/employees" },
    { name: "Customers", icon: FaUserFriends, path: "/customers" },
    { name: "Search", icon: FaSearch, path: "/search" },
];

export default function Sidebar({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box minH="100vh" bg={useColorModeValue("gray.50", "gray.900")}>
            <SidebarContent
                onClose={() => onClose}
                display={{ base: "none", md: "block" }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>

            {/* mobilenav */}
            <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />

            <Box ml={{ base: 0, md: 60 }} p={6}>
                {children}
            </Box>
        </Box>
    );
}

const SidebarContent = ({ onClose, ...rest }) => {
    return (
        <Box
            bg={useColorModeValue("white", "gray.800")}
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.100", "gray.700")}
            w={{ base: "full", md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex
                h={20}
                alignItems="center"
                mx={8}
                justifyContent="space-between"
            >
                <Logotype />
                <CloseButton
                    display={{ base: "flex", md: "none" }}
                    onClick={onClose}
                />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon} path={link.path}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
};

const NavItem = ({ icon, path, children, ...rest }) => {
    const hoverColor = useColorModeValue("gray.100", "gray.700");

    return (
        <Link
            to={path}
            style={{ textDecoration: "none" }}
            // _focus={{ boxShadow: "none" }}
        >
            <Flex
                align="center"
                p={3}
                mx={4}
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{ bg: hoverColor }}
                {...rest}
            >
                {icon && (
                    <Icon
                        mr={4}
                        fontSize="16"
                        as={icon}
                        // _groupHover={{ color: "white" }}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

const MobileNav = ({ onOpen, ...rest }) => {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 24 }}
            h={20}
            alignItems="center"
            bg={useColorModeValue("white", "gray.800")}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue("gray.100", "gray.700")}
            justifyContent="flex-start"
            {...rest}
        >
            <IconButton
                variant="outline"
                onClick={onOpen}
                aria-label="open menu"
                icon={<FaBars />}
            />

            <Logotype ml={4} />
        </Flex>
    );
};
