import React, { Component } from 'react';
import {
    View,
    Animated, 
    TouchableOpacity, 
    ImageBackground, 
    TouchableWithoutFeedback
  } from 'react-native';
  import { Icon } from 'react-native-elements';

  // Config
  import { ImageData } from '../../config/image_list';
  import { flashData } from '../../config/flash';
  import ResponsiveText from '../../component/responsiveText';

  var Sound = require('react-native-sound');

  function setTestState(testInfo, component, status) {
    component.setState({tests: {...component.state.tests, [testInfo.title]: status}});
  } 

  /**
   * Generic play function for majority of tests
   */
  function playSound(testInfo, component) {
    setTestState(testInfo, component, 'pending');

    const callback = (error, sound) => {
      if (error) {
        Alert.alert('error', error.message);
        setTestState(testInfo, component, 'fail');
        return;
      }
      setTestState(testInfo, component, 'playing');
      // Run optional pre-play callback
      testInfo.onPrepared && testInfo.onPrepared(sound, component);
      sound.play(() => {
        // Success counts as getting to the end
        setTestState(testInfo, component, 'win');
        // Release when it's done so we're not using up resources
        sound.release();
      });
    };

    // If the audio is a 'require' then the second parameter must be the callback.
    if (testInfo.isRequire) {
      const sound = new Sound(testInfo.url, error => callback(error, sound));
    } else {
      const sound = new Sound(testInfo.url, testInfo.basePath, error => callback(error, sound));
    }
  }

  function stopSound(testInfo, component) {
    setTestState(testInfo, component, 'pending');

    const callback = (error, sound) => {
      if (error) {
        Alert.alert('error', error.message);
        setTestState(testInfo, component, 'fail');
        return;
      }
      setTestState(testInfo, component, 'stoping');
      sound.setVolume(0);
      sound.stop();
      sound.release();
    };

    if (testInfo.isRequire) {
      const sound = new Sound(testInfo.url, error => callback(error, sound));
    } else {
      const sound = new Sound(testInfo.url, testInfo.basePath, error => callback(error, sound));
    }
  }

  class HiraganaFlashcardScreen extends Component {

    static navigationOptions = {
      header: null,
      title: 'Summary',
    };

    constructor(props) {
      super(props);

      Sound.setCategory('Playback', true);

      // Special case for stopping
      this.stopSoundLooped = () => {
        if (!this.state.loopingSound) {
          return;
        }
        this.state.loopingSound.stop().release();
        this.setState({loopingSound: null, tests: {...this.state.tests, ['mp3 in bundle (looped)']: 'win'}});
      };

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

      this.data = flashData[0][this.props.title];
      this.data.sort(function() {
        return 0.5 - Math.random()
      })

      const { navigation } = this.props;

      this.state = {
        front: this.data[0].moji,
        back: this.data[0].romaji,
        url: this.data[0].url,
        fakeFront: null,
        fakeBack: null, 
        flipped: false,
        img : ImageData[navigation.getParam('img', null)],
        loopingSound: undefined,
        tests: {},
        mojiLength: this.data[0].moji.length,
        romajiLength: this.data[0].romaji.length,
      };

      this.progressCounter = 0;

      this.auto = true;

      this.flipIndicator = 0;
      this.tickInterval = 100;
      this.flipSpeed = 1;

      this.flipperInterval;

      this.flipperFunction = (time) => {

        this.flipperInterval = setInterval(() => {
          this.flipIndicator += 4;
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
      this.flipperFunction(this.tickInterval / this.flipSpeed);
      playSound(this.state , this);
    }

    componentWillUnmount() {
      this.resetValue();
      stopSound(this.state , this);
      this.pause();
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

    updateNext(){
      if(this.progressCounter + 1 === this.data.length) {
        this.props.navigation.goBack();
      }
      this.pause();
      this.progressCounter++;
      this.setState({
        url: this.data[this.progressCounter].url, 
        mojiLength: this.data[this.progressCounter].moji.length,
        romajiLength: this.data[this.progressCounter].romaji.length,
      });
      playSound(this.data[this.progressCounter], this);
      this.setState((previousState) => {
        let state = previousState;
        this.value = 180;

        if(this.value >= 90){
          state.front = this.data[this.progressCounter].moji;
          state.fakeBack = this.data[this.progressCounter].romaji;
        } else {
          state.fakeFront = this.data[this.progressCounter].romaji;
          state.back = this.data[this.progressCounter].moji;
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
          friction: 100, 
          tension: 100,  
        }).start(set);
      } else {
        Animated.spring(this.animatedValue, {
          toValue: 180, 
          friction: 100, 
          tension: 100,  
        }).start(set);
      }
    }

    resetValue(){
      params = {
        loopingSound: undefined,
        tests: {},

        indicator: new Animated.Value(0),
        pos: new Animated.Value(0),
        moji: this.data[0].moji,
        romaji: this.data[0].romaji, 
        url: this.data[0].url,
      };

      this.setState(params);
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

      return (
        <ImageBackground source={this.state.img} style={studyStyles.backgroundImg} >
          <View style={[studyStyles.containerBetween, studyStyles.p3]}>
            <View style={[studyStyles.cardBox]}>
              <TouchableOpacity onPress={() => {
                  return playSound(this.state , this);
                }} style={studyStyles.iconContainer}>
                <View style={studyStyles.cardIcon} >
                  <Icon name='volume-up' color='#45B3EB' size={80}/>
                </View>
              </TouchableOpacity>
              <TouchableWithoutFeedback onPress={() => this.flipCard()}>
                <View style={studyStyles.cardContainer}>
                  <Animated.View style={[frontAnimatedStyle]}>
                    <View style={[studyStyles.cardText]}>
                      <ResponsiveText 
                        textType={'flip'}
                        content={this.state.front} 
                        title={this.props.title} 
                        textLength={this.state.mojiLength} />
                    </View>
                  </Animated.View>
                  <Animated.View  style={[backAnimatedStyle]}>
                    <View style={[studyStyles.cardText]}>
                    <ResponsiveText 
                      textType={'flip'}
                      content={this.state.back} 
                      title={this.props.title} 
                      textLength={this.state.romajiLength} />
                    </View>
                  </Animated.View>
                </View>
              </TouchableWithoutFeedback>
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

  const studyStyles = require('../../styles/study');
  export default HiraganaFlashcardScreen;