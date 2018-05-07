/*
Author : andy william
Page : Setting List Screen 
Comment : Setting List screen for study aplicaion
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

  
  class SettingScreen extends Component {
  
    static navigationOptions = {
      header: null,
      title: 'Study',
    };
  
    render() {
      return (
        <View style={styles.container}>
          <Button title="Setting Page" onPress={this.selectList} />
        </View>
      );
    }
  
    //createGuest = async () => {
    selectList = () => {
      //await AsyncStorage.setItem('userToken', 'abc');
      this.props.navigation.navigate('HiraganaList');
    };
  }

  const styles = require('../../style/style');
export default SettingScreen;
