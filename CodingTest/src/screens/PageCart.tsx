import React from 'react';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../types';

const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const PageCart = () => {
  const cartItem = useSelector<RootState>(state => state.cartItem.products);

  return <Container />;
};

export default PageCart;
