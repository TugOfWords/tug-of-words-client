import socketioClient from 'socket.io-client';

const SERVER_URL = process.env.SERVER_URL || 'localhost:8000';
const socket = socketioClient(SERVER_URL);

export default socket;
