import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View, 
    ToolbarAndroid, 
    Image, 
    ScrollView, 
    Text, 
    TouchableOpacity, 
} from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';

class TopicListScreen extends Component {

  static navigationOptions = {
    //header: null,
    title: 'TopicList',
  };

  render() {
    return (
      <ScrollView>
        <View style={study.container}>
          <Image 
            style={study.cardImg}
            source={require('../../img/sample1.png')}
            resizeMode="stretch"  
          />
          
          <View style={[study.cardBox, study.borderBox, study.p3]}>
            <Text style={[study.textLg, study.textBlack]}>Learn</Text>
            <Text style={[study.textLg, study.textCenter, study.textBold, study.textBlack]}>80/100</Text>
            <View style={study.buttonContainer}>
              <TouchableOpacity style={[study.button, study.mR10]}>
              <Icon
  name='g-translate'
  color='#00aced' />
                <Text style={[study.textWhite, study.textMd]} > Start</Text>
              </TouchableOpacity>
              <TouchableOpacity style={study.button}>
                <Icon name='search'/>
                <Text style={[study.textWhite, study.textMd]} > Review</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[study.cardBox, study.borderBox, study.p3]}>
            <Text style={[study.textLg, study.textBlack]}>Quiz</Text>
            <Text style={[study.textLg, study.textCenter, study.textBold, study.textBlack]}>80/100</Text>
            <View style={study.buttonContainer}>
              <TouchableOpacity style={[study.button, study.mR10]}>
                <Icon name='play-arrow'/>
                <Text style={[study.textWhite, study.textMd]} > Start</Text>
              </TouchableOpacity>
              <TouchableOpacity style={study.button}>
                <Icon name='search'/>
                <Text style={[study.textWhite, study.textMd]} > Review</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[study.cardBox, study.borderBox, study.p3]}>
            <Text style={[study.textLg, study.textBlack]}>Test</Text>
            <Text style={[study.textLg, study.textCenter, study.textBold, study.textBlack]}>80/100</Text>
            <View style={study.buttonContainer}>
              <TouchableOpacity style={[study.button, study.mR10]}>
                <Icon name='play-arrow'/>
                <Text style={[study.textWhite, study.textMd]} > Start</Text>
              </TouchableOpacity>
              <TouchableOpacity style={study.button}>
                <Icon name='search'/>
                <Text style={[study.textWhite, study.textMd]} > Review</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </ScrollView>
    );
  }

  //createGuest = async () => {
  createGuest = () => {
    //await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('NameIn');
  };
}

const styles = require('../../styles/style');
const study = require('../../styles/study');

export default TopicListScreen;
