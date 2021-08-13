import { DefaultRootState } from 'react-redux';

export interface RootState extends DefaultRootState {
  item: any;
  cartItem: any;
}
