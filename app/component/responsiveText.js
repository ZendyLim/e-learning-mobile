import React, { Component } from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import PropTypes from 'prop-types';

/**
  Flashcard Text
**/
class ResponsiveText extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired, 
    title: PropTypes.string.isRequired, 

  }

  constructor(props) {
    super(props);
    this.state = {
      textSize: '',
      test: 'HAHA',
    }

    if(this.props.title === 'FLASH_CARD_HIRAGANA' || this.props.title === 'FLASH_CARD_KATAKANA') {
      this.state.test = 'HEHE';
      this.state.textSize = 120;
    } else {
      this.state.test = 'HOHO';
      this.state.textSize = 50;
    }
  }

  render = () => {
    const { textSize, content, test } = this.props;
    
    return (
      <View style={[studyStyles.box]}>
        <Text 
          numberOfLines={1} 
          style={[studyStyles.textContent, {fontSize: this.state.textSize}]} >
            { this.props.content }
        </Text>
      </View>
    );
  }
}


export default ResponsiveText;

const studyStyles = StyleSheet.create({
  textContent: {
    color: 'black', 
    textAlign: 'center', 
    textAlignVertical: 'center',  
  }, 

  box: {
    width: '100%',
  }
});