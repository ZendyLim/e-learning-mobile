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
    }
    render() {
      return (
        <View style={styles.containerWhite}>
          <Text style={styles.textBlue}>Study Plan</Text>
          <Text>How many times per week?</Text>
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
          <Text>Value: {this.state.day}</Text>

          <Text>How many hours per day?</Text>
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

          <TouchableOpacity
            style= {styles.buttonBlue}
            onPress= {this.saveStudyTime}
          >
          <Text style={styles.textWhite}>Done</Text>
          </TouchableOpacity>
        </View>
      );
    }
  
    saveStudyTime = async () => {
      this.props.createUser('das');   
      this.props.navigation.navigate('App');
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
  export default connect(mapStateToProps, mapDispatchToProps)(TimeScreen);
