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

class LearnListScreen extends Component {
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
    arrList : []
  }
  componentDidMount() {
    const { navigation } = this.props;
    this.setState({
      index: navigation.getParam('index', null),
      title: navigation.getParam('title', null),
      type: navigation.getParam('type', null),
      studyType: navigation.getParam('studyType', null),
      categoryId:  navigation.getParam('categoryId', null),
      item: LearnListData[navigation.getParam('studyType', null)],
      img: navigation.getParam('img', null),
    });
  }
  navigateToPage=(item, index)=>{
    item['index'] = this.state.index;
    item['studyType'] = this.state.studyType;
    item['img'] = this.state.img;
    item['categoryId'] = this.state.categoryId;
    // item['datatopic'] = this.state.datatopic;
    // item['config'] = this.state.config;
    console.log(item);

    this.props.navigation.navigate('LearnHiraganaModule',(item));
  }

  render() {
    
    if(this.state.item){
      return (
        <ScrollView style={study.StudyContainer}>
         { this.state.item.map((item, key)=>(
          <TouchableOpacity key={key} style={study.btnLearn} onPress={this.navigateToPage.bind(this, item, key)}>
              <Text>{item.title}</Text>
          </TouchableOpacity>
        ))}
        </ScrollView>
      );
    }else{
      return (
        <Text>{ this.state.studyType }</Text> 
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

export default LearnListScreen;
