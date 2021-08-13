import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  width: 85%;
  height: 20px;
  margin-bottom: 10px;
`;
const TextBox = styled.View`
  width: 45%;
  height: 20px;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 10px;
  font-weight: bold;
`;

const Value = styled.Text`
  font-size: 10px;
  margin-left: 30%;
`;

const Detail = ({ title, value }: any) => {
  return (
    <Container>
      <TextBox>
        <Title>{title}</Title>
      </TextBox>
      <TextBox>
        <Value>{value}</Value>
      </TextBox>
    </Container>
  );
};

export default Detail;
