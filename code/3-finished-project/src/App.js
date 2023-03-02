import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";

import { theme } from "./theme";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { Suppliers, SupplierDetail } from "./pages/suppliers";
import { Products, ProductDetail } from "./pages/products";
import { Orders, OrderDetail } from "./pages/orders";
import { Employees, EmployeeDetail } from "./pages/employees";
import { Customers, CustomerDetail } from "./pages/customers";
import Search from "./pages/Search";
import { AuthContextProvider } from "./context/auth-context";
import Auth from "./pages/login/Auth";
import ProtectedRoute from "./components/ProtectedRoute";

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
                        path="/dashboard"
                        element={
                            <Sidebar>
                                <ProtectedRoute>
                                    <Dashboard />
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
                        path="/orders"
                        element={
                            <Sidebar>
                                <ProtectedRoute>
                                    <Orders />
                                </ProtectedRoute>
                            </Sidebar>
                        }
                    />
                    <Route
                        path="/orders/:id"
                        element={
                            <Sidebar>
                                <ProtectedRoute>
                                    <OrderDetail />
                                </ProtectedRoute>
                            </Sidebar>
                        }
                    />
                    <Route
                        path="/employees"
                        element={
                            <Sidebar>
                                <ProtectedRoute>
                                    <Employees />
                                </ProtectedRoute>
                            </Sidebar>
                        }
                    />
                    <Route
                        path="/employees/:id"
                        element={
                            <Sidebar>
                                <ProtectedRoute>
                                    <EmployeeDetail />
                                </ProtectedRoute>
                            </Sidebar>
                        }
                    />
                    <Route
                        path="/customers"
                        element={
                            <Sidebar>
                                <ProtectedRoute>
                                    <Customers />
                                </ProtectedRoute>
                            </Sidebar>
                        }
                    />
                    <Route
                        path="/customers/:id"
                        element={
                            <Sidebar>
                                <ProtectedRoute>
                                    <CustomerDetail />
                                </ProtectedRoute>
                            </Sidebar>
                        }
                    />
                    <Route
                        path="/search"
                        element={
                            <Sidebar>
                                <ProtectedRoute>
                                    <Search />
                                </ProtectedRoute>
                            </Sidebar>
                        }
                    />
                </Routes>
            </AuthContextProvider>
        </ChakraProvider>
    );
}
