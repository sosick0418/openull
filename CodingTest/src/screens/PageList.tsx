import { getAllItemsList } from '../api';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import { updateItems, setItemsInRedux } from '../redux/actions/ItemActions';
import ListItem from '../components/ListItem';

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
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('price-asc');
  const [dropdownItems, setDropdownItems] = useState([
    { label: '낮은 가격 순', value: 'price-asc' },
    { label: '높은 가격 순', value: 'price-desc' },
    { label: '최신순', value: 'date-desc' },
  ]);

  const isFocused = useIsFocused();
  const isFetched = useRef(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dispatch = useDispatch();

  const fetchData = async (page: number, order: string) => {
    try {
      const { data } = await getAllItemsList(page, order);
      if (items.products.length === 0) {
        setItems(data);
        dispatch(setItemsInRedux(data));
        setIsRefreshing(false);
        return;
      } else {
        setItems((prevState: any) => {
          return {
            ...prevState,
            products: [...prevState.products, ...data.products],
          };
        });
        dispatch(updateItems(data.products));
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
    setIsRefreshing(true);
    setItems({ products: [] });
    fetchData(thisPage, value);
    setIsRefreshing(false);
  }, [value]);

  useEffect(() => {
    isFetched.current = true;
    return () => {
      isFetched.current = false;
    };
  }, [items]);

  const renderStuff = ({ item }: any) => {
    return <ListItem data={item} />;
  };

  return (
    <Container>
      <DropDownPicker
        open={open}
        value={value}
        items={dropdownItems}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setDropdownItems}
      />
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
            fetchData(1, value);
          }}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            setThisPage(prev => prev + 1);
            setIsRefreshing(true);
            fetchData(thisPage + 1, value);
          }}
        />
      ) : (
        <ActivityIndicator />
      )}
    </Container>
  );
};

export default PageList;
