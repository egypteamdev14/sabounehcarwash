/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@/components/Button";
import { deleteUser, fetchAllUsers } from "@/services/users";
import { useSession } from "next-auth/react";
import React, { useCallback, useState } from "react";
import { useQuery } from "react-query";
// // import { toast } from 'react-toastify'
// import AddNewCustomer from '@/components/Users/Customer/AddNewCustomer'
// import UpdateCustomer from '@/components/Users/Customer/UpdateCustomer'
import { MdOutlineDelete } from "react-icons/md";

// import { AgGridReact } from "ag-grid-react";

import { toast } from "react-toastify";
import AddNewCustomer from "@/components/Users/Customer/AddNewCustomer";
import UpdateCustomer from "@/components/Users/Customer/UpdateCustomer";
import DeleteModal from "@/components/DeleteModal";
import AgGridDT from "@/components/AgGridDT";

const Customers = () => {
  const [gridApi, setGridApi] = useState(null);
  const { data: session, status } = useSession();

  const { data, error, isLoading } = useQuery("getUsers", fetchAllUsers);

  const users = data?.users?.filter((user) => user.role === "user");

  // columns definition
  const columnDefs = [
    {
      checkboxSelection: true,
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
    { headerName: "Last login date", field: "lastLogin" },
    {
      headerName: "Employee state",
      field: "status",
      maxWidth: 170,
      filterParams: {
        filterOptions: ["startsWith", "contains"],
        defaultOption: "startsWith",
      },
      valueGetter: (params) =>
        params.data.lastLogin ? params.data.lastLogin : "Not Add Yet",
    },
    {
      headerName: "Privilege",
      field: "permissions",
      filterParams: {
        filterOptions: ["startsWith", "contains"],
        defaultOption: "startsWith",
      },
      valueGetter: (params) =>
        params.data.permissions ? params.data.permissions : "Not Add Yet",
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
          <DeleteModal id={params?.data._id} />
        </div>
      ),
    },
  ];

  const gridOptions = {
    defaultColDef: {
      sortable: true,
      filter: true,
      resizable: true,
      minWidth: 100,
      flex: 1,
    },
  };

  //  init
  const onGridReady = (params) => {
    setGridApi(params);
    document.getElementById("selectedOnly").checked = true;
  };

  // Export Excel
  const onBtExport = useCallback(() => {
    gridApi?.api.exportDataAsCsv({
      onlySelected: document.querySelector("#selectedOnly").checked,
    });
  }, []);
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
      <label className="option" htmlFor="selectedOnly" style={{marginRight:"20px"}}>
        <input id="selectedOnly" type="checkbox" style={{marginRight:"5px"}}/>
        Selected Rows Only
      </label>
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
        onlySelected={true}
        columnDefs={columnDefs}
        rowData={users}
        defaultColDef={gridOptions.defaultColDef}
        onGridReady={onGridReady}
        getRowStyle={getRowStyle}
      />
    </section>
  );
};

export default Customers;
