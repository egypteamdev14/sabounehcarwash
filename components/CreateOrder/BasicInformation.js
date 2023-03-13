import { getAllVehicles } from "@/services/vehicles";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Stepper } from "react-form-stepper";
import { useQuery } from "react-query";

const BasicInformation = () => {
    const [formData, setFormData] = useState({
        vehicleType: "",
        TypeofSubscription: "",
    });

    const { vehicleType, TypeofSubscription } = formData;
    const [checked, setChecked] = useState([]);
    const checkList = ["Tool one", "Tool Two", "Tool Three", "Tool Four"];

    const { data, error, isLoading } = useQuery("getVehicles", getAllVehicles);

    const handelChange = (e) => {
        const { name, value } = e.target;
    };

    const handleCheck = (event) => {
        let updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };

    const isChecked = (item) =>
        checked.includes(item) ? "checked-item" : "not-checked-item";

    return (
        <div className="m-5 ">
            <Form className="flex align-items-start justify-content-center  gap-5">
                <div className="first-child">
                    <h6>Type of Subscription</h6>
                    <Form.Select
                        className="mb-3"
                        aria-label="Default select example"
                        name="TypeofSubscription"
                        required
                        onChange={(e) => handelChange(e)}
                        value={TypeofSubscription}
                    >
                        <option>Type of Subscription</option>
                        <option value="Full-Car Wash">Full-Car Wash</option>
                        <option value="plus">plus</option>
                        <option value="Lite">Lite</option>
                    </Form.Select>
                    {/* Vehicle Type */}
                    <h6>Vehicle Type</h6>
                    <Form.Select
                        className="mb-3 mt-3"
                        aria-label="Default select example"
                        name="vehicleType"
                        required
                        onChange={(e) => handelChange(e)}
                        value={vehicleType}
                    >
                        <option>Vehicle Type</option>
                        {data?.vehicle.map(({ title }) => (
                            <option key={title} value={title}>
                                {title}
                            </option>
                        ))}
                    </Form.Select>
                </div>
                {/* Tools */}
                <div className="second-child">
                    <h5>Extra Service</h5>
                    {checkList?.map((item, index) => (
                        <div className="flex mb-2" key={index}>
                            <input
                                value={item}
                                type="checkbox"
                                onChange={handleCheck}
                                className="me-2"
                            />
                            <span className={isChecked(item)}>{item}</span>
                        </div>
                    ))}
                </div>
            </Form>
        </div>
    );
};

export default BasicInformation;
