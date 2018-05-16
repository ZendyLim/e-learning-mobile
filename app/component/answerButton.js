import React, { Component } from 'react';
import { TouchableHighlight, Image, View, Text } from 'react-native';
import PropTypes from 'prop-types';

/**
  Quiz Button
**/
class AnswerButton extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    textData: PropTypes.object,
    selected: PropTypes.bool,
    id: PropTypes.string
  };

  constructor(props) {
      super(props);

  }

  onSelectAnswer(){
    this.props.onSelectAnswer(this.props.id);
  }

    render(){
      
      return (
        <TouchableHighlight 
          style={ [styles.quizBtn, styles.shadow, this.props.selected && styles.quizBtnPress ] } 
          onPress={() =>  this.onSelectAnswer() }
          >
            <Text 
              style={ [styles.quizBtnTextBig, this.props.selected && styles.quizBtnTextPress] }>
                { this.props.children }
            </Text>
        </TouchableHighlight>       
      );
    }

}
module.exports = AnswerButton;

const styles = require('../styles/style');