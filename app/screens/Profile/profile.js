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
    unknownImage = "data:image/gif;base64,R0lGODlhGAEYAZEAAP///+Xl5ZmZmQAAACwAAAAAGAEYAQAC/4yPqcvtD6OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+s73/g8MCofEovGITCqXzKbzCY1Kp9Sq9YrNarfcrvcLVgrG4bJxjE6r1+y1+b1ry+dzuD1Gz+vV975pDxjo5kfIIXiIKFC4OJHo+KjIKBkAWVk5SWip6Yh5t/mZ2PkGSnooGlaaCnjKpeoayGr1OgsbO0WLq2crldtbtwvlKzwI3DR8jFZsjMysLMYM7fwDTc0m7VOdnXbNo+0dyW3zPQ4eLkP+bQ6Dzq7Owg5f7k4SXz//Vx9/P5Jvvx/Sz9+/DgHzDTRUUOBBDAkVLrTQUN9DhhHhTbxQ0eJFCv8ZNW6U0NHjxwch242EUBLdSZQpx61s0NLkywQxVc5EUNPmTQM5dd7sSW4nT6AudxItOvNo0J9KvRlt6jQpVG1Mp0Z7arVZ1azIsHLtKvUr2JViqb0sa3Yk2rQb17Kd6LZa27hX4dLVavfusbl6h13sO3Yh4L15B/cqbDgX4sS0/jJWvPixKseSZ/GtPJky5lSXN5Pq7PnTx9CfR5MWffK0JrKqL6VuDYk1bE6vZ4eSbVvQ2dy6w/LO4/X3L9/C5QQvbm0rcmLEl2877pyM0OjMmzsXOpS69Onat3PXjj179PDir5PvTp4S9fTqx6cHfx4+dPPK5Vt3X3/9fPy7uyf/y68fgPTdtxx2/nlHIHIG+hfegQ0yuCB6EdonYHEPSvhdgBMOmCGH+/32HoUf8haihh0WWKKHI9rGnogngsheewrGKKNwNNZI4o04sqjjjD3CqOOOrQV5AJBE5khkkbMlucCQTCqg2pNQkiZlk55VaWVlWDKA2ZZcaunllI+FmSVjZJZp2JlipqkmTWa26SabcCo52JxxAmYnTnXmqWdffPap15903iXooHQVWp5biCa61qJCiuUoo5BGemikj2Zl6aVWZVoppXFx+qmlnTo66qKlInpqoakKuuqfrfL5ap6x2jnrnLXCeWubuaq565m9kvlrmMF6GaqoioLaKLJo6WWqKVTMFutpsqQSqqqctI5pa5e8hiZslFjyyCSSP9p4o4orLhmfi7ipq9aB8tTmYH/uvhuZu6DN+9w/+K7izr63SeOvJbsEDMopBGdWyMGN+aHwYaM0LAwqEAemxcRvyWJxNlVk7NMyHHeMxMf9hCxyQkSU3NDJKBek8sojD+FyQC3HLJEQNBsE8801B6HzzkD0LNLPQIOMzdBL2Ww0UjwnnU7OTFPl9NNyRS11XUtXffE0WGdd9NZ4Xe01YUiHLTbYZPsy89kOj6322ma3vTDbcMf99tyupG333VTnjXDdfJcm99+lkFAAADs=";
    state = {
      userName: "",
      latestEducation : "",
      latestEducationName: "",
      major: "",
      graduationYear: "",
      englishLevel: "",
      japaneseType: "",
      japaneseSchoolName : "",
      dateFrom:"",
      dateTo :"",
      image : "data:image/gif;base64,R0lGODlhGAEYAZEAAP///+Xl5ZmZmQAAACwAAAAAGAEYAQAC/4yPqcvtD6OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+s73/g8MCofEovGITCqXzKbzCY1Kp9Sq9YrNarfcrvcLVgrG4bJxjE6r1+y1+b1ry+dzuD1Gz+vV975pDxjo5kfIIXiIKFC4OJHo+KjIKBkAWVk5SWip6Yh5t/mZ2PkGSnooGlaaCnjKpeoayGr1OgsbO0WLq2crldtbtwvlKzwI3DR8jFZsjMysLMYM7fwDTc0m7VOdnXbNo+0dyW3zPQ4eLkP+bQ6Dzq7Owg5f7k4SXz//Vx9/P5Jvvx/Sz9+/DgHzDTRUUOBBDAkVLrTQUN9DhhHhTbxQ0eJFCv8ZNW6U0NHjxwch242EUBLdSZQpx61s0NLkywQxVc5EUNPmTQM5dd7sSW4nT6AudxItOvNo0J9KvRlt6jQpVG1Mp0Z7arVZ1azIsHLtKvUr2JViqb0sa3Yk2rQb17Kd6LZa27hX4dLVavfusbl6h13sO3Yh4L15B/cqbDgX4sS0/jJWvPixKseSZ/GtPJky5lSXN5Pq7PnTx9CfR5MWffK0JrKqL6VuDYk1bE6vZ4eSbVvQ2dy6w/LO4/X3L9/C5QQvbm0rcmLEl2877pyM0OjMmzsXOpS69Onat3PXjj179PDir5PvTp4S9fTqx6cHfx4+dPPK5Vt3X3/9fPy7uyf/y68fgPTdtxx2/nlHIHIG+hfegQ0yuCB6EdonYHEPSvhdgBMOmCGH+/32HoUf8haihh0WWKKHI9rGnogngsheewrGKKNwNNZI4o04sqjjjD3CqOOOrQV5AJBE5khkkbMlucCQTCqg2pNQkiZlk55VaWVlWDKA2ZZcaunllI+FmSVjZJZp2JlipqkmTWa26SabcCo52JxxAmYnTnXmqWdffPap15903iXooHQVWp5biCa61qJCiuUoo5BGemikj2Zl6aVWZVoppXFx+qmlnTo66qKlInpqoakKuuqfrfL5ap6x2jnrnLXCeWubuaq565m9kvlrmMF6GaqoioLaKLJo6WWqKVTMFutpsqQSqqqctI5pa5e8hiZslFjyyCSSP9p4o4orLhmfi7ipq9aB8tTmYH/uvhuZu6DN+9w/+K7izr63SeOvJbsEDMopBGdWyMGN+aHwYaM0LAwqEAemxcRvyWJxNlVk7NMyHHeMxMf9hCxyQkSU3NDJKBek8sojD+FyQC3HLJEQNBsE8801B6HzzkD0LNLPQIOMzdBL2Ww0UjwnnU7OTFPl9NNyRS11XUtXffE0WGdd9NZ4Xe01YUiHLTbYZPsy89kOj6322ma3vTDbcMf99tyupG333VTnjXDdfJcm99+lkFAAADs=",
    }
    componentWillMount(){
      if(this.props.user){
        this.setState({
          userName: this.props.user.username,
          latestEducation: this.props.user.latestEducation,
          latestEducationName: this.props.user.latestEducationName,
          major: this.props.user.major,
          graduationYear: this.props.user.graduationYear,
          englishLevel: this.props.user.englishLevel,
          japaneseType: this.props.user.japaneseType,
          japaneseSchoolName: this.props.user.japaneseSchoolName,
          dateFrom: this.props.user.dateFrom,
          dateTo: this.props.user.dateTo,
          image: "data:image/jpg;base64,"+this.props.user.image,
        });
      }

    }
    
    getData = () =>{
      //this.props.getUserProfile()
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
        graduationYear: date
      });
    };

    saveUserData = () => {
      var userData = this.state;
      // userData.graduationYear =this.unixTimeStamps(this.state.graduationYear) ;
      // userData.dateFrom = this.unixTimeStamps(this.state.dateFrom);
      // userData['dateTo'] = this.unixTimeStamps(this.state.dateTo); 
      var newFinish = (new Date(this.state.finishDate));
      var sentParse = {
        data : userData
      }
      console.log(sentParse,"parse");
      alert("DATA UPDATED");
      this.props.updateProfile(sentParse);

  };

  saveUserDataImage = (image) => {
    var userData = this.state;
    // userData.graduationYear =this.unixTimeStamps(this.state.graduationYear) ;
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
    render() {
      console.log(this.state.image, "image");
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
                    this.saveUserDataImage(avatar);
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
                date={this.state.graduationYear}
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

