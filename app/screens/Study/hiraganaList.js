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
import  { strings }   from '../../config/localization';
// import * as Actions from '../../../actions/Quiz'; //Import your actions
import { ImageData } from '../../config/image_list';

class HiraganaListScreen extends Component {

  static navigationOptions = ({ navigation }) =>{
    //header: null,
    const {state} = navigation;
    return {
      title: `${strings[state.params.headerTitle]}`,
    };
  };
  state = {
    title:"",
    img: "",
  }
  componentDidMount() {
    const { navigation } = this.props;
    this.setState({
      title: navigation.getParam('title', null),
      img: navigation.getParam('img', null),
      type: navigation.getParam('type', null),
      headerTitle : navigation.getParam('headerTitle', null),
      studyType : navigation.getParam('studyType', null),
      typeQuiz : navigation.getParam('typeQuiz', null),
      topicId : navigation.getParam('id', null),
      quizOptions : navigation.getParam('quizOptions', null)
    });
    
    //console.log(navigation.getParam('quizOptions', null),"NIAMAK");
  }

  navigateToLearn=(type, topicId = null)=>{
    if(type == 'Learn'){
      this.props.navigation.navigate('LearnListScreen',(
        {
          type : type,
          title : this.state.title,
          studyType: this.state.studyType,
          img: this.state.img,
        }
      ));
    }else if(type == 'Quiz'){
      
      if(topicId == 'T001'){
        this.props.navigation.navigate('QuizMain',(
          {
            type : type,
            title : this.state.title,
            studyType: this.state.studyType,
            img: this.state.img,
            topicId: this.state.topicId,
            typeQuiz: 'Quiz',
            quizOptions:this.state.quizOptions
          }
        ));
      }
      else{
        this.props.navigation.navigate('QuizFlash',(
          {
            type : type,
            title : this.state.title,
            studyType: this.state.studyType,
            img: this.state.img,
            topicId: this.state.topicId,
            typeQuiz: 'Quiz',
            quizOptions:this.state.quizOptions
          }
        )); 
      }
      
    }
    else   if(type == 'Test'){
      console.log(this.state.quizOptions);
      this.props.navigation.navigate('QuizFlash',(
        {
          type : type,
          title : this.state.title,
          studyType: this.state.studyType,
          img: this.state.img,
          topicId: this.state.topicId,
          typeQuiz: 'Test',
          quizOptions:this.state.quizOptions
        }
      ));
    }
    else{
      this.props.navigation.navigate('TopicList',(
        item
      ));
    }
  }
  render() {
    return (
      <ScrollView>
        <View style={study.StudyContainer}>
          <View style={[study.titleContainer , study.bgWhite]}>
            <Image 
              style={ study.cardImg }
              source= { this.state.img ? ( ImageData[this.state.img] ) :   ImageData['loading'] }
              resizeMode="stretch"  
            />
            <Text style={study.title}> { strings[this.state.title] } </Text>
          </View>
          <View style={[study.cardBox, study.borderBox, study.p3]}>
            <Text style={[study.textLg, study.textBlack]}>Learn</Text>
            <View style={study.buttonContainer}>
              <TouchableOpacity style={[study.button, study.mR10]} onPress={this.navigateToLearn.bind(this, 'Learn')}>
                <Icon name='play-arrow'   color='#fff'/>
                <Text style={[study.textWhite, study.textMd]} > Start</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[study.cardBox, study.borderBox, study.p3]}>
            <Text style={[study.textLg, study.textBlack]}>Quiz</Text>
            <Text style={[study.textLg, study.textCenter, study.textBold, study.textBlack]}>80/100</Text>
            <View style={study.buttonContainer}>

              <TouchableOpacity style={[study.button, study.mR10]}  onPress={this.navigateToLearn.bind(this, 'Quiz', this.state.topicId)}>
              
                <Icon name='play-arrow'   color='#fff'/>
                <Text style={[study.textWhite, study.textMd]} > Start</Text>
              </TouchableOpacity>
              <TouchableOpacity style={study.button}>
                <Icon name='search'   color='#fff'/>
                <Text style={[study.textWhite, study.textMd]} > Review</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[study.cardBox, study.borderBox, study.p3]}>
            <Text style={[study.textLg, study.textBlack]}>Test</Text>
            <Text style={[study.textLg, study.textCenter, study.textBold, study.textBlack]}>80/100</Text>
            <View style={study.buttonContainer}>
              <TouchableOpacity style={[study.button, study.mR10]}  onPress={this.navigateToLearn.bind(this, 'Test')}>
                <Icon name='play-arrow'   color='#fff'/>
                <Text style={[study.textWhite, study.textMd]} > Start</Text>
              </TouchableOpacity>
              <TouchableOpacity style={study.button}>
                <Icon name='search'   color='#fff'/>
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

  quiz = () => {
    this.props.navigation.navigate('QuizMain');
  };
}

const styles = require('../../styles/style');
const study = require('../../styles/study');

export default HiraganaListScreen;