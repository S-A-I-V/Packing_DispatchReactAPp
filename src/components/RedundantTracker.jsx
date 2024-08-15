// src/components/RedundantTracker.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RedundantTracker.css';
import { useRef } from 'react';

const RedundantTracker = () => {
  const [redundantIds, setRedundantIds] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/redundant-skus')
      .then(response => setRedundantIds(response.data))
      .catch(error => console.error('Error fetching redundant SKUs:', error));
  }, []);

  return (
    <div className="redundant-tracker">
      <h2>Redundant SKU Tracker</h2>
      <ul>
        {redundantIds.map((id, index) => (
          <li key={index}>{id}</li>
        ))}
      </ul>
    </div>
  );
};

export default RedundantTracker;
