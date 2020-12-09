const express = require('express');
const app = express();
const createProxyMiddleware = require('http-proxy-middleware');
const http = require("http").Server(app);
var io = require("socket.io")(http);
var consumer = require('./sockets/socket');
consumer.start(io);

const port = 3000;




app.use('/', createProxyMiddleware({
    target: "http://localhost:3000",
    changeOrigin: true
}));


http.listen(port, () => {
    console.log("Server started in port " + port + ".");
});
