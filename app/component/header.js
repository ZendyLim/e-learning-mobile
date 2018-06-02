import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Alert } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationActions } from 'react-navigation';

/**
  Character Class
  Different expression: default, sad, happy
**/
class Header extends Component {
  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    icon: PropTypes.string,
    route: PropTypes.string,
    confirm: PropTypes.bool,
    confirmMessage: PropTypes.string,
    testCall:PropTypes.func
  };

  constructor(props) {
    super(props);
    
    this.icon = this.props.icon ? this.props.icon : 'times';  
    this.pause = false;
  }

  _renderSubtitle(){
    if(this.props.subtitle){
      return(
        <Text style={ styles.subTitleHead }>{ this.props.subtitle }</Text>
      );
    }
    else{
      return(null);
    }
  }

    render(){

      return (
        <View style={ [styles.headContainer, styles.displayInlineContainer] }>
          <View style={ styles.displayInline }>
            <TouchableHighlight onPress={ this.onClickIcon }>
              <Icon name={ this.icon } style={ styles.headerIcon } ></Icon>
            </TouchableHighlight>
          </View>
          <View style={ [styles.titleHeadContainer, styles.displayInline] }>
              { this._renderSubtitle() }
              <Text style={ styles.titleHead }>{ this.props.title }</Text>
          </View>
        </View>
        
      );
    }

    onClickIcon = () => {
      
      if(confirm){
        this.props.testCall(false);

        setTimeout(() => {
          Alert.alert("Confirm", "Do you want to quit?", [{
            text: "OK",
            onPress: () => this.proceedNavigate()
          },
          {text: 'Cancel', onPress: () => this.props.testCall(true), style: 'cancel'}
          ],
          {
            cancelable:false
          }
        )
        }, 100); 
      }
      else{
        this.proceedNavigate();
      }
      
        
        
    }

    proceedNavigate(){
      if(confirm){
        this.props.testCall(false);
      }

      if(this.props.route){
          this.props.navigation.navigate(this.props.route);    
      }
      else{
        this.props.navigation.goBack(null);          
      }
    }
}
module.exports = Header;

const styles = require('../styles/style');