import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import PageCart from '../screens/PageCart';
import PageList from '../screens/PageList';
import PageSearch from '../screens/PageSearch';
import { useSelector } from 'react-redux';
import { RootState } from '../../types';
import styled from 'styled-components/native';

const IconImage = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 20%;
`;

const Tab = createBottomTabNavigator();

export function BottomTab() {
  const inCartItems: any = useSelector<RootState>(
    state => state.cartItem.products,
  );
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={PageList}
        options={{
          header: () => null,
          tabBarIcon: () => (
            <IconImage source={require('../assets/images/home.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={PageSearch}
        options={{
          header: () => null,
          tabBarIcon: () => (
            <IconImage source={require('../assets/images/search.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={PageCart}
        options={{
          header: () => null,
          tabBarBadge: inCartItems.length === 0 ? null : inCartItems.length,
          tabBarIcon: () => (
            <IconImage source={require('../assets/images/cart.png')} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
