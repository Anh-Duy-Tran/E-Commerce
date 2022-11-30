import app from './app.js';
import http from 'http';

const PORT = 3003;

const server = http.createServer();

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})