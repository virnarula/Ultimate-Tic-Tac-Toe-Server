// Dependancies
const express = require("express");
const WebSocket = require("ws");
const SocketServer = require("ws").Server;

console.log("Starting websockets server");
const server = express().listen(3000);
const wss = new SocketServer({ server });
console.log("Server was opened on localhost:3000");
var connections = 0;

wss.on("connection", (ws) => {
    if(connections === 2) {
        ws.send("There are already 2 players on the server.");
        ws.close();
    }
    connections++;
    console.log("[Server] a client was conneceted. Connections: " + connections);

    ws.on("close", () => { 
        connections--;
        console.log("[Server] Client was disconnected. Connections: " + connections);
    });

    ws.on("message", (message) => { 
        console.log("[Server] received message %s", message);
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});
