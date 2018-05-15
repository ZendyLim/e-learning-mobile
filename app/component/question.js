import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import  { strings }   from '../config/localization';

/**
  Component for question, usually being use in quiz screen
**/
class QuestionPanel extends Component {
  static propTypes = {
    expression: PropTypes.string
  };

  constructor(props) {
      super(props);

      this._onSetLanguageTo('en');
  }

  _onSetLanguageTo(value) {
    strings.setLanguage(value);
  }

    render(){
      return (
          <View style={ [styles.questionWrapper] }>
            <View style={ [styles.questionContainer, styles.col12] }>
                <Text style={ [styles.questionInsText, styles.questionText ] }>
                    {strings.QUESTION_SELECT}

                    
                </Text>
                <Text style={ [styles.questionBigText, styles.questionText ] }>
                    ひ
                </Text>
                
            </View>
          </View>
      );
    }
}
module.exports = QuestionPanel;

const styles = require('../styles/style');