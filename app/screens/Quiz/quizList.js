import React, { Component } from 'react';
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
