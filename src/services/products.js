import { apiEndpoint } from './config';
import createRestApiClient from '../utils/createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  return {
    getProduct: ({ id }) => client.request({
      method: 'GET',
      url: `/product/${id}`
    }),
    getProducts: () => client.request({
      method: 'GET',
      url: '/product'
    }),
    deleteProduct: ({ id }) => client.request({
      method: 'DELETE',
      url: `/product/${id}`
    }),
    updateProduct: ({ id, data }) => client.request({
      method: 'PUT',
      url: `/product/${id}`,
      data
    }),
    createProduct: ({ id, data }) => client.request({
      method: 'POST',
      url: `/product/${id}`,
      data
    })
  };
};

