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
  import AnswerButton   from '../../component/answerButton';

  const imageSource = require('../../assets/img/topic/1.0-class.jpg');

  import quizItems from '../../config/quiz';
  class QuizFlashScreen extends Component {
  
    static navigationOptions = {      
      title: 'Quiz',
      tabBarVisible:false
    };

    constructor(props){
      super(props);

      this._onSetLanguageTo('en');

      this.state = {
        timesUp: false,
        expression: 'default',
        time:7000,
        counter: 0,
        question: '',
        answerOptions: [],
        answer: '',
        answersCount: {
          nintendo: 0,
          microsoft: 0,
          sony: 0
        },
        result: ''
      }

      this.handleAnswerSelected = this.handleAnswerSelected.bind(this);

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
      // const { question } = this.props
      // const { possibleArtists } = question
  
      // return possibleArtists.map((artist, i) =>
      //   <AnswerButton
      //     key={artist}
      //     title={artist}
      //     onPress={() => this.onAnswer(i)}
      //     {...this.getAdditionalButtonProps(i)}
      //   />,
      // )
      return(
        <AnswerButton textData={ quizItems } >
          hi
        </AnswerButton>
      )
      
    };
  
    render() {
      let display = this.state.timesUp;
      let expression = this.state.expression;
      console.log(this.state.answerOptions);
      return (
        <View style={styles.container}>
            <View style={[styles.row]}>
              <View style={[styles.col12, styles.quizFlashTop]}>

                  <ImageBackground
                      style={ styles.quizBanner }
                      source={ imageSource }
                  >
                    <QuestionPanel></QuestionPanel>

                    <CharacterImage expression={ expression } style={ styles.quizChar }/>

                    { this._renderTimesup() }
                  </ImageBackground>

              </View>
              
              <View style={[styles.col12]}>
                <TimerBar time={ this.state.time } onTimesUp={this.onTimesUp} />
              </View>

              <View style={[ styles.col12]}>
              { this._renderAnswerButtons() }
              </View>

            </View>
            
        </View>
      );
    }

    componentWillMount() {
      const shuffledAnswerOptions = quizItems.map((question) => this.shuffleArray(question.answers));

      this.setState({
        answerOptions: shuffledAnswerOptions[0]
      });
    }

    shuffleArray(array) {
      var currentIndex = 0;
  
      // While there remain elements to shuffle...
      while (currentIndex < 4) {
  
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex++;
  
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
  
      return array;
    };

    handleAnswerSelected(event) {
      this.setUserAnswer(event.currentTarget.value);
  
      if (this.state.questionId < quizQuestions.length) {
          setTimeout(() => this.setNextQuestion(), 300);
      } else {
          setTimeout(() => this.setResults(this.getResults()), 300);
      }
    }

    setUserAnswer(answer) {
      const updatedAnswersCount = update(this.state.answersCount, {
        [answer]: {$apply: (currentValue) => currentValue + 1}
      });
  
      this.setState({
          answersCount: updatedAnswersCount,
          answer: answer
      });
    }

    onTimesUp = (val) => {
      this.setState({
        timesUp: true,
        expression:'sad'
      });

    };
  
  }

  const styles = require('../../styles/style');
  
export default QuizFlashScreen;

