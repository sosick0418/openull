import { DefaultRootState } from 'react-redux';

export interface RootState extends DefaultRootState {
  item: any;
  cartItem: any;
}

export interface ItemsState {
  category: {
    id: number | null;
    name: string | null;
  };
  maxPage: number | null;
  productCount: number | null;
  products: any[];
}

export interface CartItemsState {
  products: any[];
}
