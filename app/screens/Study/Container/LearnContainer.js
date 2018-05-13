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
  import * as Actions from '../../../actions/study'; //Import your actions
  
  class LearnContainer extends Component {
  
    static navigationOptions = {
      header: null,
      title: 'Study',
    };
  
    render() {
      return (
        <View style={styles.container}>
          <Button title="Study List Page!" onPress={this.selectList} />
        </View>
      );
    }
  
    //createGuest = async () => {
    selectList = () => {
      //await AsyncStorage.setItem('userToken', 'abc');
      this.props.navigation.navigate('HiraganaList');
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
export default connect(mapStateToProps, mapDispatchToProps)(LearnContainer);
