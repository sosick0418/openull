import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../types';
import { postBuy } from '../api';
import { Alert } from 'react-native';

const Container = styled.View`
  flex: 1;
  background: white;
  align-items: center;
  justify-content: center;
`;
const PriceContainer = styled(Container)`
  flex: 0.8;
`;

const ProductsPrice = styled.Text`
  font-size: 30px;
  margin-bottom: 20px;
`;

const ProductsCount = styled(ProductsPrice)``;

const ShippingPrice = styled(ProductsPrice)``;

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
  font-size: 30px;
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

const PageBuy = ({ route }: any) => {
  const [sumShippingPrice, setShippingPrice] = useState(0);
  const cartItem: any = useSelector<RootState>(
    state => state.cartItem.products,
  );
  const price = route.params.data;

  const calShippingFee = () => {
    let sum = 0;
    for (let ele of cartItem) {
      sum = sum + ele.shippingPrice;
    }
    return setShippingPrice(sum);
  };

  useEffect(() => {
    calShippingFee();
    return;
  }, []);

  const handlePay = async () => {
    try {
      for (let ele of cartItem) {
        await postBuy(ele.prefix);
      }
      Alert.alert('구매 성공', '구매가 완료되었습니다.', [{ text: '확인' }]);
    } catch (error) {
      console.log(error);
      Alert.alert(
        '구매 실패',
        '구매가 완료되지 않았습니다. 물건을 다시 한번 확인 부탁드립니다.',
        [{ text: '확인' }],
      );
    }
  };
  const handleClick = () => {
    Alert.alert('결제', '결제하시겠습니까?', [
      { text: '확인', onPress: () => handlePay() },
      { text: '취소' },
    ]);
  };

  return (
    <Container>
      <PriceContainer>
        <ProductsPrice>총 물건 가격 ₩ {price}</ProductsPrice>
        <ShippingPrice>배송비 ₩ {sumShippingPrice} </ShippingPrice>
        <ProductsCount>총 물건 개수 {cartItem.length} 개</ProductsCount>
      </PriceContainer>
      <AllPriceContainer>
        <AllPrice>총 ₩ {sumShippingPrice + price}</AllPrice>
        <BuyButton onPress={handleClick}>
          <BuyText>결제</BuyText>
        </BuyButton>
      </AllPriceContainer>
    </Container>
  );
};

export default PageBuy;
