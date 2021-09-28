/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';

// import {Provider} from 'react-redux';
// import store from './src/redux/store';

import Navigator from './src/routes/homeStack';

const App = () => {
  useEffect(() => {
    // pushNotifications();
  }, []);

  return (
    // <Provider store={store}>
    <Navigator />
    // </Provider>
  );
};

export default App;
