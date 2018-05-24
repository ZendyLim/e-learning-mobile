import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View, 
    ToolbarAndroid, 
    Text, 
    TouchableOpacity, 
} from 'react-native';

import { withNavigation } from 'react-navigation';
import  { strings }   from '../../config/localization';
import { QuizListData } from '../../config/studyList';

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
      this.list = QuizListData.hiragana_katakana;
      this._onSetLanguageTo('en');
  }

  _onSetLanguageTo(value) {
    strings.setLanguage(value);
  } 

    render() {
    return (
        <View style={styles.containerFlexColumn}>
            {this.list.map((item, key)=>(
            <View key={key} style={styles.quizList}>
                <TouchableOpacity onPress={this.quiz.bind(this, item.type)}>
                <Text style={styles.hiraganaListText}> {strings[item.title]} </Text>
                </TouchableOpacity>
            </View>
            ))}
        </View>
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
        }
      ));
  };  
}

const styles = require('../../styles/quizStyle');

export default QuizBeforeScreen;
