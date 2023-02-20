import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import DetailCard from "../../components/DetailCard";
import { getSupplierById } from "../../services";
import authContext from "../../context/auth-context";

export function SupplierDetail() {
    const ctx = useContext(authContext);

    const [supplier, setSupplier] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const getSupplier = async () => {
            const supplier = await getSupplierById(id, ctx.baseUrl, ctx.token);

            const data = [
                { label: "Company Name", value: supplier.CompanyName },
                { label: "Region", value: supplier.Region },
                { label: "Contact Name", value: supplier.ContactName },
                { label: "Postal Code", value: supplier.PostalCode },
                { label: "Contact Title", value: supplier.ContactTitle },
                { label: "Country", value: supplier.Country },
                { label: "Address", value: supplier.Address },
                { label: "Phone", value: supplier.Phone },
                { label: "City", value: supplier.City },
            ];

            setSupplier(data);
        };
        getSupplier().catch(console.error);
    }, [id, ctx.token, ctx.baseUrl]);

    //todo: Modified because of Getting Started tutorial
    return (
        <DetailCard
            title="Supplier Information"
            goBackPath="/products"
            data={supplier}
        />
    );
}
