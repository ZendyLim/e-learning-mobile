import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View,
    AppRegistry,
    TouchableOpacity,
    Text,
    TextInput,
    Picker,
    Alert,
    Image
  } from 'react-native';
  import { List, ListItem } from 'react-native-elements';
  import { bindActionCreators } from 'redux';
  import { connect } from 'react-redux';
  import * as Actions from '../../actions/user'; //Import your actions
  import {isLogin} from '../../reducers/user';
  import  { strings }   from '../../config/localization';
  
  
  class UsernameScreen extends Component {
    static navigationOptions = {
      title: strings['SIGN_IN'],
    };
    state = {
      userId: "",
      username: "",
      password: "",
      startTime: "",
      // userPassConfirm:"",
    }
    

    // componentDidMount() {
    //   const { navigation } = this.props;
    //   this.setState({
    //     userFB: navigation.getParam('fbData', null),
    //     userName: navigation.getParam('userName', null),
    //     type: navigation.getParam('type',null),
    //   });
    // }

    // updateName = (name) => {
    //   this.setState({ userName: name })
    // }
    // updateReason = (reason) => {
    //   this.setState({ studyReason: reason })
    // }
  


    render() {
      return (
        <View style={styles.containerWhiteTop}>
          <View style={styles.contentPadding10}>
            <Text style={styles.textBlue}>{strings['SIGN_IN_USERNAME']}</Text>
            <TextInput style={{height: 40, borderColor: 'gray'}}
              onChangeText={(username) => this.setState({username})}
              value={this.state.username}
            />
            <Text style={styles.textBlue}>{strings['SIGN_IN_PASSWORD']}</Text>
            <TextInput secureTextEntry={true} style={{height: 40, borderColor: 'gray'}}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
            />
            <TouchableOpacity
              style={styles.buttonBlue}
              onPress={this.signIn}
            >
            <Text style={styles.textWhite}>{strings['SIGN_IN']}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.characterChatContainer}>
            <Text>{strings['SIGN_IN_MESSAGE']}</Text>
          </View>
          {/* <Image
          style={styles.characterFixLogin}
          source={require('../../img/character-exp-normal.png')}
          /> */}
        </View>
      );
    }
 
    signIn = async () => {
      if(!this.validation()){
        this.props.login(this.state, data => {
          if(!this.checkUserValid(data)){
            var startDate =  new Date() / 1000 ;
            this.setState({ userId: data.user._id , startDate : startDate }); 
            this.props.navigation.navigate('UserData',(this.state));
          }
        });
      }    
    };


    checkUserValid= (data) => {
      let error = '';
      if(data.success==false) error = strings['SIGN_IN_VALIDATION_FAILED'];
      if (error) {
        Alert.alert(strings['WARNING'], error);
        return true; 
      }
      else{
        return false;
      } 
    }

    validation = () => {
      const { username, password} = this.state;
      let error = '';
      if (!username) error = strings['SIGN_IN_VALIDATION_USERNAME'];
      else if (!password) error = strings['SIGN_IN_VALIDATION_PASSWORD'];
      if (error) {
        Alert.alert(strings['WARNING'], error);
        return true; 
      }
      else{
        return false;
      } 
    }
  }

  const styles = require('../../styles/style');
  function mapStateToProps(state, props) {
    return {
        loading: state.user.loading,
        data: state.user.user,
        isLogin: state.user.isLogin,
        userID : state.user.userID
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
  }
  
  //Connect everything
  export default connect(mapStateToProps, mapDispatchToProps)(UsernameScreen);
  
