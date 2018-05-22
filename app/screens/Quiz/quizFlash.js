import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight
  } from 'react-native';
  import { List, ListItem } from 'react-native-elements';
  import  { strings }   from '../../config/localization';

  import { bindActionCreators } from 'redux';
  import { connect } from 'react-redux';
  import * as Actions from '../../actions/study'; 
  
  // Import Components
  import TimerBar   from '../../component/timer';
  import QuestionPanel   from '../../component/question';
  import Quiz   from '../../component/quiz';
  import Header   from '../../component/header';

  import { quizItems } from '../../config/quiz';

  /*
    TODO:
    1.0 Refine the code 
    1.1 Make the quiz flash usable to other section
  */
  class QuizFlashScreen extends Component {
  
    static navigationOptions = ({ navigation }) => {      
      subtitle = navigation.getParam('typeQuiz', null);         
      title = navigation.getParam('title', null);
      type = navigation.getParam('type', null);

      return{
        title: 'Quiz',
        tabBarVisible:false,
        header: props => <Header 
          title={ strings[title] }
          subtitle={ subtitle }
          navigation={ navigation } 
          />
        //headerStyle:require('../../styles/style').headContainer,
        //headerTitle:<Header title='Hiragana and Katakana' subtitle='Quiz' />
      }
    };

    constructor(props){
      super(props);

      const { navigation } = this.props;
      
      this.optionsNumber = 4;
      this.allQuestion = [];
      this.quizItems = [];
      this.timeStops = 0;  
      this.studyRecord = [];
      this.startTime = null;
      this.quizOptions = [];
      this.title = navigation.getParam('title', null);
      this.oneType = '';
      
      this.state = {
        timesUp: false,
        expression: 'default',
        time:5000,        
        timerRun:true,
        timerRestart:false,
        counter: 0,
        question: [],
        answerOptions: [],
        answer: '',
        answerFormat:'',
        questionFormat:'',
        pause: 2000,
        score:0,
        correct:0,
        title:'',
        img:'',
        studyType:'',
        quizOptions:''
      }            

      this._onSetLanguageTo('en');      
    }

    _onSetLanguageTo(value) {
      strings.setLanguage(value);
    }    
  
    render() {
      let display = this.state.timesUp;
      let expression = this.state.expression;
      let format = this.state.questionFormat;
      let timerRun = this.state.timerRun;
      let timerRestart = this.state.timerRestart;

      return (
        <View style={styles.container}>
            <View style={[styles.row]}>

              <QuestionPanel 
                  question={ this.state.question } 
                  format={ format } 
                  img={ this.state.img }
                  style={[styles.col12, styles.quizFlashTop]}
                  styleFormat={ this.state.quizOptions.style }
                  timesUp={ this.state.timesUp }
                  expression={ this.state.expression }
              />
              
              <View style={[styles.col12]}>
                <TimerBar 
                  time={ this.state.time } 
                  timerRestart={ timerRestart } 
                  timerRun={ timerRun } 
                  onTimesUp={this.onTimesUp} 
                  onRestart={this.onRestart}
                  timeStops={this.setTimeStops}
                />
              </View>

              <View style={[ styles.col12, styles.quizAnswerWrapper]}>
                <View style={ !timerRun && styles.blocker }></View>
                
                <Quiz 
                  question={ this.state.question } 
                  answerOptions={ this.state.question.answerOption }
                  onAnswerSelected={ this.stopTimer }
                  format={ this.state.answerFormat }
                  styleFormat={ this.state.quizOptions.style }
                  timesUp={ this.state.timesUp }
                  isCorrect={ this.addScore }
                />

              </View>

            </View>
            
        </View>
      );
    }

    componentWillMount() {            
      const { navigation } = this.props;
      this.quizOptions = navigation.getParam('quizOptions',null);
      this.oneType = navigation.getParam('oneType',null);

      this.setState({
        title: navigation.getParam('title', null),
        img: navigation.getParam('img', null),
        type: navigation.getParam('type', null),
        topicId: navigation.getParam('topicId', null),
        studyType: navigation.getParam('studyType',null),
        typeQuiz: navigation.getParam('typeQuiz',null),        
        quizOptions: this.quizOptions
      });
      //console.log(navigation.getParam('quizOptions',null));
      this.quizItems = quizItems[navigation.getParam('topicId', null)];
      idList = navigation.getParam('idList', null);
      
      if(idList && idList.length){
        var quizItemsTemp = [];
        for(i = 0; i < idList.length; i++){
          currentId = idList[i];
          quizItemsTemp[quizItemsTemp.length] = this.quizItems.find(function (obj) { 
            return obj.id == currentId; 
          });
        }

        this.quizItems = quizItemsTemp;
      }

      let shuffledQuiz = this.shuffleItems(this.quizItems);

      this.setStartQuiz();

      this.randomQuizFormat();
      
      this.allQuestion = shuffledQuiz.map((question) => 
        this.shuffleAnswers(question, shuffledQuiz)
      );

      this.setState({
         question: this.allQuestion[0]
       });
    }

    shuffleAnswers(array, allArray) {
      var allArrayLength = allArray.length, temporaryValue, randomIndex;

      var randomIndex = Math.floor(Math.random() * this.optionsNumber);
      array.answerOption = [];
      array.answerOption[randomIndex] = array;
      
      currentItems = [array.id];  

      for(var i = 0; i < this.optionsNumber; i++){
        if(array.answerOption[i] != undefined) continue;
        randomItem = '';
           
        
        while(!randomItem){
          randomIndex = Math.floor(Math.random() * allArrayLength);
          if(currentItems.indexOf(allArray[randomIndex].id) > -1) continue;

          currentItems[currentItems.length] = allArray[randomIndex].id;
          randomItem = allArray[randomIndex];
        }

        array.answerOption[i] = randomItem;
      }

      return array;
    };

    shuffleItems(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
      
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
  
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
  
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
  
      return array;
    };

    randomQuizFormat(){
      //console.log(this.quizOptions);
      
      var quizFormat = this.oneType ? [this.oneType] : this.quizOptions.types;
      var quizFormatLength = quizFormat.length, randomIndex;

      randomIndex = Math.floor(Math.random() * quizFormatLength);

      
      
      switch (quizFormat[randomIndex]) {
        case 'romaji_moji':
          this.setState({
            answerFormat: 'moji',
            questionFormat: 'romaji'
          });
          break;
        case 'moji_romaji':
          this.setState({
            answerFormat: 'romaji',
            questionFormat: 'moji'
          });
          break;

        case 'moji_english':
          this.setState({
            answerFormat: 'english',
            questionFormat: 'moji'
          });
          break;
        
        case 'english_moji':
          this.setState({
            answerFormat: 'moji',
            questionFormat: 'english'
          });
          break;

        case 'audio_moji':
          this.setState({
            answerFormat: 'moji',
            questionFormat: 'audio'
          });
          break;
        
        case 'audio_romaji':
          this.setState({
            answerFormat: 'romaji',
            questionFormat: 'audio'
          });
          break;

        case 'audio_english':
          this.setState({
            answerFormat: 'english',
            questionFormat: 'audio'
          });
          break;
      
        default:
          this.setState({
            answerFormat: 'moji',
            questionFormat: 'romaji'
          });
          break;
          
      }
    }

    setNextQuestion() {
      const counter = this.state.counter + 1;
      this.setTakeQuiz();

      if(counter < this.allQuestion.length){
        this.randomQuizFormat();

        this.timeStops = 0;
  
        this.setState({
            counter: counter,
            //questionId: questionId,
            question: this.allQuestion[counter],
            answerOptions: this.allQuestion[counter].answerOption,
            answer: '',
            timerRun:true,
            timerRestart:true,
            timesUp: false,  
            expression:'default',
            correct: 0
        });
      }
      else{
        this.setEndQuiz();
        this.props.navigation.navigate('ScoreScreen',{
          index : 2,
          typeQuiz : "Quiz",
        });
      }
       
    }

    setStartQuiz = () =>  {
      this.startTime = new Date().getTime();
      this.props.startLearn(this.state.studyType, this.startTime,this.title); //call our action
    }

    setTakeQuiz = () =>  {
      
      parseValue = {
            questionID : this.state.question.id,
            questionTime : this.state.questionTime,
            answer :  this.state.answer,
            correct : this.state.correct,
            questionTime: this.timeStops
      }

      this.studyRecord[this.studyRecord.length] = parseValue;
      
      this.props.takeQuiz(parseValue); //call our action
    };

    setEndQuiz = () =>  {
      parseValue = {
          StudentID : this.props.StudentID,
          startTime : this.state.startTime,
          endTime :  new Date().getTime(),
          subjectTitle: this.title,
          studyType : this.state.studyType,
          studyID : this.state.topicId,
          studyRecord : this.studyRecord,
          typeQuiz:this.state.typeQuiz
      }
    this.props.endLearn(parseValue); //call our action
  };

    onTimesUp = (val) => {

      this.setState({
        timesUp: true,
        expression:'sad'
      });
      
      setTimeout(() => {
        this.setNextQuestion();
      }, this.state.pause);
    };

    setTimeStops = (time) => {
      this.timeStops = time;
      
    };

    onRestart = () => {
      this.setState({
        timerRestart: false
      });
    };

    stopTimer = (answer) => {      
      this.setState({
        timerRun:false,
        answer:answer
      });

      setTimeout(() => {
        this.setNextQuestion();
      }, this.state.pause);
    };
    
    addScore = (isCorrect) => {
      
      if(isCorrect){
        this.setState({
          score: this.state.score + 1,
          correct:1,
          expression:'happy'
        });
        
      }
      else{
        this.setState({
          expression:'sad'
        });
      }
    };
  
  }

  const styles = require('../../styles/style');

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
  return {
      StudentID: state.user.user.id,
      startTime: state.study.startTime,
      endTime: state.study.endTime,
      studyType: state.study.studyType,
      studyRecord: state.study.studyRecord,
      studyID: state.study.studyID,
  }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizFlashScreen);
