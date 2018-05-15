import React, { Component } from 'react';
import { TouchableHighlight, Image, View, Text } from 'react-native';
import PropTypes from 'prop-types';
var Sound = require('react-native-sound');

/**
  Quiz Button
**/
class AnswerButton extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    textData: PropTypes.object
  };

  constructor(props) {
      super(props);
  }

    render(){
      
      return (
        <TouchableHighlight style={ [styles.quizBtn, styles.shadow] }>
            <Text style={ [styles.quizBtnTextBig] }>{ this.props.children }</Text>
        </TouchableHighlight>       
      );
    }

}
module.exports = AnswerButton;

const styles = require('../styles/style');