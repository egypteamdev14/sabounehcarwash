/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@/components/Button";
import { deleteUser, fetchAllUsers } from "@/services/users";
import { useSession } from "next-auth/react";
import React, { useCallback, useState } from "react";
import { useQuery } from "react-query";
import AgGridDT from "@/components/AgGridDT";
// // import { toast } from 'react-toastify'
// import AddNewCustomer from '@/components/Users/Customer/AddNewCustomer'
// import UpdateCustomer from '@/components/Users/Customer/UpdateCustomer'
import { MdOutlineDelete } from "react-icons/md";

// import { AgGridReact } from "ag-grid-react";

import { toast } from "react-toastify";
import AddNewCustomer from "@/components/Users/Customer/AddNewCustomer";
import UpdateCustomer from "@/components/Users/Customer/UpdateCustomer";

const Customers = () => {
    const [gridApi, setGridApi] = useState(null);
    const { data: session, status } = useSession();

    const { data, error, isLoading } = useQuery("getUsers", fetchAllUsers);

    const users = data?.users?.filter((user) => user.role === "user");

    // columns definition
    const columnDefs = [
        { headerName: "ID", field: "_id", maxWidth: 150 },
        { headerName: "Full Name", field: "fullName", maxWidth: 150 },
        { headerName: "Phone Number", field: "phoneNumber", maxWidth: 150 },

        {
            headerName: "Creation of account date",
            field: "createdAt",
            maxWidth: 300,
        },
        { headerName: "Last login date", field: "lastLogin" },
        {
            headerName: "Employee state",
            field: "status",
            maxWidth: 170,
            valueGetter: (params) =>
                params.data.lastLogin ? params.data.lastLogin : "Not Add Yet",
        },
        {
            headerName: "Privilege",
            field: "permissions",
            valueGetter: (params) =>
                params.data.permissions
                    ? params.data.permissions
                    : "Not Add Yet",
        },
        {
            headerName: "Actions",
            field: "id",
            minWidth: 300,
            sortable: false,
            filter: false,
            floatingFilter: false,
            cellRendererFramework: (params) => (
                <div className="flex gap-4">
                    <UpdateCustomer updateUserInfo={params?.data} />

                    {/* <MdOutlineDelete style={{ color: "#05A8F5", cursor: "pointer" }} fontSize={30} onClick={() => handleDelete(params?.data?._id)} /> */}
                    <Button
                        style={{ marginLeft: "20px" }}
                        bg={"#05A8F5"}
                        color={"#ffffff"}
                        width={"130px"}
                        height={"35px"}
                        radius={"8px"}
                        fontSize={"1rem"}
                        onClick={() => handleDelete(params?.data?._id)}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    const defaultColDef = {
        sortable: true,
        flex: 1,
        filter: true,
        floatingFilter: true,
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
                backgroundColor: "#FFE7D9",
                color: "#7A0C2E",
            };
        } else {
            return {
                backgroundColor: "#e0e0e0",
                color: "#001C29",
            };
        }
    };
    // delete user
    const handleDelete = async (id) => {
        try {
            await deleteUser(id);

            const filterData = users?.filter((user) => user._id !== id);
            // setUsers(filterData);
            toast.success("User deleted successful");
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    return (
        <section className="customers">
            <div className="d-flex justify-content-between align-items-center m-3">
                <h2>Customer List </h2>
                <AddNewCustomer />
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
                rowData={users}
                defaultColDef={defaultColDef}
                onGridReady={onGridReady}
                getRowStyle={getRowStyle}
            />
        </section>
    );
};

export default Customers;
