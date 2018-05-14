import React, { Component } from 'react';
import { View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import AuthStack from '../config/router';

class LoginMain extends Component {
  render() {
      return (
        <AuthStack />
      );
    }
  }

export default LoginMain;
