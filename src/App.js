import React, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import './App.scss';

const App = () => {
  // const [gridApi, setGridApi] = useState(null);
  // const [gridColumnApi, setGridColumnApi] = useState(null);

  // const [rowData, setRowData] = useState([
  //     {make: "Toyota", model: "Celica", price: 35000},
  //     {make: "Ford", model: "Mondeo", price: 32000},
  //     {make: "Porsche", model: "Boxter", price: 72000}
  // ]);

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/sample-data/rowData.json')
    .then(result => result.json())
    .then(rowData => setRowData(rowData))
  }, []);

  return (
    <div className="App">
      <h1>Crpyto Screener</h1>
      <div className="ag-theme-material" style={ { height: 400, width: 600 } }>
      <AgGridReact
        rowData={rowData}>
        <AgGridColumn field="make" sortable={true} filter={true}></AgGridColumn>
        <AgGridColumn field="price" sortable={true} filter={true}></AgGridColumn>
        <AgGridColumn field="model" sortable={true} filter={true}></AgGridColumn>
      </AgGridReact>
    </div>
    </div>
  );
};

export default App;
