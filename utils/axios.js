import axios from 'axios';

export const jsonPlaceholderClient = axios.create ({
  baseURL: 'https://jsonplaceholder.typicode.com',
});
