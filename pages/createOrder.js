import BasicInformation from "@/components/CreateOrder/BasicInformation";
import Location from "@/components/CreateOrder/Location";
import React from "react";
import StepProgressBar from "react-step-progress";
// import the stylesheet
import "react-step-progress/dist/index.css";

const CreateOrder = () => {
    // setup the step content

    return (
        <div className="create-order">
            <StepProgressBar
                startingStep={1}
                // onSubmit={onFormSubmit}
                steps={[
                    {
                        label: "Basic Information",
                        subtitle: "10%",
                        name: "Basic Information",
                        content: <BasicInformation />,
                    },
                    {
                        label: "Step 2",
                        subtitle: "50%",
                        name: "step 2",
                        content: <Location />,
                        // validator: step2Validator,
                    },
                    {
                        label: "Step 3",
                        subtitle: "100%",
                        name: "step 3",
                        content: BasicInformation,
                        // validator: step3Validator,
                    },
                ]}
            />
        </div>
    );
};

export default CreateOrder;
