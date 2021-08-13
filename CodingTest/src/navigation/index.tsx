import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTab } from './BottomTab';
import PageItemDetail from '../screens/PageItemDetail';
import PageBuy from '../screens/PageBuy';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Ssomee" component={BottomTab} />
        <Stack.Screen
          name="ItemDetail"
          component={PageItemDetail}
          options={{ title: '상세페이지', headerBackTitle: 'Back' }}
        />
        <Stack.Screen
          name="PageBuy"
          component={PageBuy}
          options={{ title: '구매', headerBackTitle: 'Back' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
