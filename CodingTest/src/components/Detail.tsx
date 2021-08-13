import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  width: 85%;
  height: 20px;
  margin-bottom: 10px;
`;
const TitleBox = styled.View`
  width: 30%;
  height: 20px;
  justify-content: center;
  align-items: flex-start;
`;

const TextBox = styled(TitleBox)`
  width: 70%;
`;

const Title = styled.Text`
  font-size: 12px;
  font-weight: bold;
`;

const Value = styled.Text`
  font-size: 13px;
  margin-left: 30%;
`;

const Detail = ({ title, value }: any) => {
  return (
    <Container>
      <TitleBox>
        <Title>{title}</Title>
      </TitleBox>
      <TextBox>
        <Value>{value}</Value>
      </TextBox>
    </Container>
  );
};

export default Detail;
