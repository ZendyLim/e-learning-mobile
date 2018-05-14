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
        <View style={styles.containerCenter}>
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

  const styles = require('../../styles/style');
export default StudySummaryScreen;