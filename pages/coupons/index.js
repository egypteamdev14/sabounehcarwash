import AgGridDT from "@/components/AgGridDT";
import Button from "@/components/Button";
import AddCoupon from "@/components/Coupons/AddCoupon";
import UpdateCoupon from "@/components/Coupons/UpdateCoupon";
import { deleteCoupon, getAllCoupons } from "@/services/coupons";
import React, { useCallback, useEffect, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

const Coupons = () => {
  const [gridApi, setGridApi] = useState(null);

  const { data, error, isLoading } = useQuery("addCoupon", getAllCoupons);


  // columns definition
  const columnDefs = [
    { headerName: "ID", field: "_id", maxWidth: 100 },
    { headerName: "Coupon Name", field: "title", maxWidth: 150 },
    // { headerName: "Start Wash date", field: "phoneNumber", maxWidth: 150 },

    { headerName: "Number Of Use", field: "numberOfUse", maxWidth: 150 },
    { headerName: "Discount", field: "discount", maxWidth: 150 },
    {
      headerName: "Created At",
      field: "createdAt",
      // maxWidth: 170,
      valueGetter: (params) =>
        `${params.data.createdAt.split("T")[0]} ${
          params.data.createdAt.split("T")[1].split(".")[0]
        }`,
    },
    {
      headerName: "Updated At ",
      field: "updatedAt",
      valueGetter: (params) =>
        `${params.data.updatedAt.split("T")[0]} ${
          params.data.updatedAt.split("T")[1].split(".")[0]
        }`,
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
          <UpdateCoupon updateCaponInfo={params?.data} />

          <MdOutlineDelete
            style={{ color: "#05A8F5", cursor: "pointer" }}
            fontSize={30}
            onClick={() => handleDelete(params?.data._id)}
          />
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
    // gridApi?.api.exportDataAsExcel();
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



  // delete Coupon
  const handleDelete = async (id) => {
    try {
      await deleteCoupon(id);
      toast.success("Coupon deleted successful");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <section className="orders">
      <div className="d-flex justify-content-between align-items-center m-3">
        <h2> Coupons </h2>

        <AddCoupon />
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
        rowData={data}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        getRowStyle={getRowStyle}
      />
    </section>
  );
};

export default Coupons;
