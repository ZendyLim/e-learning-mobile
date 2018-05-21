import React, { Component } from 'react';
import  { strings }   from '../../config/localization';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    TextInput,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
  } from 'react-native';
  import { List, ListItem } from 'react-native-elements';
  import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
  import FBLoginView from '../../component/fblogin';
  import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

  
  import { bindActionCreators } from 'redux';
  import { connect } from 'react-redux';
  import * as Actions from '../../actions/user'; //Import your actions
  
  class LoginScreen extends Component {
    constructor() {
      super();
      this.state = { 
        Username: '',
        Password: '',
      };
      this._onSetLanguageTo('en');
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
        <View style={ login.container}>
          <View style={ login.logoContainer }>
            <Text>adsa</Text>
          </View>
          <View style={ login.charaContainer }>
            <Text>adsa</Text>
          </View>
          <View style={ login.textContainer }>
            <Text>Username</Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(Username) => this.setState({Username})}
              value={this.state.Username}
            />
            <Text>Password</Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(Password) => this.setState({Password})}
              value={this.state.Password}
            />
          </View>
          <View style={ login.buttonContainer }>
             <TouchableHighlight onPress={this.createGuest.bind(this)}><Text>Login</Text></TouchableHighlight>
          </View>
        </View>
      );
    }
  
    createGuest = () => {
      this.props.navigation.navigate('NameIn',{
        type : "GUEST",
      })
    };
  }

const styles = require('../../styles/style');
const login = require('../../styles/customStyle');

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
