import AgGridDT from "@/components/AgGridDT";
import Button from "@/components/Button";
import { getAllOrders } from "@/services/orders";

import React, { useEffect, useState } from "react";

import { useQuery } from "react-query";

const Orders = () => {
    const [gridApi, setGridApi] = useState(null);
    //  const [orderData, setOrderData]= useState([]);

    const { data, error, isLoading } = useQuery("getOrders", getAllOrders,{
        refetchInterval: 3000,
      });

    console.log(data);

    // columns definition
    const columnDefs = [
        { headerName: "ID", field: "orderId", maxWidth: 100 },
        { headerName: "Created date", field: "createdAt", maxWidth: 150 },
        // { headerName: "Start Wash date", field: "phoneNumber", maxWidth: 150 },

        { headerName: "Order State", field: "status", maxWidth: 300 },
        {
            headerName: "Customer Name",
            field: "user.fullName",

            valueGetter: (params) =>
                params.data?.user?.fullName ? (
                    params.data?.user?.fullName
                ) : (
                    <p className="text-danger">Not Assigned Yet</p>
                ),
        },
        {
            headerName: "Washer Name",
            field: "sysProvider.fullName",
            maxWidth: 170,
            valueGetter: (params) =>
                params.data?.sysProvider?.fullName
                    ? params.data?.sysProvider?.fullName
                    : "Not Assigned Yet",
        },
        {
            headerName: "Service type ",
            field: "subscriptionId.title",
            valueGetter: (params) =>
                params.data.subscriptionId?.title
                    ? params.data.subscriptionId?.title
                    : "Not Assigned",
        },
        {
            headerName: "Vehicle type ",
            field: "vehicleId.title",
            valueGetter: (params) =>
                params.data?.vehicleId?.title
                    ? params.data?.vehicleId?.title
                    : "Not Assigned",
        },
        { headerName: "Payment Method ", field: "paymentMethod" },
    ];
    const defaultColDef = {
        sortable: true,
        flex: 1,
        filter: true,
        floatingFilter: true,
        alwaysShowHorizontalScroll: true,
    };

    //  init
    const onGridReady = (params) => {
        setGridApi(params);
    };

    // Export Excel
    const onBtExport = () => {
        gridApi?.api.exportDataAsCsv();
    };

    // Row Style
    const getRowStyle = (params) => {
        if (params.data._id % 2) {
            return {
                backgroundColor: "#fff",
                color: "#7A0C2E",
            };
        } else {
            return {
                backgroundColor: "#fff",
                color: "#001C29",
            };
        }
    };

    return (
        <section className="orders">
            <div className="d-flex justify-content-between align-items-center m-3">
                <h2> Order list </h2>
            </div>

            <Button
                onClick={onBtExport}
                bg={"#05A8F5"}
                color={"#ffffff"}
                width={"130px"}
                height={"35px"}
                radius={"8px"}
                fontSize={"1rem"}
                cl={"mt-2 mb-3"}
            >
                Export to Excel
            </Button>

            <AgGridDT
                columnDefs={columnDefs}
                rowData={data?.orders}
                defaultColDef={defaultColDef}
                onGridReady={onGridReady}
                getRowStyle={getRowStyle}
            />
        </section>
    );
};
export default Orders;
