import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
// Config
import  { strings }   from '../config/localization';
import { ImageData } from '../config/image_list';
// Component

var Sound = require('react-native-sound');


/**
  Component for question, usually being use in quiz screen
**/
class CorrectPanel extends Component {
  static propTypes = {
    format: PropTypes.string,
    expression: PropTypes.string,
    question: PropTypes.object,
    timesUp: PropTypes.bool,
    style: PropTypes.array
  };

  constructor(props) {
      super(props);

      this._onSetLanguageTo('en');
      this.currentAudio = this.props.question.id;
      
      this.imageSource = this.props.img ? ( ImageData[this.props.img] ) : ImageData.default_bg;
  }

  _onSetLanguageTo(value) {
    strings.setLanguage(value);
  }

  componentWillMount() {
    
      this.loadAudio();        
  }

  componentDidUpdate(){
    
      this.loadAudio();
  }


  _renderQuestion(){

    displayToText = this.props.question.type == 'kanji' ? this.props.question.kanji : this.props.question.moji;
    
      return(
        <View style={[ styles.correctContainer, styles.shadow ]}>
          <View>
            <Text style={ styles.correctText }>{ this.stripSpace(displayToText) }</Text>
            <Text style={ styles.correctText }>{ this.props.question.romaji }</Text>
            <Text style={ styles.correctHighlight }>English</Text>
            <Text style={ styles.correctText }>{ this.props.question.english }</Text>
          </View>
          
          <TouchableHighlight onPress={() => this.playAudio(true) } style={ styles.correctAudio }>
              <Icon name="volume-up" style={ styles.correctVolume }></Icon>
          </TouchableHighlight>
        </View>
      );
    
  }

    render(){
      return (
        <View style={ this.props.style }>

            <View style={ [styles.correctWrapper, styles.col12] }>
                
                <Text style={ styles.correctTitle }>Correct Answer</Text>                
                
                  { this._renderQuestion() }          
            </View>
              
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

    stripSpace(val){        
      return val.replace(/\s/g,'');
    }

}
module.exports = CorrectPanel;

const styles = require('../styles/style');