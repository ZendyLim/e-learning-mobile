import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View,
    ImageBackground,
    Text,
    TouchableHighlight
  } from 'react-native';
  import { List, ListItem } from 'react-native-elements';
  import  { strings }   from '../../config/localization';

  import { bindActionCreators } from 'redux';
  import { connect } from 'react-redux';
  import * as Actions from '../../actions/study'; 
  
  // Import Components
  import CharacterImage   from '../../component/character';
  import TimerBar   from '../../component/timer';
  import QuestionPanel   from '../../component/question';
  import Quiz   from '../../component/quiz';

  import quizItems from '../../config/quiz';

  /*
    TODO:
    1.0 Refine the code 
    1.1 Make the quiz flash usable to other section
  */
  class QuizFlashScreen extends Component {
  
    static navigationOptions = {      
      title: 'Quiz',
      tabBarVisible:false
    };

    constructor(props){
      super(props);
      
      this.optionsNumber = 4;
      this.allQuestion = [];
      this.timeStops = 0;  

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
        correct:0
      }

      this.imageSource = require('../../assets/img/topic/1.0-class.jpg');

      this._onSetLanguageTo('en');      
    }

    _onSetLanguageTo(value) {
      strings.setLanguage(value);
    }

    _renderTimesup(){
      if(this.state.timesUp){
        return(
          <View style={[ styles.timesUp, styles.displayInlineContainer ]}>
              <Text style={[ styles.timesUpText, styles.displayInline ]}>{ strings.TIMES_UP }</Text> 
          </View>
        );
      }
      else{
        return null;
      }
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
              <View style={[styles.col12, styles.quizFlashTop]}>
                
                  <ImageBackground
                      style={ styles.quizBanner }
                      source={ this.imageSource }
                  >
                    <QuestionPanel 
                      question={ this.state.question } 
                      format={ format } 
                    />

                    <CharacterImage expression={ expression } style={ styles.quizChar }/>
                    
                  </ImageBackground>

                  { this._renderTimesup() }
              </View>
              
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
                  timesUp={ this.state.timesUp }
                  isCorrect={ this.addScore }
                />
              </View>

            </View>
            
        </View>
      );
    }

    componentWillMount() {
      let shuffledQuiz = this.shuffleItems(quizItems);

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
      var quizFormat = ['moji','romaji','audio_moji','audio_romaji'];
      var quizFormatLength = quizFormat.length, randomIndex;

      randomIndex = Math.floor(Math.random() * quizFormatLength);

      switch (quizFormat[randomIndex]) {
        case 'moji':
          this.setState({
            answerFormat: 'moji',
            questionFormat: 'romaji'
          });
          break;
        case 'romaji':
          this.setState({
            answerFormat: 'romaji',
            questionFormat: 'moji'
          });
          break;

        case 'audio_moji':
          this.setState({
            answerFormat: 'moji',
            questionFormat: 'audio'
          });
          break;
      
        default:
          this.setState({
            answerFormat: 'romaji',
            questionFormat: 'audio'
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
        this.props.navigation.navigate('StudyReduxScreen');
      }
       
    }

    setTakeQuiz = () =>  {

        parseValue = {
            questionID : this.state.question.id,
            questionTime : this.state.questionTime,
            answer :  this.state.answer,
            correct : this.state.correct,
            questionTime: this.timeStops
        }
      this.props.takeQuiz(parseValue); //call our action
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
