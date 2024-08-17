// src/components/DataTable.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DataTable.css';

const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/data')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="data-table">
      <h2>Data Table</h2>
      <table>
        <thead>
          <tr>
            <th>SKU ID</th>
            <th>Date of Scan</th>
            <th>Timestamp</th>
            <th>Station ID</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.skuId}</td>
              <td>{row.dateOfScan}</td>
              <td>{row.timestamp}</td>
              <td>{row.stationId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
