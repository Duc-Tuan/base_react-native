import axios from 'axios';

const httpRequest = axios.create({
  //   baseURL: process.env.API,
  baseURL: 'https://food-chef-ebon.vercel.app/api/v1/',
});

export const get = async (path: string, options = {}) => {
  const response = await httpRequest.get(path, options);
  return response.data;
};

export const post = async (path: string, options = {}) => {
  const response = await httpRequest.post(path, options);
  return response.data;
};

export const delet = async (path: string, options = {}) => {
  const response = await httpRequest.delete(path, options);
  return response.data;
};

export const patch = async (path: string, options = {}) => {
  const response = await httpRequest.patch(path, options);
  return response.data;
};

export default httpRequest;
