import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './DataEntry.css';

const DataEntry = () => {
  const [formData, setFormData] = useState({
    skuId: '',
    stationId: process.env.REACT_APP_STATION_ID || '1', // Set station ID from environment variable
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const skuInputRef = useRef(null);
  const timer = useRef(null);

  useEffect(() => {
    if (skuInputRef.current) {
      skuInputRef.current.focus();
    }
  }, []);

  const formatDate = (date) => {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  const formatTimestamp = (date) => {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();
    let hours = '' + d.getHours();
    let minutes = '' + d.getMinutes();
    let seconds = '' + d.getSeconds();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hours.length < 2) hours = '0' + hours;
    if (minutes.length < 2) minutes = '0' + minutes;
    if (seconds.length < 2) seconds = '0' + seconds;

    return [year, month, day].join('-') + ' ' + [hours, minutes, seconds].join(':');
  };

  const handleScan = async () => {
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage('');

    const timestamp = formatTimestamp(new Date());
    const dateOfScan = formatDate(new Date());

    const updatedFormData = {
      ...formData,
      dateOfScan,
      timestamp,
    };

    try {
      // Check for redundancy
      const { data } = await axios.get('http://localhost:5000/api/check-duplicate', {
        params: { skuId: formData.skuId, stationId: formData.stationId },
      });

      if (data.isDuplicate) {
        alert('You are scanning a duplicate entry, hand over to shipping incharge');
      }

      // Proceed with submission
      await axios.post('http://localhost:5000/api/data-entry', updatedFormData);
      setSuccessMessage('Data submitted successfully');
      setFormData({
        skuId: '',
        stationId: formData.stationId,
      });
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
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear any previous timer
    clearTimeout(timer.current);

    // Set a new debounce timer
    timer.current = setTimeout(() => {
      if (name === 'skuId' && value) {
        handleScan();
      }
    }, 300); // Adjust the debounce timing as necessary
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
            ref={skuInputRef}
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
