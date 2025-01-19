const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const cors = require('cors');

app.use(cors());
app.use(express.static('dist'));

const clients = new Set();

const regex = /\(([^)]+)\)/;

wss.on('connection', (ws, request) => {
  const clientAgent = request.headers['user-agent'].match(regex)[0];
  const clientIp = request.socket.remoteAddress;
  const clientPort = request.socket.remotePort;
  const clientDetails = `${clientIp} : ${clientPort} | ${clientAgent}`;

  clients.add(ws);
  console.log('New client connected', clientDetails);
  ws.send(`WS connection established. Client Details : ${clientDetails}`);

  //   ws.send(`${Math.floor(Math.random() * 100)}\n`); // setInterval(() => {
  // }, 1000);

  ws.on('message', (data) => {
    console.log('Received from client', clientDetails);
    console.log(data.toString());
  });

  ws.on('close', () => {
    console.log('Close Request Received from client', clientDetails);
    clients.delete(ws);
    console.log('Client disconnected');
  });

  ws.on('error', (err) => {
    console.log(err);
  });
});

app.get('/api/nums', (req, res) => {
  res.status(200).send(['Initial Data Send From Server']);
});

app.get('/api/new-num', (_req, res) => {
  const newNum = Math.floor(Math.random() * 100);

  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(newNum);
    }
  });

  res.json({ new_num: newNum });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
