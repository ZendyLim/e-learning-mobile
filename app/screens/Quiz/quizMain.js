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
var quizListArray = [
    {
        title : 'Hiragana/Katakana to Romaji',
        type  : 'moji_romaji'
        //  action : () => {this.props.navigation.navigate('QuizHiraganaList')},
    },
    {
        title : 'Romaji to Hiragana/Katakana',
        type  : 'romaji_moji'
        // action : () => {this.props.navigation.navigate('TimeIn')}
    },
    {
        title : 'Listening',
        type  : 'audio_moji'
        // action : () => {this.props.navigation.navigate('TimeIn')}
    }
]

class QuizMainScreen extends Component {

  static navigationOptions = {
    // header: null,
    title: 'QuizList',
  };

    render() {
    return (
        <View style={styles.containerFlexColumn}>
            {quizListArray.map((item, key)=>(
            <View key={key} style={styles.quizList}>
                <TouchableOpacity onPress={this.quiz.bind(this, item.type)}>
                <Text style={styles.hiraganaListText}> {item.title} </Text>
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
            oneType: type
        }
      ));
  };  
}

const styles = require('../../styles/quizStyle');

export default QuizMainScreen;
