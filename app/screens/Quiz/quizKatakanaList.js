import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View,
    Text,
  } from 'react-native';

  
  class QuizKatakanaListScreen extends Component {
  
    static navigationOptions = {
      header: null,
      title: 'Quiz Katakana List',
    };
  
    render() {
      return (
        <View style={styles.containerCenter}>
            <Text>Katakana</Text>
        </View>
      );
    }
  }

  const styles = require('../../styles/quizStyle');
export default QuizKatakanaListScreen;