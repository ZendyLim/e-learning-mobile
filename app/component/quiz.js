import React, { Component } from 'react';
import { TouchableHighlight, Image, View, Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import AnswerButton from './answerButton';
import FillButton from './fillButton';
import FillBlank from './fillBlank';

/**
  Quiz Button
**/
class Quiz extends Component {
  static propTypes = {
    question: PropTypes.object,
    answerOptions: PropTypes.array,
    format:PropTypes.string,
    timesUp:PropTypes.bool
  };

  constructor(props) {
      super(props);

      this.currentAnswer = this.props.question;
      this.isFill = false;
      this.extraChar = '';
      
      this.state = {
          selectedAnswer: '',
          question:''
      }
      
  }

  _renderAnswerButtons(){
    fill = ['audio_fill','english_fill','kanji_fill','arrange'];
    this.isFill = fill.indexOf(this.props.format) > -1;    
    if(this.props.format == 'fill'){
        textDisplay = this.props.question[this.props.displayFormat].split(' ');  

        if(textDisplay.length > 1){
            return(
                <View style={ [styles.displayInlineContainer, styles.answerContainer] }>
                    <FillBlank
                        textDisplay={ this.props.question[this.props.displayFormat] }
                        onSelectAnswer={ this.onFilled }
                        isCorrect={ this.checkFilled() }
                        extraChar={ this.extraChar }
                        reset={ this.state.reset }
                        format={ this.props.format }
                    />
                </View>
            );    
        }
        
    }
    else if(this.isFill){      
        //console.log(this.props.question);
        return(
            <View style={ [styles.displayInlineContainer, styles.answerContainer] }>
                <FillButton
                    textDisplay={ this.props.question[this.props.displayFormat] }
                    onSelectAnswer={ this.onFilled }
                    isCorrect={ this.checkFilled() }
                    extraChar={ this.extraChar }
                    reset={ this.state.reset }
                    format={ this.props.format }
                />
            </View>
        );   
                        
    }
    else{
        return(
            <View style={ [ styles.displayInlineContainer, styles.answerContainer ] }>
                { this.props.answerOptions.map((item)=>(
                    <AnswerButton 
                        key={ item.id }
                        id={ item.id }
                        textDisplay={ this.stripSpace(item[this.props.displayFormat]) }
                        styleFormat={ this.props.styleFormat } 
                        selected={ item.id == this.state.selectedAnswer } 
                        onSelectAnswer={ this.onSelect }
                        isCorrect={ this.checkCorrect(item.id) }
                    />
                )
                )}
            </View>
        );

    }
  }

    render(){
        
        return (
            <View>
                { this.props.question.questionOption && 
                (<Text style={ styles.additionalInfo }>{this.props.question.questionOption[this.props.displayFormat]}</Text>) 
                }
                { this._renderAnswerButtons() }
            </View>
        );
    }

    componentDidUpdate() {
        
        this.resetSelected();
    }

    resetSelected = () => {
        if(this.currentAnswer.id != this.props.question.id){
            this.currentAnswer = this.props.question
            this.setState({
                selectedAnswer: '',
                reset:0
            })
        }
    }

    checkCorrect = (id) => {        
        if(this.state.selectedAnswer == '' && !this.props.timesUp){
            return -1;
        }
        else if(id != this.props.question.id){
            return 0;
        }
        else{
            return 1;
        }        
        
    }

    onSelect = (val,textDisplay) => {        
        this.props.onAnswerSelected(textDisplay, val == this.props.question.id);
        
        this.setState({
            selectedAnswer: val
        });
    } 

    checkFilled = (id) => {
        
        if(this.state.selectedAnswer == '' && !this.props.timesUp){
            return -1;
        }
        else if(this.state.selectedAnswer != this.stripSpace(this.props.question[this.props.displayFormat]) ){
            return 0;
        }
        else{
            return 1;
        }        
        
    }
    
    onFilled = (val) => {
        
        this.props.onAnswerSelected(val, val == this.stripSpace(this.props.question[this.props.displayFormat]) );
        
        this.setState({
            selectedAnswer: val
        });
    } 

    stripSpace(val){        
        return this.props.displayFormat == 'moji' ? val.replace(/\s/g,'') : val;
    }

}

module.exports = Quiz;

const styles = require('../styles/style');