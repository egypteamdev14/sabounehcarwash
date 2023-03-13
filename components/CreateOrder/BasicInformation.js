import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Stepper } from "react-form-stepper";

const BasicInformation = () => {
    const [checked, setChecked] = useState([]);
    const checkList = ["Tool one", "Tool Two", "Tool Three", "Tool Four"];

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
        <div className="m-5">
            <Form>
                {/* Vehicle Type */}
                <h6>Vehicle Type</h6>
                <Form.Select
                    className="mb-3 mt-3"
                    aria-label="Default select example"
                    name="vehicleType"
                    required
                    onChange={(e) => handelChange(e)}
                >
                    <option>Vehicle Type</option>
                    <option value="car">Car</option>
                    <option value="motorcycle">Motorcycle</option>
                </Form.Select>
                {/* Type of Subscription */}
                <h6>Type of Subscription</h6>
                <Form.Select
                    className="mb-3"
                    aria-label="Default select example"
                    name="TypeofSubscription"
                    required
                    onChange={(e) => handelChange(e)}
                >
                    <option>Type of Subscription</option>
                    <option value="Full-Car Wash">Full-Car Wash</option>
                    <option value="plus">plus</option>
                    <option value="Lite">Lite</option>
                </Form.Select>

                {checkList.map((item, index) => (
                    <div key={index}>
                        <input
                            value={item}
                            type="checkbox"
                            onChange={handleCheck}
                        />
                        <span className={isChecked(item)}>{item}</span>
                    </div>
                ))}
            </Form>
        </div>
    );
};

export default BasicInformation;
