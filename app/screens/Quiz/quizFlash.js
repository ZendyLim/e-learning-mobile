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

  // Import Components
  import CharacterImage   from '../../component/character';
  import TimerBar   from '../../component/timer';
  import QuestionPanel   from '../../component/question';
  import Quiz   from '../../component/quiz';

  const imageSource = require('../../assets/img/topic/1.0-class.jpg');

  import quizItems from '../../config/quiz';

  /*
    TODO:
    1. Score
    2. If Time's up show correct answer
    2.1 If all quiz is done show score page
    3. Random All Quizzes
    4. Refine the code 
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

      this.state = {
        timesUp: false,
        expression: 'default',
        time:7000,
        timerRun:true,
        timerRestart:false,
        counter: 0,
        question: [],
        answerOptions: [],
        answer: '',
        result: '',
        pause: 2000
      }

      this._onSetLanguageTo('en');

      //this.handleAnswerSelected = this.handleAnswerSelected.bind(this);

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

    _renderAnswerButtons = () => {      
      
      return(
          <Quiz 
            answer={ this.state.question } 
            answerOptions={ this.state.question.answerOption }
            onAnswerSelected={ this.stopTimer }
          />
      )
      
    };
  
    render() {
      let display = this.state.timesUp;
      let expression = this.state.expression;
      let questionDisplay = this.state.question.moji
      let timerRun = this.state.timerRun;
      let timerRestart = this.state.timerRestart;

      return (
        <View style={styles.container}>
            <View style={[styles.row]}>
              <View style={[styles.col12, styles.quizFlashTop]}>
                
                  <ImageBackground
                      style={ styles.quizBanner }
                      source={ imageSource }
                  >
                    <QuestionPanel>{ questionDisplay }</QuestionPanel>

                    <CharacterImage expression={ expression } style={ styles.quizChar }/>
                    
                  </ImageBackground>

                  { this._renderTimesup() }
              </View>
              
              <View style={[styles.col12]}>
                <TimerBar time={ this.state.time } timerRestart={ timerRestart } timerRun={ timerRun } onTimesUp={this.onTimesUp} onRestart={this.onRestart} />
              </View>

              <View style={[ styles.col12, styles.quizAnswerWrapper]}>
                <View style={ !timerRun && styles.blocker }></View>
                { this._renderAnswerButtons() }
              </View>

            </View>
            
        </View>
      );
    }

    componentWillMount() {
      let shuffledQuiz = this.shuffleItems(quizItems);
      
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




    // handleAnswerSelected(event) {
    //   this.setUserAnswer(event.currentTarget.value);
  
    //   if (this.state.questionId < quizQuestions.length) {
    //       setTimeout(() => this.setNextQuestion(), 300);
    //   } else {
    //       setTimeout(() => this.setResults(this.getResults()), 300);
    //   }
    // }

    // setUserAnswer(answer) {
    //   const updatedAnswersCount = update(this.state.answersCount, {
    //     [answer]: {$apply: (currentValue) => currentValue + 1}
    //   });
  
    //   this.setState({
    //       answersCount: updatedAnswersCount,
    //       answer: answer
    //   });
    // }

    setNextQuestion() {
      const counter = this.state.counter + 1;
      //const questionId = this.state.questionId + 1;
  
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
      });

      
    }

    onTimesUp = (val) => {
      //this.setNextQuestion();

      this.setState({
        timesUp: true,
        expression:'sad'
      });

      setTimeout(() => {
        this.setNextQuestion();
      }, this.state.pause);
    };

    onRestart = () => {
      this.setState({
        timerRestart: false
      });
    };

    stopTimer = () => {
      this.setState({
        timerRun:false
      });

      setTimeout(() => {
        this.setNextQuestion();
      }, this.state.pause);
    };
    
  
  }

  const styles = require('../../styles/style');
  
export default QuizFlashScreen;

