/*
Author : andy william
Page : Home Screen 
Comment : Home screen for srudy aplicaion
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

  
  class TimeScreen extends Component {
    static navigationOptions = {
      title: 'Time',
    };
  
    render() {
      return (
        <View style={styles.container}>
          <Button title="Add Time page" onPress={this.saveStudyTime}/>
        </View>
      );
    }
  
    saveStudyTime = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('App');
    };

 
  }

  const styles = require('../../style/style');
export default TimeScreen;
