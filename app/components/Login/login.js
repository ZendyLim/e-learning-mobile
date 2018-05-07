import React, { Component } from 'react';
import  { strings }   from '../../config/localization';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  import { List, ListItem } from 'react-native-elements';

  
  class LoginScreen extends Component {
    constructor() {
      super();
      this._onSetLanguageTo('ja');
    }
    _onSetLanguageTo(value) {
      strings.setLanguage(value);
      //this.setState({});
    }
    static navigationOptions = {
      header: null,
      //title: 'Login Page',
    };
  
    render() {
      return (
        <View style={styles.container}>
          <Button title={ strings.loginGuest } onPress={this.createGuest} />
        </View>
      );
    }
  
    //createGuest = async () => {
    createGuest = () => {
      //await AsyncStorage.setItem('userToken', 'abc');
      this.props.navigation.navigate('NameIn');
    };
  }

const styles = require('../../styles/style');
export default LoginScreen;
