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
  
  class ConfirmationScreen extends Component {
    static navigationOptions = {
      title: 'Create Guest Account',
    };

    saveUserData = async () => {
        const { navigation } = this.props;
        let toUnixTimestamps = navigation.state.params.finishDate;
        toUnixTimestamps = toUnixTimestamps + " 00:00:00";
        navigation.state.params.finishDate = (new Date(toUnixTimestamps).getTime()/1000)
        this.props.createUser(navigation.state.params);
    };

    render() {
      const { navigation } = this.props;
      const userName = navigation.getParam('userName', null);
      const studyReason = navigation.getParam('studyReason', null);
      const day = navigation.getParam('day', null);
      const hours = navigation.getParam('hours', null);
      const finishDate = navigation.getParam('finishDate', null);
      return (
        <View style={styles.containerWhiteTop}>
            <Text style={styles.textBlue}>Name</Text>
            <Text style={styles.textBlack}>{userName}</Text>
            <Text style={styles.textBlue}>Why you want to study japanese?</Text>
            <Text style={styles.textBlack}>{studyReason}</Text>
            <Text style={styles.textBlue}>How many times per week?</Text>
            <Text style={styles.textBlack}>{day}</Text>
            <Text style={styles.textBlue}>How many hours per day?</Text>
            <Text style={styles.textBlack}>{hours}</Text>
            <Text style={styles.textBlue}>Until when do you plan to finish your japanese studies?</Text>        
            <Text style={styles.textBlack}>{finishDate}</Text>
            <TouchableOpacity
                style= {styles.buttonBlue}
                onPress= {this.saveUserData}
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
  export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationScreen);
