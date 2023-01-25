import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import DetailCard from "../../components/DetailCard";
import { getSupplierById } from "../../services";

export function SupplierDetail() {
    const [supplier, setSupplier] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const getSupplier = async () => {
            const supplier = await getSupplierById(id);

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
    }, [id]);

    return (
        <DetailCard
            title="Supplier Information"
            goBackPath="/suppliers"
            data={supplier}
        />
    );
}
