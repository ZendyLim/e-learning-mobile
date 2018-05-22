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
    Modal,
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
          questionID: '',
          questionTime: '',
          answer: '',
          mistake: false, 
        };
  }

  setstartlearn = () =>  {
      var startTime = new Date().getTime();
      this.props.startLearn('HL1', startTime,'NUMBER'); //call our action
  }
  setendlearn = () =>  {
      parseValue = {
          StudentID : this.props.StudentID,
          startTime : this.props.startTime,
          endTime :  new Date().getTime(),
          subjectTitle: 'HIRAGANA',
          studyType : this.props.studyType,
          studyID : this.props.studyID,
        }
    this.props.endLearn(parseValue); //call our action
  };
  setendquiz = () =>  {
    parseValue = {
        StudentID : this.props.StudentID,
        startTime : this.props.startTime,
        endTime :  new Date().getTime(),
        subjectTitle: 'HIRAGANA',
        studyType : this.props.studyType,
        studyID : this.props.studyID,
        studyRecord : this.props.studyRecord,
      }
  this.props.endLearn(parseValue); //call our action
};
  
setTakeQuiz = () =>  {
    parseValue = {
        questionID : this.state.questionID,
        questionTime : this.state.questionTime,
        answer :  this.state.answer,
        correct : '1',
    }
  this.props.takeQuiz(parseValue); //call our action
};
  render() {
      
          return (
              <View style={{flex:1, backgroundColor: '#F5F5F5', paddingTop:20}}>
                <Text>Student ID : { this.props.StudentID ? ( this.props.StudentID ) :  'Not Set' }</Text>
                <Text>Start Time : { this.props.startTime ? ( this.props.startTime ) :  'Not Set' }</Text>
                <Text>End Type Time : { this.props.endTime ? ( this.props.endTime ) :  'Not Set' }</Text>
                <Text>StudyType : { this.props.studyType ? ( this.props.studyType ) :  'Not Set' }</Text>
                <Text>StudyID : { this.props.studyID ? ( this.props.studyID ) :  'Not Set' }</Text>
                {this.props.studyRecord[0] ? (
                <FlatList
                      ref='listRef'
                      data={this.props.studyRecord}
                      renderItem={this.renderItem}
                      keyExtractor={(item, index) => index.toString()}/>
                    ) :<Text>No study data</Text> }
                      <Text>question ID</Text>
                       <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                            onChangeText={(questionID) => this.setState({questionID})}
                            value={this.state.questionID}
                        />
                        <Text>question TIME</Text>
                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                            onChangeText={(questionTime) => this.setState({questionTime})}
                            value={this.state.questionTime}
                        />
                        <Text>question ANSWER</Text>
                         <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                            onChangeText={(answer) => this.setState({answer})}
                            value={this.state.answer}
                        />
              <View style={styles.activityIndicatorContainer}>
                 <Button title="setstart" onPress={this.setstartlearn} />
              </View>
              <View style={styles.activityIndicatorContainer}>
                 <Button title="Take Quiz" onPress={this.setTakeQuiz} />
              </View>
              <View style={styles.activityIndicatorContainer}>
                 <Button title="setend" onPress={this.setendlearn} />
              </View>              
              <View style={styles.activityIndicatorContainer}>
                 <Button title="setEndQuiz" onPress={this.setendquiz} />
              </View>
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
                , correct :   {item.correct}
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
export default connect(mapStateToProps, mapDispatchToProps)(StudyReduxScreen);
