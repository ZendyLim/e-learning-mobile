import React, { Component } from 'react';
import { TouchableHighlight, Image, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

/**
  Quiz Button
**/
class FillBlank extends Component {
  static propTypes = {
    textDisplay: PropTypes.string.isRequired,
    textData: PropTypes.object,
    id: PropTypes.string,
    isCorrect: PropTypes.number,
    styleFormat: PropTypes.string,
    extraChar: PropTypes.string,
    format: PropTypes.string
  };

  constructor(props) {
      super(props);
      
      this.state = {
        emptyBox:[],
        answerButton:[]
      } 
      this.current = '';
      this.answerLength = 0;
  }

    _renderIcon(){
      let iconName = '';
      
      switch (this.props.isCorrect) {
        case 1:
          iconName = 'circle-o';
          break;
        
        case 0:
          iconName = 'times';
          break;
      
        default:
          return null;
          break;
      }

      return(
        <View style={[ styles.quizBtnIconWrapper, this.props.isCorrect ? styles.quizBtnIconCorrect : styles.quizBtnIconWrong, styles.quizBtnIconLeft  ]}>
          <Icon name={ iconName }  style={ [ styles.quizBtnIcon ] } />
        </View>
      );
      
    }

    setFillButtons(){
        if(this.current != this.props.textDisplay){
            this.current = this.props.textDisplay;    
                
            let answerString = this.props.textDisplay;
            let answerStringArray = [];
            let willEmpty = [];
            let extraString = this.props.extraChar;            
            
            answerString = answerString.split(' ');        
            
            this.emptyBox = [];
            this.answerLength = answerString.length;   
            
            ctr = 0;
            while(ctr < 2){
                randomIndex = Math.floor(Math.random() * this.answerLength);
                if(willEmpty.indexOf(randomIndex) > -1) continue;
      
                willEmpty[willEmpty.length] = randomIndex;
                ctr++;
            }
            
            for(i = 0; i < this.answerLength; i++){
                char = answerString[i];
                selected = true;
                hide = true;
                if(willEmpty.indexOf(i) > -1){
                    char =  '';
                    selected = false;
                    hide = false;
                }

                answerStringArray[i] = {
                    selected: selected,
                    char: answerString[i],
                    hide: hide
                };
                                
                this.emptyBox[i] = {
                    char:char,
                    key:'',
                    clickable: !hide
                };
            }

            for(i = 0; i < extraString.length; i++){
                answerStringArray[i] = {
                    selected: false,
                    char: extraString[i]
                };
            }

            
            this.shuffledString =  this.shuffle(answerStringArray);    
        }
        
    }

    _renderFillBlankEmpty(hide){
        if(!hide){
            return(
                <View style={[ styles.fillEmptyBox, styles.fillItem ]}></View>
            );    
        }
        else{
            return null;
        }
        
    }

    _renderFillAnswerBox(item, key){
        if(item.clickable){
            return(
                (<TouchableHighlight style={[ styles.fillBox, styles.fillItem ]} onPress={ this.removeFill.bind(this,key) }>
                    <Text style={ styles.fillText }>{ item.char }</Text>
                </TouchableHighlight>)
            );   
        }
        else{
            return(
                <View style={[ styles.fillBlank ]}>
                    <Text style={ styles.fillText }>{ item.char }</Text>
                </View>
            );
        }
       
        
    }

    render(){
      this.setFillButtons();
      return (
        <View style={ [ styles.quizBtnContainer ] }>
          { this._renderIcon() }
          <View style={[ styles.displayInlineContainer, styles.fillBlankWrapper, styles.shadow ]}>
                { this.emptyBox.map((item, key)=>( 
                    <View style={ styles.displayInline } key={key}>
                    { !item.char ? 
                        (<View style={[ styles.fillEmptyBox, styles.fillItem ]}></View>) : 
                        (this._renderFillAnswerBox(item, key))
                    }
                    </View>
                    
                )
                )}             
          </View>
          <View style={ [styles.displayInlineContainer, styles.fillItemWrapper] }>
                { this.shuffledString.map((item, key)=>( 
                    <View style={ styles.displayInline } key={key}>
                    { item.selected ?                        
                        (this._renderFillBlankEmpty(item.hide)) : 
                        (<TouchableHighlight style={[ styles.fillBox, styles.fillItem ]} onPress={ this.fillSelect.bind(this,key) }>
                            <Text style={ styles.fillText }>{ item.char }</Text>
                        </TouchableHighlight>)
                    }
                    </View>
                    
                )
                )}             
          </View>
        </View>   
      );
    }

    onSelectAnswer(val){
        this.props.onSelectAnswer(val);  
             
    }

    fillSelect = (key) => {
        this.shuffledString[key].selected = true;
        
        this.fillEmpty(this.shuffledString[key].char,key);

        this.setState({
            answerButton: this.shuffledString
        });
    }

    fillEmpty(char,key) {
        filled = [];
        fillBox = true;
        for(i = 0; i < this.answerLength; i++){
            if(fillBox && !this.emptyBox[i].char){
                this.emptyBox[i].char = char;
                this.emptyBox[i].key = key;
                fillBox = false;
            }
            
            if(this.emptyBox[i].char) filled[filled.length] = this.emptyBox[i].char;
            
        }
        console.log(this.shuffledString.length, 'wee', filled.length);
        if(filled.length == this.shuffledString.length){
            
            this.onSelectAnswer(filled.join(''));            
        }
    }

    removeFill(key) {
        
        this.emptyBox[key].char = '';
        this.shuffledString[this.emptyBox[key].key].selected = false;

        this.setState({
            answerButton: this.shuffledString
        });
    }
    
    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }
    
}
module.exports = FillBlank;

const styles = require('../styles/style');