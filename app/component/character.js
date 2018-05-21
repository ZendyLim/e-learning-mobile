import React, { Component } from 'react';
import { StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';
// Config
import { ImageData } from '../config/image_list';
/**
  Character Class
  Different expression: default, sad, happy
**/
class CharacterImage extends Component {
  static propTypes = {
    expression: PropTypes.string
  };

  constructor(props) {
      super(props);

      this.state = {
        image: ''
      }

      
  }

    render(){
      this.chooseExpression();

      return (
        <Image source={this.state.image} style={[ styles.character, this.props.style || {} ]} />
      );
    }

    chooseExpression(){
      this.state.image = ImageData[this.props.expression] ? ImageData[this.props.expression] : ImageData.default;
    }
}
module.exports = CharacterImage;

const styles = require('../styles/style');