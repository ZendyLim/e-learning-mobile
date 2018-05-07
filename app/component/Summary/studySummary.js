/*
Author : andy william
Page : Study Summary Screen 
Comment : Study Summary screen for study aplicaion
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

  
  class StudySummaryScreen extends Component {
  
    static navigationOptions = {
      header: null,
      title: 'Summary',
    };
  
    render() {
      return (
        <View style={styles.container}>
          <Button title="Study Summary" onPress={this.createGuest} />
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
export default StudySummaryScreen;
