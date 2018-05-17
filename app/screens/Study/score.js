import React, { Component } from 'react';
import  { strings }   from '../../config/localization';
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
  import { ProgressCircle }  from 'react-native-svg-charts'

  import { bindActionCreators } from 'redux';
  import { connect } from 'react-redux';
  import * as Actions from '../../actions/study'; //Import your actions
  
  class ScoreScreen extends Component {
    constructor(props) {
      super(props);
  }
  render() {
    return (
        <View>
          <View>
            <Text>You Pass</Text></View>
          <View>
            <ProgressCircle
                style={ { height: 200 } }
                progress={ 0.7 }
                progressColor={'rgb(134, 65, 244)'}
            />
          </View>
        </View>
    );
  }


  }

const styles = require('../../styles/style');

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
    console.log( state.study.studyRecord);
  return {
      StudentID: state.user.user.id,
      startTime: state.study.startTime,
      endTime: state.study.endTime,
      studyType: state.study.studyType,
      studyRecord: state.study.studyRecord,
      studyID: state.study.studyID,
  }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(ScoreScreen);

