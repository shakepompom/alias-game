import WebSocket from 'ws';
import uuid from 'uuid';
const { v4: uuidv4 } = uuid;

const wss = new WebSocket.Server({ port: 8080 });

const users = [];
const clients = [];

export const sendMsg = (ws, msg = {}) => ws.send(JSON.stringify(msg));

wss.on('connection', function connection(ws) {
  console.log('New connection');

  clients.push(ws);
  const idx = clients.indexOf(ws);
  if (idx > -1) {
    const userID = uuidv4();
    users.push({
      id: idx,
      userID,
      room: '',
      sdp: '',
      candidate: '',
    });
  }

  sendMsg(ws, {
    type: 'initial-data',
    id: idx,
  });

  ws.on('open', function () {

  });

  ws.on('close', function (code, message) {
    console.log('User Disconnected');
    const idx = clients.indexOf(ws);
    if (idx > -1) {
      clients.splice(idx, 1);
      users.splice(idx, 1);
    }
  });

  ws.on('message', function incoming(rawData) {
    const data = JSON.parse(rawData);
    console.log('data', data);

    switch (data.type) {
      case 'get-users':
        // console.log('clients', clients.length);
        // console.log('allUsers', users);

        const usersMsg = {
          type: 'all-users',
          users: users,
        };
        sendMsg(ws, usersMsg);
        break;
      case 'video-offer':
        users[data.userID] = {
          ...users[data.userID],
          sdp: data.sdp,
        };
        break;
      case 'new-ice-candidate':
        users[data.userID] = {
          ...users[data.userID],
          candidate: data.candidate,
        };
        break;
      default:
        break;
    }

    wss.clients.forEach(function each(client) {
      if (/*client !== ws && */ client.readyState === WebSocket.OPEN) {
        sendMsg(ws, rawData);
      }
    });
  });
});
