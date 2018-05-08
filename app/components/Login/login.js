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
    TouchableOpacity,
  } from 'react-native';
  import { List, ListItem } from 'react-native-elements';
  import FBSDK, {LoginManager, AccessToken} from 'react-native-fbsdk';

  
  import { bindActionCreators } from 'redux';
  import { connect } from 'react-redux';
  import * as Actions from '../../actions/user'; //Import your actions
  
  class LoginScreen extends Component {
    constructor() {
      super();
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
    
    _fbAuth(){
      LoginManager.logInWithReadPermissions(['email'])
      .then(function(result){
        console.log(result,'niamak');
        // if (result.isCancelled){
        //   console.log('Login was cancelled');
        // }else{
        //   console.log('Login was successful' + result.grantedPermissions.toString());
        // }
      },function(error){
        console.log('Error was occured: ' + error );
      })
    }

    render() {
      return (
        <View style={styles.containerBlue}>
          <TouchableOpacity
            style={styles.createGuestButton}
            onPress={this.createGuest}
          >
          <Text style={styles.textWhite}>{ strings.loginGuest }</Text>
          </TouchableOpacity>
          <Text style={styles.textSignWith}>Or Sign In With</Text>
          <TouchableOpacity onPress={this._fbAuth.bind(this)}>
          <Text>Facebook</Text>
          </TouchableOpacity>
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
