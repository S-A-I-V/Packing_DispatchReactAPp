import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import './DataTable.css';

const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/data')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const columns = [
    { field: "skuId", headerName: "SKU ID", flex: 1 },
    { field: "dateOfScan", headerName: "Date of Scan", flex: 1 },
    { field: "timestamp", headerName: "Timestamp", flex: 1 },
    { field: "stationId", headerName: "Station ID", flex: 1 },
  ];

  const rows = data.map((row, index) => ({
    id: index,
    skuId: row.skuId,
    dateOfScan: row.dateOfScan,
    timestamp: row.timestamp,
    stationId: row.stationId,
  }));

  return (
    <Box m="20px">
      <h2>Data Table</h2>
      <Box
        m="20px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#1A237E",
            color: "#FFF",
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#E8EAF6",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#1A237E",
            color: "#FFF",
          },
          "& .MuiCheckbox-root": {
            color: "#1A237E",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: "#1A237E",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default DataTable;
