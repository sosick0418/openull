import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import PageCart from '../screens/PageCart';
import PageList from '../screens/PageList';
import PageSearch from '../screens/PageSearch';
import { useSelector } from 'react-redux';
import { RootState } from '../../types';

const Tab = createBottomTabNavigator();

export function BottomTab() {
  const inCartItems = useSelector<RootState>(state => state.cartItem.products);
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={PageList}
        options={{ header: () => null }}
      />
      <Tab.Screen
        name="Search"
        component={PageSearch}
        options={{ header: () => null }}
      />
      <Tab.Screen
        name="Cart"
        component={PageCart}
        options={{ header: () => null, tabBarBadge: inCartItems?.length }}
      />
    </Tab.Navigator>
  );
}
