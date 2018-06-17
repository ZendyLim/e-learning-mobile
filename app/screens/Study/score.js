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
  class ScoreScreen extends Component {
    static navigationOptions = {
      header: null,
      title: 'Summary',
    };
    
    constructor(props) {
      super(props);
      
      this.item = [];
    }
  state = {
    typeQuiz: ""
  }

  componentDidMount() {
    const { navigation } = this.props;
    initialParams = {
      typeQuiz: navigation.getParam('typeQuiz', null),
      index: navigation.getParam('index', null),
      headerTitle: navigation.getParam('headerTitle', null),
      studyType: navigation.getParam('studyType', null),
    }    

    this.item = StudyList[initialParams.index];
    this.item['index'] = initialParams.index;
    this.item['studyType'] = initialParams.studyType;
    //this.item['headerTitle'] = this.item.title; 
    this.item['headerTitle'] = initialParams.headerTitle;
    console.log(this.item);
  }
  goToTopicSelection = () =>  {    

    if(this.state.typeQuiz == 'Test'){
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
  componentWillUnmount(){
    this.props.getAllRecord();
    this.props.getLockRecord();
  }
  
  retry = () =>  {
    
    var nav = this.setNav(this.state.type, 1);
                     
    const resetAction = NavigationActions.reset(nav);
    
    this.props.navigation.dispatch(resetAction);
  
  }

  setNav(type, index) {
    let nav;

    if(this.item.headerTitle == 'topic_test'){
      nav = { 
        index: index,
        actions: [
          NavigationActions.navigate({ routeName: 'StudyList' }),
          NavigationActions.navigate({ routeName: 'TopicList' , params: this.item })
        ]
      };
    }
    else{
      console.log(this.item);
      nav = { 
        index: index,
        actions: [
          NavigationActions.navigate({ routeName: 'StudyList' }),
          NavigationActions.navigate({ routeName: 'HiraganaList' , params: this.item })
        ]
      };
    }

    return nav;
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
            <Text style={ scoreStyle.textTitle }> { this.props.scoreTotal > 80 ? ( 'You Pass' ) : ('You Failed') }</Text>
          </View>
          <View style={ scoreStyle.containerGraph }>
            <View style={ scoreStyle.absoluteText }>
              <View style={ scoreStyle.containerScore }>
                <Text style={ scoreStyle.scoreTotal }>{ this.props.scoreTotal}/100 </Text>
              </View>
            </View>
            <ProgressCircle
                style={ { height: 140 } }
                progress={ (this.props.scoreTotal / 100) }
                progressColor={'#43b5e7'}
            />
          </View>
          <View style={ scoreStyle.containerMistake }>
            <ScrollView  style={ scoreStyle.containerMainMistake }>
              <Text style={ scoreStyle.sumaryTitle }>SUMMARY</Text>
              <Icon name='lock'  color='#fff' size={10}/>

            {this.props.studyRecord[0]  ? (
            <View>
              <FlatList
                ref='listRef'
                data={this.props.studyRecord}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index.toString()}/>
              <View style={ scoreStyle.getData }></View>
            </View>
                ) :<Text>No study data</Text> }
            </ScrollView >
          </View>
          { this.props.scoreTotal > 80 ? ( 
          <View style={ scoreStyle.containerMistake }>
            <View style={ scoreStyle.RecordRowButton }>
              <View style={ scoreStyle.RecordRowButtonContainer }>
                <TouchableHighlight style={ scoreStyle.buttonWin} onPress={ this.retry }>
                  <View>
                    <Text style={ scoreStyle.buttonWinText }>Retry</Text>
                 </View>  
                </TouchableHighlight>
              </View> 
              <View style={{flex:0.1}}/>
              <View style={ scoreStyle.RecordRowButtonContainer }>
                <TouchableHighlight style={ scoreStyle.buttonWin} onPress={ this.goToTopicSelection }>
                <View>
                    <Text style={ scoreStyle.buttonWinText }> { this.state.typeQuiz == 'Test' ? ( 'Topic List' ) : ( 'Study List') }</Text>
                </View>
                </TouchableHighlight>
              </View> 
            </View> 
          </View> 
          ) : (
            <View style={ scoreStyle.containerMistake }>
            <View style={ scoreStyle.RecordRowButton }>
              <View style={ scoreStyle.RecordRowButtonContainer }>
                <TouchableHighlight style={ scoreStyle.buttonWin}  onPress={ this.retry }>
                <View>
                    <Text style={ scoreStyle.buttonWinText }>Retry</Text>
                 </View>
                </TouchableHighlight>
              </View> 
            </View> 
          </View> 
          ) }
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
export default connect(mapStateToProps, mapDispatchToProps)(ScoreScreen);

