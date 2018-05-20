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
import LearningModule from '../Study/hiraganaExplanation';
import HL2Screen from '../Learn/HL2';

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
    study: ""
  }
  componentDidMount() {
    const { navigation } = this.props;
    this.setState({
      title: navigation.getParam('title', null),
      type: navigation.getParam('type', null),
      study: navigation.getParam('study', null),
    });
  }
  render() {
    if(this.state.type){
        if(this.state.type == 'HL1'){
            return (
                <Text>HL1</Text>        
            );        
        }else if(this.state.type == 'HL2'){
            return (
                <HL2Screen />        
            );        
        }else if(this.state.type == 'HL3'){
            return (
                <LearningModule />     
            );        
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
