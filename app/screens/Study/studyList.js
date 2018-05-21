import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image,
    TouchableOpacity, 
} from 'react-native';
import { Icon } from 'react-native-elements';

class StudyListScreen extends Component {

  static navigationOptions = {
    header: null,
    // title: 'Study',
  };

  render() {
    return (
      <ScrollView>
        <View style={study.containerCentered}>
          <View style={study.cardBox}>
            <TouchableOpacity 
              style={study.cardBoxDisabled}
              onPress={this.selectLearnHL1}
            >
              <View style={study.cardImgDisabled}>
                <Icon name='lock' />
              </View>
              <Image
                style={study.cardImg}
                source={require('../../img/sample1.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={study.cardBox}>
            <TouchableOpacity onPress={() => this.selectList()}>
              <Image
                style={study.cardImg}
                source={require('../../img/sample1.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={study.cardBox}>
          <TouchableOpacity onPress={this.selectList}>
            <Image
              style={study.cardImg}
              source={require('../../img/sample1.png')}
              resizeMode = 'cover'
            />
            </TouchableOpacity>
          </View>
          <View style={study.cardBox}>
            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={this.selectList}>
              <Image
                style={study.cardImg}
                source={require('../../img/sample1.png')}
                resizeMode = 'stretch'
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }

  //createGuest = async () => {
  selectList = () => {
    //await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('HiraganaList');
  };
  selectLearnHL1 = () => {
    //await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('LearnHL1');
  };
  // selectHiraganaLearn = () => {
  //   //await AsyncStorage.setItem('userToken', 'abc');
  //   this.props.navigation.navigate('HiraganaLearn');
  // };
}

const styles = require('../../styles/style');
const study = require('../../styles/study');

export default StudyListScreen;
