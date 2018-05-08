import React, { Component } from 'react';
import  { strings }   from '../../config/localization';
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

  
  import { bindActionCreators } from 'redux';
  import { connect } from 'react-redux';
  import * as Actions from '../../actions/user'; //Import your actions
  
  class LoginScreen extends Component {
    constructor(props) {
      super(props);
      this._onSetLanguageTo('ja');
    }
    _onSetLanguageTo(value) {
      strings.setLanguage(value);
      //this.setState({});
    }
    static navigationOptions = {
      header: null,
      //title: 'Login Page',
    };
  
    render() {
      return (
        <View style={styles.container}>
          <Button title={ strings.loginGuest } onPress={this.createGuest} />
        </View>
      );
    }
  
    //createGuest = async () => {
    createGuest = () => {
      //await AsyncStorage.setItem('userToken', 'abc');
      this.props.createGuest();
      this.props.navigation.navigate('NameIn');
    };
  }

const styles = require('../../styles/style');

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
  return {
      loading: state.user.loading,
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
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
