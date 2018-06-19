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
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
  } from 'react-native';
  import { NavigationActions } from 'react-navigation'; 
  import { List, ListItem } from 'react-native-elements';
  import { ProgressCircle }  from 'react-native-svg-charts'
  import { Icon } from 'react-native-elements';

  import { bindActionCreators } from 'redux';
  import { connect } from 'react-redux';
  import * as Actions from '../../actions/summary'; //Import your actions
  import { StudyList } from '../../config/studyList';
  import * as Helper from '../../actions/helper';  
  import Header   from '../../component/header';
  class HistoryDetailScreen extends Component {
    static navigationOptions = ({ navigation }) =>{
        //header: null,
        const {state} = navigation;
        return {
          title: `${strings['HISTORY']}`,
        };
      };
    
    constructor(props) {
      super(props);
      
      this.item = [];
      this.scoreTotal = 0;
    }
  state = {
    typeQuiz: ""
  }

  componentWillMount() {
    const { navigation } = this.props;
    initialParams = {
      questions: navigation.getParam('questions', null),
    }    
    this.item = initialParams.questions;
    var score = Helper.countScore(this.item);

    this.scoreTotal = score;
    console.log(this.scoreTotal);
  }


  renderItem({item, index}) {
    
    return (
        <View style={scoreStyle.RecordRow}>
            <Text style={scoreStyle.recordTitle}>
                { item.correctTitle }
            </Text>
            { item.correct == '1' ? (
            <View style={scoreStyle.recordCorrect}>
              <Icon name='check-circle'  type='font-awesome' color='#00ff00' size={30}/>
            </View>
            ) : (
            <View style={scoreStyle.recordMistake}>
              <Icon name='times-circle' type='font-awesome' color='#ff0000' size={30}/>
            </View>
           ) }
           
        </View>
    )
};
  render() {
    
    return (
        <View style={scoreStyle.scoreContainer}>
          <View style={ scoreStyle.containerTitle }>
            <Text style={ scoreStyle.textTitle }> { this.scoreTotal >= 80 ? ( 'You Pass' ) : ('You Failed') }</Text>
          </View>
          <View style={ scoreStyle.containerGraph }>
            <View style={ scoreStyle.absoluteText }>
              <View style={ scoreStyle.containerScore }>
                <Text style={ scoreStyle.scoreTotal }>{ this.scoreTotal}/100 </Text>
              </View>
            </View>
            <ProgressCircle
                style={ { height: 140 } }
                progress={ (this.scoreTotal / 100) }
                progressColor={'#43b5e7'}
            />
          </View>
          <View style={ scoreStyle.containerMistake }>
            <ScrollView  style={ scoreStyle.containerMainMistake }>
              <Text style={ scoreStyle.sumaryTitle }>SUMMARY</Text>
              <Icon name='lock'  color='#fff' size={10}/>

            {this.item[0]  ? (
            <View>
              <FlatList
                ref='listRef'
                data={this.item}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index.toString()}/>
              <View style={ scoreStyle.getData }></View>
            </View>
                ) :<Text>No study data</Text> }
            </ScrollView >
          </View>

        </View>
    );
  }

  processData(title){
    
      this.quizItems = quizItems[title];
      for(i = 0; i < this.props.studyRecord.length; i++){
        current = this.props.studyRecord[i];
        current.questionData = this.getData(current.questionID);
        current.answerData = this.getData(current.answer);   
        
        this.props.studyRecord[i] = current;
      }
    
  }

  getData(val){
    return this.quizItems.find(function (obj) { 
      return obj.id == val; 
    });
  }


  }

const styles = require('../../styles/style');
const scoreStyle = require('../../styles/score');
const study = require('../../styles/study');

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {

  const score = Helper.countScore(state.study.studyRecord,state.study.quizSize);

  return {
      StudentID: state.user.user.id,
      studyRecord: state.study.studyRecord,
      studyID: state.study.studyID,
      scoreTotal : score,
  }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(HistoryDetailScreen);

