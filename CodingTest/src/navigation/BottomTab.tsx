import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import PageCart from '../screens/PageCart';
import PageList from '../screens/PageList';
import PageSearch from '../screens/PageSearch';
import { useSelector } from 'react-redux';
import { RootState } from '../../types';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

export function BottomTab() {
  const inCartItems = useSelector<RootState>(state => state.cartItem.products);
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={PageList}
        options={{
          header: () => null,
          tabBarIcon: () => (
            <Image
              source={require('../assets/images/home.png')}
              resizeMode={'contain'}
              style={{
                width: '20%',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={PageSearch}
        options={{
          header: () => null,
          tabBarIcon: () => (
            <Image
              source={require('../assets/images/search.png')}
              resizeMode={'contain'}
              style={{
                width: '20%',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={PageCart}
        options={{
          header: () => null,
          tabBarBadge: inCartItems?.length === 0 ? null : inCartItems?.length,
          tabBarIcon: () => (
            <Image
              source={require('../assets/images/cart.png')}
              resizeMode={'contain'}
              style={{
                width: '25%',
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
