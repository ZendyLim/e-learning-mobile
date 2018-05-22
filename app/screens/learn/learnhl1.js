import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    ToolbarAndroid,
    Image,
    FlatList,
    Alert,
    Platform,
  } from 'react-native';
  import { List, ListItem, Icon } from 'react-native-elements';
  import { HiraganaLearnStack } from '../../config/router';
  class LearnHL1Screen extends Component {
    static navigationOptions = {
      //header: null,
      title: 'Hiragana & Katakana List',
      headerStyle: {
        backgroundColor: '#45B5E7',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontSize: 20,
      },
    };

 

    constructor(props) {
      super(props);
    }

    render() {
      return (
        <View style={study.container}>
          <HiraganaLearnStack />
        </View>
    );
    }
  }
  
  const study = require('../../styles/study');
  const styles = require('../../styles/style');
  
  //Connect everything
  export default LearnHL1Screen;
  // export default LearnHL1Screen;