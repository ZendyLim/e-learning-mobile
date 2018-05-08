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

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'; //Import your actions
  
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
       //setTimeout(() => {
            this.props.navigation.navigate(userToken ? 'App' : 'Auth');
        ////}, 5000);   
      
    };
  
    // Render any loading content that you like here
    render() {
      if (this.props.data) {
        console.log('ada data');
      }else{
        console.log('no data');
      }
      return (
        <View style={styles.container}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    }
  }

  const styles = require('../styles/style');

  // The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
  return {
      //loading: state.user.loading,
      data: state.user.user
  }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
//export default SplashScreen;
