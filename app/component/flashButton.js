import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';

/**
  Flashcard Button
**/
class FlashButton extends Component {
  static propTypes = { 
    iconName: PropTypes.string, 
    textName: PropTypes.number, 
    btnType: PropTypes.string.isRequired, 
  }

  _renderIconButton(){
     return (
        <TouchableOpacity
          disabled={this.props.disabled}
          style={studyStyles.roundButton}
          onPress={() => this.props.onPress()}
        >
          <Icon name={ this.props.iconName } color='#fff' size={40}/>
        </TouchableOpacity>
      );
  }

  _renderTextButton(){
    return (
      <TouchableOpacity
        style={studyStyles.roundButtonText}
        onPress={() => this.props.onPress()}
      >
         <Text style={[studyStyles.textLg, studyStyles.textCenter, studyStyles.textWhite]}>
           &nbsp;{ this.props.textName }x&nbsp;
         </Text>
      </TouchableOpacity>
     );
 }

  render() {
    const autoHeight = {
      height: (Dimensions.get('window').width) * 0.2
    }
    let type;
    if(this.props.btnType === 'icon') {
      type = this._renderIconButton();
    } else {
      type = this._renderTextButton();
    }
    return (
      <View style={[studyStyles.boxButton, autoHeight]}>
        { type }
      </View>
    );
  }
}


export default FlashButton;

const studyStyles = require('../styles/study');