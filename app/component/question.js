import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, TouchableHighlight,ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
// Config
import  { strings }   from '../config/localization';
import { ImageData } from '../config/image_list';
// Component
import CharacterImage   from './character';

var Sound = require('react-native-sound');


/**
  Component for question, usually being use in quiz screen
**/
class QuestionPanel extends Component {
  static propTypes = {
    format: PropTypes.string,
    expression: PropTypes.string,
    question: PropTypes.object,
    timesUp: PropTypes.bool,
    style: PropTypes.array
  };

  constructor(props) {
      super(props);
      this.currentAudio = '';
      this.currentQuestion = '';
      this.imageSource = this.props.img ? ( ImageData[this.props.img] ) : ImageData.default_bg;
  }

  componentDidMount() {
    this.currentQuestion = this.props.question.id;
    if(this.props.format == 'audio'){    
      this.loadAudio();      
    }
  }

  componentDidUpdate(){
    if(this.currentQuestion != this.props.question.id){
      this.stopAudio();          
      this.currentQuestion = this.props.question.id;
      if(this.props.format == 'audio'){        
        this.loadAudio();
        this.props.questionReady(true);    
      }
      else{        
        this.props.questionReady(true);
      }      
      
    }

  }

  componentWillUnmount(){
      this.stopAudio();
  }

  stopAudio(){
    if(this.quizAudio){
      this.quizAudio.stop();
      this.quizAudio.release();      
    }
  }

  _renderTimesup(){
    if(this.props.timesUp){
      return(
        <View style={[ styles.timesUp, styles.displayInlineContainer ]}>
            <Icon name="clock-o" style={ [styles.timesUpText, styles.displayInline] }></Icon>
            <Text style={[ styles.timesUpText, styles.displayInline ]}>{ strings.TIMES_UP }</Text> 
        </View>
      );
    }
    else{
      return null;
    }
  }

  _renderQuestion(){
    if(this.props.format == 'audio'){
      return(
        <View style={[ styles.questionContainer, styles.col12 ]}>
          <TouchableHighlight onPress={() => this.loadAudio(true) }>
              <Icon name="volume-up" style={ styles.questionBigText }></Icon>
          </TouchableHighlight>
        </View>
      );
    }
    else if(this.props.format == 'fill'){
      return(
        <View style={[ styles.questionContainer, styles.col12 ]}>
          <Text style={ [styles.questionInsText, styles.questionMediumText ]}>
              {strings.QUESTION_FILL}
          </Text>
        </View>
      );
    }
    else if(this.props.format == 'arrange'){
      return(
        <View style={[ styles.questionContainer, styles.col12 ]}>
          
            <Text style={ [styles.questionInsText, styles.questionMediumText ]}>
                {strings.QUESTION_ARRANGE}
            </Text>
                  
        </View>
      );
    }
    else if(this.props.question.type == 'reading'){
      return(
        <View style={[ styles.questionReadingContainer, styles.col12 ]}>
          <ScrollView>
          <Text style={ [styles.questionInsText, styles.questionNormalText]}>
                {strings.QUESTION_READ_ANSWER}
          </Text>
          <Text style={ [styles.questionNormalText]}>
              { this.props.question[this.props.format] }
          </Text>
          </ScrollView>
        </View>
      );
    }
    else{
      return(
          <View style={[ styles.questionContainer, styles.col12 ]}>
            <Text style={ [styles.questionInsText, styles[this.props.styleFormat + 'Instruction']]}>
                {strings.QUESTION_SELECT}
            </Text>
            <Text 
              style={ [styles.questionBigText, styles[this.props.styleFormat + 'Question'], 
                  this.props.format == 'romaji' && styles.questionRomaji ] }
              >
                { this.props.question[this.props.format] }
            </Text>
          </View>
      );
    }
  }

    render(){
      bannerStyle = this.props.question.type == 'reading' ? 'quizBannerWidth' : 'quizBanner' ;

      return (
        <View style={ this.props.style }>
          <ImageBackground
            style={ styles[bannerStyle] }
            source={ this.imageSource }
          >

            <View style={ [styles.questionWrapper] }>
                  { this._renderQuestion() }          
            </View>
            { this.props.question.type != 'reading' && 
              (<CharacterImage expression={ this.props.expression } style={ styles.quizChar }/>)  
            }
          </ImageBackground>
          { this._renderTimesup() }
        </View>
      );
    }

    loadAudio(forcePlay = false){
      this.stopAudio();
      
      this.quizAudio = new Sound(this.props.question.audio, Sound.MAIN_BUNDLE, (error) => {
        if (error) {          
          return;
        }        
        this.playAudio(forcePlay);
        
      });
    }

    playAudio(forcePlay = false){
      
      playDifferentAudio = this.currentAudio != this.props.question.id && this.props.format == 'audio';
      
      if(playDifferentAudio || forcePlay){    
       
        this.currentAudio = this.props.question.id;        
        this.quizAudio.stop(() => {
          this.quizAudio.play((success) => {
            
            // this.quizAudio.release();
          });
        });
              
      }
    }

}
module.exports = QuestionPanel;

const styles = require('../styles/style');