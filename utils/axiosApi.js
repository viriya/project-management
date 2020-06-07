import axios from 'axios';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://personal-project-management.now.sh/'
    : 'http://localhost:3000/';

export default axios.create({
  baseURL: baseUrl,
});
