/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo, useRef, useState } from "react";
import Button from "@/components/Button";
import AddUserPopUp from "@/components/Users/Employee/UpdateEmployee";
import UpdateUserPopUp from "@/components/Users/UpdateUserPopUp";
import { deleteUser, fetchAllUsers } from "@/services/users";
import { getAllOrders } from "@/services/orders";
import { useSession } from "next-auth/react";
import { Table } from "react-bootstrap";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import AddEmployee from "@/components/Users/Employee/AddEmployee";
import AgGridDT from "@/components/AgGridDT";
import { AgGridReact } from "ag-grid-react";
import UpdateEmployee from "@/components/Users/Employee/UpdateEmployee";

const Orders = () => {
  const [gridApi, setGridApi] = useState(null);

  const { data, error, isLoading } = useQuery("getOrders", getAllOrders);
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
    { headerName: "ID", field: "_id", maxWidth: 150 },
    { headerName: "Full Name", field: "user.fullName", maxWidth: 150 },

    {
      headerName: "Creation of account date",
      field: "createdAt",
      maxWidth: 300,
    },
    { headerName: "Last login date", field: "lastLogin" },
    { headerName: "Order Id", field: "orderId", maxWidth: 170 },
    { headerName: "Date", field: "date" },
    { headerName: "Payement Method", field: "paymentMethod" },
    { headerName: "Status", field: "status" },
    {
      headerName: "Actions",
      field: "id",
      minWidth: 400,
      sortable: false,
      filter: false,
      floatingFilter: false,
      cellRendererFramework: (params) => (
        <div>
          <UpdateEmployee updateUserInfo={params?.data} />
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

  return (
    <section className="employee">
      <div className="d-flex justify-content-between align-items-center m-3">
        <h2>Orders List </h2>
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
        rowData={data?.orders}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        getRowStyle={getRowStyle}
      />
    </section>
  );
};

export default Orders;

{
  /* <AgGridReact 
			  rowData={employee}
				columnDefs={columnDefs}
				defaultColDef={defaultColDef}
				onGridReady={onGridReady}
			  rowHeight={"auto"}

			/> */
}

{
  /* <Table striped bordered hover>
				<thead>
					<tr>
						<th>#ID</th>
						<th>Full Name</th>
						<th>Phone Number</th>
						<th style={{ width: "20%" }}>Creation of account date</th>
						<th >last login date</th>
						<th >employee state</th>
						<th >Privilege</th>
						<th>Delete</th>
						<th>Update</th>
					</tr>
				</thead>
				<tbody>
					{isLoading && <tr className='fs-3 p-4'>Loading</tr>}
					{employee?.map((user) => (

						<tr key={user._id}>
							<td>{user._id.slice(0, 8)}</td>
							<td>{user.fullName}</td>
							<td>{user.phoneNumber}</td>
							<td >{user.createdAt}</td>
							<td >{user.lastLogin}</td>
							<td >{user.status}</td>
							<td >{user.permissions}</td>
							
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
			</Table> */
}
