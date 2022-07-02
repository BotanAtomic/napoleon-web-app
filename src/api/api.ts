import axios from 'axios';

export const DEV_ENV = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');

const server = {
  production: 'https://napoleon-app.herokuapp.com',
  development: 'http://localhost:9000',
};

const environment = DEV_ENV
  ? server.development : server.production;

const api = {
  createSession: () => axios.get(`${environment}/session`),
  execute: (session: string, code: string) => axios.post(`${environment}/execute`, {
    session, code
  }).then((value) => {
    executionCount += 1
    return value;
  }),
  plot: (filename: string) => `${environment}/plot/${filename}`
};

export let executionCount = 0

export default api;
