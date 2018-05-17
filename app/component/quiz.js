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
  };

  constructor(props) {
      super(props);
    
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
                        textDisplay={ item.romaji }
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

    checkCorrect = (id) => {
        console.log(this.state.selectedAnswer);
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