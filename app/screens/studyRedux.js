import React, { Component } from 'react';
import  { strings }   from '../config/localization';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    FlatList,
    Text,
    TextInput,
    View,
  } from 'react-native';
  import { List, ListItem } from 'react-native-elements';

  import { bindActionCreators } from 'redux';
  import { connect } from 'react-redux';
  import * as Actions from '../actions/study'; //Import your actions
  
  class StudyReduxScreen extends Component {
    constructor(props) {
      super(props);

      this.renderItem = this.renderItem.bind(this);
      this.state = { 
          score: '',
          scoreFrom: 100,
          studyRecord: '',
          pass: false, 
          StudentID : ''
        };
  }

  render() {
      
          return (
              <View>
               
              </View>
          );
  }

  renderItem({item, index}) {
      return (
          <View style={styles.row}>
              <Text style={styles.title}>
                  ID : {(parseInt(index) + 1)}{". "}{item.questionID}
              </Text>
              <Text style={styles.description}>
                  , time : {item.questionTime}
              </Text>
              <Text style={styles.description}>
                , answer : {item.answer}
              </Text>
              <Text style={styles.description}>
                , mistake :   {item.correct}
              </Text>
             
          </View>
      )
  };
  }

const styles = require('../styles/style');

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
  return {
      StudentID: state.user.user.id,
      studyRecord: state.study.studyRecord,
  }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(StudyReduxScreen);

