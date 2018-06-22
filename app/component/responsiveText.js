import React, { Component } from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import PropTypes from 'prop-types';
import {Dimensions} from 'react-native';

/**
  Flashcard Text
**/
class ResponsiveText extends Component {
  static propTypes = {
    content: PropTypes.any.isRequired, 
    title: PropTypes.string.isRequired, 
    textLength: PropTypes.number, 
    textType: PropTypes.string.isRequired, 
  }

  constructor(props) {
    super(props);
    this.state = {
      textSize: 20,
      upperText: 20, 
      lowerText: 20
    }

    this.lenIndicator = 0;
    this.sizeIndicator = 0;
    this.sliderSizeIndicator = 0;

    const width = Dimensions.get('window').width;
    this.CONT_WIDTH = Math.round(width * 0.9);
  }

  _renderSliderText() {
    return(
      <View>
        <Text numberOfLines={6}
          style={[studyStyles.textContent, {fontSize: this.state.upperText}]} >
            { this.props.content.moji }
        </Text>
        <Text numberOfLines={6}
          style={[studyStyles.textContent, {fontSize: this.state.lowerText}]} >
          { this.props.content.romaji }
        </Text>
      </View>
    );     
  }

  _renderFlipText() {
    return(
      <Text numberOfLines={16}
        style={[studyStyles.textContent, {fontSize: this.state.textSize}]} >
          { this.props.content }
      </Text>
    );
  }

  componentDidUpdate() {
    if(this.props.textType === 'flip') {
      if(this.lenIndicator != this.props.textLength){
        this.lenIndicator = this.props.textLength;
        this.updateFlipSize();
       }
    } else {
      if(this.lenIndicator != this.props.content.romaji.length){
        this.lenIndicator = this.props.content.romaji.length;
        this.updateSliderSize();
       }
    }
   
  }

  updateFlipSize() {
    let param = {};
    param['textSize'] =  (this.CONT_WIDTH/this.props.textLength) * 0.6;
    this.setState(param);
    this.sizeIndicator = param['textSize'];
    if(this.sizeIndicator < 20) {
      param['textSize'] = 20;
    this.setState(param);
    }
  }

  updateSliderSize() {
    let param = {};
    param['upperText'] =  (this.CONT_WIDTH/this.props.content.moji.length) * 0.6;
    param['lowerText'] =  (this.CONT_WIDTH/this.props.content.romaji.length) * 0.6;

    this.sliderSizeIndicator = param['upperText'];
    if(this.sliderSizeIndicator < 27) {
      param['upperText'] = 26;
    }
    
    this.sizeIndicator = param['lowerText'];
    if(this.sizeIndicator < 20) {
      param['lowerText'] = 20;
    }

    this.setState(param);
  }

  render = () => {
    let type;
    if(this.props.textType === 'flip') {
      type = this._renderFlipText();
    } else {
      type = this._renderSliderText();
    }

    return (
      <View style={[studyStyles.box]}>
        { type }
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