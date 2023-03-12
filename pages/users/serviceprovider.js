import Button from "@/components/Button";
// import AddUserPopUp from '@/components/Users/Employee/UpdateEmployee'
import AddWasher from "@/components/Users/Washer/AddWasher";

import UpdateWasher from "@/components/Users/Washer/UpdateWasher";
import { deleteUser, getAllWasher } from "@/services/users";
// import { useSession } from 'next-auth/react'
import React, { useMemo, useState } from "react";

import { useQuery } from "react-query";
import AgGridDT from "@/components/AgGridDT";
import { MdOutlineDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import DeleteModal from "@/components/DeleteModal";

const ServiceProvider = () => {
  const [gridApi, setGridApi] = useState(null);
  // const { data: session, status } = useSession();
  // const [washerData, setWasherData] = useState([])

  const { data, error, isLoading } = useQuery("getUsers", getAllWasher);
  const randomValueGetter = (params) => {
    if (params.data.orderStatus) return params.data.orderStatus;
    else {
      return "NOT ASSIGNED";
    }
  };
  const delpopup = () => {
    setshow((prev) => !prev);
  };
  // columns definition
  const columnDefs = useMemo(
    () => [
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
        maxWidth: 350,
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
        headerName: "Washer state",
        field: "sysStatus",
        maxWidth: 170,
        filterParams: {
          filterOptions: ["startsWith", "contains"],
          defaultOption: "startsWith",
        },
      },
      {
        headerName: "Order State",
        field: "orderStatus",
        valueGetter: randomValueGetter,
        filterParams: {
          filterOptions: ["startsWith", "contains"],
          defaultOption: "startsWith",
        },
      },
      {
        headerName: "Rating Average",
        field: "ratingAverage",
        filterParams: {
          filterOptions: ["startsWith", "contains"],
          defaultOption: "startsWith",
        },
      },
      {
        headerName: "Main Tools",
        field: "tools",
        filterParams: {
          filterOptions: ["startsWith", "contains"],
          defaultOption: "startsWith",
        },
      },
      {
        headerName: "Actions",
        field: "id",
        minWidth: 200,
        sortable: false,
        filter: false,
        floatingFilter: false,
        cellRendererParams: {},

        cellRenderer: (params) => (
          <div className="flex gap-4">
            {console.log(params)}
            <UpdateWasher updateWasherData={params?.data} />
            <DeleteModal id={params?.data?._id} />
          </div>
        ),
      },
    ],
    []
  );
  const gridOptions = {
    // callback tells the grid to use the 'id' attribute for IDs, IDs should always be strings
    getRowId: (params) => params.data.id,

    // other grid options ...
  };
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
        backgroundColor: "#fff",
        color: "#06152B",
      };
    } else {
      return {
        backgroundColor: "#Fff",
        color: "#001C29",
      };
    }
  };

  // delete user
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);

      toast.success("User deleted successful");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <section className="service-provider">
      <div className="d-flex justify-content-between align-items-center m-3">
        <h2>Washer List </h2>
        {/* <AddWasher /> */}
        <UpdateWasher />
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
        frameworkComponents={{}}
        columnDefs={columnDefs}
        rowData={data?.washer}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        getRowStyle={getRowStyle}
      />
    </section>
  );
};

export default ServiceProvider;
