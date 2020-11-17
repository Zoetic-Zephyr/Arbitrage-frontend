import React, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import './App.scss';


const App = () => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    // fetch('https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/sample-data/rowData.json')
    setInterval(() => {
      fetch('http://localhost:5000/get_data')
      .then(result => result.json())
      .then(rowData => setRowData(rowData))
    }, 10000)
  }, []);

  const ShowIconRenderer = props => {
    const createImgSource = (value) => {
      const source = "https://s3-symbol-logo.tradingview.com/crypto/XTVC" + value + ".svg";
      return source;
    };
    return <span><img src={createImgSource(props.value)} alt="crypto-icon"></img> {props.value}</span>;
  };

  return (
    <div className="App">
      <h1 className="title">Crpyto Screener</h1>
      <div className="ag-theme-material" style={ { height: 640, width: 400 } }>
      <AgGridReact
        rowData={rowData}
        defaultColDef={ { sortable: true, filter: true, flex: 1 } }
        frameworkComponents={ { showIconRenderer: ShowIconRenderer } }  
      >
        <AgGridColumn field="base" cellRenderer="showIconRenderer"></AgGridColumn>
        <AgGridColumn field="value"></AgGridColumn>
        <AgGridColumn field="exchange"></AgGridColumn>
      </AgGridReact>
      </div>
    </div>
  );
};

export default App;
