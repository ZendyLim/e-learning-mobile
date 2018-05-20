import React, { Component } from 'react';
import { StyleSheet, Text, View , Button, TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';

/**
  Example FBLoginView class
  Please note:
  - this is not meant to be a full example but highlights what you have access to
  - If you use a touchable component, you will need to set the onPress event like below
**/
class FBLoginView extends Component {
  static contextTypes = {
    isLoggedIn: PropTypes.bool,
    login: PropTypes.func,
    logout: PropTypes.func,
    props: PropTypes.shape({})
	};

  constructor(props) {
      super(props);
    }

    render(){
      if(!this.context.isLoggedIn){
        return (
          <View >
            <TouchableHighlight style={styles.socialFacebook}
            onPress={() => {
              this.context.login()     
            }}>
            <Text style={styles.facebookText}>Facebook Login</Text>
            </TouchableHighlight>
          </View>
      )
      }else{
        return (
          <View>
            <TouchableHighlight style={styles.socialFacebook}
            onPress={() => {
              this.context.logout()     
            }}>
            <Text style={styles.facebookText}>Facebook Logout</Text>
            </TouchableHighlight>
          </View>
      )
      }

      
    }
}
module.exports = FBLoginView;

const styles = require('../styles/style');