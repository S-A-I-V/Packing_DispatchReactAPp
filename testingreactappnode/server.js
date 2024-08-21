// server.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;

// Enable CORS to allow requests from your React app
app.use(cors());
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: '192.168.27.185',
  user: 'saideep',
  password: 'Lenskart@123#',
  database: 'packing_db'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// API endpoint to handle data entry
app.post('/api/data-entry', (req, res) => {
  const { skuId, dateOfScan, timestamp, stationId } = req.body;
  const query = 'INSERT INTO entries (skuId, dateOfScan, timestamp, stationId) VALUES (?, ?, ?, ?)';

  db.query(query, [skuId, dateOfScan, timestamp, stationId], (err) => {
    if (err) {
      console.error('Error inserting data:', err.stack);
      res.status(500).send('Error inserting data');
      return;
    }
    res.status(200).send('Data inserted successfully');
  });
});

// API endpoint to retrieve data for the table
app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM entries';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err.stack);
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
