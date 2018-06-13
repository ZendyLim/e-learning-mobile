import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    AppRegistry,
    Button,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    Text, 
    View, 
    ScrollView
  } from 'react-native';
  import { List, ListItem } from 'react-native-elements';
  import Slider from 'react-native-slider'; 
  import { bindActionCreators } from 'redux';
  import { connect } from 'react-redux';
  import * as Actions from '../../actions/user'; //Import your actions
  import { studyDays, studyReasonOption, major } from '../../config/data';
  
  class ConfirmationScreen extends Component {
    static navigationOptions = {
      title: 'Confirmation',
    };
    state = {
      gender : "",
      birthdate : "",
      latestEducation : "",
      educationMajor : "",
      graduationYear : "",
      englishLevel : "",
      japaneseType : "",
      dateFrom : "",
      dateTo : "",
      studyDay: "",
      studyHours:1,
      studyReason: "",
      finishDate: "",
      startDate: "'" ,
    }

    componentDidMount() {
      const { navigation } = this.props;
      this.setState({
        gender : navigation.getParam('gender', null),
        birthdate : navigation.getParam('birthdate', null),
        latestEducation : navigation.getParam('latestEducation', null),
        latestEducationName : navigation.getParam('latestEducationName', null),
        educationMajor : navigation.getParam('educationMajor', null),
        graduationYear : navigation.getParam('graduationYear', null),
        englishLevel : navigation.getParam('englishLevel', null),
        japaneseType : navigation.getParam('japaneseType', null),
        dateFrom : navigation.getParam('dateFrom', null),
        dateTo : navigation.getParam('dateTo', null),
        studyDay : navigation.getParam('studyDay', null),
        studyHours : navigation.getParam('studyHours', null),
        studyReason : navigation.getParam('studyReason', null),
        finishDate : navigation.getParam('finishDate', null),
        startDate : navigation.getParam('startDate', null),
      });
    }

    saveUserData = () => {
        var userData = this.state;     
        var newFinish = (new Date(this.state.finishDate));
        userData['finishDate'] = newFinish.getTime()/1000;
        userData['dateFrom'] = this.unixTimeStamps(this.state.dateFrom);
        userData['dateTo'] = this.unixTimeStamps(this.state.dateTo);
        userData['birthdate'] = this.unixTimeStamps(this.state.birthdate); 
        var sentParse = {
          data : userData
        }
        console.log(sentParse,'parse');
        this.props.updateProfile(sentParse);

    };

    unixTimeStamps = (date) =>{
      let toUnixTimestamps = date;
      toUnixTimestamps = toUnixTimestamps + " 00:00:00";
      dateVal = (new Date(toUnixTimestamps).getTime()/1000);
      return dateVal;
    }

    
    render() {
      const { navigation } = this.props;
      return (
        <ScrollView>
        <View style={styles.containerWhiteTop}>
          <View style={styles.contentPadding10}>
            <Text style={styles.textBlue}>Birthdate</Text>
            <Text style={styles.textBlack}>{this.state.birthdate}</Text>
            <Text style={styles.textBlue}>Gender</Text>
            <Text style={styles.textBlack}>{this.state.gender}</Text>
            <Text style={styles.textBlue}>Latest Education</Text>
            <Text style={styles.textBlack}>{this.state.latestEducation}</Text>
            <Text style={styles.textBlue}>School / University name</Text>
            <Text style={styles.textBlack}>{this.state.latestEducationName}</Text>
            <Text style={styles.textBlue}>Major</Text>
            <Text style={styles.textBlack}>{ this.getMajor()}</Text>
            <Text style={styles.textBlue}>Graduation Year</Text>        
            <Text style={styles.textBlack}>{this.state.graduationYear}</Text>
            <Text style={styles.textBlue}>Your english level</Text>
            <Text style={styles.textBlack}>{this.state.englishLevel}</Text>
            <Text style={styles.textBlue}>Japanese study history</Text>
            <Text style={styles.textBlack}>{this.state.japaneseType}</Text>
            <Text style={styles.textBlue}>{this.state.dateFrom} - {this.state.dateTo}</Text>   
            <Text style={styles.textBlue}>Study Reason</Text>        
            <Text style={styles.textBlack}>{ this.getStudyReasons()}</Text>
            <Text style={styles.textBlue}>Study Day / Week</Text> 
            <Text style={styles.textBlack}>{ this.getdays()}</Text> 
            <Text style={styles.textBlue}>Study Hours / Day</Text>        
            <Text style={styles.textBlack}>{this.state.studyHours}</Text>
            <Text style={styles.textBlue}>Desired Finish Date</Text>
            <Text style={styles.textBlack}>{this.state.finishDate}</Text>

            <TouchableOpacity
              style= {styles.buttonBlue}
              onPress= {this.saveUserData}
            >
            <Text style={styles.textWhite}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
      );
    }

    getdays(){
      const dayString = this.state.studyDay;
      let splitDay= dayString.split('');
      let dayResult ="";
      for(x=0;x<studyDays.length;x++){
        if(splitDay[x] == 1){
          if(dayResult==""){
            dayResult = dayResult + studyDays[x].text;
          }else{
            dayResult = dayResult + ", " + studyDays[x].text;
          }
        }
      }
      return dayResult
    }

    getStudyReasons(){
      const reasonString = this.state.studyReason;
      let splitReason = reasonString.split('');
      let reasonResult="";
      for(x=0;x<studyReasonOption.length;x++){
        if(reasonString[x] == 1){
          if(reasonResult==""){
            reasonResult = reasonResult + studyReasonOption[x].text;
          }else{
            reasonResult = reasonResult + ", " + studyReasonOption[x].text;
          }
        }
      }
      return reasonResult
    }

    getMajor(){
      const majorString = this.state.educationMajor;
      let splitMajor = majorString.split('');
      let majorResult ="";
      for(x=0;x<major.length;x++){
        if(splitMajor[x] == 1){
          if(majorResult==""){
            majorResult = majorResult + major[x].text;
          }else{
            majorResult = majorResult + ", " + major[x].text;
          }
        }
      }
      return majorResult
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
  export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationScreen);
