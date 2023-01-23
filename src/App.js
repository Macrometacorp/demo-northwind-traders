import { ChakraProvider } from "@chakra-ui/react";
import { HashRouter, Routes, Route } from "react-router-dom";

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

export default function App() {
    return (
        <ChakraProvider theme={theme}>
            <AuthContextProvider>
                <HashRouter basename="/">
                    <Sidebar>
                        <Routes>
                            <Route path="/" exact element={<Home />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/suppliers" element={<Suppliers />} />
                            <Route
                                path="/suppliers/:id"
                                element={<SupplierDetail />}
                            />
                            <Route path="/products" element={<Products />} />
                            <Route
                                path="/products/:id"
                                element={<ProductDetail />}
                            />
                            <Route path="/orders" element={<Orders />} />
                            <Route
                                path="/orders/:id"
                                element={<OrderDetail />}
                            />
                            <Route path="/employees" element={<Employees />} />
                            <Route
                                path="/employees/:id"
                                element={<EmployeeDetail />}
                            />
                            <Route path="/customers" element={<Customers />} />
                            <Route
                                path="/customers/:id"
                                element={<CustomerDetail />}
                            />
                            <Route path="/search" element={<Search />} />
                        </Routes>
                    </Sidebar>
                </HashRouter>
            </AuthContextProvider>
        </ChakraProvider>
    );
}
