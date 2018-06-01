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
  import * as Actions from '../../actions/study'; //Import your actions
  import { StudyList } from '../../config/studyList';
  import { quizItems } from '../../config/quiz';
  import Header   from '../../component/header';
import score from '../Study/score';
  class reviewScreen extends Component {
    constructor(props) {
      super(props);
      
    }
  state = {
    typeQuiz: ""
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({
      type: navigation.getParam('type', null),
    });

    //this.processData(navigation.getParam('studyTitle', null));
  
    //Console.log(navigation.getParam('userName', null),"NIAMAK");
  }
  goToTopicSelection = () =>  {
    if(this.state.type == 'Test'){
      const resetAction = NavigationActions.reset({ 
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'StudyList' }),
        ]
      });
      this.props.navigation.dispatch(resetAction);
    }else{
      this.retry();
    }
  }
  retry = () =>  {
    var item = StudyList[this.state.index ];
    item['index'] = this.state.index;
    item['studyType'] = item.title;
    item['headerTitle'] = item.title;

    const resetAction = NavigationActions.reset({ 
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'StudyList' }),
        NavigationActions.navigate({ routeName: 'HiraganaList' , params: item })

      ]
    });
    
    this.props.navigation.dispatch(resetAction);
  
  }
  gotToNext = () =>  {
    var item = StudyList[this.state.index + 1];
    item['index'] = this.state.index + 1;
    item['studyType'] = item.title;
    item['headerTitle'] = item.title;

    const resetAction = NavigationActions.reset({ 
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'StudyList' }),
        NavigationActions.navigate({ routeName: 'HiraganaList' , params: item })

      ]
    });
    
    this.props.navigation.dispatch(resetAction);
  
  }
  getRecord(){
      if(this.state.type == 'QUIZ'){
           return this.props.quiz;
      }else{
            return this.props.test;
      
      }
  }
  countScore = () => {
    var studyRecord = [];
 
    if(this.state.type == 'QUIZ'){
        studyRecord = this.props.quiz;
    }else{
         studyRecord = this.props.test;
    }
 
    var Score = '';
    var CountQuest = studyRecord.length;
    var correct = 0;
    
    for(var i = 0; i < studyRecord.length; ++i) {
      if(studyRecord[i].correct == '1'){
       correct = correct + 1;
     }
    }

    if(CountQuest !== 0 && correct !== 0){
      Score = Math.floor(( correct / CountQuest) * 100 );
    }else{
      Score = 0;
    }

    console.log(Score,'countScore')
    return Score;
  }
  renderItem({item, index}) {
    
    return (
        <View style={scoreStyle.RecordRow}>
            <Text style={scoreStyle.recordTitle}>
                { item.correct_title }
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
    var recordStudy = this.getRecord();
    var score = this.countScore();
    return (
        <View style={scoreStyle.scoreContainer}>
          <View style={ scoreStyle.containerTitle }>
            <Text style={ scoreStyle.textTitle }> { score > 50 ? ( 'You Pass' ) : ('You Failed') }</Text>
          </View>
          <View style={ scoreStyle.containerGraph }>
            <View style={ scoreStyle.absoluteText }>
              <View style={ scoreStyle.containerScore }>
                <Text style={ scoreStyle.scoreTotal }>{ score}/100 </Text>
              </View>
            </View>
            <ProgressCircle
                style={ { height: 140 } }
                progress={ (score / 100) }
                progressColor={'#43b5e7'}
            />
          </View>
          <View style={ scoreStyle.containerMistake }>
            <ScrollView  style={ scoreStyle.containerMainMistake }>
              <Text style={ scoreStyle.sumaryTitle }>SUMMARY</Text>
              <Icon name='lock'  color='#fff' size={10}/>

            {recordStudy[0]  ? (
              <FlatList
                ref='listRef'
                data={recordStudy}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index.toString()}/>
                ) :<Text>No study data</Text> }
            </ScrollView >
          </View>
        </View>
    );
  }

  processData(title){
     var recordStudy = [];
     if(this.state.type == "QUIZ"){
        recordStudy = this.props.quiz;
     }else{
        recordStudy = this.props.test;

     }
      this.quizItems = quizItems[title];
      for(i = 0; i < recordStudy.length; i++){
        current = recordStudy[i];
        current.questionData = this.getData(current.questionID);
        current.answerData = this.getData(current.answer);   
        
        recordStudy[i] = current;
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

  return {
    test: state.summary.testData,
    quiz: state.summary.quizData
  }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(reviewScreen);

