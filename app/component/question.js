import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, TouchableHighlight } from 'react-native';
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
      this.currentAudio = this.props.question.id;
      this.currentQuestion = '';
      this.imageSource = this.props.img ? ( ImageData[this.props.img] ) : ImageData.default_bg;
  }

  componentWillMount() {
    this.currentQuestion = this.props.question.id;
    if(this.props.format == 'audio'){
      this.loadAudio();
      setTimeout(() => {
        this.playAudio(true)}, 500);
    }
  }

  componentDidUpdate(){
    if(this.currentQuestion != this.props.question.id){
      this.currentQuestion = this.props.question.id;
      if(this.props.format == 'audio'){
        this.loadAudio();
        setTimeout(() => {
          this.playAudio()
          this.props.questionReady(true);
        }, 500);
      }
      else{
        this.props.questionReady(true);
      }
    }
    

  }

  _renderTimesup(){
    if(this.props.timesUp){
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

  _renderQuestion(){
    if(this.props.format == 'audio'){
      return(
        <View style={[ styles.questionContainer, styles.col12 ]}>
          <TouchableHighlight onPress={() => this.playAudio(true) }>
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
      return (
        <View style={ this.props.style }>
          <ImageBackground
            style={ styles.quizBanner }
            source={ this.imageSource }
          >

            <View style={ [styles.questionWrapper] }>
                  { this._renderQuestion() }          
            </View>
              
            <CharacterImage expression={ this.props.expression } style={ styles.quizChar }/>
          </ImageBackground>
          { this._renderTimesup() }
        </View>
      );
    }

    loadAudio(){
      this.quizAudio = new Sound(this.props.question.audio, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }

      });
    }

    playAudio(forcePlay = false){
      
      playDifferentAudio = this.currentAudio != this.props.question.id && this.props.format == 'audio';

      if(playDifferentAudio || forcePlay){    
            
        this.currentAudio = this.props.question.id;

        this.quizAudio.play((success) => {
          if (!success) {
            this.quizAudio.reset();
          } 
        });
      }

      

    }

}
module.exports = QuestionPanel;

const styles = require('../styles/style');