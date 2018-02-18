import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.SERVERURL || 'http://127.0.0.1:8000',
});

instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
instance.defaults.headers.common['Access-Control-Allow-Methods'] = 'HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS';
instance.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type, X-Auth-Token';

const api = {
  users: {
    createUser: payload => instance.post('/users/createUser', payload).then(res => res.data),
    removeUser: payload => instance.post('/users/removeUser', payload).then(res => res.data),
  },
  rooms: {
    createRoom: payload => instance.post('/rooms/createRoom', payload).then(res => res.data),
    joinRoom: payload => instance.post('/rooms/joinRoom', payload).then(res => res.data),
  },
};

export default api;
