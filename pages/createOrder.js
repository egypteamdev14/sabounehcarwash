import BasicInformation from "@/components/CreateOrder/BasicInformation";
import DateOfOrder from "@/components/CreateOrder/DateOfOrder";
import Location from "@/components/CreateOrder/Location";
import PaymentMethod from "@/components/CreateOrder/PaymentMethod";
import React from "react";
import StepProgressBar from "react-step-progress";
// import the stylesheet
import "react-step-progress/dist/index.css";

const CreateOrder = () => {
    // setup the step content

    return (
        <div className="create-order">
            <StepProgressBar
                startingStep={0}
                // onSubmit={onFormSubmit}
                steps={[
                    {
                        label: "Information",
                        subtitle: "25%",
                        name: "Information",
                        content: <BasicInformation />,
                    },
                    {
                        label: "Location",
                        subtitle: "50%",
                        name: "Location",
                        content: <Location />,
                        // validator: step2Validator,
                    },
                    {
                        label: "Date",
                        subtitle: "75%",
                        name: "Date",
                        content: <DateOfOrder />,
                        // validator: step3Validator,
                    },
                    {
                        label: "PaymentMethod",
                        subtitle: "75%",
                        name: "PaymentMethod",
                        content: <PaymentMethod />,
                        // validator: step3Validator,
                    },
                ]}
            />
        </div>
    );
};

export default CreateOrder;
