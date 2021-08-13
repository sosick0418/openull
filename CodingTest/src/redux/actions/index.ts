import * as updateItem from './ItemActions';
import * as updateCartItem from './CartItemActions';

const ActionCreators = Object.assign({}, updateItem, updateCartItem);

export default ActionCreators;
