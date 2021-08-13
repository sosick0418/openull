import { RootState } from '@/../types';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import ListItem from '../components/ListItem';

const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const SearchContainer = styled.SafeAreaView`
  flex: 0.2;
  flex-direction: row;
  align-items: center;
`;

const SerchBar = styled.TextInput.attrs({
  placeholder: '검색어를 입력하세요',
})`
  margin: 0 auto;
  height: 45px;
  width: 80%;
  padding: 0 20px;
  border: 1px solid #d0cfce;
`;

const SearchButton = styled.Button``;

const SearchedItemContainer = styled.View`
  flex: 1;
  width: 100%;
`;

const SearchedItemsScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})`
  flex: 1;
`;

const NoSearchResultContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const NoSearchResult = styled.Text`
  font-size: 15px;
`;

const PageSearch = () => {
  const textInputValue = useRef('');
  const [searchedItem, setSerchedItem] = useState<any[]>([]);
  const itemsInRedux: any = useSelector<RootState>(
    state => state.item.products,
  );

  const searchFunction = (text: string) => {
    let reg = new RegExp(text);
    const matchedItems = itemsInRedux.filter((item: any) =>
      reg.exec(item.name),
    );
    setSerchedItem(matchedItems);
  };

  return (
    <Container>
      <SearchContainer>
        <SerchBar onChangeText={text => (textInputValue.current = text)} />
        <SearchButton
          title="검색"
          onPress={() => searchFunction(textInputValue.current)}
        />
      </SearchContainer>
      <SearchedItemContainer>
        <SearchedItemsScrollView>
          {searchedItem.length !== 0 ? (
            searchedItem.map(item => <ListItem key={item.prefix} data={item} />)
          ) : (
            <NoSearchResultContainer>
              <NoSearchResult>검색 결과가 없습니다.</NoSearchResult>
            </NoSearchResultContainer>
          )}
        </SearchedItemsScrollView>
      </SearchedItemContainer>
    </Container>
  );
};

export default PageSearch;
