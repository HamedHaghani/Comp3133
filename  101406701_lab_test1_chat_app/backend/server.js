
const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const GroupMessage = require("./models/GroupMessage");
const PrivateMessage = require("./models/PrivateMessage");
const user = require('./models/User')
const authRoutes = require('./routes/authRoutes')








const app = express();
const SERVER_PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/auth', authRoutes);



app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname,'../frontend/index.html' ))
})


const MONGO_URI="mongodb+srv://hamedhaghani:0K7EhdYK1otXaZyQ@clusterone.jbgqy.mongodb.net/?retryWrites=true&w=majority&appName=ClusterOne";
mongoose.connect(MONGO_URI)
.then(success =>{
    console.log(`MongoDB connected successfully ${success}`)
}).catch(err =>{
    console.log(`Error Mongodb connection  ${err}`)
});

const appServer = app.listen(SERVER_PORT, () =>{
    console.log(`Server running on http://localhost:${SERVER_PORT}`)
})

const io = new Server(appServer);

io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);


    socket.on("typing", ({ username, room }) => {
        socket.to(room).emit("typing", username);
    });

   
    socket.on("set-username", (username) => {
        socket.username = username;
        console.log(`User set username: ${username}`);
    });

    
    socket.on("joinRoom", ({ username, room }) => {
        if (!username) {
            socket.emit("error-message", "Username not set. Please log in again.");
            return;
        }

        socket.join(room);
        socket.currentRoom = room;

        console.log(`${username} joined room: ${room}`);
        socket.emit("joined-room", { username, room });

        
        socket.to(room).emit("chat-message", { from_user: "System", message: `${username} has joined the room.` });
    });

    
    socket.on("chat-message", async ({ from_user, room, message }) => {
        if (!room) {
            socket.emit("error-message", "You must join a room before sending messages.");
            return;
        }

        console.log(`Message from ${from_user} in ${room}: ${message}`);

       
        const newMessage = new GroupMessage({ from_user, room, message });
        await newMessage.save();

        
        io.to(room).emit("chat-message", { from_user, message });
    });
    socket.on("leaveRoom", ({ username, room }) => {
        if (!room) return;
    
        console.log(`${username} left room: ${room}`);
    
       
        socket.leave(room);
        socket.currentRoom = null;
    
        
        socket.to(room).emit("chat-message", { from_user: "System", message: `${username} has left the room.` });
    });

    socket.on("start-private-chat", ({ from_user, to_user }) => {
        const privateRoom = `private-${from_user}-${to_user}`;
        socket.join(privateRoom);
        console.log(`${from_user} started a private chat with ${to_user}`);
    
        
        const recipientSocket = [...io.sockets.sockets.values()].find(
            (s) => s.username === to_user
        );
    
        if (recipientSocket) {
            recipientSocket.join(privateRoom);
            io.to(privateRoom).emit("chat-message", {
                from_user: "System",
                message: `Private chat started between ${from_user} and ${to_user}`,
            });
        }
    });
    
    socket.on("private-message", async ({ from_user, to_user, message }) => {
        console.log(`Private message from ${from_user} to ${to_user}: ${message}`);
    
        
        const newMessage = new PrivateMessage({ from_user, to_user, message });
        await newMessage.save();
    
        const privateRoom = `private-${from_user}-${to_user}`;
        io.to(privateRoom).emit("private-message", { from_user, message });
    });
    


    

   
    socket.on("disconnect", () => {
        console.log(`${socket.username || "A user"} disconnected.`);
        if (socket.currentRoom) {
            socket.to(socket.currentRoom).emit("chat-message", { from_user: "System", message: `${socket.username} has left the room.` });
        }
    });
});




