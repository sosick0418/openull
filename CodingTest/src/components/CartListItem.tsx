import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import { deleteCartItem } from '../redux/actions/CartItemActions';

const Container = styled.View`
  flex: 0.2;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin-top: 10px;
`;

const MainImage = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 85px;
  height: 85px;
  border-radius: 5px;
  margin-right: 20px;
`;

const TextContainer = styled.View`
  width: 200px;
  justify-content: center;
  align-items: center;
`;

const BrandAndDeleteBox = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const BrandName = styled.Text`
  font-size: 13px;
`;

const DeleteButton = styled.Pressable`
  background: transparent;
  width: 30px;
  height: 30px;
`;

const DeleteText = styled.Text`
  font-size: 20px;
  color: red;
`;

const ItemName = styled.Text`
  width: 100%;
  font-size: 15px;
  font-weight: bold;
`;

const Price = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-top: 8px;
`;

const CartListItem = ({ data, handleDeleteState }: any) => {
  const dispatch = useDispatch();

  const handleDeleteButton = () => {
    handleDeleteState();
    return dispatch(deleteCartItem(data.prefix));
  };

  return (
    <Container>
      <MainImage source={{ uri: data.mainImage }} />
      <TextContainer>
        <BrandAndDeleteBox>
          <BrandName>{data.brand.name}</BrandName>
          <DeleteButton onPress={handleDeleteButton}>
            <DeleteText>X</DeleteText>
          </DeleteButton>
        </BrandAndDeleteBox>
        <ItemName>{data.name}</ItemName>
        <Price>{`₩ ${data.ssomeePrice}`}</Price>
      </TextContainer>
    </Container>
  );
};

export default CartListItem;
