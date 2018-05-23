import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View,
  } from 'react-native';
  import { List, ListItem } from 'react-native-elements';
    
  import { AppStack , AuthStack }  from '../config/router';
  
  import { bindActionCreators } from 'redux';
  import { connect } from 'react-redux';
  import * as Actions from '../actions/user'; //Import your actions

  class HomeScreen extends Component {
    static navigationOptions = {
      title: 'Home',
    };
   render() {
      return (
        <View style={styles.containerCenter}>
          <Button title="Show me more of the app" onPress={this._showMoreApp} />
          <Button title="Study Redux" onPress={this.testRedux} />
          <Button title="Quiz" onPress={this.takeQuiz} />
          <Button title="Score Screen Quiz" onPress={this.scoreScreen} />
          <Button title="Score Screen Test" onPress={this.scoreScreenTest} />
        </View>
      );
    }
    _showMoreApp = async () => {
      this.props.deleteUserState();
      this.props.navigation.navigate('AuthLoading');
    };

    takeQuiz = () => {
      this.props.navigation.navigate('QuizFlash');
    };

    testRedux = () => {
      this.props.navigation.navigate('StudyReduxScreen');
    }
    quiz = () => {
      this.props.navigation.navigate('QuizMain');
    };  
    scoreScreen = () => {
      this.props.navigation.navigate('ScoreScreen',{
        index : 2,
        typeQuiz : "Quiz",
      });
    };
    scoreScreenTest = () => {
      this.props.navigation.navigate('ScoreScreen',{
        index : 2,
        typeQuiz : "Test",
      });
    };
  }

const styles = require('../styles/style');
  // The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
  return {
      //loading: state.user.loading,
      data: state.user.user
  }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
