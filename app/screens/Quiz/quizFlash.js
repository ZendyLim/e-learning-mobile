import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View,
    ImageBackground,
    Text
  } from 'react-native';
  import { List, ListItem } from 'react-native-elements';

  // Import Components
  import CharacterImage   from '../../component/character';
  import TimerBar   from '../../component/timer';

  const imageSource = require('../../assets/img/topic/1.0-class.jpg');
  
  class QuizFlashScreen extends Component {
  
    static navigationOptions = {      
      title: 'Quiz',
      tabBarVisible:false
    };

    constructor(props){
      super(props);

      this.state = {
        success: 'yooo'
      }

    }
  
    render() {
      let display = this.state.success;
      return (
        <View style={styles.container}>
            <View style={[styles.row]}>
              <View style={[styles.col12, styles.quizFlashTop]}>

                  <ImageBackground
                      style={ styles.quizBanner }
                      source={ imageSource }
                  >
                    <CharacterImage expression={ "happy" } style={ styles.quizChar }/>
                  </ImageBackground>

              </View>
              
              <View style={[styles.col12]}>

                <TimerBar time={ 2000 } onUpdate={this.onUpdate} />

                <Text>{ display }</Text>
              </View>
            </View>
            
        </View>
      );
    }

    onUpdate = (val) => {
      this.setState({
        success: val
      })
    };
  
  }

  const styles = require('../../styles/style');
  
export default QuizFlashScreen;

