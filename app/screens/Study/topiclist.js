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
  };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({
      title: navigation.getParam('title', null),
      img: navigation.getParam('img', null),
      type: navigation.getParam('type', null),
      index: navigation.getParam('index', null),
    });
    
    //Console.log(navigation.getParam('userName', null),"NIAMAK");
  }

  navigateToLearn=(type)=>{
      this.props.navigation.navigate('HiraganaList',(
        {
          img : this.state.img,
          title : this.state.title,
          index : this.state.index,
          type : this.state.type,
          headerTitle : type, 
          studyType : this.state.title + '_and_' +type, 
        }
      ));
  }

  navigateToNextTopic=()=>{
    var item = StudyList[this.state.index + 1];
    item['index'] = this.state.index + 1;
    
    const resetAction = NavigationActions.reset({ 
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'StudyList' }),
        NavigationActions.navigate({ routeName: 'TopicList' , params: item })
      ]
    });

    this.props.navigation.dispatch(resetAction);

  
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
            <TouchableOpacity style={[study.buttonTopic]} onPress={this.navigateToLearn.bind(this, 'vocabulary')}>
              <Text style={[study.buttonTopicText]}>{ strings['vocabulary'] }</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[study.buttonTopic]} onPress={this.navigateToLearn.bind(this, 'grammar')}>
              <Text style={[study.buttonTopicText]}>{ strings['grammar'] }</Text>
            </TouchableOpacity>
          </View>
          <View style={[study.buttonContainerTopic]}>
            <TouchableOpacity style={[study.buttonTopic]} onPress={this.navigateToLearn.bind(this, 'kanji')}>
              <Text style={[study.buttonTopicText]}>{ strings['kanji'] }</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[study.buttonTopic]} onPress={this.navigateToLearn.bind(this, 'topic_test')}>
              <Text style={[study.buttonTopicText]}>{ strings['topic_test'] }</Text>
            </TouchableOpacity>
          </View>
          <View style={[study.buttonContainerTopicNext]}>
            <TouchableOpacity style={[study.nextTopic]} onPress={this.navigateToNextTopic.bind(this)}>
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

export default TopicListScreen;
