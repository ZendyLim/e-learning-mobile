import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View,
    Animated, 
    TouchableOpacity, 
    Text, 
    Image, 
    ImageBackground, 
    TouchableWithoutFeedback
  } from 'react-native';
  import { List, ListItem, Icon } from 'react-native-elements';
  import {Dimensions} from 'react-native';
  // Config
  import { ImageData } from '../../config/image_list';
  import { hiraganaList } from '../../config/data';
  
  class HiraganaFlashcardScreen extends Component {
  
    static navigationOptions = {
      header: null,
      title: 'Summary',
    };

    constructor() {
      super();
      this.animatedValue = new Animated.Value(0);
      this.value = 0;
      this.animatedValue.addListener(({ value }) => {
        this.value = value;
      });
      this.frontInterpolate = this.animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg'],
      });
      this.backInterpolate = this.animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg']
      });
      this.frontOpacity = this.animatedValue.interpolate({
        inputRange: [89, 90],
        outputRange: [1, 0]
      })
      this.backOpacity = this.animatedValue.interpolate({
        inputRange: [89, 90],
        outputRange: [0, 1]
      })

      this.state = {
        front: hiraganaList[0].moji,
        back: hiraganaList[0].romaji,
        fakeFront: null,
        fakeBack: null, 
        flipped: false,
        img : ImageData.number_chara,
        isPause: false,
      };

      this.progressCounter = 0;

      this.auto = true;

      this.flipIndicator = 0;
      this.tickInterval = 100;
      this.flipSpeed = 1;

      this.flipperInterval;

      this.flipperFunction = (time) => {

        this.flipperInterval = setInterval(() => {
          this.flipIndicator += 2;
          if(this.flipIndicator >= 100) {
            if(this.state.flipped) {
              this.updateNext();
            } else {
              this.flipCard();
            }
            this.flipIndicator = 0;
          }
        }, time);
      }
    }

    componentDidMount() {
      console.log(this.props.title);
      this.flipperFunction(this.tickInterval / this.flipSpeed);
    }

    pause(){
      this.flipIndicator = 0;
      clearInterval(this.flipperInterval);
    }

    resume(){
      if(this.auto){
        this.flipperFunction(this.tickInterval / this.flipSpeed);
      }
    }

    setToNSpeed(){
      switch(this.flipSpeed){
        case 1: 
          this.flipSpeed = 2;
          break;
        case 2:
          this.flipSpeed = 4;
          break;
        case 4: 
          this.flipSpeed = 1;
          break;
      }
      this.pause();
      this.resume();
    }

    setAutoOrManual(){
      if(this.auto){
        this.pause();
        this.auto = false;
        this.setState((previousState) => {
          let state = previousState;
          state.isPause = true;
          return state;
        })
      } else {
        this.flipperFunction(this.tickInterval / this.flipSpeed);
        this.auto = true;
        this.setState((previousState) => {
          let state = previousState;
          state.isPause = false;
          return state;
        })
      }
    }

    updateNext(){
      if(this.progressCounter + 1 === hiraganaList.length){
        return;
        //TODO Finnish the damn lesson
      }
      this.pause();
      this.progressCounter++;
      this.setState((previousState) => {
        let state = previousState;
        this.value = 180;
        if(hiraganaList[this.progressCounter].id) {
          
          if(this.value >= 90){
            state.front = hiraganaList[this.progressCounter].moji;
            state.fakeBack = hiraganaList[this.progressCounter].romaji;
          } else {
            state.fakeFront = hiraganaList[this.progressCounter].romaji;
            state.back = hiraganaList[this.progressCounter].moji;
          }
        }
        
        state.flipped = true;
        return state;
      }, this.flipCard)
    }

    updatePrevious(){
      if(this.progressCounter < 1){
        this.props.navigation.goBack();
        return;
      }
      this.pause();
      this.progressCounter--;
      this.setState((previousState) => {
        let state = previousState;
        this.value = 180;
        if(hiraganaList[this.progressCounter].id) {
          if(this.value >= 90){
            state.front = hiraganaList[this.progressCounter].moji;
            state.fakeBack = hiraganaList[this.progressCounter].romaji;
          } else {
            state.fakeFront = hiraganaList[this.progressCounter].romaji;
            state.back = hiraganaList[this.progressCounter].moji;
          }
        }
        
        state.flipped = true;
        return state;
      }, this.flipCard)
    }
    
    flipCard() {
      const set = (finished) => {
        if(finished){
          this.pause();
          this.resume();
    
          this.setState((previousState) => {
            let state = previousState;
            
            if(state.fakeBack != null){
              state.back = state.fakeBack;
              state.fakeBack = null;
            }

            if(state.fakeFront != null){
              state.front = state.fakeFront;
              state.fakeFront = null;
            }

            state.flipped = !previousState.flipped;
            return state;
          })
        }
      };

      if (this.value >= 90) {
        Animated.spring(this.animatedValue, {
          toValue: 0, 
          friction: 30, 
          tension: 40,  
        }).start(set);
      } else {
        Animated.spring(this.animatedValue, {
          toValue: 180, 
          friction: 30, 
          tension: 40,  
        }).start(set);
      }
    }
    
    render() {
      const frontAnimatedStyle = {
        transform: [
          { rotateY: this.frontInterpolate }
        ],
        opacity: this.frontOpacity,
        position: 'absolute', 
        width: '100%', 
        height: '100%'
      }
      const backAnimatedStyle = {
        transform: [
          { rotateY: this.backInterpolate }
        ],
        opacity: this.backOpacity,
        position: 'absolute', 
        width: '100%', 
        height: '100%'
      }

      const help = {
        opacity: this.helpMe
      }
      
      const autoHeight = {
        height: (Dimensions.get('window').width) * 0.2
      }
      return (
        <ImageBackground source={this.state.img} style={studyStyles.backgroundImg} >
          <View style={[studyStyles.containerBetween, studyStyles.p3]}>
            <View style={[studyStyles.containerTopRel]}>
              <TouchableOpacity style={studyStyles.iconContainer}>
                <View style={studyStyles.cardIcon} >
                  <Icon name='volume-up' color='#45B3EB' size={40}/>
                </View>
              </TouchableOpacity>
              <TouchableWithoutFeedback onPress={() => this.flipCard()}>
                <View style={studyStyles.cardContainer}>
                  <Animated.View style={[frontAnimatedStyle]}>
                    <View style={[studyStyles.cardText]}>
                      <Text style={studyStyles.textContent}>{ this.state.front }</Text>
                    </View>
                  </Animated.View>
                  <Animated.View  style={[backAnimatedStyle]}>
                    <View style={[studyStyles.cardText]}>
                      <Text style={studyStyles.textContent}>{ this.state.back }</Text>
                    </View>
                  </Animated.View>
                </View>
              </TouchableWithoutFeedback>
            </View>

            <View style={[studyStyles.containerBottom, autoHeight]}>
              <View style={[studyStyles.boxButton, autoHeight]}>
                <TouchableOpacity
                  style={studyStyles.roundButton}
                  onPress={() => this.updatePrevious()}
                >
                  <Icon name='arrow-back' color='#fff' size={40}/>
                </TouchableOpacity>
              </View>
              <View style={[studyStyles.boxButton, autoHeight]}>
                <TouchableOpacity
                  style={studyStyles.roundButton}
                  onPress={() => this.setAutoOrManual()}
                >
                  { this.state.isPause ? 
                  (<Icon name='play-arrow' color='#fff' size={40}/>) : 
                  (<Icon name='pause' color='#fff' size={40}/>) 
                  }
                  
                </TouchableOpacity>
              </View>
              <View style={[studyStyles.boxButton, autoHeight]}>
                <TouchableOpacity
                  style={studyStyles.roundButton}
                  onPress={() => this.setToNSpeed()}
                >
                  <Icon name='fast-forward' color='#fff' size={40}/>
                </TouchableOpacity>
              </View>
              <View style={[studyStyles.boxButton, autoHeight]}>
                <TouchableOpacity
                  style={studyStyles.roundButton}
                  onPress={() => this.updateNext()}
                >
                  <Icon name='arrow-forward' color='#fff' size={40}/>
                </TouchableOpacity>  
              </View>
            </View>
          </View>
        </ImageBackground>
      );
    }
  
    //createGuest = async () => {
    createGuest = () => {
      //await AsyncStorage.setItem('userToken', 'abc');
      this.props.navigation.navigate('NameIn');
    };
  }

  const styles = require('../../styles/style');
  const studyStyles = require('../../styles/study');
export default HiraganaFlashcardScreen;