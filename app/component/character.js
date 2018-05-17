import React, { Component } from 'react';
import { StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';

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
      switch (this.props.expression) {
          case 'happy':
              this.state.image = require('../assets/img/char/char-happy.png');
              break;

          case 'sad':
              this.state.image = require('../assets/img/char/char-sad.png');
              break;

          default:
              this.state.image = require('../assets/img/char/char-default.png');
              break;
      }
    }
}
module.exports = CharacterImage;

const styles = require('../styles/style');