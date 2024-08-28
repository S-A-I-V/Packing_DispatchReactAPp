import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RedundantTracker.css';

const RedundantTracker = () => {
  const [redundantEntries, setRedundantEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://192.168.27.143:5000/api/redundant-skus')
      .then(response => {
        console.log("Redundant SKUs fetched: ", response.data); 
        setRedundantEntries(response.data);
        setFilteredEntries(response.data);
      })
      .catch(error => console.error('Error fetching redundant SKUs:', error));
  }, []);

  // Handle search filtering
  useEffect(() => {
    const filtered = redundantEntries.filter(entry =>
      entry.skuId.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEntries(filtered);
  }, [searchTerm, redundantEntries]);

  return (
    <div className="redundant-tracker">
      <h2>Redundant SKU Tracker</h2>
      <input
        type="text"
        placeholder="Search by SKU ID"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-input"
      />
      {filteredEntries.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>SKU ID</th>
                <th>Station ID</th>
                <th>Scan Count</th>
                <th>Most Recent Date</th>
                <th>Most Recent Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.skuId}</td>
                  <td>{entry.stationId}</td>
                  <td>{entry.scanCount}</td>
                  <td>{entry.mostRecentDate}</td>
                  <td>{entry.mostRecentTimestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No redundant SKUs found.</p>
      )}
    </div>
  );
};

export default RedundantTracker;
