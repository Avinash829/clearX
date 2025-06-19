const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Retailer Registration Route
app.post('/api/retailers', (req, res) => {
  const newRetailer = req.body;
  const filePath = path.join(__dirname, 'Retailer.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    let retailers = [];

    if (!err && data) {
      try {
        retailers = JSON.parse(data);
        if (!Array.isArray(retailers)) retailers = [];
      } catch (e) {
        return res.status(500).json({ error: 'Failed to parse Retailer.json' });
      }
    }

    retailers.push(newRetailer);

    fs.writeFile(filePath, JSON.stringify(retailers, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to save retailer' });
      }

      res.status(200).json({ message: 'Retailer registered successfully' });
    });
  });
});

// Route to register a customer
app.post('/api/customers', (req, res) => {
  const newCustomer = req.body;
  const filePath = path.join(__dirname, 'Customer.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    let customers = [];

    if (!err && data) {
      try {
        customers = JSON.parse(data);
        if (!Array.isArray(customers)) customers = [];
      } catch (e) {
        return res.status(500).json({ error: 'Failed to parse Customer.json' });
      }
    }

    customers.push(newCustomer);

    fs.writeFile(filePath, JSON.stringify(customers, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to save customer' });
      }

      res.status(200).json({ message: 'Customer registered successfully' });
    });
  });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

