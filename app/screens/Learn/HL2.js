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
import  { strings }   from '../../config/localization';
import { LearnListData } from '../../config/studyList';
import style from 'react-native-datepicker/style';

class HL2Screen extends Component {
  constructor() {
    super();
    this._onSetLanguageTo('en');
  }
  _onSetLanguageTo(value) {
    strings.setLanguage(value);
  } 
  static navigationOptions = {
    title: 'Learn',
  };

  render() {
      return (
        <ScrollView style={study.StudyContainer}>
            <Text>
            日本語には3種類の文字があります。{"\n"} 
            ひらがな、カタカナ、漢字です。{"\n"} {"\n"} 
            歴史 {"\n"}
            4世紀ごろ、中国から漢字が伝わり、漢字をもとにひらがな、カタカナが作られました。 {"\n"}
            </Text>
        </ScrollView>
      );
  }
}

const styles = require('../../styles/style');
const study = require('../../styles/study');

export default HL2Screen;
