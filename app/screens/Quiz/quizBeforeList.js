import React, { Component } from 'react';
import {
    ScrollView,
    Text, 
    TouchableOpacity, 
} from 'react-native';

import { withNavigation } from 'react-navigation';
import  { strings }   from '../../config/localization';
import { QuizListData } from '../../config/studyList';
//component
import Header   from '../../component/header';

class QuizBeforeScreen extends Component {

  static navigationOptions = ({ navigation }) => {      
    subtitle = navigation.getParam('typeQuiz', null);         
    title = navigation.getParam('title', null);      

    return{
      title: title,
      tabBarVisible:false,
      header: props => <Header 
        title={ strings[title] }
        subtitle={ subtitle }
        navigation={ navigation } 
        />
    }
  };
  
  constructor(props){
      super(props);
      this.list = [];
      this.param = [];

  }

  componentWillMount(){
    const { navigation } = this.props;
    
    this.param = {
        formatType: navigation.getParam('formatType',null),
        title: navigation.getParam('title',null),
        studyType: navigation.getParam('studyType',null),
        img: navigation.getParam('img',null),
        topicId: navigation.getParam('topicId',null),
        typeQuiz: navigation.getParam('typeQuiz',null),
        index:  navigation.getParam('index',null),   
        headerTitle:  navigation.getParam('headerTitle',null),
        categoryId :  navigation.getParam('categoryId',null),     
    }

    this.list = QuizListData[this.param.headerTitle];
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
    this.param.oneType = type;

    this.props.navigation.navigate('QuizFlash',(
        this.param
      ));
  };  
}

const styles = require('../../styles/quizStyle');
const study = require('../../styles/study');

export default QuizBeforeScreen;
