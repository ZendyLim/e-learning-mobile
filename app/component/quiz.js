import React, { Component } from 'react';
import { TouchableHighlight, Image, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import AnswerButton from './answerButton';

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

      this.state = {
          selectedAnswer: ''
      }
      
  }

    render(){
        
        return (
            <View style={ [styles.answerContainer, styles.displayInlineContainer] }>
                { this.props.answerOptions.map((item)=>(
                    <AnswerButton 
                        key={ item.id }
                        id={ item.id }
                        textDisplay={ item[this.props.format] }
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

    componentDidUpdate() {
        this.resetSelected();
    }

    resetSelected = () => {
        if(this.currentAnswer.id != this.props.question.id){
            this.currentAnswer = this.props.question
            this.setState({
                selectedAnswer: ''
            })
        }
    }

    checkCorrect = (id) => {
        //console.log(this.state.selectedAnswer);
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

    onSelect = (val) => {
        this.props.onAnswerSelected(val);

        this.props.isCorrect(val == this.props.question.id);
        
        this.setState({
            selectedAnswer: val
        });
    }
    

}

module.exports = Quiz;

const styles = require('../styles/style');