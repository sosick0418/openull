import { getAllItemsList } from '../api';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const ItemList = styled.Text``;

const PageList = (): JSX.Element => {
  const [items, setItems] = useState([]);

  const fetchData = async (page: number, order: string) => {
    try {
      const { data } = await getAllItemsList(page, order);
      return setItems(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(1, 'price-asc');
    return () => {
      new AbortController().abort();
    };
  }, []);

  return (
    <Container>
      {items ? (
        items.map(item => (
          <ItemList key={item?.prefix}>{item?.prefix}</ItemList>
        ))
      ) : (
        <ActivityIndicator />
      )}
    </Container>
  );
};

export default PageList;
