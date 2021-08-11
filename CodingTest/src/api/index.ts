import axios, { AxiosInstance, AxiosResponse } from 'axios';

function createInstance(): AxiosInstance {
  const instance = axios.create({
    baseURL: 'https://mock-api.ssomee.com/',
  });
  return instance;
}

const instance = createInstance();

export const getCategoryList = async (): Promise<AxiosResponse<any>> => {
  return await instance.get('categories');
};

export const getAllItemsList = async (
  page: number,
  order: string,
): Promise<AxiosResponse<any>> => {
  return await instance.get(`products/all/${page}?order=${order}`);
};

export const getCatetoryItemsList = async (
  categoryId: string,
  page: number,
  order: string,
): Promise<AxiosResponse<any>> => {
  return await instance.get(`products/${categoryId}/${page}?order=${order}`);
};

export const getItemDetail = async (
  prefix: string,
): Promise<AxiosResponse<any>> => {
  return await instance.get(`products/${prefix}}`);
};

export const postBuy = async (prefix: string): Promise<AxiosResponse<any>> => {
  return await instance.post(`products/${prefix}}`);
};
