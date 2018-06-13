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
    Modal,
    TouchableOpacity,
  } from 'react-native';
  import LocalizedString from "react-native-localization";
import { List, ListItem } from 'react-native-elements';
import { NavigationActions } from 'react-navigation'; 

import PhotoUpload from 'react-native-photo-upload'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/user'; //Import your actions
import FBLoginView from '../../component/fblogin';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import DatePicker from 'react-native-datepicker'; 
import  { strings }   from '../../config/localization';
  
  class ProfileScreen extends Component {
    static navigationOptions = {
      header: null,
      title: 'Profile',
    };
    unknownImage = "data:image/gif;base64,R0lGODlhGAEYAZEAAP///+Xl5ZmZmQAAACwAAAAAGAEYAQAC/4yPqcvtD6OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+s73/g8MCofEovGITCqXzKbzCY1Kp9Sq9YrNarfcrvcLVgrG4bJxjE6r1+y1+b1ry+dzuD1Gz+vV975pDxjo5kfIIXiIKFC4OJHo+KjIKBkAWVk5SWip6Yh5t/mZ2PkGSnooGlaaCnjKpeoayGr1OgsbO0WLq2crldtbtwvlKzwI3DR8jFZsjMysLMYM7fwDTc0m7VOdnXbNo+0dyW3zPQ4eLkP+bQ6Dzq7Owg5f7k4SXz//Vx9/P5Jvvx/Sz9+/DgHzDTRUUOBBDAkVLrTQUN9DhhHhTbxQ0eJFCv8ZNW6U0NHjxwch242EUBLdSZQpx61s0NLkywQxVc5EUNPmTQM5dd7sSW4nT6AudxItOvNo0J9KvRlt6jQpVG1Mp0Z7arVZ1azIsHLtKvUr2JViqb0sa3Yk2rQb17Kd6LZa27hX4dLVavfusbl6h13sO3Yh4L15B/cqbDgX4sS0/jJWvPixKseSZ/GtPJky5lSXN5Pq7PnTx9CfR5MWffK0JrKqL6VuDYk1bE6vZ4eSbVvQ2dy6w/LO4/X3L9/C5QQvbm0rcmLEl2877pyM0OjMmzsXOpS69Onat3PXjj179PDir5PvTp4S9fTqx6cHfx4+dPPK5Vt3X3/9fPy7uyf/y68fgPTdtxx2/nlHIHIG+hfegQ0yuCB6EdonYHEPSvhdgBMOmCGH+/32HoUf8haihh0WWKKHI9rGnogngsheewrGKKNwNNZI4o04sqjjjD3CqOOOrQV5AJBE5khkkbMlucCQTCqg2pNQkiZlk55VaWVlWDKA2ZZcaunllI+FmSVjZJZp2JlipqkmTWa26SabcCo52JxxAmYnTnXmqWdffPap15903iXooHQVWp5biCa61qJCiuUoo5BGemikj2Zl6aVWZVoppXFx+qmlnTo66qKlInpqoakKuuqfrfL5ap6x2jnrnLXCeWubuaq565m9kvlrmMF6GaqoioLaKLJo6WWqKVTMFutpsqQSqqqctI5pa5e8hiZslFjyyCSSP9p4o4orLhmfi7ipq9aB8tTmYH/uvhuZu6DN+9w/+K7izr63SeOvJbsEDMopBGdWyMGN+aHwYaM0LAwqEAemxcRvyWJxNlVk7NMyHHeMxMf9hCxyQkSU3NDJKBek8sojD+FyQC3HLJEQNBsE8801B6HzzkD0LNLPQIOMzdBL2Ww0UjwnnU7OTFPl9NNyRS11XUtXffE0WGdd9NZ4Xe01YUiHLTbYZPsy89kOj6322ma3vTDbcMf99tyupG333VTnjXDdfJcm99+lkFAAADs=";
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
      dateTo :"",
      modalVisible: false,
      image : "data:image/gif;base64,R0lGODlhGAEYAZEAAP///+Xl5ZmZmQAAACwAAAAAGAEYAQAC/4yPqcvtD6OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+s73/g8MCofEovGITCqXzKbzCY1Kp9Sq9YrNarfcrvcLVgrG4bJxjE6r1+y1+b1ry+dzuD1Gz+vV975pDxjo5kfIIXiIKFC4OJHo+KjIKBkAWVk5SWip6Yh5t/mZ2PkGSnooGlaaCnjKpeoayGr1OgsbO0WLq2crldtbtwvlKzwI3DR8jFZsjMysLMYM7fwDTc0m7VOdnXbNo+0dyW3zPQ4eLkP+bQ6Dzq7Owg5f7k4SXz//Vx9/P5Jvvx/Sz9+/DgHzDTRUUOBBDAkVLrTQUN9DhhHhTbxQ0eJFCv8ZNW6U0NHjxwch242EUBLdSZQpx61s0NLkywQxVc5EUNPmTQM5dd7sSW4nT6AudxItOvNo0J9KvRlt6jQpVG1Mp0Z7arVZ1azIsHLtKvUr2JViqb0sa3Yk2rQb17Kd6LZa27hX4dLVavfusbl6h13sO3Yh4L15B/cqbDgX4sS0/jJWvPixKseSZ/GtPJky5lSXN5Pq7PnTx9CfR5MWffK0JrKqL6VuDYk1bE6vZ4eSbVvQ2dy6w/LO4/X3L9/C5QQvbm0rcmLEl2877pyM0OjMmzsXOpS69Onat3PXjj179PDir5PvTp4S9fTqx6cHfx4+dPPK5Vt3X3/9fPy7uyf/y68fgPTdtxx2/nlHIHIG+hfegQ0yuCB6EdonYHEPSvhdgBMOmCGH+/32HoUf8haihh0WWKKHI9rGnogngsheewrGKKNwNNZI4o04sqjjjD3CqOOOrQV5AJBE5khkkbMlucCQTCqg2pNQkiZlk55VaWVlWDKA2ZZcaunllI+FmSVjZJZp2JlipqkmTWa26SabcCo52JxxAmYnTnXmqWdffPap15903iXooHQVWp5biCa61qJCiuUoo5BGemikj2Zl6aVWZVoppXFx+qmlnTo66qKlInpqoakKuuqfrfL5ap6x2jnrnLXCeWubuaq565m9kvlrmMF6GaqoioLaKLJo6WWqKVTMFutpsqQSqqqctI5pa5e8hiZslFjyyCSSP9p4o4orLhmfi7ipq9aB8tTmYH/uvhuZu6DN+9w/+K7izr63SeOvJbsEDMopBGdWyMGN+aHwYaM0LAwqEAemxcRvyWJxNlVk7NMyHHeMxMf9hCxyQkSU3NDJKBek8sojD+FyQC3HLJEQNBsE8801B6HzzkD0LNLPQIOMzdBL2Ww0UjwnnU7OTFPl9NNyRS11XUtXffE0WGdd9NZ4Xe01YUiHLTbYZPsy89kOj6322ma3vTDbcMf99tyupG333VTnjXDdfJcm99+lkFAAADs=",
    }

    setModalVisible(visible) {
      this.setState({modalVisible: true});
    }

    setModalClose() {
      this.setState({modalVisible: false});
    }
    componentWillMount(){
      console.log(this.props.image);
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
          image: this.props.user.image,
        });
      }

    }
    
    getData = () =>{
      //this.props.getUserProfile()
    }

    _onSetLanguageTo = (value) => {
      if(value){
        strings.setLanguage(value);
      }else{
        strings.setLanguage('en');
      }
      this.setState({modalVisible: false});
      this.props.localization(value);
      const resetAction = NavigationActions.reset({ 
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'ProfileMain' }),
        ]
      });
  
      this.props.navigation.dispatch(resetAction);
      
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

    _gotoSetting = async () => {
      this.props.deleteUserState();
      this.props.navigation.navigate('mainSettings');
    };

    onDateChange = (date) => {
      this.setState({
        graduationDate: date
      });
    };

    saveUserData = () => {
      var userData = this.state;
      // userData.graduationDate =this.unixTimeStamps(this.state.graduationDate) ;
      // userData.dateFrom = this.unixTimeStamps(this.state.dateFrom);
      // userData['dateTo'] = this.unixTimeStamps(this.state.dateTo); 
      var newFinish = (new Date(this.state.finishDate));
      var sentParse = {
        data : userData
      }
      alert("DATA UPDATED");
      this.props.updateProfile(sentParse);

  };

  saveUserDataImage = (image) => {
    //var userData = this.state;
    // userData.graduationDate =this.unixTimeStamps(this.state.graduationDate) ;
    // userData.dateFrom = this.unixTimeStamps(this.state.dateFrom);
    // userData['dateTo'] = this.unixTimeStamps(this.state.dateTo); 
    var sentParse = {
      data : {
        image : image
      }
    }
    alert("DATA UPDATED");
    this.props.updateProfile(sentParse);
  };

  sentActiveClassEN = () => {
    if(this.props.lang){
      if(this.props.lang == 'en'){
        return 'modalActive';
      }else{
        return 'modalNonActive';
      }
    }else{
      return 'modalActive';
    }
  }

  sentActiveClassJA = () => {
    if(this.props.lang){
      if(this.props.lang == 'en'){
        return 'modalNonActive';
      }else{
        return 'modalActive';
      }
    }else{
      return 'modalNonActive';
    }
  }



  render() {
      return (
        <ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContainerInside}>
              <Text　style={styles.modalTitle}>{ strings['SETTING_LANGUAGES']}</Text>
              <View style={styles.modalRow}>
                <View style={styles.modalActiveContainer}>
                  <TouchableHighlight style={styles[this.sentActiveClassEN()]}
                    onPress={() => {
                      this._onSetLanguageTo("en");
                    }}>
                    <Text>ENGLISH</Text>
                  </TouchableHighlight>
                </View>
                <View style={styles.modalActiveContainer}>
                  <TouchableHighlight style={ styles[this.sentActiveClassJA()]}
                    onPress={() => {
                      this._onSetLanguageTo("ja");
                    }}>
                    <Text>日本語</Text>
                  </TouchableHighlight>
                </View>
              </View>
              <TouchableHighlight style={styles.modalClose}
                onPress={() => {
                  this.setModalClose();
                }}>
                <Text style={styles.modalCloseText}>{ strings['PROFILE_MODAL_CLOSE'] }</Text>
              </TouchableHighlight>

            </View>
          </View>
        </Modal>
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
                    this.saveUserDataImage("data:image/jpg;base64,"+ avatar);
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
                  uri: this.state.image
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
                onPress={this.saveUserData.bind(this)}
              >
                <Text style={styles.txtupdateButton}>Update</Text>
              </TouchableHighlight>

              <TouchableOpacity  onPress={() => {
                this.setModalVisible(true);
              }}>
                <Text style={styles.menuOption}>{ strings['SETTING_LANGUAGES_PROFILE']}</Text>
                <View style={styles.vline}></View>
              </TouchableOpacity>

              <TouchableOpacity onPress={this._gotoSetting}>
                <Text style={styles.menuOption}>Setting</Text>
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
    console.log(state.user.user);
    return {
        user: state.user.user,
        lang: state.user.lang
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
  }
  
  //Connect everything
  export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

