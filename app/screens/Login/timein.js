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
      title: 'Create Guest Account',  
    };
    state = {
      userId : "",
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
      studyDay: "",
      studyHours:0.5,
      studyReason: "Choose your Reason",
      finishDate: "",
      statusDays:false,
    }
    constructor(props){
      super(props);
      this.checkDays = [studyDays.map.length];
  }

    componentDidMount() {
      const { navigation } = this.props;
      console.log(this.props,"timein");
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
      });
      console.log(this.state.userId,"lolololo")
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
      // this.combineDays()
      console.log(this.state,"mamak");
      // if(!this.validation()){
      //   this.props.navigation.navigate('Confirmation',(this.state));
      // }
      this.props.navigation.navigate('Confirmation',(userData));
    };

    validation = () => {
      const { studyReason, statusDays, finishDate} = this.state;
      let error = '';
      console.log(statusDays[1],"shit")
      if (studyReason == "Choose your Reason") error = "Study reason is required";
      else if (!statusDays[0] && !statusDays[1] && !statusDays[2] && !statusDays[3]
        && !statusDays[4] && !statusDays[5] && !statusDays[6]) error = "You need to choose at least 1 day";
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
              <Picker style={[styles.picker]}
                style={{ height: 50, width: 250 }}
                selectedValue = {this.state.studyReason} onValueChange = {this.updateReason}
              >
                {studyReasonOption.map((item, key) => (
                  <Picker.Item label={item.text} value={item.text} key={key} />
                ))}
              </Picker>

              <Text style={styles.textBlack}>How many times per week?</Text>
              {studyDays.map((item, key)=>(
                <CheckBox
                  title={item.text}
                  checked={this.state.statusDays[key]}
                  onPress={(checked) => this.checkDay(key)}
                />
              ))}
              <Text style={styles.textBlack}>How many hours per day?</Text>
            
              <Slider
                minimumValue = {0.5}
                maximumValue = {24}
                step = {0.5}
                thumbTintColor ='#45b4e7'
                minimumTrackTintColor = '#45b4e7'
                maximumTrackTintColor = '#999999'
                value={this.state.studyHours}
                onValueChange={(studyHours) => this.setState({studyHours})} 
              />
              <Text>{this.state.studyHours} Hours</Text>
              <Text style={styles.textBlack}>Until when do you plan to finish your japanese studies?</Text>
              <DatePicker
                style={{width: 200}}
                date={this.state.finishDate}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate={new Date()}
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
                // onPress= {this.saveStudyTime}
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


    checkDay(key) {
      if(this.checkDays[key]==true){
          this.checkDays[key] = false;
          this.setState({ statusDays: this.checkDays });
      }
      else{
          this.checkDays[key] = true;
          this.setState({ statusDays: this.checkDays });
      }
    };
    combineDays = () =>{
      var test="";
      for(x=0;x<7;x++){
        if(this.checkDays[x] == true){
          // test=test + studyDays[x].id+1
          test=test+1
        }else{
          test=test+0
          // test=test + studyDays[x].id+0
        }
      } 
      return test;
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
