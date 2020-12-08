const nodemailer = require('nodemailer');
const express = require('express');
const app = express();
const createProxyMiddleware = require('http-proxy-middleware');
const socketIO = require('socket.io');
const http = require("http").Server(app);
var io = require("socket.io")(http);
var consumer = require('./sockets/socket');
consumer.start(io);

const path = require('path');


const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3001;




app.use('/', createProxyMiddleware({
    target: "https://twintter.herokuapp.com",
    changeOrigin: true
}));

const onConnection = socket => {
    socket.on("channel", data => socket.broadcast.emit("channel", data));
};
// esta es la comunicacion del backend

http.listen(port, () => {
    console.log("Server started in port " + port + ".");
});
