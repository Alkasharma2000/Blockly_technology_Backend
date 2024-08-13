const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});



const PORT = 3000;

app.use(cors());

app.get("/",(req,res)=>{
 res.json({"msg":"Welcome to Alka World,where beauty and grace shine"})
})



// let latitude = 21.245990;
// let longitude = 81.389395;

let latitude = 13.042060;
let longitude = 77.622262;

const latitudeIncrement = 0.00001; 
const longitudeIncrement = 0.00001; 
const generateRandomLocation = () => {
    
    latitude += latitudeIncrement;
    longitude += longitudeIncrement;
    
    
    return {
        latitude: latitude.toFixed(6),
        longitude: longitude.toFixed(6),
        timestamp: new Date().toISOString()
    };
};

const sendLocation = () => {
    const location = generateRandomLocation();
    io.emit('vehicleLocation', location);
    io.emit('alka', {"course":"IT","clg":"BIT-D"});
};

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

setInterval(sendLocation, 10); 

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

