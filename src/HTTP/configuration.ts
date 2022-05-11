import axios from 'axios';

export const instanceAxios = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 5000,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxZDIzY2IzNS0zMjUxLTQ0NWYtOGI3Mi1iZDI2ZDU1NzlkMGEiLCJsb2dpbiI6InRlc3QxIiwiaWF0IjoxNjUyMjc1MTUzfQ.VpxSA7ZJ-LH_f33FmgyN2ry8QqUWLaJhsKe_Fe-WR-4`,
  },
});
