// src/components/DataEntry.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './DataEntry.css';

const DataEntry = () => {
  const [formData, setFormData] = useState({
    skuId: '',
    stationId: '', 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const scannerId = 'A'; 

  // Create a ref for the SKU ID input field
  const skuInputRef = useRef(null);

  useEffect(() => {
    // Automatically focus the SKU ID input field when the component mounts
    if (skuInputRef.current) {
      skuInputRef.current.focus();
    }
  }, []);

  const determineStationId = (scannerId) => {
    switch (scannerId) {
      case '1':
        return '1';
      case '2':
        return '2';
      case '3':
        return '3';
      case '4':
        return '4';
      case '5':
        return '5';
      case '6':
        return '6';
      case '7':
        return '7';
      case '8':
        return '8';
      case '9':
        return '9';
      case '10':
        return '10';
      case '11':
        return '11';
      case '12':
        return '12';
      case '13':
        return '13';
      case '14':
        return '14';
      default:
        return 'Unknown';
    }
  };

  const formatDate = (date) => {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  const formatTimestamp = (date) => {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();
    let hours = '' + d.getHours();
    let minutes = '' + d.getMinutes();
    let seconds = '' + d.getSeconds();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    if (hours.length < 2) 
        hours = '0' + hours;
    if (minutes.length < 2) 
        minutes = '0' + minutes;
    if (seconds.length < 2) 
        seconds = '0' + seconds;

    return [year, month, day].join('-') + ' ' + [hours, minutes, seconds].join(':');
  }

  const handleScan = async () => {
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage('');

    const timestamp = formatTimestamp(new Date());
    const dateOfScan = formatDate(new Date());

    const updatedFormData = {
      ...formData,
      stationId: determineStationId(scannerId),
      dateOfScan,
      timestamp
    };

    try {
      await axios.post('http://localhost:5000/api/data-entry', updatedFormData);
      setSuccessMessage('Data submitted successfully');
      setFormData({
        skuId: '',
        stationId: '',
      });
      // Re-focus the SKU ID input field after submission
      if (skuInputRef.current) {
        skuInputRef.current.focus();
      }
    } catch (error) {
      setError('There was an error submitting the data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Automatically submit the form when SKU ID is filled
    if (name === 'skuId' && value) {
      handleScan();
    }
  };

  return (
    <div className="data-entry">
      <h2>Data Entry</h2>
      <form>
        <div className="form-group">
          <label htmlFor="skuId">Scan SKU ID</label>
          <input
            type="text"
            id="skuId"
            name="skuId"
            value={formData.skuId}
            onChange={handleChange}
            placeholder="Scan SKU ID"
            required
            autoFocus
            ref={skuInputRef} // Attach the ref to the input field
          />
        </div>
        <div className="form-group">
          <label htmlFor="stationId">Station ID</label>
          <input
            type="text"
            id="stationId"
            name="stationId"
            value={formData.stationId}
            placeholder="Station ID"
            readOnly 
          />
        </div>
      </form>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};

export default DataEntry;
