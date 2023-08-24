const express = require("express");
const { env } = require("process");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const User = require('./schema');
const cors = require('cors');
const socketIO = require('socket.io');
const http = require('http');

app.use(cors());
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
      origin: "*",
    },
  });

const mentorMap = new Map(); // Key: title, Value: mentor socket ID

io.on('connection', (socket) => {
  socket.on('userEnteredRoom', (data) => {
    const { title } = data;
     console.log("the room is:",data);
     console.log(socket.id);
    // Check if this is the first user entering the page
    if (!mentorMap.has(title)) {
      mentorMap.set(title, socket.id);
      socket.emit('permissions', { role: 'mentor' }); // Emit mentor permissions
      socket.on("disconnect",()=>{
        mentorMap.delete(title);
    console.log(mentorMap.get(title))
      })
   
    } else{
      socket.emit('permissions', { role: 'student' }); // Emit student permissions
    } ;  
});


console.log("the connection is good")

    


});


global.dbconn = "";
app.get('/', async (req, res) => {
    try {
      const data = await User.find(); 
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }); 


// app.get('/title/:title', async (req, res) => {
//     const title = req.params.title;
  
//     try {
//       const data = await User.findOne({ title: title }); // Using findOne to retrieve a document by title
//       if (!data) {
//         res.status(404).json({ error: 'Object not found' });
//         return;
//       }
      
//       res.json(data);
//     } catch (error) {
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });
  




/* Connected the app with mongoose */
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}.`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

