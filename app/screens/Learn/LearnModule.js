import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image,
    TouchableOpacity, 
} from 'react-native';
import { Icon } from 'react-native-elements';
import  { strings }   from '../../config/localization';
import { LearnListData , StudyList} from '../../config/studyList';
import style from 'react-native-datepicker/style';
import LearningModule from '../Study/hiraganaFlashcard';
import HL2Screen from '../Learn/HL2';
import SL2Screen from '../Learn/SL2';
import { HiraganaLearnStack } from '../../config/router';
import NumberLearnScreen from '../Learn/learnsl1';
import GreetingLearnScreen from '../Learn/learngl1';
import HL4 from '../sketch';
//import GoiLearn1 from '../Learn/goilearn1';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/study'; //Import your actions
import { studyList } from '../Study/studyList';
import LearnGBK01Screen from '../Learn/LearnGBK01';

class LearnHiraganaModule extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = ({ navigation }) =>{
    //header: null,
    const {state} = navigation;
    return {
      title: `${strings['TITLE_LEARN']}`,
      swipeEnabled: false
    };
  };

  state = {
    index: "",
    title:"",
    type: "",
    study: "",
    studyType: "",
    categoryId : "",
    reduxData : [],
  }
  componentDidMount() {
    const { navigation } = this.props;
    this.setState({
      index: navigation.getParam('index', null),
      title: navigation.getParam('title', null),
      type: navigation.getParam('type', null),
      study: navigation.getParam('study', null),
      studyType: navigation.getParam('studyType', null),
      img: navigation.getParam('img', null),
      categoryId : navigation.getParam('categoryId', null),
      startTime : ( new Date().getTime() / 1000),
      reduxData : this.setSentParamStart(navigation.getParam('index', null), navigation.getParam('categoryId', null), navigation.getParam('type', null)) 
    }); 
  }

  setSentParamStart = (index, categoryId, type ) =>{
    var startTime = ( new Date().getTime() / 1000);
    var value = {
        type : "LEARN",
        topicId : StudyList[index].topic_id,
        startTime : startTime,
        categoryId : StudyList[index].topic_id + categoryId, 
        studyId : StudyList[index].topic_id + categoryId + type
      }

      return value;
  }
  componentWillUnmount(){
        var data = this.state.reduxData;
        data['finishTime'] = ( new Date().getTime() / 1000);
        this.props.endLearn(data);
  }
  goBack = () => {
     this.navigation.navigate('LearnListScreen');
  }
  render() {
    if(this.state.type){
        if(this.state.type == 'HL1'){
            if(this.state.studyType == 'HIRAGANA_TITLE'){
                return (
                    <HiraganaLearnStack />        
                );            
            }else if(this.state.studyType == 'NUMBER_TITLE'){
                return (
                    <NumberLearnScreen studyType={this.state.studyType} img={this.state.img}/>       
                );            
            }else{
                return (
                    <GreetingLearnScreen studyType={this.state.studyType} img={this.state.img}/>       
                );            
            }

        }else if(this.state.type == 'HL2'){
            if(this.state.studyType == 'HIRAGANA_TITLE'){
                return (
                    <HL2Screen />        
                );            
            }else if(this.state.studyType == 'NUMBER_TITLE'){
                return (
                    <SL2Screen />        
                );            
            }
        }else if(this.state.type == 'HL3' || this.state.type == 'GL2'  || this.state.type == 'KL2' || this.state.type == 'BL2' ){
            if(this.state.title == "FLASH_CARD_HIRAGANA" || this.state.title == 'FLASH_CARD_KATAKANA'){
                return (
                    <LearningModule navigation={this.props.navigation} title={ this.state.title } goBack={this}/>     
                );        
                }else{
                return (
                    <LearningModule navigation={this.props.navigation} title={ this.state.studyType }  goBack={this}/>     
                );        
    
            }
        }if( this.state.type == 'GL3'  || this.state.type == 'KL3' || this.state.type == 'BL3' ){
                return (
                   // <LearningModule navigation={this.props.navigation} title={ this.state.studyType }  goBack={this}/>     
                   <Text>New</Text>
                );            
        }   
        else if(this.state.type == 'HL4'){
            return (
                <HL4 />        
            );        
        }else 
        if(this.state.type == 'GL1'){
                return (
                    <LearnGBK01Screen 
                    studyType={this.state.studyType} img={this.state.img} listType={this.state.type} 
                    />
                );
        } else 
        if(this.state.type == 'BL1') {
                return (
                    <LearnGBK01Screen 
                    studyType={this.state.studyType} img={this.state.img} listType={this.state.type} 
                    />
                );
        } else 
        if(this.state.type == 'KL1') {
                return (
                    <LearnGBK01Screen 
                    studyType={this.state.studyType} img={this.state.img} listType={this.state.type} 
                    />
                );
        }
    }else{
        return (
            <Text>Module</Text>        
        );
    }
  
  }

  //createGuest = async () => {
  selectList = () => {
    //await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('HiraganaList');
  };
}

const styles = require('../../styles/style');
const study = require('../../styles/study');


// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
    return {
        StudentID: state.user.user.id,
       
    }
  }
  
  // Doing this merges our actions into the component’s props,
  // while wrapping them in dispatch() so that they immediately dispatch an Action.
  // Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
  }
  
  //Connect everything
  export default connect(mapStateToProps, mapDispatchToProps)(LearnHiraganaModule);
  