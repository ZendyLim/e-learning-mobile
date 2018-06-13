import React, { Component } from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import PropTypes from 'prop-types';
import {Dimensions} from 'react-native';

/**
  Flashcard Text
**/
class ResponsiveText extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired, 
    title: PropTypes.string.isRequired, 
    textLength: PropTypes.number
  }

  constructor(props) {
    super(props);
    this.state = {
      textSize: 20,
    }

    this.lenIndicator = 0;
    this.sizeIndicator = 0;

    const width = Dimensions.get('window').width;
    this.containerWidth = Math.round(width * 0.9);
  }


  componentDidUpdate() {
   if(this.lenIndicator != this.props.textLength){
    this.lenIndicator = this.props.textLength;
    this.updateSize();
   }
  }

  updateSize() {
    let param = {};
    param['textSize'] =  (this.containerWidth/this.props.textLength) * 0.6;
    this.setState(param);
    this.sizeIndicator = param['textSize'];
    if(this.sizeIndicator < 20) {
      param['textSize'] = 20;
    this.setState(param);
    }
  }

  render = () => {
    const { textSize, content } = this.props;
    
    return (
      <View style={[studyStyles.box]}>
        <Text numberOfLines={12}
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