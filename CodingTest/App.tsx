import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PageList from './src/screens/PageList';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PageList">
        <Stack.Screen name="PageList" component={PageList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
