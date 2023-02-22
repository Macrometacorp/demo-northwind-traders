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
    Button,
    Divider,
    Stack,
    Spacer,
    Text,
} from "@chakra-ui/react";
import {
    FaBars,
    FaHome,
    FaBox,
} from "react-icons/fa";
import {
    BiLogOut,
    BiLogIn
} from "react-icons/bi";

import { Link, useNavigate } from "react-router-dom";

import Logotype from "../Logotype";
import { useContext } from "react";
import authContext from "../../context/auth-context";
import CustomModal from "../CustomModal";

// todo: Modified because of Getting Started tutorial
const LinkItems = [
    { name: "Home", icon: FaHome, path: "/home" },
    { name: "Products", icon: FaBox, path: "/products" },
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
    const ctx = useContext(authContext);

    const navigate = useNavigate();

    const loginHandler = () => {
        navigate("/login");
    };

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
            <Divider orientation="horizontal" />
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon} path={link.path}>
                    {link.name}
                </NavItem>
            ))}
            <Divider orientation="horizontal" />
            <Box
                display="flex"
                alignItems="left"
                justifyContent="left"
                width="100%"
            >
                {ctx.token === "" ? (
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width="100%"
                    >
                        <Button leftIcon={<BiLogIn />} onClick={loginHandler}>Log In</Button>
                    </Box>
                ) : (
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width="100%"
                    >
                        <Stack direction="column" spacing={6}>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                width="100%"
                            >
                                <Flex
                                    minWidth="min-content"
                                    alignItems="left"
                                    gap="1"
                                >
                                    <Spacer />
                                    <CustomModal
                                        selectRegion={true}
                                        buttonTitle={"Select Region"}
                                        modalTitle={"Select Region"}
                                    />
                                </Flex>
                            </Box>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                width="100%"
                            >
                                <Text as="b">Region: {ctx.regionName}</Text>
                            </Box>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                width="100%"
                            >
                                <Button leftIcon={<BiLogOut />} onClick={ctx.onLogout}>Log Out</Button>
                            </Box>
                        </Stack>
                    </Box>
                )}
            </Box>
            <Divider orientation="horizontal" />
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
