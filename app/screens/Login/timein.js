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
    ScrollView,
    Picker,
    Alert,
    Image
  } from 'react-native';
  import { List, ListItem, CheckBox } from 'react-native-elements';
  import { studyDays, studyReasonOption } from '../../config/data';
  import Slider from 'react-native-slider';
  import DatePicker from 'react-native-datepicker'; 
  import { bindActionCreators } from 'redux';
  import { connect } from 'react-redux';
  import * as Actions from '../../actions/user'; //Import your actions
  import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox'; 
  
  class TimeScreen extends Component {
    static navigationOptions = {
      title: 'Update Study Plan',  
    };
    state = {
      userId : "",
      userName : "",
      gender:"",
      birthdate:"",
      latestEducation : "",
      latestEducationName : "",
      educationMajor : "",
      graduationYear : "",
      englishLevel : "",
      japaneseType : "",
      dateFrom : "",
      dateTo : "",
      studyDay: "",
      studyHours:0.5,
      studyReason: "",
      finishDate: "",
      statusDays:false,
      statusReasons:false,
      minFinishDate:new Date(),
    }
    constructor(props){
      super(props);
      this.checkDays = [];
      this.checkReasons =[];
    }

    componentDidMount() {
      const { navigation } = this.props;
      console.log(this.props,"timein");
      this.setState({
        userId : navigation.getParam('userId', null),
        userName : navigation.getParam('userName', null),
        userPass : navigation.getParam('userPass',null),
        gender  :navigation.getParam('gender',null),
        birthdate  :navigation.getParam('birthdate',null),
        latestEducation : navigation.getParam('latestEducation', null),
        latestEducationName : navigation.getParam('latestEducationName', null),
        educationMajor : navigation.getParam('educationMajor', null),
        graduationYear : navigation.getParam('graduationYear', null),
        englishLevel : navigation.getParam('englishLevel', null),
        japaneseType : navigation.getParam('japaneseType', null),
        dateFrom : navigation.getParam('dateFrom', null),
        dateTo : navigation.getParam('dateTo', null),
        startDate : navigation.getParam('startDate', null),
      });
    }

    onDateChange = (date) => {
      this.setState({
        finishDate: date
      });
    };

    updateReason = (reason) => {
      this.setState({ studyReason: reason })
    }

    saveStudyTime = async () =>{
      var userData = this.state;
      userData['studyDay'] = this.combineDays();
      userData['studyReason'] = this.combineReasons();
      
      if(!this.validation()){
        this.props.navigation.navigate('Confirmation',(this.state));
      }
    };

    validation = () => {
      const { studyReason, finishDate, statusReasons, statusDays} = this.state;
      let error = ''
      let stsReason = false;
      let stsDay = false;
      for(x=0;x<studyReasonOption.length;x++){
          if(statusReasons[x]){
            stsReason=true;
          }
      }
      
      for(x=0;x<studyDays.length;x++){
        if(statusDays[x]){
          stsDay=true;
        }
    }
    if(stsReason==false)error = "Study Reason is required";
    else if(stsDay==false)error = "You need to choose at least 1 day";
    else if (!finishDate) error = "Desired finish date is required";
      if (error) {
        Alert.alert('Warning', error);
        return true; 
      }
      else{
        return false;
      }
    }
    
    render() {
      const { navigation } = this.props;
      return (
        <View>
          <ScrollView>
            <View style={styles.containerWhiteTop}>
            <View style={styles.contentLoginData}>
              <Text style={styles.textBlue}>Study Plan</Text>
              <Text style={styles.textBlack}>Why you want to study Japanese?</Text>
              {studyReasonOption.map((item, key)=>(
                <CheckBox key={key}
                  title={item.text}
                  checked={this.state.statusReasons[key]}
                  onPress={(checked) => this.setCheckReason(key)}
                />
              ))}

              <Text style={styles.textBlack}>How many times per week?</Text>
              {studyDays.map((item, key)=>(
                <CheckBox key={key}
                  title={item.text}
                  checked={this.state.statusDays[key]}
                  onPress={(checked) => this.setCheckDay(key)}
                />
              ))}
              <Text style={styles.textBlack}>How many hours per day?</Text>
            
              <Slider
                minimumValue = {0.5}
                maximumValue = {8}
                step = {0.5}
                thumbTintColor ='#45b4e7'
                minimumTrackTintColor = '#45b4e7'
                maximumTrackTintColor = '#999999'
                value={this.state.studyHours}
                onValueChange={(studyHours) => [this.setState({studyHours}), this.setFinishDate()]} 
              />
              <Text>{this.state.studyHours} Hours</Text>
              <Text style={styles.textBlack}>Until when do you plan to finish your japanese studies?</Text>
              <DatePicker
                style={{width: 200}}
                date={this.state.finishDate}
                androidMode="spinner"
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate={this.state.minFinishDate}
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
              <TouchableOpacity
                style= {styles.buttonBlue}
                onPress= {this.saveStudyTime}
              >
              <Text style={styles.textWhite}>Done</Text>
              </TouchableOpacity>
            </View>
            </View>
          </ScrollView>
          <View>
            <View style={styles.characterChatContainer}>
                <Text>Choose your study plan</Text>
            </View>
            <Image
            style={styles.characterFixBottom}
            source={require('../../img/character-exp-normal.png')}
            />
          </View>
        </View>
      );
    }

    

    setCheckDay(key) {
      if(this.checkDays[key]==true){
          this.checkDays[key] = false;
          this.setState({ statusDays: this.checkDays });
      }
      else{
          this.checkDays[key] = true;
          this.setState({ statusDays: this.checkDays });
      }
      this.setFinishDate()
    };

    setCheckReason(key) {
      if(this.checkReasons[key]==true){
          this.checkReasons[key] = false;
          this.setState({ statusReasons: this.checkReasons });
      }
      else{
          this.checkReasons[key] = true;
          this.setState({ statusReasons: this.checkReasons });
      }
    };

    combineDays = () =>{
      var dayStatus="";
      for(x=0;x<7;x++){
        if(this.checkDays[x] == true){
          dayStatus=dayStatus+1
        }else{
          dayStatus=dayStatus+0
        }
      } 
      return dayStatus;
    }

    combineReasons = () =>{
      var reasonStatus="";
      for(x=0;x<studyReasonOption.length;x++){
        if(this.checkReasons[x] == true){
          reasonStatus=reasonStatus+1
        }else{
          reasonStatus=reasonStatus+0
        }
      } 
      return reasonStatus;
    }

    setFinishDate(){
      const totalHours=70;
      const days = this.countDays();
      const hours = this.state.studyHours;

      var test= Math.ceil((totalHours/(days * hours)))
      var today=new Date(); 
      var minDate=new Date(today.getFullYear(),today.getMonth(),today.getDate()+(test*7))
      this.setState({ minFinishDate: minDate });
    }

    countDays(){
      let totalDays=0;
      for(x=0;x<7;x++){
        if(this.checkDays[x] == true){
          totalDays= totalDays+1
        }
      }
      return totalDays;
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
  export default connect(mapStateToProps, mapDispatchToProps)(TimeScreen);
