import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:4444/api',
  headers: {
    'Content-type': 'application/json',
  },
});
