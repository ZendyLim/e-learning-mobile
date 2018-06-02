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
  import { List, ListItem } from 'react-native-elements';
  import { latestEducation, englishLevel, japaneseStudyHistory } from '../../config/data';
  import { bindActionCreators } from 'redux';
  import { connect } from 'react-redux';
  import * as Actions from '../../actions/user'; //Import your actions
  import Slider from 'react-native-slider';
  import DatePicker from 'react-native-datepicker'; 
  
  class UserDataScreen extends Component {
    static navigationOptions = {
      title: 'Create Guest Account',
    };
    state = {
      userId : "",
      userName: "",
      userPass: "",
      latestEducation : "Choose latest education",
      latestEducationName: "",
      major: "",
      graduationDate: "",
      englishLevel: "Choose english level",
      japaneseType: "",
      japaneseSchoolName : "",
      dateFrom:"",
      dateTo:""
    }
    
    validation () {
        const { latestEducation, latestEducationName, major, graduationDate, englishLevel, 
            japaneseType, japaneseSchoolName, dateFrom, dateTo} = this.state;
        let error = '';
        console.log(latestEducation,"latest")
        if (latestEducation == "Choose latest education") error = "Latest Education is required";
        else if (!latestEducationName) error = "School / University name is required";
        else if (latestEducation == "University" && !major) error = "Major is required";
        else if (!graduationDate) error = "Graduation date is required";
        else if (englishLevel == "Choose english level") error = "English level is required";
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
      });
    }

    // updateName = (name) => {
    //   this.setState({ userName: name })
    // }

    onDateChange = (date) => {
        this.setState({
            graduationDate: date,
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

    updateEnglishLevel = (englishlvl) => {
        this.setState({ englishLevel: englishlvl })
    }
    updateLatestEducation = (educationType) => {
        this.setState({ latestEducation: educationType })
      }
    updateJapaneseType = (japaneseTypeUpdate) => {
        this.setState({ japaneseType: japaneseTypeUpdate })
    }
    
    render() {
      return (
        <View>
            <ScrollView>
                <View style={styles.containerWhiteTop }>
                <View style={ styles.contentLoginData }>
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
                    <TextInput style={{height: 40, borderColor: 'gray'}}
                        onChangeText={(major) => this.setState({major})}
                        value={this.state.major}
                    />
                    <Text style={styles.textBlue}>Graduation date</Text>
                    <DatePicker
                    style={{width: 130}}
                    date={this.state.graduationDate}
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
                    />
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
                            
                    <Text style={styles.textBlue}>Japanese school name</Text>
                    <TextInput style={{height: 40, borderColor: 'gray'}}
                        onChangeText={(japaneseSchoolName) => this.setState({japaneseSchoolName})}
                        value={this.state.japaneseSchoolName}
                    />
                    <View style={styles.flexRow}>
                        <View style={styles.flex1}>
                            <Text style={styles.textBlue}>From</Text>
                            <DatePicker
                                style={{width: 130}}
                                date={this.state.dateFrom}
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
                    </View>
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
  
    timeIn = () => {
        if(!this.validation()){
            this.props.navigation.navigate('TimeIn',(this.state));
        }
    };

   

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
  
