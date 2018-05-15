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
        title : 'Hiragana to Romaji',
        //  action : () => {this.props.navigation.navigate('QuizHiraganaList')},
    },
    {
        title : 'Romaji to Hiragana',
        // action : () => {this.props.navigation.navigate('TimeIn')}
    },
    {
        title : 'Listening',
        // action : () => {this.props.navigation.navigate('TimeIn')}
    }
]

class QuizMainScreen extends Component {

  static navigationOptions = {
    header: null,
    title: 'QuizList',
  };

    render() {
    return (
        <View style={styles.containerFlexColumn}>
            {quizListArray.map((item, key)=>(
            <View key={key} style={styles.quizList}>
                <TouchableOpacity onPress={this.quiz}>
                <Text style={styles.hiraganaListText}> {item.title} </Text>
                </TouchableOpacity>
            </View>
            ))}
        </View>
    );
  }

  quiz = () => {
    this.props.navigation.navigate('QuizList');
  };  
}

const styles = require('../../styles/quizStyle');

export default QuizMainScreen;
