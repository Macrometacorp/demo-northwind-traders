import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import DetailCard from "../../components/DetailCard";
import { getCustomerById } from "../../services";
import authContext from "../../context/auth-context";

export function CustomerDetail() {
    const ctx = useContext(authContext);

    const [customer, setCustomer] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const getCustomer = async () => {
            const customer = await getCustomerById(id, ctx.baseUrl, ctx.token);

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
    }, [id, ctx.token]);

    return (
        <DetailCard
            title="Customer Information"
            goBackPath="/customers"
            data={customer}
        />
    );
}
