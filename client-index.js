const express = require('express');
const WebSocket = require('ws');
const app = express();

const SERVER_WS_URL = 'ws://localhost:3001';

const wsClient = new WebSocket(SERVER_WS_URL);

wsClient.on('open', (e) => {
  console.log('Socket connection established');
});

wsClient.on('error', (err) => {
  console.log(err);
  console.log('Error while socket connection');
});
// setTimeout(() => {
//   console.log('foo');
// }, 5000);

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Client running on port ${PORT}`);
});
