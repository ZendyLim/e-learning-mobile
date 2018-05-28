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
import { StudyList } from '../../config/studyList';

class SummaryTopicList extends Component {
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
    type: "",
  }
  componentDidMount() {
    const { navigation } = this.props;
    this.setState({
        studyType: navigation.getParam('type', null),
    });
  }
 
  navigateToPage=(item, index)=>{
    item['studyType'] = this.state.studyType;
    this.props.navigation.navigate('summaryLearn',(
        item
    ));
  }

  render() {
    if(this.state.studyType ){
      return (
        <ScrollView style={study.StudyContainer}>
            { StudyList.map((item, key)=>(
                <TouchableOpacity key={key} style={study.btnLearn} onPress={this.navigateToPage.bind(this, item, key)}>
                    <Text>{strings[item.title]}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
      );
    }else{
      return (
        <Text>none</Text> 
      );
    }
  }


}

const styles = require('../../styles/style');
const study = require('../../styles/study');

export default SummaryTopicList;
