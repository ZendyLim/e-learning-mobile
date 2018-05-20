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
import { QuizStack  }  from '../../config/router';


class QuizListScreen extends Component {

  static navigationOptions = {
    title: 'QuizList',
  };

    render() {
    return (
        <QuizStack />
    );
        
  }
}

const styles = require('../../styles/quizStyle');

export default QuizListScreen;
