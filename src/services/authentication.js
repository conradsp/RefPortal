import { apiEndpoint } from './config';
import createRestApiClient from '../utils/createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  return {
    login: ({ phone, password }) => client.request({
      method: 'POST',
      url: '/sessions',
      data: {
        phone,
        password
      }
    }),
    signUp: ({ phone, password }) => client.request({
      method: 'POST',
      url: '/users',
      data: {
        phone,
        password
      }
    }),
    getUser: ({phone}) => client.request({
      method: 'GET',
      url: `/users/${phone}`
    }),
    logOut: () => client.request({
      method: 'DELETE',
      url: '/sessions'
    })
  };
};

