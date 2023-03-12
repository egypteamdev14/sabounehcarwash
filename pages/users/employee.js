/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo, useRef, useState } from "react";
import Button from "@/components/Button";

import { deleteUser, fetchAllUsers } from "@/services/users";

import { useQuery } from "react-query";
import { toast } from "react-toastify";
import AddEmployee from "@/components/Users/Employee/AddEmployee";
import AgGridDT from "@/components/AgGridDT";

import UpdateEmployee from "@/components/Users/Employee/UpdateEmployee";
import { MdOutlineDelete } from "react-icons/md";
import DeleteModal from "@/components/DeleteModal";

const Employee = () => {
    const [gridApi, setGridApi] = useState(null);

    const { data, error, isLoading } = useQuery("getUsers", fetchAllUsers);

    const employee = data?.users?.filter((user) => user.role === "employee");

    const handleDelete = async (id) => {
        console.log(id);
        try {
            await deleteUser(id);
            const filterData = employee?.filter((user) => user._id !== id);
            setUsers(filterData);
            toast.success("User deleted successful");
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    // columns definition
    const columnDefs = [
        {
            headerName: "ID",
            field: "_id",
            maxWidth: 150,
            filterParams: {
                filterOptions: ["startsWith", "contains"],
                defaultOption: "startsWith",
            },
        },
        {
            headerName: "Full Name",
            field: "fullName",
            maxWidth: 150,
            filterParams: {
                filterOptions: ["startsWith", "contains"],
                defaultOption: "startsWith",
            },
        },
        {
            headerName: "Phone Number",
            field: "phoneNumber",
            maxWidth: 150,
            filterParams: {
                filterOptions: ["startsWith", "contains"],
                defaultOption: "startsWith",
            },
        },

        {
            headerName: "Creation of account date",
            field: "createdAt",
            maxWidth: 300,
            filterParams: {
                filterOptions: ["startsWith", "contains"],
                defaultOption: "startsWith",
            },
        },
        {
            headerName: "Last login date",
            field: "lastLogin",
            filterParams: {
                filterOptions: ["startsWith", "contains"],
                defaultOption: "startsWith",
            },
        },
        {
            headerName: "Employee state",
            field: "status",
            maxWidth: 170,
            filterParams: {
                filterOptions: ["startsWith", "contains"],
                defaultOption: "startsWith",
            },
        },
        {
            headerName: "Privilege",
            field: "permissions",
            filterParams: {
                filterOptions: ["startsWith", "contains"],
                defaultOption: "startsWith",
            },
        },
        {
            headerName: "Actions",
            field: "id",
            minWidth: 400,
            sortable: false,
            filter: false,
            floatingFilter: false,
            cellRendererFramework: (params) => (
                <div className="flex gap-4">
                    <UpdateEmployee updateUserInfo={params?.data} />
                    <DeleteModal id={params?.data?._id} />
                </div>
            ),
        },
    ];

    //  default Column Definition
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
    const onBtExport = useCallback(() => {
        gridApi?.api.exportDataAsCsv();
    }, [gridApi?.api]);

    // Row Style
    const getRowStyle = (params) => {
        if (params?.data._id % 2) {
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
        <section className="employee">
            <div className="d-flex justify-content-between align-items-center m-3">
                <h2>Employee List </h2>
                <AddEmployee />
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
                rowData={employee}
                defaultColDef={defaultColDef}
                onGridReady={onGridReady}
                getRowStyle={getRowStyle}
            />
        </section>
    );
};

export default Employee;
