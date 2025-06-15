import axios from 'axios';

export default axios.create({
  baseURL: 'https://myblog-production-5f52.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});