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
  
  class TimeScreen extends Component {
    static navigationOptions = {
      title: 'Time',
    };
  
    render() {
      return (
        <View style={styles.container}>
          <Button title="Add Time page" onPress={this.saveStudyTime}/>
        </View>
      );
    }
  
    saveStudyTime = async () => {
      this.props.createUser('das');   
      this.props.navigation.navigate('App');
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
  export default connect(mapStateToProps, mapDispatchToProps)(TimeScreen);
