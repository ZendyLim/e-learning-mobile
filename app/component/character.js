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

      switch (this.props.expression) {
          case 'happy':
              this.image = require('../assets/img/char/char-happy.png');
              break;

          case 'sad':
              this.image = require('../assets/img/char/char-sad.png');
              break;

          default:
              this.image = require('../assets/img/char/char-default.png');
              break;
      }
  }

    render(){
      return (
        <Image source={this.image} style={[ styles.character, this.props.style || {} ]} />
      );
    }
}
module.exports = CharacterImage;

const styles = require('../styles/style');