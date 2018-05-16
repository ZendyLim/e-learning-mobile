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

    _renderAnswerOptions(value) {

        let display = value.romaji;

        return (
            <AnswerButton>
                { display }
            </AnswerButton>
        );
    }

    render(){
        
        return (
            <View style={ [styles.answerContainer, styles.displayInlineContainer] }>
                { this.props.answerOptions.map((item)=>(
                    <AnswerButton 
                        key={ item.id }
                        id={ item.id }
                        style={ [ styles.displayInline ] } 
                        selected={ item.id == this.state.selectedAnswer } 
                        onSelectAnswer={ this.onSelect }>
                        
                        { item.romaji }

                    </AnswerButton>
                )
                )}
            </View>
        );
    }


    onSelect = (val) => {
        console.log(val);
        this.setState({
            selectedAnswer: val
        });
    }
    

}

module.exports = Quiz;

const styles = require('../styles/style');