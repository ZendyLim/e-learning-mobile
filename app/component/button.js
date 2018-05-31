import React, { Component } from 'react';
import { Text, TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

class CustomButton extends Component {
  static propTypes = {
    children: PropTypes.string,
    icon: PropTypes.string
  };

  constructor(props) {
      super(props);    
  }

    render(){      
      return (
        <View style={ [styles.btnContainer, styles.displayInlineContainer] }>
            <View style={[styles.btn, styles.shadow , styles.displayInline, styles.displayInlineContainer]}>
              <Text style={ [styles.btnText, styles.displayInline] } >{ this.props.children }</Text>
              { this.props.icon &&
                <Icon name={ this.props.icon } style={ [styles.btnIcon, styles.btnText, styles.displayInline] } />
              }
            </View>
        </View>
      );
    }

}
module.exports = CustomButton;

const styles = require('../styles/style');