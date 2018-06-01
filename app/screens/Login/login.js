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
    Image
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
    state = {
      userName: "",
    }

    componentDidMount() {
      this._setupGoogleSignin();
    }

    async _setupGoogleSignin() {
      try {
        // await GoogleSignin.hasPlayServices({ autoResolve: true });
        await GoogleSignin.configure({
          webClientId: "108217245320-v76cn6u2ijr4k7207mkf8v0vduosd7he.apps.googleusercontent.com",
          offlineAccess: true
        });
  
        const user = await GoogleSignin.currentUserAsync();
        console.log("userDetails",user);
        this.setState({user});
      }
      catch(err) {
        console.log("There are any error", err.message);
      }
    }
  
    onGoogleSignInButton() {
      GoogleSignin.signIn()
      .then((user) => {
        console.log("userDetails", user);
        this.setState({user: user});
      })
      .catch((err) => {
        console.log('There are some error', err);
      })
      .done();
    }
  
    onGoogleSignOut() {
      GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
        this.setState({user: null});
      })
      .done();
    }
    
    render() {
      var _this = this;
      var _thisProp = this.props.navigation;
      return (
        <View style={styles.containerBlue}>
          <View style={styles.loginText}>
            <Text style={styles.loginTextNormal}>Welcome to</Text>
            <View></View>
            <Text style={styles.loginTextN5}>N5</Text>
            <Text style={styles.loginTextNormal}>Study</Text>
          </View> 
          <Image
          style={styles.loginCharacter}
          source={require('../../img/character-exp-normal.png')}
          />
          <TouchableOpacity
            style={styles.loginButton}
            onPress={this.createUser}
          >
          <Text style={styles.textWhite}>{ strings.loginGuest }</Text>
          </TouchableOpacity>


        </View>
      );
    }
  
    createGuest = () => {
      this.props.navigation.navigate('NameIn',{
        type : "GUEST",
      })
    };

    createUser = () => {
      this.props.navigation.navigate('Username')
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
