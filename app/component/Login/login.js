/*
Author : andy william
Page : Login Screen 
Comment : Login screen for study aplicaion
*/
import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View,
  } from 'react-native';
  import { List, ListItem } from 'react-native-elements';

  
  class LoginScreen extends Component {
  
    static navigationOptions = {
      header: null,
      //title: 'Login Page',
    };
  
    render() {
      return (
        <View style={styles.container}>
          <Button title="Quest Login" onPress={this.createGuest} />
        </View>
      );
    }
  
    //createGuest = async () => {
    createGuest = () => {
      //await AsyncStorage.setItem('userToken', 'abc');
      this.props.navigation.navigate('NameIn');
    };
  }

const styles = require('../../style/style');
export default LoginScreen;
