import { useEffect, useRef, useState } from 'react';
import setSocketConnection from './socket';
const BASE_URL = '/api';

function App() {
  const [nums, setNums] = useState([]);
  const [msg, setMsg] = useState(null);
  const [isSocketConnectionOpen, setIsSocketConnectionOpen] = useState(true);

  const socketCloseRef = useRef(null);

  useEffect(() => {
    fetch(BASE_URL + '/nums')
      .then((response) => {
        response.json().then((val) => {
          setNums((prevNums) => [...prevNums, val]);
        });
      })
      .catch((err) => {
        console.log(err);
        console.log('could not load initial data from DB');
      });
  }, []);

  useEffect(() => {
    const onMessageRcv = (data) => {
      setNums((prevNums) => [...prevNums, data]);
    };

    setSocketConnection(onMessageRcv, socketCloseRef);
  }, []);

  const handleGenerateNewNumber = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setMsg('Generated New Number from this client');
    setTimeout(() => {
      setMsg(null);
    }, 5000);
    fetch(BASE_URL + '/new-num').then((response) => {
      response.json().then((data) => {
        console.log('HTTP Client Received:', JSON.stringify(data));
        const request = `GET /api/new-num ${response.status} ${
          response.statusText
        } ${JSON.stringify(data)}`;
        setNums((nums) => [...nums, request]);
      });
    });
  };

  const handleCloseSocketConnection = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (socketCloseRef.current) {
      socketCloseRef.current();
      setMsg('Socket connection closed');
      setIsSocketConnectionOpen(false);
    }
  };

  return (
    <div>
      {msg && (
        <p style={{ backgroundColor: 'yellow', padding: '20px' }}>{msg}</p>
      )}
      {isSocketConnectionOpen && (
        <div>
          {' '}
          <button onClick={handleGenerateNewNumber}>Generate New Number</button>
          <button onClick={handleCloseSocketConnection}>
            Close Socket Connection
          </button>
        </div>
      )}
      <ul>
        {nums.map((num) => (
          <li key={num}>{num}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
