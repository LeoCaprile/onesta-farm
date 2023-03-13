import axios from 'axios';

export const OnestaApiInstance = axios.create({
  baseURL: 'https://testapi.onesta.farm/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});
