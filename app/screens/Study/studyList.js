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
import * as Actions from '../../actions/summary'; //Import your actions

import style from 'react-native-datepicker/style';

class StudyListScreen extends Component {
  state = {
    modalVisible: true,
  };
  constructor() {
    super();
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  lockedMessage=(item, index)=>{    
    alert(strings[item.topic_id + '_MSG'] );     
  }

  componentWillMount(){
    this.props.getLockRecord();
  } 
  
  navigateToLearn=(item, index)=>{
    item['index'] = index;
    item['studyType'] = item.title;
    item['headerTitle'] = item.title;
    item['categoryId'] = 'C001';
    //console.log(item);
    this.getMistakes(item.topic_id);
    console.log(item);
    if(item.type == 'INITIAL'){
      item['studyType'] = item.title;
      this.props.navigation.navigate('HiraganaList',(
        item
      ));
    }else if(item.type == 'FUKUSHU'){

      item['formatType'] = 'FUKUSHU';
      item['idList'] = this.props.lock[item.topic_id].mistakes;

      this.props.navigation.navigate('QuizFlash',(
         item
      ));
      
    }
    else{
      this.props.navigation.navigate('TopicList',(
        item
      ));
    }
  }
  
  static navigationOptions = {
    header: null,
    // title: 'Study',
  };
  _onSetLanguageTo = (value) => {
    if(value){
      strings.setLanguage(value);
    }else{
      strings.setLanguage('en');
    }
  }

  checkLock = (topic_id) =>{

    if(this.props.lock){
      if(this.props.lock[topic_id]){
        if(this.props.lock[topic_id].lock){
          return this.props.lock[topic_id].lock;
        }else{
          return false;
        }
      }else{
        return false;
      }  
    }else{
      return false;
    }
  }

  getMistakesData(topic_id){
    //return Promise.all([this.props.getMistakes('T008')])
  }

  getMistakes = async() => {
    //json = await this.props.getMistakes('T008');
    //console.log(json);
    // this.getMistakegetMistakessData()
    // .then(([data]) => {
    //   // both have loaded!
    //   console.log(data);
    // })
  }

  render() {
    var image = '';
    this._onSetLanguageTo(this.props.lang);
    return (
      <ScrollView style={study.StudyContainer}>

          { StudyList.map((item, key)=>(
          <View  key={key} style={[study.cardBox, styles.shadow]}>
            <TouchableOpacity style={study.titleContainer} onPress={this.navigateToLearn.bind(this, item, key)}>
              <Image
                style={study.cardImg}
                source={ ImageData[item.img] }
              />
              <Text style={study.title}> { strings[item.title] } </Text>
            </TouchableOpacity>
            
              { this.checkLock(item.topic_id) ? (              
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
  console.log(state);

//   state.summary.lock['T004'] = {
//       lock:false,
//       matomeLeft:1
//   };

//   state.summary.lock['T005'] = {
//     lock:false,
//     matomeLeft:1
// };

  return {
      fukushu: state.study.fukushu,
      lang : state.user.lang,
      lock : state.summary.lock      
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

