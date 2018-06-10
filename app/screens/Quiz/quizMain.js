import React, { Component } from 'react';
import {
    ScrollView,
    Text, 
    TouchableOpacity, 
} from 'react-native';

import { withNavigation } from 'react-navigation';
import  { strings }   from '../../config/localization';
import { QuizListData } from '../../config/studyList';

class QuizMainScreen extends Component {

  static navigationOptions = {
    // header: null,
    title: 'QuizList',
  };
  
  constructor(props){
      super(props);
      this.list = QuizListData.hiragana_katakana;
  }


    render() {
    return (
        <ScrollView style={study.StudyContainer}>
            {this.list.map((item, key)=>(
                <TouchableOpacity key={key} style={study.btnLearn}  onPress={this.quiz.bind(this, item.type)}>
                    <Text> {strings[item.title]} </Text>
                </TouchableOpacity>
            ))}
       </ScrollView>
    );
  }

  quiz = (type) => {
    const { navigation } = this.props;

    this.props.navigation.navigate('QuizList',(
        {
            type: navigation.getParam('type',null),
            title: navigation.getParam('title',null),
            studyType: navigation.getParam('studyType',null),
            img: navigation.getParam('img',null),
            topicId: navigation.getParam('topicId',null),
            typeQuiz: navigation.getParam('typeQuiz',null),
            quizOptions: navigation.getParam('quizOptions',null),
            oneType: type,
            index:  navigation.getParam('index',null),        
            categoryId :  navigation.getParam('categoryId',null),  
        }
      ));
  };  
}

const styles = require('../../styles/quizStyle');
const study = require('../../styles/study');

export default QuizMainScreen;
