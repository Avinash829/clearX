const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const router = require('./userrouter')
const app = express();
const PORT = 5000;
const authrouter = require('./authroute')
app.use(cors({
  origin: '*',
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}));

app.use(express.json());

const connectdb = async ()=>{
try {
    await mongoose.connect('mongodb://localhost:27017/grocery-store');
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
}
} 

connectdb();
app.use('/api',router)
app.use('/auth',authrouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

