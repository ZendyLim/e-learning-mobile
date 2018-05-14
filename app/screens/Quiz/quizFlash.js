import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View,
    Image,
    Text,
    ScrollView
  } from 'react-native';
  import { List, ListItem } from 'react-native-elements';

  const imageBackground = require('../../assets/img/topic/1.0-class.jpg');
  
  class QuizFlashScreen extends Component {
  
    static navigationOptions = {    
      header:false,  
      title: 'Quiz',
      tabBarVisible:false
    };
  
    render() {
      return (
        <View style={styles.container}>
            
            <View style={styles.row}>
              <View elevation={5} style={[styles.col4, styles.shadow, {borderWidth:1, borderColor:"black"}]}>
                <Text>
                  Column 4
                </Text>
              </View>
              <View style={[styles.col3, {borderWidth:1, borderColor:"black"}]}>
                <Text>
                  Column 3
                </Text>
              </View>

              <View style={[styles.col5, {borderWidth:1, borderColor:"black"}]}>
                <Text>
                  Column 5
                </Text>
              </View>
            </View>
            
        </View>
      );
    }
  
    //createGuest = async () => {
    createGuest = () => {
      //await AsyncStorage.setItem('userToken', 'abc');
      this.props.navigation.navigate('NameIn');
    };
  }

  const styles = require('../../styles/style');
  
export default QuizFlashScreen;