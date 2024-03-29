import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";

import { theme } from "./theme";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import { Products, ProductDetail } from "./pages/products";
import { AuthContextProvider } from "./context/auth-context";
import Auth from "./pages/login/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import {SupplierDetail, Suppliers} from "./pages/suppliers";

export default function App() {
    return (
        <ChakraProvider theme={theme}>
            <AuthContextProvider>
                <Routes>
                    <Route
                        path="/"
                        exact
                        element={
                            <Sidebar>
                                <Home />
                            </Sidebar>
                        }
                    />
                    <Route path="/login" exact element={<Auth />} />
                    <Route
                        path="/home"
                        exact
                        element={
                            <Sidebar>
                                <Home />
                            </Sidebar>
                        }
                    />
                    <Route
                        path="/products"
                        element={
                            <Sidebar>
                                <ProtectedRoute>
                                    <Products />
                                </ProtectedRoute>
                            </Sidebar>
                        }
                    />
                    <Route
                        path="/products/:id"
                        element={
                            <Sidebar>
                                <ProtectedRoute>
                                    <ProductDetail />
                                </ProtectedRoute>
                            </Sidebar>
                        }
                    />
                    <Route
                        path="/suppliers"
                        element={
                            <Sidebar>
                                <ProtectedRoute>
                                    <Suppliers />
                                </ProtectedRoute>
                            </Sidebar>
                        }
                    />
                    <Route
                        path="/suppliers/:id"
                        element={
                            <Sidebar>
                                <ProtectedRoute>
                                    <SupplierDetail />
                                </ProtectedRoute>
                            </Sidebar>
                        }
                    />
                </Routes>
            </AuthContextProvider>
        </ChakraProvider>
    );
}
