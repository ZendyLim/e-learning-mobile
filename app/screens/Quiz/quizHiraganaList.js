import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity
  } from 'react-native';
import { hiraganaList } from '../../config/data';

  class QuizHiraganaListScreen extends Component {
  
    static navigationOptions = {
      title: 'Quiz Hiragana List',
    };
    render() {
      return ( 
        <ScrollView style={styles.container}>
             <View style={styles.containerWhiteTop}>
                <View style={styles.menuContainer} >
                    <TouchableOpacity style={styles.menuButton}>
                        <Text style={styles.txtButton}>Check All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuButton}>
                        <Text style={styles.txtButton}>Proceed ></Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {hiraganaList.map((item, key)=>(
                        <View key={key} style={styles.hiraganaList}>
                            <TouchableOpacity style={styles.bgWhite} onPress={this.quiz}>
                                <Text style={styles.hiraganaListText}> {item.hiragana}</Text>
                                <Text style={styles.hiraganaListRomaji}> {item.romaji}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
      );
    }
  }

  const styles = require('../../styles/quizStyle');
export default QuizHiraganaListScreen;