import React, { Component } from 'react';
import  { strings }   from '../config/localization';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    FlatList,
    Text,
    View,
  } from 'react-native';
  import { List, ListItem } from 'react-native-elements';

  import { bindActionCreators } from 'redux';
  import { connect } from 'react-redux';
  import * as Actions from '../actions'; //Import your actions
  
  class LoginScreen extends Component {
    constructor(props) {
      super(props);

      this.renderItem = this.renderItem.bind(this);
  }

  getApi = () =>  {
      this.props.getDataAPI(); //call our action
  }
  createGuest = () => {
    //await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('AuthLoading');
  };

  render() {
      
      if (this.props.loading) {
          return (
              <View style={styles.activityIndicatorContainer}>
                 <Button title="getData" onPress={this.getApi} />
              </View>
          );
      } else {
          return (
              <View style={{flex:1, backgroundColor: '#F5F5F5', paddingTop:20}}>
                  <Button title="getData" onPress={this.getApi} />
                  <Button title={ strings.loginGuest } onPress={this.createGuest} />
                  <FlatList
                      ref='listRef'
                      data={this.props.data}
                      renderItem={this.renderItem}
                      keyExtractor={(item, index) => index.toString()}/>
              </View>
          );
      }
  }

  renderItem({item, index}) {
      return (
          <View style={styles.row}>
              <Text style={styles.title}>
                  {(parseInt(index) + 1)}{". "}{item.title}
              </Text>
              <Text style={styles.description}>
                  {item.description}
              </Text>
          </View>
      )
  };
  }

const styles = require('../styles/style');

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
  return {
      loading: state.user.loading,
      data: state.user.user
  }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

