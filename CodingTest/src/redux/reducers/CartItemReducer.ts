import { types } from '../types';
import { CartItemsState } from '@/../types';

const defaultState: CartItemsState = {
  products: [],
};

export default function setItemsInRedux(
  state: CartItemsState = defaultState,
  action: any,
) {
  switch (action.type) {
    case types.SET_CART_ITEM:
      return {
        products: [...state.products, ...action.payload],
      };
    case types.DELETE_CART_ITEM:
      return {
        ...state,
        products: state.products.filter(
          (item: any) => item.prefix !== action.payload,
        ),
      };
    default:
      return state;
  }
}
