import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    TouchableHighlight,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
  } from 'react-native';
  import { List, ListItem } from 'react-native-elements';
  
  import { bindActionCreators } from 'redux';
  import { connect } from 'react-redux';
  import * as Actions from '../../actions/user'; //Import your actions
  
  class SettingScreen extends Component {
    static navigationOptions = {
      header: null,
      title: 'Study',
    };
  
    render() {
      console.log(this.props);
      return (
        // <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.topbackground}>
           </View>

          <View style={styles.downbackground}>
            </View>

          <View style={styles.mainscreen} >
            <View style={styles.topinfor}>
              <View style={styles.avatarinformation}>
                <Text style={styles.txtbiginfor}>
                  kanako16
                  {/* ID: { this.props.data.id } */}
                 </Text>
                <Text>
                  {/* Name: { this.props.data.name } */}
                  kanako16@gmail.com
                 </Text>
               </View>
              <Image 
                style={styles.avatar} 
                source={{uri: 'https://www.iconspng.com/images/funny-monkey-face/funny-monkey-face.jpg'}} />
             </View>
            <View style={styles.downinfor}>
              <Text style={styles.txtinfor}>School</Text>
              <Text style={styles.txtdata}>BITTTTTTTTTTTTTTTTTTTTTTTTTTTTTT</Text>
              <View style={styles.vline}></View>
              <Text style={styles.txtinfor}>Nationaly</Text>
              <Text style={styles.txtdata}>Chinese</Text>
              <View style={styles.vline}></View>
              <Text style={styles.txtbiginfor}>Study Hours</Text>
              <Text style={styles.txtinfor}>How many times per week?</Text>
              <Text style={styles.txtdata}>6</Text>
              <View style={styles.vline}></View>
              <Text style={styles.txtinfor}>How many times per day</Text>
              <Text style={styles.txtdata}>6</Text>
              <View style={styles.vline}></View>
              <TouchableHighlight style={styles.btnupdate} onPress={this.updateProfile}>
                <Text style={styles.txtbutton}>Update</Text>
              </TouchableHighlight>
              <Text style={styles.txtbiginfor}>Account</Text>
              <Text style={styles.txtinfor}>Sign in:</Text>
              <View style={styles.vgsignin}>
                <TouchableHighlight style={styles.btnsigning} onPress={this.selectList}>
                  <Text style={styles.txtbutton}>
                    <Text style={styles.txtbuttonicon}>G </Text>
                    Google
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.btnsigninf} onPress={this.selectList}> 
                  <Text style={styles.txtbutton}>
                    <Text style={styles.txtbuttonicon}>f </Text>
                    Facebook
                  </Text>
                </TouchableHighlight>
              </View>
             </View>
           </View>
          </ScrollView>
        //  </View>
      );
    }
  
    //createGuest = async () => {
    selectList = () => {
      //await AsyncStorage.setItem('userToken', 'abc');
      this.props.navigation.navigate('HiraganaList');
    };
    updateProfile = () => {
      var updateValue = {
        // user : "facebook",
        id: "2",
        name: "test",
      }
      this.props.updateProfile(updateValue);
    }
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
  export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);

