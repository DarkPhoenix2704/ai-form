import axios from 'axios';

const apiHandler = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiHandler.interceptors.request.use(
  (response) => {
    return response;
  },
  (error) => {
    const request = error.config;
    if (
      error.response.status === 401 &&
      request.url === process.env.NEXT_PUBLIC_API_URL + '/auth/refresh'
    ) {
      window.location.href = '/auth/login';
    } else if ((error.response.status = 401)) {
      return apiHandler
        .get('/auth/refresh')
        .then(() => {
          return apiHandler(request);
        })
        .catch((err) => {
          console.log(err);
          window.location.href = '/auth/login';
        });
    } else {
      return Promise.reject(error);
    }
  },
);

export { apiHandler };
