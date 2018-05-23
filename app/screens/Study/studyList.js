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
    Modal,
    TouchableHighlight
} from 'react-native';
import { Icon } from 'react-native-elements';
import  { strings }   from '../../config/localization';
import { StudyList } from '../../config/studyList';
import { ImageData } from '../../config/image_list';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/study'; //Import your actions

import style from 'react-native-datepicker/style';

class StudyListScreen extends Component {
  state = {
    modalVisible: true,
  };
  constructor() {
    super();
    this._onSetLanguageTo('en');
  }
  _onSetLanguageTo(value) {
    strings.setLanguage(value);
    //this.setState({});
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  lockedMessage=(item, index)=>{
    alert('locked ' + strings[item.title]);     
  }
  
  navigateToLearn=(item, index)=>{
    item['index'] = index;
    item['studyType'] = item.title;
    item['headerTitle'] = item.title;
    
    if(item.type == 'Initial'){
      item['studyType'] = item.title;
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
    // title: 'Study',
  };

  render() {
    var image = '';
    console.log(this.props.fukushu);
    return (
      <ScrollView style={study.StudyContainer}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={ this.props.fukushu ? this.props.fukushu : false }
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.props.fukushu = false;
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

          { StudyList.map((item, key)=>(
          <View  key={key} style={study.cardBox}>
            <TouchableOpacity style={study.titleContainer} onPress={this.navigateToLearn.bind(this, item, key)}>
              <Image
                style={study.cardImg}
                source={ ImageData[item.img] }
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

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
  return {
      fukushu: state.study.fukushu,
  }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(StudyListScreen);

