import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Linking,
  View,
  useWindowDimensions,
} from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';
import 'moment/locale/ko';
import { useDispatch } from 'react-redux';
import { setCartItem } from '../redux/actions/CartItemActions';
import { getItemDetail } from '../api';
import HTML from 'react-native-render-html';
import Detail from '../components/Detail';

const Container = styled.View`
  flex: 1;
  background: white;
`;

const ScrollViewContainer = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: '170%',
    background: 'white',
  },
})`
  background: white;
`;

const MainImage = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 100%;
  height: 4%;
`;

const NamingContainer = styled.View`
  padding: 20px;
`;

const RowBox = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const FromNowUpdate = styled.Text`
  font-size: 15px;
`;

const BrandName = styled.Text`
  font-size: 20px;
`;

const ProductName = styled.Text`
  font-size: 25px;
  font-weight: bold;
`;

const BottomContainer = styled.View`
  height: 100px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 35px 40px;
  background-color: 'rgb(0, 0, 0)';
  position: absolute;
  bottom: 0;
`;

const PriceText = styled.Text`
  font-size: 20px;
  color: white;
  margin-right: 10px;
`;

const OriginalPrice = styled.Text`
  text-decoration: line-through;
  text-decoration-color: red;
  color: red;
  font-size: 14px;
  margin-right: 10px;
`;

const SsomeePrice = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: white;
`;

const SoldOutText = styled.Text`
  align-self: center;
  color: white;
  font-size: 35px;
`;

const CartButton = styled.Pressable`
  width: 70px;
  height: 40px;
  margin-left: 20%;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 5px;
`;

const Cart = styled.Text`
  font-size: 15px;
  color: black;
`;

const DetailContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const PageItemDetail = ({ route }: any) => {
  const [detail, setDetail] = useState<any>([]);
  const prefix = route.params.data;

  const dispatch = useDispatch();
  const contentWidth = useWindowDimensions().width;

  const getDetail = async (id: string) => {
    try {
      const { data } = await getItemDetail(id);
      setDetail(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetail(prefix);
    return () => {
      const abortController = new AbortController();
      abortController.abort();
    };
  }, []);

  const OpenURLButton = ({ url, children }: any) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        return;
      }
    }, [url]);

    return (
      <View
        style={{
          height: '1%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button title={children} onPress={handlePress} />
      </View>
    );
  };

  const handleClick = (data: any) => {
    Alert.alert(
      '이 제품을 장바구니에 담으시겠습니까?',
      '확인을 누르시면 해당 제품이 장바구니에 담깁니다.',
      [
        {
          text: '확인',
          onPress: () => {
            dispatch(setCartItem([data]));
          },
        },
        { text: '취소' },
      ],
    );
  };

  return (
    <Container>
      {detail.length !== 0 ? (
        <>
          <ScrollViewContainer>
            <MainImage source={{ uri: detail.mainImage }} />
            <NamingContainer>
              <RowBox>
                <BrandName>{detail.brand.name}</BrandName>
                <FromNowUpdate>
                  {moment(detail.updatedAt).fromNow()}
                </FromNowUpdate>
              </RowBox>
              <ProductName>{detail.name}</ProductName>
            </NamingContainer>
            <DetailContainer>
              <Detail title={'카테고리'} value={detail.category.name} />
              <Detail
                title={'분할결제 가격'}
                value={`1차: ${detail.charges[0]}, 2차: ${detail.charges[1]}`}
              />
              <Detail title={'현재 주문 가능 수량'} value={detail.orderLimit} />
              <Detail title={'1인당 주문 가능 수량'} value={detail.userLimit} />
              <Detail title={'배송비'} value={detail.shippingPrice} />
              <Detail title={'판매처 정보'} value={detail.shop.name} />
            </DetailContainer>
            <HTML
              source={{ html: detail.description }}
              contentWidth={contentWidth}
            />
            <OpenURLButton url={detail.productUrl}>
              제품 상세 페이지
            </OpenURLButton>
          </ScrollViewContainer>
          <BottomContainer>
            {detail.soldOut ? (
              <SoldOutText>품절 되었습니다.</SoldOutText>
            ) : (
              <>
                <PriceText>가격</PriceText>
                <OriginalPrice>{detail.originalPrice}</OriginalPrice>
                <SsomeePrice>{detail.ssomeePrice}</SsomeePrice>
                <CartButton onPress={() => handleClick(detail)}>
                  <Cart>장바구니</Cart>
                </CartButton>
              </>
            )}
          </BottomContainer>
        </>
      ) : null}
    </Container>
  );
};

export default PageItemDetail;
