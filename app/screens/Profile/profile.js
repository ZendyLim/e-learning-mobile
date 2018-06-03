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
    TouchableOpacity,
  } from 'react-native';
import { List, ListItem } from 'react-native-elements';

import PhotoUpload from 'react-native-photo-upload'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/user'; //Import your actions
import FBLoginView from '../../component/fblogin';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import DatePicker from 'react-native-datepicker'; 
  
  class ProfileScreen extends Component {
    static navigationOptions = {
      header: null,
      title: 'Profile',
    };
    state = {
      userName: "",
      latestEducation : "",
      latestEducationName: "",
      major: "",
      graduationDate: "",
      englishLevel: "",
      japaneseType: "",
      japaneseSchoolName : "",
      dateFrom:"",
      dateTo:""
    }
    componentWillMount(){
     this.getData();
    }

    componentWillUpdate(){
      this.getData();
    }
    
    getData(){
      //this.props.getUserProfile()
      if(this.props.user){
        this.setState({
          userName: this.props.user.username,
          latestEducation: this.props.user.latestEducation,
          latestEducationName: this.props.user.latestEducationName,
          major: this.props.user.major,
          graduationDate: this.props.user.graduationDate,
          englishLevel: this.props.user.englishLevel,
          japaneseType: this.props.user.japaneseType,
          japaneseSchoolName: this.props.user.japaneseSchoolName,
          dateFrom: this.props.user.dateFrom,
          dateTo: this.props.user.dateTo,
        });
      }
    }


    // updateUserData = async () => {
    //   const { navigation } = this.props;
    //   let toUnixTimestamps = navigation.state.params.finishDate;
    //   toUnixTimestamps = toUnixTimestamps + " 00:00:00";
    //   navigation.state.params.finishDate = (new Date(toUnixTimestamps).getTime()/1000)
    //   var nav = navigation.state.params;
    //   nav['id'] = '1';
    //   console.log(nav);
    //   this.props.updateUserProfile(nav);
    // };

    _showMoreApp = async () => {
      this.props.deleteUserState();
      this.props.navigation.navigate('AuthLoading');
    };

    onDateChange = (date) => {
      this.setState({
        graduationDate: date
      });
    };

    render() {
      return (
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.bgColortop}></View>
            <View style={styles.avatarinformation}>
              <View style={styles.nameEmail}>
                <Text>{this.state.userName}</Text>
              </View>
            </View>
            <View style={ styles.profilePicture}>
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
            <View style={styles.profileContent}>
              <Text style={styles.userProfileLabelParent}>Latest Education</Text>
              <Text style={styles.userProfileLabelChild}>School / University</Text>
              <TextInput style={styles.inputStyle}
              onChangeText={(latestEducation) => this.setState({latestEducation})}
              value={this.state.latestEducation}
              />
              <Text style={styles.userProfileLabelChild}>Major</Text>
              <TextInput style={styles.inputStyle}
              onChangeText={(major) => this.setState({major})}
              value={this.state.major}
              />
              <Text style={styles.userProfileLabelChild}>Graduation Year</Text>
              <DatePicker
                style={{width: 100}}
                date={this.state.graduationDate}
                mode="date"
                placeholder="select date"
                format="YYYY-MM"
                // minDate={new Date()}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                }}
                onDateChange={this.onDateChange}
              />
              <Text style={styles.userProfileLabelChild}>English Level</Text>
              <TextInput style={styles.inputStyle}
              onChangeText={(englishLevel) => this.setState({englishLevel})}
              value={this.state.englishLevel}
              />

              <Text style={styles.userProfileLabelParent}>Japanese Study History</Text>
              <Text style={styles.userProfileLabelChild}>{this.state.japaneseType}</Text>

              <TextInput style={styles.inputStyle}
              onChangeText={(japaneseSchoolName) => this.setState({japaneseSchoolName})}
              value={this.state.japaneseSchoolName}
              />
             

              <Text style={styles.inputStyle}>{this.state.dateFrom}  ~  {this.state.dateTo}</Text>

              <Text style={styles.userProfileLabelParent}>Account</Text>
              <Text style={styles.userProfileLabelChild}>Sign In : </Text>
              <View style={styles.socialContainer}>
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
                  // onLoginNotFound={function(){
                  //   console.log("No user logged in.");
                  //   _this.setState({ user : null });
                  // }}
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
              <TouchableHighlight style={styles.btnupdate}
              //  onPress={this.updateProfile.bind(this)}
              >
                <Text style={styles.txtupdateButton}>Update</Text>
              </TouchableHighlight>

              <TouchableOpacity>
                <Text style={styles.menuOption}>Learning Settings</Text>
                <View style={styles.vline}></View>
              </TouchableOpacity>

              <TouchableOpacity onPress={this._showMoreApp}>
                <Text style={styles.menuOption}>Logout</Text>
                <View style={styles.vline}></View>
              </TouchableOpacity>

            </View>
          </View>
        </ScrollView>
      );
    }
  
  }

  const styles = require('../../styles/profileStyle');
  
  function mapStateToProps(state, props) {
    return {
        user: state.user.user
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
  }
  
  //Connect everything
  export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

