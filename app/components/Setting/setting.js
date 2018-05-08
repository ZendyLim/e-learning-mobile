import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  import { List, ListItem } from 'react-native-elements';
  
  import { bindActionCreators } from 'redux';
  import { connect } from 'react-redux';
  import * as Actions from '../../actions/user'; //Import your actions
  
  class SettingScreen extends Component {
  
    static navigationOptions = {
      header: null,
      title: 'Study',
    };
  
    render() {
      console.log(this.props);
      return (
        <View style={styles.container}>
        <Text>ID : { this.props.data.id } </Text>
        <Text>Name : { this.props.data.name } </Text>
        
          <Button title="Setting Page" onPress={this.selectList} />
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
  export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);

