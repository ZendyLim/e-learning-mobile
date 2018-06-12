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
import { summaryStyle } from '../../config/summaryLearn';
import { ImageData } from '../../config/image_list';

class SummaryLearnDetail extends Component {
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
        topic_id: navigation.getParam('topic_id', null),
    });
  }
 
  render() {
    if(this.state.categoryId ){
      return (
        <ScrollView style={study.StudyContainer}>
            <Image 
              style={ study.cardImg }
              source= { ImageData['loading'] }
              resizeMode="stretch"  
            />
                <View style={study.summaryLearn} >
                    <Text style={[study.summaryTitle, study.fontBold]}>TITLE</Text>
                    <Text style={[study.summaryDetail, study.fontBold]}>SCORE</Text>
                </View>
            { summaryStyle.map((item, key)=>(
                <View key={key} style={study.summaryLearn} >
                    <Text style={study.summaryTitle}>{ item.title }</Text>
                    <Text style={study.summaryDetail}>{ item.totalCorrect }/{ item.totalLearn }</Text>
                </View>
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

export default SummaryLearnDetail;
