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
  
    createGuest = () => {
      this.props.navigation.navigate('NameIn');
    };
  }

const styles = require('../../styles/style');

function mapStateToProps(state, props) {
  return {
      loading: state.user.loading,
      data: state.user.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
