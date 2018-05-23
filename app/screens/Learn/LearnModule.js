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
import { LearnListData } from '../../config/studyList';
import style from 'react-native-datepicker/style';
import LearningModule from '../Study/hiraganaFlashcard';
import HL2Screen from '../Learn/HL2';
import SL2Screen from '../Learn/SL2';
import { HiraganaLearnStack } from '../../config/router';
import NumberLearnScreen from '../Learn/learnsl1';
import GreetingLearnScreen from '../Learn/learngl1';

class LearnHiraganaModule extends Component {
  constructor() {
    super();
    this._onSetLanguageTo('en');
  }
  _onSetLanguageTo(value) {
    strings.setLanguage(value);
  } 
  static navigationOptions = {
    title: 'Learn',
  };
  state = {
    title:"",
    type: "",
    study: "",
    studyType: ""
  }
  componentDidMount() {
    const { navigation } = this.props;
    this.setState({
      title: navigation.getParam('title', null),
      type: navigation.getParam('type', null),
      study: navigation.getParam('study', null),
      studyType: navigation.getParam('studyType', null),
      img: navigation.getParam('img', null),
    });
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
        }else if(this.state.type == 'HL3' || this.state.type == 'GL3'  || this.state.type == 'KL3' || this.state.type == 'BL3' ){
            if(this.state.title == "FLASH_CARD_HIRAGANA" || this.state.title == 'FLASH_CARD_KATAKANA'){
                return (
                    <LearningModule title={ this.state.title } goBack={this}/>     
                );        
                }else{
                return (
                    <LearningModule title={ this.state.studyType }  goBack={this}/>     
                );        
    
            }
        }else if(this.state.type == 'HL4'){
            return (
                <Text>HL4</Text>        
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

export default LearnHiraganaModule;
