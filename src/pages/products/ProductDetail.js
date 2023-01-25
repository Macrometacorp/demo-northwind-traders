import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import DetailCard from "../../components/DetailCard";
import { getProductById } from "../../services";

export function ProductDetail() {
    const [product, setProduct] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const getProduct = async () => {
            const product = await getProductById(id);

            const data = [
                { label: "Product Name", value: product.ProductName },
                { label: "Units In Stock", value: product.UnitsInStock },
                {
                    label: "Supplier",
                    value: product.Supplier.CompanyName,
                    linkTo: `/suppliers/${product.Supplier._key}`,
                },
                { label: "Units In Order", value: product.UnitsOnOrder },
                { label: "Quantity Per Unit", value: product.QuantityPerUnit },
                { label: "Reorder Level", value: product.ReorderLevel },
                {
                    label: "Unit Price",
                    value: `$${product.UnitPrice.toFixed(2)}`,
                },
                { label: "Discontinued", value: product.Discontinued },
            ];

            setProduct(data);
        };
        getProduct().catch(console.error);
    }, [id]);

    return (
        <DetailCard
            title="Product Information"
            goBackPath="/products"
            data={product}
        />
    );
}
