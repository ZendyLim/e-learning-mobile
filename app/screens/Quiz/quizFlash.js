import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View,
    Image
  } from 'react-native';
  import { List, ListItem } from 'react-native-elements';

  const imageBackground = require('../../assets/img/topic/1.0-class.jpg');
  
  class QuizFlashScreen extends Component {
  
    static navigationOptions = {      
      title: 'Quiz',
      tabBarVisible:false
    };
  
    render() {
      return (
        <View>
            <View style={styles.quizFlashTop}>
                <Image
                    style={{
                        flex:1,
                        resizeMode: 'center'
                    }}

                    source={{ uri:imageBackground }}
                />
            </View>
          <Button title="Study Summary" onPress={this.createGuest} />
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