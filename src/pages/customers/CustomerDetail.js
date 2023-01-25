import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import DetailCard from "../../components/DetailCard";
import { getCustomerById } from "../../services";

export function CustomerDetail() {
    const [customer, setCustomer] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const getCustomer = async () => {
            const customer = await getCustomerById(id);

            const data = [
                { label: "Company Name", value: customer.CompanyName },
                { label: "Postal Code", value: customer.PostalCode },
                { label: "Contact Name", value: customer.ContactName },
                { label: "Region", value: customer.Region },
                { label: "Contact Title", value: customer.ContactTitle },
                { label: "Country", value: customer.Country },
                { label: "Address", value: customer.Address },
                { label: "Phone", value: customer.Phone },
                { label: "City", value: customer.City },
                { label: "Fax", value: customer.Fax },
            ];

            setCustomer(data);
        };
        getCustomer().catch(console.error);
    }, [id]);

    return (
        <DetailCard
            title="Customer Information"
            goBackPath="/customers"
            data={customer}
        />
    );
}
