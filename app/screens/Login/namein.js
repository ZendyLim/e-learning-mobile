import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View,
  } from 'react-native';
  import { List, ListItem } from 'react-native-elements';
  
  import { bindActionCreators } from 'redux';
  import { connect } from 'react-redux';
  import * as Actions from '../../actions/user'; //Import your actions
  
  class NameScreen extends Component {
    static navigationOptions = {
      title: 'Name',
    };
  
    render() {
      return (
        <View style={styles.container}>
          <Button title="Add name page" onPress={this.addName} />
        </View>
      );
    }
  
    addName = () => {
      this.props.navigation.navigate('TimeIn');
    };

 
  }

  const styles = require('../../styles/style');
  function mapStateToProps(state, props) {
    return {
        loading: state.user.loading,
        data: state.user.user
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
  }
  
  //Connect everything
  export default connect(mapStateToProps, mapDispatchToProps)(NameScreen);
  
