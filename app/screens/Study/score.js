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

  class ScoreScreen extends Component {
    constructor(props) {
      super(props);
      
  }
  state = {
    typeQuiz: ""
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({
      typeQuiz: navigation.getParam('typeQuiz', null),
      index: navigation.getParam('index', null),
    });
    
    //Console.log(navigation.getParam('userName', null),"NIAMAK");
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
  retry = () =>  {
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
                { item.questionID + ' - ' + item.answer }
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
            <Text style={ scoreStyle.textTitle }> { this.props.scoreTotal > 50 ? ( 'You Pass' ) : ('You Failed') }</Text>
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

            {this.props.studyRecord[0] ? (
              <FlatList
                ref='listRef'
                data={this.props.studyRecord}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index.toString()}/>
                ) :<Text>No study data</Text> }
            </ScrollView >
          </View>
          { this.props.scoreTotal > 20 ? ( 
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


  }

const styles = require('../../styles/style');
const scoreStyle = require('../../styles/score');
const study = require('../../styles/study');

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
  const Score = '';
  const CountQuest = state.study.studyRecord.length;
  var correct = 0;
  for(var i = 0; i < state.study.studyRecord.length; ++i) {
    if(state.study.studyRecord[i].correct == '1'){
     correct = correct + 1;
   }
  }
  if(CountQuest !== 0 && correct !== 0){
    score = Math.floor(( correct / CountQuest) * 100 );
  }else{
    score = 0;
  }
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

