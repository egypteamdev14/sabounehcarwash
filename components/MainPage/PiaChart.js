import React, { useState } from "react";
import Chart from "react-apexcharts";
import { MdOutlineMoreHoriz } from "react-icons/md";

const PiaChart = () => {
    const [series] = useState([60, 45, 41]);
    // const [labels] = useState(["A", "B", "C", "D", "E"]);
    const options = {
        labels: ["Completed Order", "Cancelled order", "Miss order"],
        colors: ["#12B249", "#EB0000", "#FCA712"],
    };

    return (
        <div
            className="pia-chart"
            id="chart"
            style={{ backgroundColor: "#fff" }}
        >
            <div className="analytics flex align-items-center justify-content-between my-4">
                <div className="flex align-items-center gap-2 ">
                    <h5 className="fs-3">Analytics</h5>
                    <p className="fs-6 text-muted">Today</p>
                </div>
                <MdOutlineMoreHoriz />
            </div>

            <Chart
                options={options}
                series={series}
                type={"donut"}
                width={"380"}
            />
        </div>
    );
};

export default PiaChart;
