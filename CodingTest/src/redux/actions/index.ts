import { types } from '../types';

export function updateItems(data: any): {
  type: string;
  payload: any;
} {
  return {
    type: types.UPDATE_ITEMS,
    payload: data,
  };
}
