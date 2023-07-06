// import dom element
import { egridDiv } from "./htmlDomElement";
// grid-community code
import { Grid } from "ag-grid-community";
import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles//ag-theme-alpine.css";

// gencode table function section 2
export function gencode_table_function() {
  var checkboxSelection = function (params) {
    // we put checkbox on the name if we are not doing grouping
    return params.columnApi.getRowGroupColumns().length === 0;
  };
  var headerCheckboxSelection = function (params) {
    // we put checkbox on the name if we are not doing grouping
    return params.columnApi.getRowGroupColumns().length === 0;
  };
  const columnDefs = [
    {
      field: "Assembled_Transcript_ID",
      minWidth: 170,
      checkboxSelection: checkboxSelection,
      headerCheckboxSelection: headerCheckboxSelection,
    },
    { field: "Annotated_Gene_ID" },
    { field: "Annotated_TranscriptID" },
    { field: "Gene_Type" },
    { field: "Transcript_Type" },
  ];

  var autoGroupColumnDef = {
    headerName: "Group",
    minWidth: 170,
    field: "Assembled_Transcript_ID",
    valueGetter: (params) => {
      if (params.node.group) {
        return params.node.key;
      } else {
        return params.data[params.colDef.field];
      }
    },
    headerCheckboxSelection: true,
    cellRenderer: "agGroupCellRenderer",
    cellRendererParams: {
      checkbox: true,
    },
  };

  const gridOptions = {
    defaultColDef: {
      editable: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 100,
    },
    suppressRowClickSelection: true,
    groupSelectsChildren: true,

    rowSelection: "multiple",
    rowGroupPanelShow: "always",
    pivotPanelShow: "always",
    columnDefs: columnDefs,
    pagination: true,
    autoGroupColumnDef: autoGroupColumnDef,
  };

  // setup the grid after the page has finished loading
  document.addEventListener("DOMContentLoaded", function () {
    new Grid(egridDiv, gridOptions);

    fetch(`${API_URL}/api/v1/gen/code/annotated`)
      .then((response) => response.json())
      .then((data) => {
        gridOptions.api.setRowData(data.data);
      });
  });
}
