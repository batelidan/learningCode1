const express = require("express");
const { env } = require("process");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const User = require('./schema');
const cors = require('cors');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path'); 

app.use(cors());
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});
app.use(express.static(path.join(__dirname, "public")));


const mentorMap = new Map(); // Key: title, Value: mentor socket ID
const clientMap =  new Map(); // key: client socketID => Value:title

const onSocketDiconnectFunction = (socektId)=>{
    if(clientMap.has(socektId)){
        const room = clientMap.get(socektId);
        const isClientDeleted =clientMap.delete(socektId);
        if(isClientDeleted){
            console.log(`The client of room ${room} disconncted`);
        } 
    }else{
        for(const [title,mentorSocket] of mentorMap.entries()){
            if(mentorSocket === socektId){
                mentorMap.delete(title);
                console.log(`The mentor of room ${title} disconnected.`);
            }
        }
    }
}


io.on('connection', (socket) => {
    socket.on('userEditCode',(newCode)=>{
        const currentTitle =clientMap.get(socket.id);
        if(currentTitle){
            const mentorSocket = mentorMap.get(currentTitle);
            io.to(mentorSocket).emit('newClientCode',newCode);
        }
    })

  socket.on('userEnteredRoom', (data) => {
        // Check if this is the first user entering the page
        if (!mentorMap.has(data)) {
            mentorMap.set(`${data}`, socket.id);
            socket.emit('permissions', { role: 'mentor' }); // Emit mentor permissions
        } else{
            clientMap.set(`${socket.id}`, data);
            socket.emit('permissions', { role: 'student' }); // Emit student permissions
        } ;  
    });
    socket.on("disconnect",()=>{
        onSocketDiconnectFunction(socket.id);     
    })
});

global.dbconn = "";
app.get('/lessons', async (req, res) => {
    try {
      const data = await User.find(); 
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }); 

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
  });
    


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

