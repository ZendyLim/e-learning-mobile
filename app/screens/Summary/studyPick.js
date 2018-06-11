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
        categoryId: navigation.getParam('categoryId', null),
    });
  }
 
  navigateToPage=(item, index)=>{
    item['categoryId'] = this.state.categoryId;
    this.props.navigation.navigate('summaryLearn',(
        item
    ));
  }

  render() {
    if(this.state.categoryId == "C001"){
      var exportData = StudyList.slice(0, StudyList.length);
    }else{
      var exportData = StudyList.slice(3, StudyList.length);
    }
    if(this.state.categoryId ){
      return (
        <ScrollView style={study.StudyContainer}>
            { exportData.map((item, key)=>(
                <TouchableOpacity key={key} style={study.btnLearn} onPress={this.navigateToPage.bind(this, item, key)}>
                    <Text>{strings[item.title]}</Text>
                </TouchableOpacity>
            ))}
            <View style={study.height40}></View>
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
