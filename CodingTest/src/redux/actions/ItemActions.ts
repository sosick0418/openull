import { types } from '../types';

export function setItemsInRedux(data: any): {
  type: string;
  payload: any;
} {
  return {
    type: types.SET_ITEMS,
    payload: data,
  };
}

export function updateItems(data: any): {
  type: string;
  payload: any;
} {
  return {
    type: types.UPDATE_ITEMS,
    payload: data,
  };
}
