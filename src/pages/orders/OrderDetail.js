import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import DetailCard from "../../components/DetailCard";
import { OrderProducts } from "./OrderProducts";
import { getOrderById } from "../../services";
import authContext from "../../context/auth-context";

export function OrderDetail() {
    const ctx = useContext(authContext);

    const [order, setOrder] = useState([]);
    const [products, setProducts] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const getOrder = async () => {
            const order = await getOrderById(
                Number(id),
                ctx.baseUrl,
                ctx.token,
            );
            setProducts([...order.Products.List]);

            const data = [
                {
                    label: "Customer Id",
                    value: order.CustomerID,
                    linkTo: `/customers/${order.CustomerID}`,
                },
                { label: "Order Date", value: order.OrderDate },
                { label: "Ship Name", value: order.ShipName },
                { label: "Required Date", value: order.RequiredDate },
                {
                    label: "Total Products",
                    value: order.Products.DifferentProductCount,
                },
                { label: "Shipped Date", value: order.ShippedDate },
                {
                    label: "Total Quantity",
                    value: order.Products.TotalQuantity,
                },
                { label: "Ship City", value: order.ShipCity },
                {
                    label: "Total Price",
                    value: `$${order.Products.TotalPrice.toFixed(2)}`,
                },
                { label: "Ship Region", value: order.ShipRegion },
                {
                    label: "Total Discount",
                    value: `$${order.Products.TotalDiscount.toFixed(2)}`,
                },
                { label: "Ship Postal Code", value: order.ShipPostalCode },
                { label: "Ship Via", value: order.Shipper.CompanyName },
                { label: "Ship Country", value: order.ShipCountry },
                { label: "Freight", value: `$${order.Freight.toFixed(2)}` },
            ];

            setOrder(data);
        };
        getOrder().catch(console.error);
    }, [id, ctx.token]);

    return (
        <>
            <DetailCard title="Order Information" data={order} />
            <OrderProducts data={products} />
        </>
    );
}
