import React, { Component } from 'react';
import { TouchableHighlight, Image, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import AnswerButton from './answerButton';

/**
  Quiz Button
**/
class Quiz extends Component {
  static propTypes = {
    answer: PropTypes.object,
    answerOptions: PropTypes.array,
    format:PropTypes.string
  };

  constructor(props) {
      super(props);
      
      this.currentAnswer = this.props.answer;

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
                        style={ [ styles.displayInline ] } 
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
        if(this.currentAnswer.id != this.props.answer.id){
            this.currentAnswer = this.props.answer
            this.setState({
                selectedAnswer: ''
            })
        }
    }

    checkCorrect = (id) => {
        //console.log(this.state.selectedAnswer);
        if(this.state.selectedAnswer == ''){
            return -1;
        }
        else if(id != this.props.answer.id){
            return 0;
        }
        else{
            return 1;
        }
    }

    onSelect = (val) => {
        this.props.onAnswerSelected(true);

        this.setState({
            selectedAnswer: val
        });
    }
    

}

module.exports = Quiz;

const styles = require('../styles/style');