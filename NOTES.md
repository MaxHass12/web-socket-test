# Opening a Web Socket Connection

- The command to initiate a websocket handshake is `curl -H "Upgrade: websocket" -H "Connection: Upgrade" -H "Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==" -H "Sec-WebSocket-Version: 13" -sSvN http://localhost:3001 --http1.1`

- The request send by client to initiate the websocket handshake is

```
> GET / HTTP/1.1
> Host: localhost:3001
> User-Agent: curl/8.7.1
> Accept: */*
> Upgrade: websocket
> Connection: Upgrade
> Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
> Sec-WebSocket-Version: 13
```

- The response sent by client as a response for websocket handshake is

```
< HTTP/1.1 101 Switching Protocols
< Upgrade: websocket
< Connection: Upgrade
< Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

- After the server returns the `101` response, the app level protocol switches from HTTP to WS. Both HTTP and WS are app level protocol and they require TCP/IP as their transport.

- Each connection creates its own socket and then runs on that socket. What happens on one socket is independent of what happens on another socket that is currently connected.

- WS protocol is not based on HTTP. While HTTP is a text based protocol, WS is a binary protocol where multiple streams of data can be send in both directions at the same time (full duplex mode). (HTTP is only used for client handshake)

- The websocket protocol is designed to have following characteristics:

1. No new port is required.
2. Since no new port is required, we dont need to change firewall or any other setting.
3. The same server process could handle both HTTP and WS communication.
4. HTTP Cookies / Authentication can be used during WS handshake.

# Data Transmission over Web Socket

- Web socket protocol follows an asynchronous, event-driven programming model. As long as web socket connection is open, the client and server simply listen for events in order to handle incoming data and changes in connection status (with no need for polling)

- The `message` event is fired when data is received through a web socket.

- To send message we use `send()` method on the socket instance.

# Closing Web Socket Connection

# References

1. https://www.chucksacademy.com/en/topic/express-basic/websocket
2. https://ably.com/topic/websockets
