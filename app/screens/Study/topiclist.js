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
import { NavigationActions } from 'react-navigation'; 
import { List, ListItem, Icon } from 'react-native-elements';
import  { strings }   from '../../config/localization';
import { ImageData } from '../../config/image_list';
import { StudyList } from '../../config/studyList';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/summary'; 
class TopicListScreen extends Component {

  static navigationOptions = ({ navigation }) =>{
    //header: null,
    const {state} = navigation;
    return {
      title: `${strings[state.params.title]}`,
    };
  };
  constructor(props) {
    super(props);
    this.state = {    
      title:"TOPIC10_TITLE",
      img: "",
      index: "",
      nextTopic: "",
  };
  }

  componentDidMount() {
    const { navigation } = this.props;

    params = {
      title: navigation.getParam('title', null),
      img: navigation.getParam('img', null),
      type: navigation.getParam('type', null),
      index: navigation.getParam('index', null),      
    }

    params.nextTopic = StudyList[params.index + 1];

    this.setState(params);
    console.log(params);
    //Console.log(navigation.getParam('userName', null),"NIAMAK");
  }

navigateToLearn=(type, categoryId)=>{

    param = {
      img : this.state.img,
      title : this.state.title,
      index : this.state.index,
      type : this.state.type,
      headerTitle : type, 
      categoryId : categoryId,
      studyType : this.state.title + '_and_' +type, 
    };
    console.log(param, 'wooo');
    if(type == 'topic_test'){

      param.isTopicTest = true;
      param.studyType = this.state.title;
      param.formatType = 'Test';
      
      this.props.navigation.navigate('QuizFlash',(
        param
      ));
    }
    else{
      this.props.navigation.navigate('HiraganaList',(
        param
      ));
    }      
  }

  navigateToNextTopic=()=>{
    var item = StudyList[this.state.index + 1];
    item['index'] = this.state.index + 1;
    locks = this.props.lock;
    console.log(item);
    if(locks[item.topic_id].lock){
      if(this.state.type == 'INITIAL'){
        alert(strings.NEED_PASS_INITIAL);
      }
      else{
        alert(strings.NEED_PASS);
      }
      
    }
    else{

      let resetAction;

      if(item.type == 'FUKUSHU'){

        item['formatType'] = 'FUKUSHU';
        item['idList'] = this.props.lock[item.topic_id].mistakes;

        resetAction = NavigationActions.reset({ 
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: 'StudyList' }),
            NavigationActions.navigate({ routeName: 'QuizFlash' , params: item })
          ]
        });        
        
      }
      else{

        resetAction = NavigationActions.reset({ 
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: 'StudyList' }),
            NavigationActions.navigate({ routeName: 'TopicList' , params: item })
          ]
        });

      }

      this.props.navigation.dispatch(resetAction);
    }
    
 }
  render() {
    return (
      <ScrollView  style={study.ScrollViewColor}>
        <View style={study.StudyContainer}>
          <Image 
            style={ study.cardImg }
            source= { this.state.img ? ( ImageData[this.state.img] ) :   ImageData['loading'] }
            resizeMode="cover"  
          />
          
          <View style={[study.buttonContainerTopic]}>
            <TouchableOpacity style={[study.buttonTopic, styles.shadow]} onPress={this.navigateToLearn.bind(this, 'vocabulary', 'C001')}>
              <Text style={[study.buttonTopicText]}>{ strings['vocabulary'] }</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[study.buttonTopic, styles.shadow]} onPress={this.navigateToLearn.bind(this, 'grammar', 'C002')}>
              <Text style={[study.buttonTopicText]}>{ strings['grammar'] }</Text>
            </TouchableOpacity>
          </View>
          <View style={[study.buttonContainerTopic]}>
            <TouchableOpacity style={[study.buttonTopic, styles.shadow]} onPress={this.navigateToLearn.bind(this, 'kanji', 'C003')}>
              <Text style={[study.buttonTopicText]}>{ strings['kanji'] }</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[study.buttonTopic, styles.shadow]} onPress={this.navigateToLearn.bind(this, 'topic_test', 'T001')}>
              <Text style={[study.buttonTopicText]}>{ strings['topic_test'] }</Text>
            </TouchableOpacity>
          </View>
          
          <View style={[study.buttonContainerTopicNext]}>
            <TouchableOpacity style={[study.nextTopic, styles.shadow]} onPress={this.navigateToNextTopic.bind(this)}>
              <Text style={[study.buttonTopicNextText]}>{ strings['next_topic'] }</Text>
            </TouchableOpacity>
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

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
  
  return {
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
export default connect(mapStateToProps, mapDispatchToProps)(TopicListScreen);
