import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './DataEntry.css';

const DataEntry = () => {
  const [formData, setFormData] = useState({
    skuId: '',
    stationId: process.env.REACT_APP_STATION_ID || '', 
    nexsId: process.env.REACT_APP_NEXS_ID || '00000001', 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const skuInputRef = useRef(null);

  useEffect(() => {
    if (skuInputRef.current) {
      skuInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (formData.skuId.length === 20) {
      handleScan();
    }
  }, [formData.skuId]);

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
    if (formData.skuId.length === 20) {
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
        const { data } = await axios.get('http://192.168.27.143:5000/api/check-duplicate', {
          params: { skuId: formData.skuId, stationId: formData.stationId },
        });

        if (data.isDuplicate) {
          alert('You are scanning a duplicate entry, hand over to shipping incharge');
        }

        await axios.post('http://192.168.27.143:5000/api/data-entry', updatedFormData);
        setSuccessMessage('Data submitted successfully');
        setFormData({
          skuId: '',
          stationId: formData.stationId,
          nexsId: formData.nexsId,
        });
        if (skuInputRef.current) {
          skuInputRef.current.focus();
        }
      } catch (error) {
        setError('There was an error submitting the data. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setError('SKU ID must be exactly 20 characters.');
    }
  };

  const isValidStationId = (stationId) => {
    const validP = /^P0([0-1][0-9]|20)$/; // Matches P001 - P020
    const validF = /^F0([0-1][0-9]|10)$/; // Matches F001 - F010
    return validP.test(stationId) || validF.test(stationId);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'stationId') {
      if (isValidStationId(newValue)) {
        setError(null);  // Clear error if the Station ID is valid
      } else {
        setError('Invalid Station ID. It must be between P001-P020 or F001-F010.');
      }
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
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
            maxLength="20"
          />
        </div>
        <div className="form-group">
          <label htmlFor="stationId">Station ID</label>
          <input
            type="text"
            id="stationId"
            name="stationId"
            value={formData.stationId}
            onChange={handleChange}
            placeholder="Station ID (e.g., P001-P020, F001-F010)"
            maxLength="4"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nexsId">NEXS ID</label>
          <input
            type="text"
            id="nexsId"
            name="nexsId"
            value={formData.nexsId}
            onChange={handleChange}
            placeholder="NEXS ID"
          />
        </div>
      </form>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};

export default DataEntry;
