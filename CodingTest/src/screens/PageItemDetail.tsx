import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Button, Linking, useWindowDimensions } from 'react-native';
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

const LinkButtonContainer = styled.View`
  height: 1%;
  justify-content: center;
  align-items: center;
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
      <LinkButtonContainer style={{}}>
        <Button title={children} onPress={handlePress} />
      </LinkButtonContainer>
    );
  };

  const handleClick = (data: any) => {
    Alert.alert(
      '??? ????????? ??????????????? ??????????????????????',
      '????????? ???????????? ?????? ????????? ??????????????? ????????????.',
      [
        {
          text: '??????',
          onPress: () => {
            dispatch(setCartItem([data]));
          },
        },
        { text: '??????' },
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
              <Detail title={'????????????'} value={detail.category.name} />
              <Detail
                title={'???????????? ??????'}
                value={`1???: ${detail.charges[0]}, 2???: ${detail.charges[1]}`}
              />
              <Detail title={'?????? ?????? ?????? ??????'} value={detail.orderLimit} />
              <Detail title={'1?????? ?????? ?????? ??????'} value={detail.userLimit} />
              <Detail title={'?????????'} value={detail.shippingPrice} />
              <Detail title={'????????? ??????'} value={detail.shop.name} />
            </DetailContainer>
            <HTML
              source={{ html: detail.description }}
              contentWidth={contentWidth}
            />
            <OpenURLButton url={detail.productUrl}>
              ?????? ?????? ?????????
            </OpenURLButton>
          </ScrollViewContainer>
          <BottomContainer>
            {detail.soldOut ? (
              <SoldOutText>?????? ???????????????.</SoldOutText>
            ) : (
              <>
                <PriceText>??????</PriceText>
                <OriginalPrice>{detail.originalPrice}</OriginalPrice>
                <SsomeePrice>{detail.ssomeePrice}</SsomeePrice>
                <CartButton onPress={() => handleClick(detail)}>
                  <Cart>????????????</Cart>
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
