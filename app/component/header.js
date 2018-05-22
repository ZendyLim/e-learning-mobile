import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
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
    route: PropTypes.string
  };

  constructor(props) {
    super(props);
    
    this.icon = this.props.icon ? this.props.icon : 'times';  
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