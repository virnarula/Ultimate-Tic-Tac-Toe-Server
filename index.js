// Dependancies
const express = require("express");
const WebSocket = require("ws");
const SocketServer = require("ws").Server;
const maingame = require("maingame");
const requests = require("requests");

console.log("Starting websockets server");
const server = express().listen(3000);
const wss = new SocketServer({ server });
console.log("Server was opened on localhost:3000");
var connections = 0;
var player1;
var player2;
mainGame = new maingame();

wss.on("connection", (ws) => {
    switch(connections) {
        case 0:
            ws.send("You are player 1. You will be X. You will be able to start when players 2 joins.");
            player1 = ws;
            connections++;
            console.log("[Server] a client was conneceted. Connections: " + connections);
            break;
        case 1:
            ws.send("You are player X. You will be O.");
            player1.send("Player 2 has joined. You can play your first move now");
            player2 = ws;
            connections++;
            console.log("[Server] a client was conneceted. Connections: " + connections);
            break;
        default:
            ws.send("There are already 2 players on the server.");
            ws.close();
            break;
        
    }

    ws.on("close", () => { 
        connections--;
        console.log("[Server] Client was disconnected. Connections: " + connections);
        wss.clients.forEach(function each(client) {
            client.send("A player has disconnected. The game is ending.");
            client.close();
        });
    });

    ws.on("message", (message) => { 
        console.log("[Server] received message %s", message);
        var move = JSON.parse(message);
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                console.log("Player " + move.getPlayer() +"played this move:");
                console.log("board x:" + move.getBoardX());
                console.log("board y:" + move.getBoardY());
                console.log("rel x:" + move.getRelX());
                console.log("rel y:" + move.getRelY());
                if(maingame.playMove()) {
                    console.log("Valid Move");
                    client.send(true);
                } else {
                    console.log("Invalid Move");
                    client.send(false);
                }
            }
        });
    });
});
