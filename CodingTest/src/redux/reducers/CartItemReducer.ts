import { types } from '../types';

const defaultState = {
  products: [],
};

export default function setItemsInRedux(
  state: any = defaultState,
  action: any,
): any {
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
