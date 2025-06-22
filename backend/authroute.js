const express = require('express');
const bcrypt = require('bcryptjs');
const authrouter = express.Router();
const { Retailer, Agent, Customer } = require('./rolemodel');

/* ---------------------- Retailer Routes ---------------------- */

// Signup Retailer
authrouter.post('/signup/retailer', async (req, res) => {
  try {
    const { fullName, email, phone, businessName, storeAddress, storeType, password } = req.body;

    const existing = await Retailer.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newRetailer = await Retailer.create({
      fullName,
      email,
      phone,
      businessName,
      storeAddress,
      storeType,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Retailer signed up', data: newRetailer });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login Retailer
authrouter.post('/login/retailer', async (req, res) => {
  try {
    const { email, password } = req.body;

    const retailer = await Retailer.findOne({ email });
    if (!retailer) return res.status(404).json({ error: 'Retailer not found' });

    const isMatch = await bcrypt.compare(password, retailer.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

    res.status(200).json({ message: 'Retailer login successful', data: retailer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------------- Repeat the same pattern for Agent and Customer ---------------------- */

// Signup Agent
authrouter.post('/signup/agent', async (req, res) => {
  try {
    const { fullName, email, phone, vehicleType,password } = req.body;

    const existing = await Agent.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAgent = await Agent.create({
      fullName,
      email,
      phone,
      vehicleType,
    
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Agent signed up', data: newAgent });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login Agent
authrouter.post('/login/agent', async (req, res) => {
  try {
    const { email, password } = req.body;

    const agent = await Agent.findOne({ email });
    if (!agent) return res.status(404).json({ error: 'Agent not found' });

    const isMatch = await bcrypt.compare(password, agent.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

    res.status(200).json({ message: 'Agent login successful', data: agent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Signup Customer
authrouter.post('/signup/customer', async (req, res) => {
  try {
    const { fullname, email, phone, password } = req.body;

    const existing = await Customer.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = await Customer.create({
      fullName:fullname,
      email,
      phone,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Customer signed up', data: newCustomer });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login Customer
authrouter.post('/login/customer', async (req, res) => {
  try {
    const { email, password } = req.body;

    const customer = await Customer.findOne({ email });
    if (!customer) return res.status(404).json({ error: 'Customer not found' });

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

    res.status(200).json({ message: 'Customer login successful', data: customer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = authrouter