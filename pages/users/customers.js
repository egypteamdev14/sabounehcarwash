/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@/components/Button";
import AddUserPopUp from "@/components/Users/Employee/UpdateEmployee";
import UpdateUserPopUp from "@/components/Users/UpdateUserPopUp";
import { deleteUser, fetchAllUsers } from "@/services/users";
import { useSession } from "next-auth/react";
import React, { useCallback, useState } from "react";
import { Table } from "react-bootstrap";
import { useQuery } from "react-query";

import { AgGridReact } from "ag-grid-react";
import AgGridDT from "@/components/AgGridDT";
import { toast } from "react-toastify";
import AddNewCustomer from "@/components/Users/Customer/AddNewCustomer";
import UpdateCustomer from "@/components/Users/Customer/UpdateCustomer";

const Customers = () => {
  const [gridApi, setGridApi] = useState(null);
  const { data: session, status } = useSession();

  const { data, error, isLoading } = useQuery("getUsers", fetchAllUsers);

  const users = data?.users.filter((user) => user.role === "user");

  // console.log(users)

  // console.log(data?.users)

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
    { headerName: "Employee state", field: "status", maxWidth: 170 },
    { headerName: "Privilege", field: "permissions" },
    {
      headerName: "Actions",
      field: "id",
      minWidth: 400,
      sortable: false,
      filter: false,
      floatingFilter: false,
      cellRendererFramework: (params) => (
        <div>
          {console.log(params.data)}
          <UpdateCustomer updateUserInfo={params?.data} />
          <Button
            style={{ marginLeft: "20px" }}
            bg={"#05A8F5"}
            color={"#ffffff"}
            width={"130px"}
            height={"35px"}
            radius={"8px"}
            fontSize={"1rem"}
            onClick={() => {
              handleDelete(params?.data?._id), console.log(params?.data?._id);
            }}
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
        backgroundColor: "#DFDFDF",
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
      {/* <Table striped bordered hover>
				<thead>
					<tr>
						<th>#ID</th>
						<th>Full Name</th>
						<th>Phone Number</th>
						<th style={{ width: "20%" }}>Creation of account date</th>
						<th >last login date</th>
						<th >employee state</th>
						<th>Delete</th>
						<th>Update</th>
					</tr>
				</thead>
				<tbody>
					{isLoading && <tr className='fs-3 p-4'>Loading</tr>}
					{users?.map((user) => (

						<tr key={user._id}>
							<td>{user._id.slice(0, 8)}</td>
							<td>{user.fullName}</td>
							<td>{user.phoneNumber}</td>
							<td >{user.role}</td>
							<td >{user.lastLogin}</td>
							<td >{user.status}</td>

							<td>
								<Button
									bg={"#05A8F5"}
									color={"#ffffff"}
									width={"130px"}
									height={"35px"}
									radius={"8px"}
									fontSize={"1rem"}
									onClick={() => handleDelete(user._id)}
								>Delete</Button> </td>
							<td>
								<UpdateUserPopUp id={user._id} />
							</td>
						</tr>
					))}

				</tbody>
			</Table> */}

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
