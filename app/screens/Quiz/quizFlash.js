import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    ScrollView,
    BackHandler,
    Alert
  } from 'react-native';

  import  { strings }   from '../../config/localization';

  import { bindActionCreators } from 'redux';
  import { connect } from 'react-redux';
  import * as Actions from '../../actions/study'; 

  import { NavigationActions } from 'react-navigation';
  
  // Import Components
  import TimerBar   from '../../component/timer';
  import QuestionPanel   from '../../component/question';
  import Quiz   from '../../component/quiz';
  import CorrectPanel   from '../../component/correct';
  import CustomButton   from '../../component/button';
  import Header   from '../../component/header';

  import { quizItems } from '../../config/quiz/index';
  import { StudyList } from '../../config/studyList';
  import { studyType } from '../../config/quizFormat';

  /*
    TODO:
    1.0 Refine the code 
    1.1 Make the quiz flash usable to other section
  */
  class QuizFlashScreen extends Component {
  
    static navigationOptions = ({ navigation }) => {      
      subtitle = navigation.getParam('formatType', null);         
      title = navigation.getParam('title', null);      
      confirm = true;

      testCall = (val) => {
        
        navigation.setParams({
          pauseTime:val
        });
      }

      return{
        title: title,
        tabBarVisible:false,
        header: ({props, state}) => <Header 
          title={ strings[title] }
          subtitle={ subtitle }
          navigation={ navigation } 
          confirm={ confirm }
          state={ state }
          testCall={ this.testCall }
          />
      }
    };


    
    constructor(props){
      super(props);
    
      this.optionsNumber = 4;
      this.allQuestion = [];
      this.currentQuestion = [];
      this.quizItems = [];
      this.timeStops = 0;  
      this.studyRecord = [];
      this.startTime = null;
      this.quizOptions = [];
      this.byCategory = [];
      this.reduxParam = [];
      this.title = '';      
      this.study = [];
      this.initialParams = [];      
      this.isMounted = true;
      this.showCorrect = false;
      this.isPause = null;
      this.timerResume = false;
      this.time = 7000;

      this.initialState = {
        timesUp: false,
        expression: 'default',
        time:this.time,        
        timerRun:true,
        timerRestart:false,
        counter: 0,
        question: {},
        answerOptions: [],
        answer: '',
        answerFormat:'',
        questionFormat:'',
        pause: 1000,
        score:0,
        correct:0,
        title:'',
        img:'',
        studyType:'',
        typeQuiz : '',
        index : '',
        format:'',
        showCorrect:false 
      }

      this.testItemCount = {
        vocabulary: 10,
        kanji: 10,
        grammar: 15,
        reading: 3,
        listening: 3
      }

      this.shortType = {
        'v' : 'vocabulary',
        'g' : 'grammar',
        'k' : 'kanji'
      }

      // this.testItemCount = {
      //   vocabulary: 1,
      //   kanji: 1,
      //   grammar: 1,
      //   reading: 1,
      //   listening: 1
      // }

      this.fukushuItemCount = {
        vocabulary: 20,
        kanji: 10,
        grammar: 20
      }

      this.state = this.initialState;
     
    }

  
    render() {
      let display = this.state.timesUp;
      let expression = this.state.expression;
      let format = this.state.questionFormat;
      let timerRun = this.state.timerRun;
      let timerRestart = this.state.timerRestart;
      let question = this.state.question;      
      return (
        <View style={styles.container}>
          { this.state.question && this.state.question.id ? (
            <View style={[styles.row]}>

              <QuestionPanel 
                  question={ this.state.question } 
                  format={ format } 
                  img={ this.state.img }
                  style={[styles.col12, styles.quizFlashTop]}
                  styleFormat={ this.quizOptions.style }
                  timesUp={ this.state.timesUp }
                  expression={ this.state.expression }
                  showCorrect={ this.state.showCorrect }
                  questionReady={ this.questionReady }
              />
              
              <View style={[styles.col12]}>
                { !this.state.showCorrect &&
                  <TimerBar 
                    time={ this.state.time } 
                    timerRestart={ timerRestart } 
                    timerRun={ timerRun } 
                    onTimesUp={this.onTimesUp} 
                    onRestart={this.onRestart}
                    timeStops={this.setTimeStops}
                    timerResume={this.timerResume}
                    isTopicTest={this.initialParams.isTopicTest}
                    onTestEnd={this.onTestEnd}
                  />
                }
              </View>
              
              <View style={[ styles.col12, styles.quizAnswerWrapper ]}> 
              <ScrollView>
                <View style={ !timerRun && styles.blocker }></View>
                
                { !this.state.showCorrect ?
                  (<Quiz 
                    question={ this.state.question } 
                    answerOptions={ this.state.question.answerOption }
                    onAnswerSelected={ this.stopTimer }
                    displayFormat={ this.state.answerFormat }
                    format={ this.state.format }
                    styleFormat={ this.quizOptions.style }
                    timesUp={ this.state.timesUp }                    
                  />) :
                  (<View>
                    <CorrectPanel 
                      question={ this.state.question } 
                      format={ format }
                      style={[styles.col12]}
                      styleFormat={ this.quizOptions.style }
                    />
                    
                    <TouchableHighlight underlayColor="rgba(0,0,0,0)" style={[ styles.highPrio ]} onPress={() =>  this.goNextQuestion() }>
                      <CustomButton icon="chevron-right">{ strings.NEXT }</CustomButton>  
                    </TouchableHighlight> 
                  </View>
                  )
                }

              </ScrollView>
              </View>
            </View>

          ):(
            <Text>Empty</Text>
          ) }
            
        </View>
      );
    }

    componentDidMount() {           
      const { navigation } = this.props;
      
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
            
      this.mounted = true;
      
      let shuffledQuiz = [];

      this.initialParams = {
        title: navigation.getParam('title', null),
        img: navigation.getParam('img', null),
        formatType: navigation.getParam('formatType', null),
        studyType: navigation.getParam('studyType',null),
        headerTitle:  navigation.getParam('headerTitle',null),
        index: navigation.getParam('index', null),
        isTopicTest: navigation.getParam('isTopicTest', null),
        idList: navigation.getParam('idList', null),
        oneType: navigation.getParam('oneType',null)
      }      
      this.setState(this.initialParams);
      
      this.setInitial();
      
         
      if(this.initialParams.idList && this.initialParams.idList.length){
        if(this.initialParams.formatType == 'FUKUSHU'){
          this.setDefineFukushu(this.initialParams.idList);
          //this.setListQuestion();
        }
        else{
          this.setListQuestion();
          this.setDefinedQuestion(this.initialParams.idList);
        }    
      }  
      else{
        this.setListQuestion();
      }

            
      if(!this.quizItems){
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'StudyList'})
          ]
        });

        this.props.navigation.dispatch(resetAction);
      }
      else{                
        shuffledQuiz = this.shuffleItems(this.quizItems);                
        this.allQuestion = shuffledQuiz.map((question) =>          
            this.shuffleAnswers(question, shuffledQuiz)    
        );        
        this.currentQuestion = this.allQuestion[0];
        
        this.setState({
          question: this.currentQuestion
        });

        this.randomQuizFormat();

        this.setStartQuiz();
      }      
    }

    componentDidUpdate(){      
        const { navigation } = this.props;
        this.timerResume = false;
      
      if(this.isPause != navigation.getParam('pauseTime', null)){

        this.isPause = navigation.getParam('pauseTime', null);
        this.timerResume = true;

        this.setState({
          timerRun:this.isPause,          
        });

      }
      
    }
    
    componentWillUnmount(){
      this.mounted = false;   
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);              
    }

    handleBackButton() {
      return true;      
    }

    // set items
    setInitial(){
      this.study = StudyList.find(function (obj) { 
        return obj.title == this.title; 
      })      
      if(this.study.type == 'INITIAL'){
        this.quizOptions = this.study.quizOptions;
      }
      else{        
        this.quizOptions = this.study[this.initialParams.headerTitle];        
      }
      
    }

    setListQuestion(){
      if(this.initialParams.isTopicTest){
        topics = ['vocabulary', 'grammar', 'kanji', 'listening','reading'];
        currentItems = [];

        for(i = 0; i < topics.length; i++){          
          tempQuiz = quizItems[this.initialParams.studyType + '_and_' + topics[i]];                    
          this.byCategory[topics[i]] = tempQuiz;
                  
          for(c = 0; c < this.testItemCount[topics[i]]; c++){
            randomItem = '';

            while(!randomItem){
              randomIndex = Math.floor(Math.random() * tempQuiz.length);
              if(currentItems.indexOf(tempQuiz[randomIndex].id) > -1) continue;
              
                currentItems[currentItems.length] = tempQuiz[randomIndex].id;
                randomItem = tempQuiz[randomIndex];     
                this.quizItems.push(randomItem);
            }
          }
          
                    
        }
      }
      else{
        this.quizItems = quizItems[this.initialParams.studyType];
      }
    }

    // will change all question based on what you put in 'idList'
    setDefinedQuestion(idList){
      //if(idList && idList.length){
        var quizItemsTemp = [];

        for(i = 0; i < idList.length; i++){
          currentId = idList[i];
          quizItemsTemp[quizItemsTemp.length] = this.quizItems.find(function (obj) { 
            return obj.id == currentId; 
          });
        }
        
        this.quizItems = quizItemsTemp;
      //}
    }

    setDefineFukushu(idList){
      //will get the first 

      //(?![a-z]+\d+_)([a-z])(?=_) <-- will get the middle string of an id      

      
        var quizItemsTemp = [];
        var existingId = [];
        var existingByCat = [];

        for(i = 0; i < idList.length; i++){
          currentId = idList[i];
          id = currentId.match(/(\d+)(?=_+[a-z])/);
          type = currentId.match(/(?=_)*([a-z])(?=_)/);
          if(id != null && type != null && this.shortType[type[0]]){
            id = id[0];
            type = type[0];
            typeName = this.shortType[type];                        
            tempQuiz = quizItems[ 'TOPIC' + id + '_TITLE_and_' + typeName];                                
            if(existingByCat[typeName] == undefined) existingByCat[typeName] = [];
            if(this.fukushuItemCount[typeName] <=  existingByCat[typeName].length) continue;
            
            if(tempQuiz == undefined) continue;

            quizItemsTemp[quizItemsTemp.length] = tempQuiz.find(function (obj) { 
              return obj.id == currentId; 
            });

            existingByCat[typeName][existingByCat[typeName].length] = 1;
            
            if(existingId.indexOf(type + id) > -1) continue; 

            existingId[existingId.length] = type + id;

            if(this.byCategory[typeName] == undefined){
              this.byCategory[typeName] = tempQuiz;
            } 

          }
                    
        }

        this.quizItems = quizItemsTemp;
      
    }

    // randomized answer options
    shuffleAnswers(array, allArray) {
      if(array.answerOption){
        return array;
      }
      var allArrayLength = allArray.length, temporaryValue, randomIndex;

      var randomIndex = Math.floor(Math.random() * this.optionsNumber);
      array.answerOption = [];
      array.answerOption[randomIndex] = array;
      
      currentItems = [array.id];  
      type = array.type;
      
      for(var i = 0; i < this.optionsNumber; i++){
        if(array.answerOption[i] != undefined) continue;
        randomItem = '';
                                   
        while(!randomItem){
          if(this.initialParams.isTopicTest || this.initialParams.formatType == 'FUKUSHU'){
            byCat = this.byCategory[type];
            randomIndex = Math.floor(Math.random() * byCat.length);
            if(currentItems.indexOf(byCat[randomIndex].id) > -1) continue;

            currentItems[currentItems.length] = byCat[randomIndex].id;
            randomItem = byCat[randomIndex];
          }
          else{
            randomIndex = Math.floor(Math.random() * allArrayLength);
            if(currentItems.indexOf(allArray[randomIndex].id) > -1) continue;

            currentItems[currentItems.length] = allArray[randomIndex].id;
            randomItem = allArray[randomIndex];
          }
          
        }
        
        array.answerOption[i] = randomItem;
      }
      
      return array;
    };

    // randomized question
    shuffleItems(array) {      
      var currentIndex = array.length, temporaryValue, randomIndex, output = [];      
      var limit = this.initialParams.formatType == 'Test' ? 50 : 25;      
      
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;        
      }
            
      output = array.slice(0, limit);            
      
      return output;
    };

    randomQuizFormat(){
      let quizFormat, quizFormatLength, paramFormat, time, randomIndex;

      if(this.initialParams.isTopicTest || this.initialParams.formatType == 'FUKUSHU'){        
        questionType = this.currentQuestion.type;        
        this.quizOptions = this.study[questionType];        
      }
      
      quizFormat = this.initialParams.oneType ? [this.initialParams.oneType] : this.quizOptions.types;
      quizFormatLength = quizFormat.length;
      randomIndex = Math.floor(Math.random() * quizFormatLength);      
      time = this.time;
      
      paramFormat = this.setQuizFormat(quizFormat[randomIndex],time);      
      
      this.setState(paramFormat);
    }

    setQuizFormat(quizFormat, time){
      let paramFormat;
      
      if(this.currentQuestion.type == 'grammar'){
        time = 10000;
      }
      if (this.currentQuestion.moji.indexOf('/') > -1 && quizFormat.indexOf('fill') > -1)
      {
        switch(this.currentQuestion.type){
          case 'kanji':
            quizFormat = 'kanji_english';
          break;

          default:
            quizFormat = 'english_moji';
          break;
        }
      }
      else if (quizFormat.indexOf('audio') > -1 && this.currentQuestion.audio == ''){
        switch(this.currentQuestion.type){
          case 'kanji':
            quizFormat = 'kanji_english';
          break;

          case 'initial':
            quizFormat = 'moji_romaji';
          break;

          default:
            quizFormat = 'english_moji';
          break;
        }
      }
      
      switch (quizFormat) {
        case 'romaji_moji':
          paramFormat = {
            answerFormat: 'moji',
            questionFormat: 'romaji',
          };
          break;
        case 'moji_romaji':
          paramFormat = {
            answerFormat: 'romaji',
            questionFormat: 'moji',          
          };
          break;

        case 'moji_english':
          paramFormat = {
            answerFormat: 'english',
            questionFormat: 'moji',            
          };
          break;
        
        case 'english_moji':
          paramFormat = {
            answerFormat: 'moji',
            questionFormat: 'english',
          };
          break;

        case 'audio_moji':
          paramFormat = {
            answerFormat: 'moji',
            questionFormat: 'audio'
          };
          break;
        
        case 'audio_romaji':
          paramFormat = {
            answerFormat: 'romaji',
            questionFormat: 'audio'
          };
          break;

        case 'audio_english':
          paramFormat = {
            answerFormat: 'english',
            questionFormat: 'audio'
          };
          break;

        case 'audio_fill':
          paramFormat = {
            answerFormat: 'moji',
            questionFormat: 'audio',
            
          };

          time = time * 1.5;
          
          break;
        
        case 'english_fill':
          paramFormat = {
            answerFormat: 'moji',
            questionFormat: 'english',
            
          };

          time = time * 1.5;
          
          break;
        
        case 'kanji_fill':
          paramFormat = {
            answerFormat: 'moji',
            questionFormat: 'kanji',
            
          };

          time = time * 1.5;
          
          break;

        case 'kanji_moji':
          paramFormat = {
            answerFormat: 'moji',
            questionFormat: 'kanji'
          };
          break;
        
        case 'kanji_english':
          paramFormat = {
            answerFormat: 'english',
            questionFormat: 'kanji'
          };
          break;
        
        case 'audio_kanji':
          paramFormat = {
            answerFormat: 'kanji',
            questionFormat: 'audio'
          };
          break;
        
        case 'moji_kanji':
          paramFormat = {
            answerFormat: 'kanji',
            questionFormat: 'moji'
          };
          break;
        
        case 'fill':
          paramFormat = {
            answerFormat: 'moji',
            questionFormat: 'fill',            
          };
          
          time = time * 1.5;

          break;
        
        case 'arrange':
          paramFormat = {
            answerFormat: 'moji',
            questionFormat: 'arrange',
            
          };
          
          time = time * 2;

          break;          

        case 'moji':
          paramFormat = {
            answerFormat: 'moji',
            questionFormat: 'moji',
            
          };
          
          time = time * 2;

          break;          
      
        default:
          paramFormat = {
            answerFormat: 'moji',
            questionFormat: 'romaji'
          };
          break;          
      }
      
      paramFormat.studyType = this.setStudyType(quizFormat);
      paramFormat.format = quizFormat;
      
      if(this.initialParams.isTopicTest){
        paramFormat.time = 900000; //15mins
        //paramFormat.time = 5000; //5seconds
      }
      else{
        paramFormat.time = time;
      }

      return paramFormat;
    }

    setStudyType(quizFormat){

      if(this.study.topic_id == 'T001'){
        return studyType.hiragana[quizFormat];
      }
      else if(this.study.type == 'INITIAL'){
        return studyType.initial[quizFormat];    
      }
      else{        
          return studyType[this.currentQuestion.type][quizFormat];    
      }
    }

    setNextQuestion(forceEnd = 0) {
      
      const counter = this.state.counter + 1;      
      
      if(this.mounted){
        this.setTakeQuiz();        
        if(counter < this.allQuestion.length && !forceEnd){
          this.showCorrect = false;
          this.timeStops = 0;
          this.currentQuestion = this.allQuestion[counter];
          
          this.randomQuizFormat();                    
          
          reset = {
            counter: counter,
            //questionId: questionId,
            question: this.currentQuestion,
            answerOptions: this.currentQuestion.answerOption,
            answer: '',            
            //timerRun:true,
            timerRestart:true,
            timesUp: false,  
            expression:'default',
            correct: false,
            showCorrect:false                 
          };

                    
          this.setState(reset);
        }
        else{
          console.log('---beforend');
          this.setEndQuiz();
          
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({
                routeName: "ScoreScreen",
                params: this.initialParams
              })
            ]
          });

          this.setState(this.initialState);
          this.props.navigation.dispatch(resetAction);

          // this.props.navigation.navigate('ScoreScreen',{
          //   index : this.state.index,
          //   typeQuiz : this.state.type,
          //   studyTitle : this.title
          // });
          
        }
      }
       
    }

    setSentParamStart = (index, categoryId, type ) =>{
      var startTime = ( new Date().getTime() / 1000);
      var reduxType = 'QUIZ';
      console.log(type, type == 'Test');

      if(type == 'Test'){
        reduxType = "TEST";
      }
      else if(type == 'FUKUSHU'){
        reduxType = "FUKUSHU";
      }

      var value = {
          type : reduxType,
          topicId : StudyList[index].topic_id,
          startTime : startTime,
          categoryId : StudyList[index].topic_id + categoryId, 
          studyId : StudyList[index].topic_id + categoryId 
        }      
        
        console.log(value, 'yooo');
        return value;
    }

    setStartQuiz = () =>  {
      const { navigation } = this.props;
      let quizSizes = 0;

      this.reduxParam = this.setSentParamStart(navigation.getParam('index', null), navigation.getParam('categoryId', null), navigation.getParam('formatType', null));
      
      if(this.initialParams.isTopicTest){
        quizSizes = this.allQuestion.length;
      }      
      this.props.startLearn(this.state.studyType, this.startTime,this.title, quizSizes); //call our action
    }

    setTakeQuiz = () =>  {       
      correctTitle = this.state.question.type == 'kanji' ? this.state.question.kanji : this.state.question.moji;
      
      parseValue = {
            questionID : this.state.question.id,
            answer :  this.state.answer,
            correct : this.state.correct,
            questionTime: (this.timeStops * 1000),            
            questionTotalTime : this.state.time,
            type: this.state.question.type.toUpperCase(),
            studyType: this.state.studyType, // TODO
            correctTitle: this.stripSpace(correctTitle)
      }
      
      this.studyRecord[this.studyRecord.length] = parseValue;
      
      this.props.takeQuiz(parseValue); //call our action
    };

    setEndQuiz = () =>  {
      var endTime = ( new Date().getTime() / 1000);

      var parseValue = this.reduxParam;
      
      parseValue['finishTime'] = endTime;
      parseValue['questions'] = this.studyRecord;      
      
      console.log('--end--', parseValue);
      this.props.endLearn(parseValue); //call our action
  };

    goNextQuestion() {            
        
          this.setNextQuestion();
        
    }

    onTimesUp = (val) => {
      
      if(this.state.type == 'Quiz'){        
        this.setState({
          showCorrect:true,          
        });             

      }
      else{
        this.setState({
          timesUp: true,
          expression:'sad'
        });
        
        setTimeout(() => {
          
          this.setNextQuestion();
        }, this.state.pause); 
      }
      
    };

    onTestEnd = (val) => {      
      this.setNextQuestion(val);
    }

    setTimeStops = (time) => {
      this.timeStops = time;
      
    };

    onRestart = () => {
      this.setState({
        timerRestart: false
      });
    };

    stopTimer = (answer, isCorrect) => {   
      stopTimerParam = {
        timerRun:false,
        answer:answer
      }   
      
      this.addScore(isCorrect);
      
      if(this.state.type == 'Quiz' && this.showCorrect){
        setTimeout(() => {

          this.setState({
            showCorrect: this.showCorrect
          });
        
        }, this.state.pause);
        
      }
      else{        
        setTimeout(() => {
          this.showCorrect = false;          
          this.setNextQuestion();
        
        }, this.state.pause);  
      }
      
      this.setState(stopTimerParam);
      
      
    };

    questionReady= (isReady) => {
      if(isReady){
        param = {
          timerRun:true,
          timerRestart:true,
        }

        this.setState(param);  
      }
      
    }
    
    addScore = (isCorrect) => {
      
      if(isCorrect){
        this.showCorrect = false;

        this.setState({
          score: this.state.score + 1,
          correct:true,
          expression:'happy'
        });
        
      }
      else{
        this.showCorrect = true;

        this.setState({
          expression:'sad'
        });
      }
      
    };    

    stripSpace(val){        
      if(val){
        return  val.replace(/\s/g,'');
      }
      else{
        return val;
      }
      
    }
    
  
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
