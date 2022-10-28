import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { theme } from "./theme";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Suppliers from "./pages/Suppliers";
import SupplierDetail from "./pages/SupplierDetail";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import { Orders, OrderDetail } from "./pages/orders"
import Employees from "./pages/Employees";
import Customers from "./pages/Customers";
import CustomerDetail from "./pages/CustomerDetail";
import Search from "./pages/Search";

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Sidebar>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/suppliers/:id" element={<SupplierDetail />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderDetail />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:id" element={<CustomerDetail />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </ChakraProvider>
  );
}
