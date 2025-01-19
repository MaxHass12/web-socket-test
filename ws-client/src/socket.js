const origin = window.location.origin;
const WEBSOCKET_URL =
  import.meta.env.VITE_ENV === 'development' ? 'ws://localhost:3001' : origin;

export default function setSocketConnection(onMessageRcv, socketCloseRef) {
  const socket = new WebSocket(WEBSOCKET_URL); // Replace with your WebSocket server URL

  // Handle open event
  socket.onopen = () => {
    socket.send('Hello from React!');
  };

  // Handle incoming messages
  socket.onmessage = (event) => {
    console.log('Socket Client Received:', event.data);
    // console.log(`onMessageRcv(${event.data})`);
    onMessageRcv(event.data);
  };

  // Handle close event
  socket.onclose = () => {
    console.log('WebSocket connection closed');
  };

  // Handle errors
  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  // Cleanup on component unmount
  socketCloseRef.current = () => socket.close();

  return () => {
    socket.close();
  };
}
