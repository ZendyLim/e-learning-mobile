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
  
  class ConfirmationScreen extends Component {
    static navigationOptions = {
      title: 'Create Guest Account',
    };
    state = {
      userId:"",
      userName : "",
      userPass: "",
      latestEducation : "",
      latestEducationName : "",
      major : "",
      graduationDate : "",
      englishLevel : "",
      japaneseType : "",
      japaneseSchoolName : "",
      dateFrom : "",
      dateTo : "",
      studyDay: 1,
      studyHours:1,
      studyReason: "",
      finishDate: "",
      startDate:"",
    }

    componentDidMount() {
      const { navigation } = this.props;
      this.setState({
        userId : navigation.getParam('userId', null),
        userName : navigation.getParam('userName', null),
        userPass : navigation.getParam('userPass',null),
        latestEducation : navigation.getParam('latestEducation', null),
        latestEducationName : navigation.getParam('latestEducationName', null),
        major : navigation.getParam('major', null),
        graduationDate : navigation.getParam('graduationDate', null),
        englishLevel : navigation.getParam('englishLevel', null),
        japaneseType : navigation.getParam('japaneseType', null),
        japaneseSchoolName : navigation.getParam('japaneseSchoolName', null),
        dateFrom : navigation.getParam('dateFrom', null),
        dateTo : navigation.getParam('dateTo', null),
        studyDay : navigation.getParam('studyDay', null),
        studyHours : navigation.getParam('studyHours', null),
        studyReason : navigation.getParam('studyReason', null),
        finishDate : navigation.getParam('finishDate', null),
        startDate : navigation.getParam('startDate', null),

      });
    }

    saveUserData = async () => {
        var userData = this.state;
        userData.graduationDate =this.unixTimeStamps(this.state.graduationDate) ;
        userData.dateFrom = this.unixTimeStamps(this.state.dateFrom);
        userData['dateTo'] = this.unixTimeStamps(this.state.dateTo); 
        userData['finishDate'] = this.unixTimeStamps(this.state.finishDate);
        this.props.updateProfile(userData);

    };

    unixTimeStamps = (date) =>{
      let toUnixTimestamps = date;
      toUnixTimestamps = toUnixTimestamps + " 00:00:00";
      date = (new Date(toUnixTimestamps).getTime()/1000)
      return date
    }

    
    render() {
      const { navigation } = this.props;
      // const userName = navigation.getParam('userName', null);
      // const userPass = navigation.getParam('userPass',null);
      // const latestEducation = navigation.getParam('latestEducation', null);
      // const latestEducationName = navigation.getParam('latestEducationName', null);
      // const major = navigation.getParam('major', null);
      // const graduationDate = navigation.getParam('graduationDate', null);
      // const englishLevel = navigation.getParam('englishLevel', null);
      // const japaneseType = navigation.getParam('japaneseType', null);
      // const japaneseSchoolName = navigation.getParam('japaneseSchoolName', null);
      // const dateFrom = navigation.getParam('dateFrom', null);
      // const dateTo = navigation.getParam('dateTo', null);
      return (
        <ScrollView>
        <View style={styles.containerWhiteTop}>
          <View style={styles.contentPadding10}>
              <Text style={styles.textBlue}>Username</Text>
              <Text style={styles.textBlack}>{this.state.userName}</Text>
              <Text style={styles.textBlue}>Latest Education</Text>
              <Text style={styles.textBlack}>{this.state.latestEducation}</Text>
              <Text style={styles.textBlue}>School / University name</Text>
              <Text style={styles.textBlack}>{this.state.latestEducationName}</Text>
              <Text style={styles.textBlue}>Major</Text>
              <Text style={styles.textBlack}>{this.state.major}</Text>
              <Text style={styles.textBlue}>Graduation date</Text>        
              <Text style={styles.textBlack}>{this.state.graduationDate}</Text>
              <Text style={styles.textBlue}>Your english level</Text>
              <Text style={styles.textBlack}>{this.state.englishLevel}</Text>
              <Text style={styles.textBlue}>Japanese study history</Text>
              <Text style={styles.textBlack}>{this.state.japaneseType}</Text>
              <Text style={styles.textBlue}>japanese school name</Text>
              <Text style={styles.textBlack}>{this.state.japaneseSchoolName }</Text>
              <Text style={styles.textBlue}>Date from</Text>
              <Text style={styles.textBlack}>{this.state.dateFrom}</Text>
              <Text style={styles.textBlue}>Date to</Text>
              <Text style={styles.textBlack}>{this.state.dateTo}</Text>
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
