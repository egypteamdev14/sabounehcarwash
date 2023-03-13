import React from "react";

const DateOfOrder = () => {
    const daysOfTheWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const dateOfOrder = new Date();
    const todayName = daysOfTheWeek[dateOfOrder.getDay()];
    const todayNumber = String(dateOfOrder.getDate()).padStart(2, "0");
    const tomorrowName = daysOfTheWeek[dateOfOrder.getDay() + 1];
    const tomorrowNumber = String(dateOfOrder.getDate() + 1).padStart(2, "0");
    const afterTomorrowName = daysOfTheWeek[dateOfOrder.getDay() + 2];

    const afterTomorrowNumber = String(dateOfOrder.getDate() + 2).padStart(
        2,
        "0"
    );

    // console.log(todayNumber, tomorrowName, afterTomorrowName);

    return (
        <div className="date">
            <h3>Date</h3>
            <p>Select Available Date</p>

            <div className="date-container">
                <div>
                    <h5>{todayNumber}</h5>
                    <p>{todayName}</p>
                </div>
                <div>
                    <h5>{tomorrowNumber}</h5>
                    <p>{tomorrowName}</p>
                </div>
                <div>
                    <h5>{afterTomorrowNumber}</h5>
                    <p>{afterTomorrowName}</p>
                </div>
            </div>
        </div>
    );
};

export default DateOfOrder;
