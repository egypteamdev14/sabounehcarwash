import { useState, useEffect } from "react";
//Ag grid
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles//ag-theme-alpine.css";
// import "ag-grid-community/dist/styles//ag-theme-alpine-dark.css";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFileExcel, faFilePdf } from "@fortawesome/free-solid-svg-icons";
// import PDFExportPanel from "./pdfExport/PDFExportPanel";
import { Button, Modal, Dropdown } from "react-bootstrap";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import axios from "axios";
import { Loader } from "./Loader";
// import Spinner from "components/UI/Spinner";
// import { convertJsonToExcel } from "helpers/helpers";

// const PDFExportPanel = dynamic(() => import("./pdfExport/PDFExportPanel"), {
//   ssr: false,
// });

const AgGridDT = ({
  columnDefs,
  rowData,
  onFirstDataRendered,
  rowHeight,
  onSelectionChanged,
  paginationPageSize,
  paginationNumberFormatter,
  defaultColDef,
  onGridReady,
  suppressMenuHide,
  onCellMouseOver,
  onCellMouseOut,
  overlayNoRowsTemplate,
  suppressExcelExport,
  getRowStyle,
  autoSize,
  suppressSizeToFit,
  gridApi,
  getWholeReportApi,
  gridColumnApi,
  Height,
  rowSelection,
  footer = true,
  onCellEditRequest,
  readOnlyEdit,
  animateRows,
  onCellValueChanged,
  onPaginationChanged,
  enableCellChangeFlash,
  loadingOverlayComponent,
  overlayLoadingTemplate,
  suppressPaginationPanel,
  rowMultiSelectWithClick,
  loading,
  getRowClass,
  ref,
}) => {
  const router = useRouter();
  const { t } = useTranslation("main");
  // const [openBtnsExportsModel, setOpenBtnsExportsModel] = useState(false);
  const { locale } = router;

  // const onBtnExport = () => {
  //   convertJsonToExcel(rowData ?? [], "AgGrid Data");
  //   addStyle()
  // }

  // const handleOpenBtnsExportsModel = () => {
  //   setOpenBtnsExportsModel(true);
  //   setBorderTwo(true);
  //   setTimeout(() => {
  //     setBorderTwo(false);
  //   }, 2000);
  // };

  useEffect(() => {
    if (gridApi) {
      const dataSource = {
        getRows: (params) => params.successCallback(rowData, rowData.length),
      };
      gridApi.setDatasource(dataSource);
    }
  }, [gridApi, rowData]);

  return (
    <div
      className={`ag-theme-alpine ag-grid-style`}
      style={{ height: Height || "" }}
    >
      <AgGridReact
        rowMultiSelectWithClick={rowMultiSelectWithClick || false}
        rowHeight={rowHeight || 65}
        enableRtl={locale == "ar" ? true : false}
        columnDefs={columnDefs}
        rowData={rowData}
        rowSelection={rowSelection || "multiple"}
        onSelectionChanged={onSelectionChanged || null}
        onCellMouseOver={onCellMouseOver || null}
        onCellMouseOut={onCellMouseOut || null}
        pagination={true}
        autoSize={autoSize || false}
        domLayout={"autoHeight"}
        suppressExcelExport={suppressExcelExport || true}
        cacheBlockSize={paginationPageSize || 10}
        paginationPageSize={paginationPageSize || 10}
        paginationNumberFormatter={paginationNumberFormatter || null}
        onFirstDataRendered={onFirstDataRendered || null}
        defaultColDef={defaultColDef || null}
        onGridReady={onGridReady || null}
        overlayNoRowsTemplate={
          overlayNoRowsTemplate || t("no_rows_to_show_key")
        }
        overlayLoadingTemplate={overlayLoadingTemplate || ""}
        suppressMenuHide={suppressMenuHide || true}
        getRowStyle={getRowStyle || null}
        readOnlyEdit={readOnlyEdit || null}
        onCellEditRequest={onCellEditRequest || null}
        onCellValueChanged={onCellValueChanged || null}
        onPaginationChanged={onPaginationChanged || null}
        animateRows={animateRows || null}
        enableCellChangeFlash={enableCellChangeFlash || null}
        suppressSizeToFit={suppressSizeToFit || false}
        loadingOverlayComponent={loadingOverlayComponent || Loader}
        suppressPaginationPanel={suppressPaginationPanel || false}
        getRowClass={getRowClass || ""}
        ref={ref}
      />
    </div>
  );
};
export default AgGridDT;
