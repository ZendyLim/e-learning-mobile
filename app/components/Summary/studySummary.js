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

  import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

  class StudySummaryScreen extends Component {
  
    static navigationOptions = {
      header: null,
      title: 'Summary',
    };
  
    componentDidMount() {
      GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
        // play services are available. can now configure library
      })
      .catch((err) => {
        console.log("Play services error", err.code, err.message);
      })
      GoogleSignin.configure({
        scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
        // iosClientId: <FROM DEVELOPER CONSOLE>, // only for iOS
        webClientId: "108217245320-8arphui0r2qimm0d2jhu3jlde3s963k5.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
        // offlineAccess: true // if you want to access Google API on behalf of the user FROM YOUR SERVER
        // hostedDomain: '' // specifies a hosted domain restriction
        // forceConsentPrompt: true // [Android] if you want to show the authorization prompt at each login
        // accountName: '' // [Android] specifies an account name on the device that should be used
      })
      .then(() => {
        // you can now call currentUserAsync()
      });
    }
 
    _signIn(){
      GoogleSignin.signIn()
      .then((user) => {
        console.log(user);
        this.setState({user: user});
      })
      .catch((err) => {
        console.log('WRONG SIGNIN', err);
      })
      .done();
    }
 
    testOnPress = () => {
      GoogleSignin.getAccessToken()
      .then((token) => {
        console.log(token);
      })
      .catch((err) => {
        console.log(err);
      })
      .done();
    }
    render() {
      return (
        <View style={styles.container}>
          <GoogleSigninButton
          style={{width: 48, height: 48}}
          size={GoogleSigninButton.Size.Icon}
          color={GoogleSigninButton.Color.Dark}
          onPress={this._signIn.bind(this)}/>
        </View>
      );
    }
    _signIn(){
      Console.log('test');
    }
    //createGuest = async () => {
    createGuest = () => {
      //await AsyncStorage.setItem('userToken', 'abc');
      this.props.navigation.navigate('NameIn');
    };
  }

  const styles = require('../../styles/style');
export default StudySummaryScreen;
