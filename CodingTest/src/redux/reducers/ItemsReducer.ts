import { types } from '../types';

const defaultState = {
  category: {
    id: null,
    name: null,
  },
  maxPage: null,
  productCount: null,
  products: [],
};

export default function setItemsInRedux(
  state: any = defaultState,
  action: any,
): any {
  switch (action.type) {
    case types.SET_ITEMS:
      return {
        ...action.payload,
      };
    case types.UPDATE_ITEMS:
      return {
        ...state,
        products: [...state.products, ...action.payload],
      };
    default:
      return state;
  }
}
