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
    TextInput,
  } from 'react-native';
  import PhotoUpload from 'react-native-photo-upload'
 
  import { List, ListItem } from 'react-native-elements';
  
  import { bindActionCreators } from 'redux';
  import { connect } from 'react-redux';
  import * as Actions from '../../actions/user'; //Import your actions
  
  class SettingScreen extends Component {
    constructor(props) {
      super(props);
      this.state = { nationality: '',
      school: '',
     };
    }
    static navigationOptions = {
      header: null,
      title: 'Study',
    };
    componentWillMount() {
      console.log('compoent', this.props);
      this.setState({
        nationality: this.props.nationality,
        school: this.props.school,
      });
    }
    render() {
      return (
        // <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.topbackground}>
           </View>

          <View style={styles.downbackground}>
            </View>

          <View style={styles.mainscreen} >
          <View style={ styles.absoluteScreen}>
            <PhotoUpload
                  onPhotoSelect={avatar => {
                    if (avatar) {
                      console.log('Image base64 string: ', avatar)
                    }
                  }}
                >
                  <Image
                    style={{
                      paddingVertical: 30,
                      width: 100,
                      height: 100,
                      borderRadius: 50
                    }}
                    source={{
                      uri: 'https://www.iconspng.com/images/funny-monkey-face/funny-monkey-face.jpg'
                    }}
                  />
                </PhotoUpload>
              </View>
            <View style={styles.topinfor}>
 
              <View style={styles.avatarinformation}>
                <Text style={styles.txtbiginfor}>
                  {this.props.data.userName}
                  {/* ID: { this.props.data.id } */}
                 </Text>
              
               </View>
               
             </View>
            <View style={styles.downinfor}>
              <Text style={styles.txtinfor}>School</Text>
              <TextInput
                style={{height: 40,}}
                onChangeText={(school) => this.setState({school})}
                value={this.state.school}
              />
              <View style={styles.vline}></View>
              <Text style={styles.txtinfor}>Nationaly</Text>
              <TextInput
                style={{height: 40,}}
                onChangeText={(nationality) => this.setState({nationality})}
                value={this.state.nationality}
              />
              <View style={styles.vline}></View>
              <Text style={styles.txtbiginfor}>Study Hours</Text>
              <Text style={styles.txtinfor}>How many times per week?</Text>
              <Text style={styles.txtdata}>{this.props.data.day}</Text>
              <View style={styles.vline}></View>
              <Text style={styles.txtinfor}>How many times per day</Text>
              <Text style={styles.txtdata}>{this.props.data.hours}</Text>
              <View style={styles.vline}></View>
              <TouchableHighlight style={styles.btnupdate} onPress={this.updateProfile.bind(this)}>
                <Text style={styles.txtbutton}>Update</Text>
              </TouchableHighlight>
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
      //console.log(this.state);
      this.props.updateProfile(this.state);
      alert('save');
    }
  }

  const styles = require('../../styles/style');
  
  function mapStateToProps(state, props) {
    return {
        loading: state.user.loading,
        data: state.user.user,
        school: state.user.school,
        nationality: state.user.nationality,
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
  }
  
  //Connect everything
  export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);

