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
  } from 'react-native';
  import { List, ListItem } from 'react-native-elements';
  import Slider from 'react-native-slider';
  import DatePicker from 'react-native-datepicker'; 
  import { bindActionCreators } from 'redux';
  import { connect } from 'react-redux';
  import * as Actions from '../../actions/user'; //Import your actions
  
  class TimeScreen extends Component {
    static navigationOptions = {
      title: 'Create Guest Account',
    };
    state = {
      day: 1,
      hours:1,
      userName: "",
      studyReason: "",
      finishDate: "2018-05-11",
      type: "",
    }

    componentDidMount() {
      const { navigation } = this.props;
      console.log(navigation, "timein");
      this.setState({
        userName: navigation.getParam('userName', null),
        studyReason: navigation.getParam('studyReason',null),
        type: navigation.getParam('type',null),
      });
    }

    onDateChange = (date) => {
      this.setState({
        finishDate: date
      });
    };

    saveStudyTime = () => {
      this.props.navigation.navigate('Confirmation',(this.state));
    };

    render() {
      const { navigation } = this.props;
      return (
        <View style={styles.containerWhiteTop}>
          <Text style={styles.textBlue}>Study Plan</Text>
          <Text style={styles.textBlack}>How many times per week?</Text>
          <Slider
            minimumValue = {1}
            maximumValue = {7}
            step = {1}
            thumbTintColor ='#45b4e7'
            minimumTrackTintColor = '#45b4e7'
            maximumTrackTintColor = '#999999'
            value={this.state.day}
            onValueChange={(day) => this.setState({day})} 
          />
          <Text>{this.state.day} Days</Text>
          <Text style={styles.textBlack}>How many hours per day?</Text>
          <Slider
            minimumValue = {1}
            maximumValue = {24}
            step = {1}
            thumbTintColor ='#45b4e7'
            minimumTrackTintColor = '#45b4e7'
            maximumTrackTintColor = '#999999'
            value={this.state.hours}
            onValueChange={(hours) => this.setState({hours})} 
          />
          <Text>{this.state.hours} Hours</Text>
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
          >
          <Text style={styles.textWhite}>Done</Text>
          </TouchableOpacity>
        </View>
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
  export default connect(mapStateToProps, mapDispatchToProps)(TimeScreen);
