import { apiEndpoint } from './config';
import createRestApiClient from '../utils/createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  return {
    getTransactions: (id) => client.request({
      method: 'GET',
      url: `/wallet/${id}`
    }),
    getAccounts: () => client.request({
      method: 'GET',
      url: '/wallet/accounts'
    }),
    buyProduct: ({userId, data}) => client.request({
      method: 'PUT',
      url: `/wallet/buy/${userId}`,
      data
    }),
    transferMoney: ({phone, data}) => client.request({
      method: 'PUT',
      url: `/wallet/transfer/${phone}`,
      data
    })
  };
};

