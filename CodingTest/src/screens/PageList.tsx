import { getAllItemsList } from '../api';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator, FlatList } from 'react-native';
import ListItem from '../components/ListItem';
import { useIsFocused } from '@react-navigation/native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: white;
`;

const PageList = (): JSX.Element => {
  const [items, setItems] = useState<any>({
    category: {
      id: null,
      name: null,
    },
    maxPage: null,
    productCount: null,
    products: [],
  });
  const [thisPage, setThisPage] = useState(1);
  const isFetched = useRef<boolean>(false);
  const isFocused = useIsFocused();
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fetchData = async (page: number, order: string) => {
    try {
      const { data } = await getAllItemsList(page, order);
      if (items.products.length === 0) {
        setItems(data);
        setIsRefreshing(false);
        return;
      } else {
        setItems((prevState: any) => {
          console.log(prevState);
          return {
            ...prevState,
            products: [...prevState.products, ...data.products],
          };
        });
        setIsRefreshing(false);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      const abortController = new AbortController();
      abortController.abort();
    };
  }, [isFocused]);

  useEffect(() => {
    fetchData(thisPage, 'price-asc');
  }, []);

  useEffect(() => {
    isFetched.current = true;
    return () => {
      isFetched.current = false;
    };
  }, [items]);

  const renderStuff = ({ item }) => {
    return <ListItem data={item} />;
  };

  return (
    <Container>
      {isFetched.current ? (
        <FlatList
          data={items.products}
          renderItem={renderStuff}
          keyExtractor={item => item.prefix}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshing={isRefreshing}
          onRefresh={() => {
            setItems({ products: [] });
            setIsRefreshing(true);
            fetchData(1, 'price-asc');
          }}
          onEndReachedThreshold={1}
          onEndReached={() => {
            if (thisPage < items?.maxPage - 1) {
              setThisPage(prev => prev + 1);
              setIsRefreshing(true);
              console.log(thisPage);
              fetchData(thisPage + 1, 'price-asc');
            } else {
              return;
            }
          }}
        />
      ) : (
        <ActivityIndicator />
      )}
    </Container>
  );
};

export default PageList;
