const mongoose = require('mongoose');

// Retailer Schema
const retailerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  phone:    { type: String, required: true },
  businessName:   { type: String, required: true },
  storeAddress:   { type: String, required: true },
  phone:      { type: String, required: true },
  password:{ type: String, required: true }
}, { timestamps: true });

// Agent Schema
const agentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  phone:    { type: String, required: true },
  vehicleType:         { type: String, required: true },
  preferredTimeSlots:  { type: String },
   password:{ type: String, required: true }
}, { timestamps: true });

// Customer Schema
const customerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  phone:    { type: String, required: true },
  deliveryAddress: { type: String },
  loyaltyPoints:   { type: Number, default: 0 },
   password:{ type: String, required: true }
}, { timestamps: true });

// Exporting all models
const Retailer = mongoose.model('Retailer', retailerSchema);
const Agent = mongoose.model('Agent', agentSchema);
const Customer = mongoose.model('Customer', customerSchema);

module.exports = {
  Retailer,
  Agent,
  Customer
};
