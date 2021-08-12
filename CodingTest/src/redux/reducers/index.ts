import { types } from '../types';

const defaultState = {
  items: [],
};

export default function setItems(state: any = defaultState, action: any): any {
  switch (action.type) {
    case types.UPDATE_ITEMS:
      return {
        ...state.items,
        ...action.payload,
      };
    default:
      return state;
  }
}
