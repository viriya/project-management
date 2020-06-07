import axios from 'axios';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://project-management-6slcxy5zp.now.sh/'
    : 'http://localhost:3000/';

export default axios.create({
  baseURL: baseUrl,
});
