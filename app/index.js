import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { StackNavigator, SwitchNavigator } from 'react-navigation'; // Version can be specified in package.json

//import stack router for Each component
import { AppStack , AuthStack }  from './config/router';

import { Provider } from 'react-redux';

import configureStore from './lib/store';

const { persistor, store } = configureStore();

//import component Splash screen
import SplashScreen from './components/splashscreen';

import { PersistGate } from 'redux-persist/integration/react'

//Remove Error Warning For router navigation
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const Root =  SwitchNavigator(
  {
    AuthLoading: SplashScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
class App extends Component {
  render() {
      return (
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Root />
            </PersistGate>
          </Provider>
      );
  }
}

export default App;