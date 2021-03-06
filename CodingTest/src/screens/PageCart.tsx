import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../types';
import CartListItem from '../components/CartListItem';
import { Alert } from 'react-native';

const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const ScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    flex: 0.8,
    width: '100%',
  },
})`
  width: 100%;
`;

const AllPriceContainer = styled.View`
  flex: 0.1;
  padding: 10px;
  align-items: center;
  justify-content: space-around;
  width: 90%;
  border-top-width: 1px;
  flex-direction: row;
`;

const AllPrice = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;

const BuyButton = styled.Pressable`
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 40px;
  background-color: black;
`;

const BuyText = styled.Text`
  font-size: 17px;
  color: white;
  font-weight: bold;
`;

const PageCart = () => {
  const cartItem: any = useSelector<RootState>(
    state => state.cartItem.products,
  );
  const isFocused = useIsFocused();
  const [sumPrice, setSumPrice] = useState(0);
  const [isDeleted, setIsDeleted] = useState(false);
  const navigation = useNavigation();

  const sumFunction = () => {
    let sum = 0;
    if (cartItem.length !== 0) {
      for (let ele of cartItem) {
        sum = sum + ele.ssomeePrice;
      }
    } else {
      return setSumPrice(0);
    }
    return setSumPrice(sum);
  };

  const handleDeleteState = () => {
    setIsDeleted(!isDeleted);
  };

  useEffect(() => {
    sumFunction();
    return () => {
      const abortController = new AbortController();
      abortController.abort();
    };
  }, [isFocused]);

  useEffect(() => {
    sumFunction();
    return;
  }, [isDeleted]);

  const handleBuyButtonClick = () => {
    if (cartItem.length === 0) {
      Alert.alert('??????????????? ???????????????', '??????????????? ????????? ?????????????', [
        {
          text: '??????',
        },
      ]);
    } else {
      Alert.alert(
        '?????????????????????????',
        '????????? ???????????? ?????????????????? ???????????????',
        [
          {
            text: '??????',
            onPress: () => navigation.navigate('PageBuy', { data: sumPrice }),
          },
          { text: '??????' },
        ],
      );
    }
  };

  return (
    <Container>
      <ScrollView>
        {cartItem.length !== 0
          ? cartItem.map((item: any, idx: number) => (
              <CartListItem
                key={idx}
                data={item}
                handleDeleteState={handleDeleteState}
              />
            ))
          : null}
      </ScrollView>
      <AllPriceContainer>
        <AllPrice>{`??? ??? ${sumPrice}`}</AllPrice>
        <BuyButton onPress={handleBuyButtonClick}>
          <BuyText>????????????</BuyText>
        </BuyButton>
      </AllPriceContainer>
    </Container>
  );
};

export default PageCart;
