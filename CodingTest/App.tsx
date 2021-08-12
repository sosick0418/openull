import React from 'react';
import { Provider } from 'react-redux';
import initStore from './src/redux/store';
import { RootNavigator } from './src/navigation';

const store = initStore();

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
