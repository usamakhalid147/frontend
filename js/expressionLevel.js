// import dom element
import {  expressionLevel_Grid} from './htmlDomElement'
// grid-community code
import { Grid } from 'ag-grid-community';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';

 
// // expression level table function section 9
export function expressionLevel_table_function(){
 
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
        field: 'lncRNA_transcript',
        minWidth: 170,
        checkboxSelection: checkboxSelection,
        headerCheckboxSelection: headerCheckboxSelection,
      },
      { field: 'partnerRNA_gene' },
      { field: 'partnerRNA_transcript' },
      { field: 'direction' },
      { field: 'type' },
      { field: 'distance' },
      { field: 'subtype' },
      { field: 'location' },
      { field: 'ConsistentlyExpressedIn' },
  ];
  
  var autoGroupColumnDef = {
    headerName: 'Group',
    minWidth: 170,
    field: 'lncRNA_transcript',
    valueGetter: (params) => {
      if (params.node.group) {
        return params.node.key;
      } else {
        return params.data[params.colDef.field];
      }
    },
    headerCheckboxSelection: true,
    cellRenderer: 'agGroupCellRenderer',
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
    // debug: true,
    rowSelection: 'multiple',
    rowGroupPanelShow: 'always',
    pivotPanelShow: 'always',
    columnDefs: columnDefs,
    pagination: true,
    autoGroupColumnDef: autoGroupColumnDef,
  };
 
  // setup the grid after the page has finished loading
  document.addEventListener('DOMContentLoaded', function () {
  
  
  
    new Grid( expressionLevel_Grid, gridOptions);

  
    fetch(`${API_URL}/api/v1/express/level`)
      .then((response) => response.json())
      .then((data) => {
     
    
       gridOptions.api.setRowData(data.data)
      });
      
  });

}


  
  
    


