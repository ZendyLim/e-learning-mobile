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
    
    // componentDidMount() {
    //   GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
    //     // play services are available. can now configure library
    //   })
    //   .catch((err) => {
    //     console.log("Play services error", err.code, err.message);
    //   })
    //   GoogleSignin.configure({
    //     scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
    //     // iosClientId: <FROM DEVELOPER CONSOLE>, // only for iOS
    //     webClientId: "108217245320-v76cn6u2ijr4k7207mkf8v0vduosd7he.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
    //     // offlineAccess: true // if you want to access Google API on behalf of the user FROM YOUR SERVER
    //     // hostedDomain: '' // specifies a hosted domain restriction
    //     // forceConsentPrompt: true // [Android] if you want to show the authorization prompt at each login
    //     // accountName: '' // [Android] specifies an account name on the device that should be used
    //   })
    //   .then(() => {
    //     GoogleSignin.currentUserAsync().then((user) => {
    //       console.log('USER', user);
    //       this.setState({user: user});
    //     }).done();
    //   });
    // }
 
    // _signIn(){
    //   GoogleSignin.signIn()
    //   .then((user) => {
    //     this.setState({user: user});
    //   })
    //   .catch((err) => {
    //     console.log('WRONG SIGNIN', err);
    //   })
    //   .done();
    // }
 
    // testOnPress = () => {
    //   GoogleSignin.getAccessToken()
    //   .then((token) => {
    //     console.log(token);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    //   .done();
    // }

    // _callGoogle(){
    //   GoogleSignin.configure({
    //     webClientId: "108217245320-v76cn6u2ijr4k7207mkf8v0vduosd7he.apps.googleusercontent.com",
    //   })
    //   .then(() => {
    //     GoogleSignin.signIn()
    //     .then((user) => {
    //       alert('Hi ' +user.name+' you are succesfully login' )
    //     })
    //     .catch((err) => {
    //       console.log('WRONG SIGNIN', err);
    //     })
    //     .done();
    //   });
    // }
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
          <TouchableOpacity
            style={styles.createGuestButton}
            onPress={this.createGuest}
          >
          <Text style={styles.textWhite}>{ strings.loginGuest }</Text>
          </TouchableOpacity>
          <Text style={styles.textSignWith}>Or Sign In With</Text>
          <View style={styles.socialContainer}>
            <View style={styles.socialButton}>
              <FBLogin 
              buttonView={<FBLoginView />}
                ref={(fbLogin) => { this.fbLogin = fbLogin }}
                permissions={["email","user_friends"]}
                loginBehavior={FBLoginManager.LoginBehaviors.Native}
                onLogin={function(data){
                  _this.setState({ user : data.profile });
                  console.log(data.profile);
                  _thisProp.navigate('NameIn',{
                    fbData : data.profile,
                    userName : data.profile.name, 
                    type : "FACEBOOK"});
                }}
                onLogout={function(){
                  console.log("Logged out.");
                  _this.setState({ user : null });
                }}
                onLoginFound={function(data){
                  console.log("Existing login found.");
                  console.log(data);
                  _this.setState({ user : data.credentials });
                }}
                onLoginNotFound={function(){
                  console.log("No user logged in.");
                  _this.setState({ user : null });
                }}
                onError={function(data){
                  console.log("ERROR");
                  console.log(data);
                }}
                onCancel={function(){
                  console.log("User cancelled.");
                }}
                onPermissionsMissing={function(data){
                  console.log("Check permissions!");
                  console.log(data);
                }}
              />
            </View>

            <View style={styles.socialButton}>
              <GoogleSigninButton
              style={{width: '100%', height: 48}}
              size={GoogleSigninButton.Size.Standard}
              color={GoogleSigninButton.Color.Dark}
              onPress={() => { this.onGoogleSignInButton(); }}
              />
            </View>
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
