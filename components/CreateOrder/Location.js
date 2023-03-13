import React from "react";

const Location = () => {
    return (
        <div className="m-5">
            <h4>Location</h4>
            <p>Pick Order Location</p>

            <h5>Choose Washing Address</h5>
            <div>
                <input
                    type="radio"
                    id="Home Location"
                    name="Location"
                    value="Home Location"
                    checked
                />
                <label htmlFor="Home Location">Home Location</label>
            </div>

            <div>
                <input
                    type="radio"
                    id="Office Location"
                    name="Location"
                    value="Office Location"
                />
                <label htmlFor="Office Location">Office Location</label>
            </div>
        </div>
    );
};

export default Location;
