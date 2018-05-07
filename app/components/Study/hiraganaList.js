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

  
  class HiraganaListScreen extends Component {
  
    static navigationOptions = {
      header: null,
      title: 'HiraganaList',
    };
  
    render() {
      return (
        <View style={styles.container}>
          <Button title="Hiragana List Page" onPress={this.createGuest} />
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
export default HiraganaListScreen;
