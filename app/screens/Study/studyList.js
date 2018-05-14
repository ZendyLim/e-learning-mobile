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
import { StudyList } from '../../config/studyList';
import style from 'react-native-datepicker/style';

class StudyListScreen extends Component {
  constructor() {
    super();
    this._onSetLanguageTo('en');
  }
  _onSetLanguageTo(value) {
    strings.setLanguage(value);
    //this.setState({});
  }

  lockedMessage=(item, index)=>{
    alert('locked ' + strings[item.title]);     
  }
  
  navigateToLearn=(item, index)=>{
    if(item.type == 'Initial'){
      this.props.navigation.navigate('HiraganaList',(
        item
      ));
    }else{
      this.props.navigation.navigate('TopicList',(
        item
      ));
    }
  }
  
  static navigationOptions = {
    header: null,
    title: 'Study',
  };

  render() {
    var image = '';
    return (
      <ScrollView style={study.StudyContainer}>
          { StudyList.map((item, key)=>(
          <View  key={key} style={study.cardBox}>
            <TouchableOpacity style={study.titleContainer} onPress={this.navigateToLearn.bind(this, item, key)}>
              <Image
                style={study.cardImg}
                source={item.img}
                resizeMode = 'cover'
              />
              <Text style={study.title}> { strings[item.title] } </Text>
            </TouchableOpacity>
              { item.lock ? (              
                <TouchableOpacity style={study.lockButton} onPress={this.lockedMessage.bind(this, item, key)}>  
                  <Icon name='lock'  color='#fff' size={40}/>
                </TouchableOpacity>
                ) : (
                  <Text style={study.NotlockButton}>not lock</Text>
              )}           
          </View>
        
        )
      )}
      </ScrollView>
    );
  }

  //createGuest = async () => {
  selectList = () => {
    //await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('HiraganaList');
  };
}

const styles = require('../../styles/style');
const study = require('../../styles/study');

export default StudyListScreen;
