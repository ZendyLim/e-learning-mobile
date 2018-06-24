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
    ScrollView,
    Alert,
    Image
  } from 'react-native';
  import { List, ListItem, CheckBox } from 'react-native-elements';
  import { latestEducation, englishLevel, japaneseStudyHistory, major, gender } from '../../config/data';
  import { bindActionCreators } from 'redux';
  import { connect } from 'react-redux';
  import * as Actions from '../../actions/user'; //Import your actions
  import Slider from 'react-native-slider';
  import DatePicker from 'react-native-datepicker'; 
  
  class UserDataScreen extends Component {
    static navigationOptions = {
      title: 'Update Education History',
    };
    state = {
      userId : "",
      userName: "",
      userPass: "",
      gender: "Choose your gender",
      birthdate:"",
      latestEducation : "Choose latest education",
      latestEducationName: "",
      educationMajor: "",
      graduationYear: "",
      englishLevel: "Choose english level",
      japaneseType: "None",
      dateFrom:"",
      dateTo:"",
      startDate : "",
      statusMajor:false,

      graduateMonth:"Month",
      graduateYear:"Year",
      fromMonth:"Month",
      fromYear:"Year",
      toMonth:"Month",
      toYear:"Year",
    }
    constructor(props){
        super(props);
        this.checkMajor = [];
        this.monthList= ["Month","01", "02", "03", "04", "05", "06",
        "07", "08", "09", "10", "11", "12"];
        this.yearList=["Year"];
      }
    
    validation () {
        const { latestEducation, latestEducationName, graduationYear, englishLevel, 
            japaneseType, japaneseSchoolName, dateFrom, dateTo, gender, birthdate, statusMajor,
            graduateMonth, graduateYear, fromMonth, fromYear,toMonth,toYear} = this.state;
        let error = '';
        console.log(latestEducation,"latest")
        // if (!birthdate) error = "Birthdate is required";
        // else if (gender == "Choose your gender") error = "Gender is required";
        // else if (latestEducation == "Choose latest education") error = "Latest Education is required";
        // else if (!latestEducationName) error = "School / University name is required";
        // else if (graduateMonth=="Month" ) error ="please select graduation month";
        // else if (graduateYear=="Year" ) error ="please select graduation year";
        // else if (!graduationYear) error = "Graduation year is required";
        // else if (englishLevel == "Choose english level") error = "English level is required";
        if(japaneseType !="None"){
            if (fromMonth=="Month") error ="please select from month";
            else if (fromYear=="Year") error ="please select from year";
            else if (toMonth=="Month") error ="please select to month";
            else if (toYear=="Year") error ="please select to year";

            if(fromMonth!="Month" && fromYear!="Year" && toMonth!="Month" && toYear!="Year"){
                var fromYearMonth = (fromYear.concat(fromMonth));
                var toYearMonth = (toYear.concat(toMonth));
                if(toYearMonth <= fromYearMonth) error = "Date From Cannot lower than date to";
            }
            // if(!dateFrom) error ="Date From is required";
            // else if(!dateTo) error = "Date to is required";
            // else if(dateTo <= dateFrom) error = "Date From Cannot < than date to";
        }
        if (latestEducation == "University"){
            let stsmajor = false
            for(x=0;x<major.length;x++){
                if(statusMajor[x]){
                    stsmajor=true;
                }
            }
            if(stsmajor==false)error = "Major is required";
        } 

        if (error) {
          Alert.alert('Warning', error);
          return true; 
        }
        else{
          return false;
        }
       
      }

    componentDidMount() {
      const { navigation } = this.props;
      this.setState({
        userId: navigation.getParam('userId', null),
        userName: navigation.getParam('userName', null),
        userPass: navigation.getParam('userPass', null),
        startDate : navigation.getParam('startDate', null),
      });
      this.setYear();
    }

    

    onDateChange = (date) => {
        this.setState({
            graduationYear: date,
        });
    };

    birthDateChange = (date) => {
        this.setState({
            birthdate: date,
        });
    };

    dateFromChange = (date) => {
        this.setState({
            dateFrom: date,
        });
    };
    dateToChange = (date) => {
        this.setState({
            dateTo: date,
        });
    };

    updateGender = (genderUpdate) => {
        this.setState({ gender: genderUpdate })
    }
    updateEnglishLevel = (englishlvl) => {
        this.setState({ englishLevel: englishlvl })
    }
    updateLatestEducation = (educationType) => {
        this.setState({ latestEducation: educationType })
      }
    updateJapaneseType = (japaneseTypeUpdate) => {
        this.setState({ japaneseType: japaneseTypeUpdate })
    }
    updateGraduateMonth = (month) => {
        console.log(month)
        this.setState({ graduateMonth: month })
    }
    updateGraduateYear = (year) => {
        this.setState({ graduateYear: year })
    }

    updateFromMonth = (month) => {
        this.setState({ fromMonth: month })
    }
    updateFromYear = (year) => {
        this.setState({ fromYear: year })
    }
    updateToMonth = (month) => {
        this.setState({ toMonth: month })
    }
    updateToYear = (year) => {
        this.setState({ toYear: year })
    }

    // updateMajor = (majorUpdate) => {
    //     this.setState({ educationMajor: majorUpdate })
    // }

    render() {
    const { navigation } = this.props;
      return (
        <View>
            <ScrollView>
                <View style={styles.containerWhiteTop }>
                <View style={ styles.contentLoginData }>
                    <Text style={styles.textBlue}>Birthdate</Text>
                    <DatePicker
                    style={{width: 130}}
                    date={this.state.birthdate}
                    androidMode="spinner"
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
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
                    onDateChange={this.birthDateChange}
                    />
                    <Text style={styles.textBlue}>Gender</Text>
                    <Picker style={[styles.picker]}
                        style={{ height: 50, width: 200 }}
                        selectedValue = {this.state.gender} onValueChange = {this.updateGender}
                    >
                        {gender.map((item, key) => (
                        <Picker.Item label={item.text} value={item.text} key={key} />
                        ))}
                    </Picker>
                    <Text style={styles.textBlue}>Latest Education</Text>
                    <Picker style={[styles.picker]}
                        style={{ height: 50, width: 200 }}
                        selectedValue = {this.state.latestEducation} onValueChange = {this.updateLatestEducation}
                    >
                        {latestEducation.map((item, key) => (
                        <Picker.Item label={item.text} value={item.text} key={key} />
                        ))}
                    </Picker>
                            
                    <Text style={styles.textBlue}>School / University name</Text>
                    <TextInput style={{height: 40, borderColor: 'gray'}}
                        onChangeText={(latestEducationName) => this.setState({latestEducationName})}
                        value={this.state.latestEducationName}
                    />

                    <Text style={styles.textBlue}>Major</Text>
                    {major.map((item, key)=>(
                        <CheckBox key={key}
                            title={item.text}
                            checked={this.state.statusMajor[key]}
                            onPress={(checked) => this.setCheckMajor(key)}
                        />
                    ))}

                    <Text style={styles.textBlue}>Graduation Year</Text>
                    <View style={styles.monthYearContainer}>
                        <Picker
                            style={styles.monthYear}
                            selectedValue={this.state.graduateMonth} onValueChange = {this.updateGraduateMonth}> 
                            {this.monthList.map((item, index) => {
                                return ( <Picker.Item label={item} value={item} key={index}/>) 
                            })} 
                        </Picker>
                        <Picker
                            style={styles.monthYear}
                            // style={{width: 100}}
                            selectedValue={this.state.graduateYear} onValueChange = {this.updateGraduateYear}> 
                            {this.yearList.map((item, index) => {
                                return ( <Picker.Item label={item} value={item} key={index}/>) 
                            })} 
                        </Picker>
                    </View>
                    {/* <DatePicker
                    style={{width: 130}}
                    date={this.state.graduationYear}
                    androidMode="spinner"
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM"
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
                    /> */}
                    <Text style={styles.textBlue}>Your english level</Text>
                    <Picker style={[styles.picker]}
                        style={{ height: 50, width: 200 }}
                        selectedValue = {this.state.englishLevel} onValueChange = {this.updateEnglishLevel}
                    >
                        {englishLevel.map((item, key) => (
                        <Picker.Item label={item.text} value={item.text} key={key} />
                        ))}
                    </Picker>

                    <Text style={styles.textBlue}>Japanese study history</Text>
                    <Picker style={[styles.picker]}
                        style={{ height: 50, width: 200 }}
                        selectedValue = {this.state.japaneseType} onValueChange = {this.updateJapaneseType}
                    >
                        {japaneseStudyHistory.map((item, key) => (
                        <Picker.Item label={item.text} value={item.text} key={key} />
                        ))}
                    </Picker>
                    <Text style={styles.textBlue}>From</Text>
                    <View style={styles.monthYearContainer}>
                        <Picker
                            style={styles.monthYear}
                            selectedValue={this.state.fromMonth} onValueChange = {this.updateFromMonth}> 
                            {this.monthList.map((item, index) => {
                                return ( <Picker.Item label={item} value={item} key={index}/>) 
                            })} 
                        </Picker>
                        <Picker
                            style={styles.monthYear}
                            // style={{width: 100}}
                            selectedValue={this.state.fromYear} onValueChange = {this.updateFromYear}> 
                            {this.yearList.map((item, index) => {
                                return ( <Picker.Item label={item} value={item} key={index}/>) 
                            })} 
                        </Picker>
                    </View>

                     <Text style={styles.textBlue}>To</Text>
                     <View style={styles.monthYearContainer}>
                        <Picker
                            style={styles.monthYear}
                            selectedValue={this.state.toMonth} onValueChange = {this.updateToMonth}> 
                            {this.monthList.map((item, index) => {
                                return ( <Picker.Item label={item} value={item} key={index}/>) 
                            })} 
                        </Picker>
                        <Picker
                            style={styles.monthYear}
                            // style={{width: 100}}
                            selectedValue={this.state.toYear} onValueChange = {this.updateToYear}> 
                            {this.yearList.map((item, index) => {
                                return ( <Picker.Item label={item} value={item} key={index}/>) 
                            })} 
                        </Picker>
                    </View>
                            
                    {/* <View style={styles.flexRow}>
                        <View style={styles.flex1}>
                            <Text style={styles.textBlue}>From</Text>
                            <View style={styles.monthYearContainer}>
                                <Picker
                                    style={styles.monthYear}
                                    selectedValue={this.state.graduateMonth} onValueChange = {this.updateGraduateMonth}> 
                                    {this.monthList.map((item, index) => {
                                        return ( <Picker.Item label={item} value={index} key={index}/>) 
                                    })} 
                                </Picker>
                                <Picker
                                    style={styles.monthYear}
                                    // style={{width: 100}}
                                    selectedValue={this.state.graduateYear} onValueChange = {this.updateGraduateYear}> 
                                    {this.yearList.map((item, index) => {
                                        return ( <Picker.Item label={item} value={index} key={index}/>) 
                                    })} 
                                </Picker>
                            </View>
                            <DatePicker
                                style={{width: 130}}
                                date={this.state.dateFrom}
                                androidMode="spinner"
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM"
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
                                onDateChange={this.dateFromChange}
                            />
                        </View>
                        <View style={styles.flex1}>
                            <Text style={styles.textBlue}>To</Text>
                            <DatePicker
                                style={{width: 130}}
                                date={this.state.dateTo}
                                androidMode="spinner"
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM"
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
                                onDateChange={this.dateToChange}
                            />
                        </View>
                    </View> */}
                    <TouchableOpacity
                        style={styles.buttonBlue}
                        onPress={this.timeIn}
                    >
                    <Text style={styles.textWhite}>Next</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </ScrollView>
            <View>
                <View style={styles.characterChatContainer}>
                    <Text>Input your latest education, english skill, and Japanese study history</Text>
                </View>
                <Image
                style={styles.characterFixBottom}
                source={require('../../img/character-exp-normal.png')}
                />
            </View>
        </View>
      );
    }
  
    combineYearMonth (year, month) {
        return year + "-" + month;
    }

    timeIn = () => {
        var userData = this.state;
        userData['educationMajor'] = this.combineMajors();
        userData['graduationYear'] = this.combineYearMonth(this.state.graduateYear, this.state.graduateMonth);
        userData['dateFrom'] = this.combineYearMonth(this.state.fromYear, this.state.fromMonth);
        userData['dateTo'] = this.combineYearMonth(this.state.toYear, this.state.toMonth);
        if(!this.validation()){
            this.props.navigation.navigate('TimeIn',(this.state));
        }
    };

    setCheckMajor(key) {
        if(this.checkMajor[key]==true){
            this.checkMajor[key] = false;
            this.setState({ statusMajor: this.checkMajor });
        }
        else{
            this.checkMajor[key] = true;
            this.setState({ statusMajor: this.checkMajor });
        }
    };

    combineMajors = () =>{
        var majorStatus="";
        for(x=0;x<major.length;x++){
          if(this.checkMajor[x] == true){
            majorStatus=majorStatus+1
          }else{
            majorStatus=majorStatus+0
          }
        } 
        return majorStatus;
    }

    setYear(){
        var year= (new Date()).getFullYear();
        for(x=0;x<50;x++){
          this.yearList.push(String(year) );    
          year=year-1;  
        }
        console.log(this.yearList);
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
  export default connect(mapStateToProps, mapDispatchToProps)(UserDataScreen);
  
