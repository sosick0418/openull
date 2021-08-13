import { combineReducers } from 'redux';
import ItemsReducer from './ItemsReducer';
import CartItemReducer from './CartItemReducer';

export default combineReducers({
  item: ItemsReducer,
  cartItem: CartItemReducer,
});
