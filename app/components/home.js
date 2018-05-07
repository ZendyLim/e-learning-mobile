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
    
  class HomeScreen extends Component {
    static navigationOptions = {
      title: 'Home',
    };
   render() {
      return (
        <View style={styles.container}>
          <Button title="Show me more of the app" onPress={this._showMoreApp} />
        </View>
      );
    }
    _showMoreApp = async () => {
      //this.props.navigation.navigate('Other');
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
    };
  }

const styles = require('../style/style');
export default HomeScreen;
