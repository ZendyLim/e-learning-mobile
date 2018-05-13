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
  
    CheckingGuest = async () => {
       setTimeout(() => {
            this.props.navigation.navigate('App');
        }, 2000);   
      
    };
  
    // Render any loading content that you like here
    render() {
      return (
        <View style={styles.containerCenter}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    }
  }

  const styles = require('../styles/style');

export default SplashScreen;
