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
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/summary'; //Import your actions

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
      index: navigation.getParam('index', null),
      title: navigation.getParam('title', null),
      img: navigation.getParam('img', null),
      type: navigation.getParam('type', null),
      categoryId :  navigation.getParam('categoryId', null),
      headerTitle : navigation.getParam('headerTitle', null),
      studyType : navigation.getParam('studyType', null),
      typeQuiz : navigation.getParam('typeQuiz', null),
      topicId : navigation.getParam('topic_id', null),
      quizOptions : navigation.getParam('quizOptions', null)
    });
    
    this.img = navigation.getParam('img', null);
    
    this.props.getSummaryRecord('QUIZ',navigation.getParam('topic_id', null), navigation.getParam('topic_id', null) + navigation.getParam('categoryId', null), navigation.getParam('topic_id', null) + navigation.getParam('categoryId', null));      
    this.props.getSummaryRecord('TEST',navigation.getParam('topic_id', null), navigation.getParam('topic_id', null) + navigation.getParam('categoryId', null), navigation.getParam('topic_id', null) + navigation.getParam('categoryId', null));      

  }

  navigateToLearn=(type, topicId = null)=>{
    if(type == 'Learn'){
      this.props.navigation.navigate('LearnListScreen',(
        {
          index : this.state.index,
          type : type,
          title : this.state.title,
          categoryId : this.state.categoryId,
          studyType: this.state.studyType,
          img: this.state.img,
        }
      ));
    }else if(type == 'Quiz' || type == 'Test'){
      
      param = {
        index : this.state.index,
        type : type,
        title : this.state.title,
        studyType: this.state.studyType,
        categoryId : this.state.categoryId,
        img: this.state.img,
        topicId: this.state.topicId,
        headerTitle: this.state.headerTitle
      };
        
      if(topicId == 'T001'){
        this.props.navigation.navigate('QuizMain',(
          param
        ));
      }
      else if(this.state.headerTitle == 'grammar' && type == 'Quiz'){
        this.props.navigation.navigate('QuizBefore',(
          param
        ));
      }
      else if(type == 'Quiz'){
        this.props.navigation.navigate('QuizFlash',(
          param
        )); 
      }
      else{
        this.props.navigation.navigate('QuizFlash',(
          param
        ));
      }
      
    }
    else{
      this.props.navigation.navigate('TopicList',(
        item
      ));
    }
  }

  navigateToSummary = (type, topicId = null) =>{
    this.props.navigation.navigate('summaryLearnData',{
      studyType : 'test',
      topic_id : 'test',
    });
  }
  getquizScore = () =>{
    if(this.props.quiz){
      var quiz = this.props.quiz;
      var count = 0;
      for(var i = 0; i<quiz.length;i++){
        if(quiz[i].correct == 1){
          count += 1;
        }
      }
      if(count == 0){
        return "0/100";
      }else{
        var result =  Math.floor((count / quiz.length) * 100);
        return result + '/100';
      }
    }else{
      return '0/0';
    }
  }
  gettestScore = () =>{
    if(this.props.test){
      var quiz = this.props.test;
      var count = 0;
      for(var i = 0; i<quiz.length;i++){
        if(quiz[i].correct == 1){
          count += 1;
        }
      }
      if(count == 0){
        return "0/100";
      }else{
        var result =  Math.floor((count / quiz.length) * 100);
        return result + '/100';
      }
    }else{
      return '0/0';
    }
  }

  navigateReview = (type) => {
    if(type == "QUIZ"){
      if(this.props.quiz !== undefined){
        this.goToReview(type);
      }else{
        alert("No Data");
      }
    }else{
      if(this.props.quiz !== undefined){
        this.goToReview(type);          
      }else{
        alert("No Data");
      }
    }
  }

  goToReview = (type) => {
    this.props.navigation.navigate('reviewScreen',(
      {
        type : type
      }
    ));  
  }  
  render() {
    var scoreQuiz = this.getquizScore();
    var scoreTest = this.gettestScore();
    
    return (
      <ScrollView>
        <View style={study.StudyContainer}>
          <View style={[study.titleContainer , study.bgWhite]}>
            <Image
                style={study.cardImg}
                source={ ImageData[this.img] }
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
            <Text style={[study.textLg, study.textCenter, study.textBold, study.textBlack]}>{ scoreQuiz }</Text>
            <View style={study.buttonContainer}>

              <TouchableOpacity style={[study.button, study.mR10]}  onPress={this.navigateToLearn.bind(this, 'Quiz', this.state.topicId)}>
              
                <Icon name='play-arrow'   color='#fff'/>
                <Text style={[study.textWhite, study.textMd]} > Start</Text>
              </TouchableOpacity>
              <TouchableOpacity style={study.button} onPress={this.navigateReview.bind(this, 'QUIZ')}>
                <Icon name='search'   color='#fff'/>
                <Text style={[study.textWhite, study.textMd]} > Review</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[study.cardBox, study.borderBox, study.p3]}>
            <Text style={[study.textLg, study.textBlack]}>Test</Text>
            <Text style={[study.textLg, study.textCenter, study.textBold, study.textBlack]}>{ scoreTest }</Text>
            <View style={study.buttonContainer}>
              <TouchableOpacity style={[study.button, study.mR10]}  onPress={this.navigateToLearn.bind(this, 'Test')}>
                <Icon name='play-arrow'   color='#fff'/>
                <Text style={[study.textWhite, study.textMd]} > Start</Text>
              </TouchableOpacity>
              <TouchableOpacity style={study.button} onPress={this.navigateReview.bind(this, 'TEST')}>
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

function mapStateToProps(state, props) {
  return {
      test: state.summary.testData,
      quiz: state.summary.quizData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(HiraganaListScreen);
