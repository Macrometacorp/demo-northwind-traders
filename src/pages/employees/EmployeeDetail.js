import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import DetailCard from "../../components/DetailCard";
import { getEmployeeById } from "../../services";

export function EmployeeDetail() {
    const [employee, setEmployee] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const getEmployee = async () => {
            const employee = await getEmployeeById(id);

            const data = [
                {
                    label: "Name",
                    value: `${employee.FirstName} ${employee.LastName}`,
                },
                { label: "Postal Code", value: employee.PostalCode },
                { label: "Title", value: employee.Title },
                { label: "Country", value: employee.Country },
                { label: "Title of Courtesy", value: employee.TitleOfCourtesy },
                { label: "Home Phone", value: employee.HomePhone },
                { label: "Birth Date", value: employee.BirthDate },
                { label: "Extension", value: employee.Extension },
                { label: "Hire Date", value: employee.HireDate },
                { label: "Notes", value: employee.Notes },
                { label: "Address", value: employee.Address },
                {
                    label: "Reports To",
                    value: employee.ReportsTo._key
                        ? `${employee.ReportsTo.FirstName} ${employee.ReportsTo.LastName}`
                        : "",
                    linkTo: employee.ReportsTo._key
                        ? `/employees/${employee.ReportsTo._key}`
                        : "",
                },
                { label: "City", value: employee.City },
            ];

            setEmployee(data);
        };
        getEmployee().catch(console.error);
    }, [id]);

    return (
        <DetailCard
            title="Employee Information"
            goBackPath="/employees"
            data={employee}
        />
    );
}
