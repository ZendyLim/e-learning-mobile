/*
Author : andy william
Page : Splash Screen
Comment : Splash Screenfor srudy aplicaion
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

class SplashScreen extends Component {
    constructor() {
      super();
      this.CheckingGuest();
    }
  
    // Fetch the token from storage then navigate to our appropriate place
    CheckingGuest = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
  
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
       setTimeout(() => {
            this.props.navigation.navigate(userToken ? 'App' : 'Auth');
        }, 5000);   
      
    };
  
    // Render any loading content that you like here
    render() {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    }
  }

  const styles = require('../style/style');
export default SplashScreen;
