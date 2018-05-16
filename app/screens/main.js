import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  import { List, ListItem } from 'react-native-elements';


import { AppStack , AuthStack, MainStack }  from '../config/router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/user'; //Import your actions
  
class MainScreen extends Component {
    constructor() {
      super();
      this.CheckingGuest();
    }
  
    CheckingGuest = async () => {
      
    };
  
    // Render any loading content that you like here
    render() {
      if (this.props.data.id) {
        return (
            <MainStack />
          );
      }else{
        return (
            <AuthStack />
          );
      }

    }
  }

  const styles = require('../styles/style');

function mapStateToProps(state, props) {
  return {
      data: state.user.user
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
