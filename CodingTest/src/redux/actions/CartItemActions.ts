import { types } from '../types';

export function setCartItem(data: any): {
  type: string;
  payload: any;
} {
  return {
    type: types.SET_CART_ITEM,
    payload: data,
  };
}

export function deleteCartItem(data: any): {
  type: string;
  payload: any;
} {
  return {
    type: types.DELETE_CART_ITEM,
    payload: data,
  };
}
