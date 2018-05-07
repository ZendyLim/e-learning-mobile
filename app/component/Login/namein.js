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

  
  class NameScreen extends Component {
    static navigationOptions = {
      title: 'Name',
    };
  
    render() {
      return (
        <View style={styles.container}>
          <Button title="Add name page" onPress={this.addName} />
        </View>
      );
    }
  
    addName = () => {
      this.props.navigation.navigate('TimeIn');
    };

 
  }

  const styles = require('../../style/style');
export default NameScreen;
