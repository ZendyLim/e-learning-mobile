import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import  { strings }   from '../config/localization';

var Sound = require('react-native-sound');


/**
  Component for question, usually being use in quiz screen
**/
class QuestionPanel extends Component {
  static propTypes = {
    format: PropTypes.string,
    expression: PropTypes.string,
    question: PropTypes.object
  };

  constructor(props) {
      super(props);

      this._onSetLanguageTo('en');
      this.currentAudio = this.props.question.id;
      
  }

  _onSetLanguageTo(value) {
    strings.setLanguage(value);
  }

  componentWillMount() {
    if(this.props.format == 'audio'){
      this.loadAudio();
      setTimeout(() => this.playAudio(true), 1000);
    }
  }

  componentDidUpdate(){
    if(this.props.format == 'audio'){
      this.loadAudio();
      setTimeout(() => this.playAudio(), 400);
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
    else{
      return(
        <View style={[ styles.questionContainer, styles.col12 ]}>
          <Text style={ [styles.questionInsText, styles.questionText ] }>
              {strings.QUESTION_SELECT}
          </Text>
          <Text 
            style={ [styles.questionBigText, styles.questionText, 
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
          <View style={ [styles.questionWrapper] }>
                { this._renderQuestion() }          
          </View>
      );
    }

    loadAudio(){
      this.quizAudio = new Sound(this.props.question.audio, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        // loaded successfully
        console.log('duration in seconds: ' + this.quizAudio.getDuration() + 'number of channels: ' + this.quizAudio.getNumberOfChannels());
      });
    }

    playAudio(forcePlay = false){
        
      if(this.currentAudio != this.props.question.id || forcePlay){
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