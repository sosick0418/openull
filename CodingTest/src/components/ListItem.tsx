import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 0;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.16);
  border-radius: 15px;
  align-items: center;
  background-color: white;
  margin-bottom: 20px;
`;

const MainImage = styled.Image`
  resize-mode: contain;
  width: 275px;
  height: 200px;
`;

const TextContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const BrandName = styled.Text`
  margin-top: 5%;
  font-size: 8px;
`;

const Name = styled.Text`
  margin-top: 5%;
  font-size: 10px;
  font-weight: bold;
`;

const PriceContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const PriceText = styled.Text`
  text-align: center;
  margin-top: 5%;
  font-size: 12px;
  font-weight: bold;
`;

const OriginalPrice = styled.Text`
  text-decoration: line-through;
  font-size: 10px;
  margin-right: 5%;
`;

const SsomeePrice = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: red;
`;

const ListItem = ({ data }: any) => {
  return (
    <Container>
      <MainImage source={{ uri: data.mainImage }} />
      <TextContainer>
        <BrandName>{data.brand.name}</BrandName>
        <Name>{data.name}</Name>
      </TextContainer>
      <PriceText>Ssomee 가격</PriceText>
      <PriceContainer>
        <OriginalPrice>{data.originalPrice}</OriginalPrice>
        <SsomeePrice>{data.ssomeePrice}</SsomeePrice>
      </PriceContainer>
    </Container>
  );
};

export default ListItem;
