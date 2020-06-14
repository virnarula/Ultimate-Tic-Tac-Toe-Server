// Dependancies
const express = require("express");
const WebSocket = require("ws");
const SocketServer = require("ws").Server;

console.log("Starting websockets server");
const server = express().listen(3000);
const wss = new SocketServer({ server });
console.log("Server was opened on localhost:3000");

wss.on("connection", (ws) => {
    console.log("[Server] a client was conneceted");

    ws.on("close", () => { console.log("[Server] Client was disconnected")});

    ws.on("message", (message) => { 
        console.log("[Server] received message %s", message);
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});
