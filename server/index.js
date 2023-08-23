const express = require("express");
const { env } = require("process");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const User = require('./schema');
const cors = require('cors');

global.dbconn = "";
app.use(cors());
app.get('/', async (req, res) => {
    try {
      const data = await User.find(); 
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }); 


app.get('/title/:title', async (req, res) => {
    const title = req.params.title;
  
    try {
      const data = await User.findOne({ title: title }); // Using findOne to retrieve a document by title
      if (!data) {
        res.status(404).json({ error: 'Object not found' });
        return;
      }
      
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  




/* Connected the app with mongoose */
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}.`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

