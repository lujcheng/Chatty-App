const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });


// this is the history log for a chat
const chatHistory = [];
const chatColors = ["#EF2E24", "#2DCC1F", "#1F2FCC", "#BE1FCC"]
let count = 0
wss.on('connection', (ws) => {
  console.log('Client connected');
  // defining variables and functions to broadcast
  count ++
  const chatColor = {chatColor: chatColors[count % 4]}
  ws.send(JSON.stringify(chatColor))
  function createObjNSend() {
    const dataObj = {
      messages: chatHistory,
      connectionNumber: wss.clients.size
    }
    const jsonMessage = JSON.stringify(dataObj)
    return jsonMessage
  }
  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      console.log("sending...")
      if (client.readyState === ws.OPEN) {
        client.send(data);
        console.log("data sent!")
      }
    })
  }
  // broadcasting
  wss.broadcast(createObjNSend());
  ws.on('message', (event) => {
    console.log("message received")
    const parsedMessages = JSON.parse(event)
    chatHistory.push(parsedMessages)
    wss.broadcast(createObjNSend())
        console.log("data sent!")
  })
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    wss.broadcast(createObjNSend())
  })
});