import React, { Component } from 'react';
import {
    View,
    Animated, 
    Text, 
    TouchableOpacity, 
    ImageBackground, 
    TouchableWithoutFeedback,
  } from 'react-native';
  import { Icon } from 'react-native-elements';
  import {Dimensions} from 'react-native';

  // Config
  import { ImageData } from '../../config/image_list';
  import { flashData } from '../../config/flash';
  import ResponsiveText from '../../component/responsiveText';
  import FlashButton from '../../component/flashButton';

  var Sound = require('react-native-sound');

  function setTestState(testInfo, component, status) {
    component.setState({tests: {...component.state.tests, [testInfo.title]: status}});
  } 

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
      sound.stop();
      sound.release();
    };

    if (testInfo.isRequire) {
      const sound = new Sound(testInfo.url, error => callback(error, sound));
    } else {
      const sound = new Sound(testInfo.url, testInfo.basePath, error => callback(error, sound));
    }
  }

  class HiraganaSlidecardScreen extends Component {
    static navigationOptions = {
      header: null,
      title: 'Summary',
    };
    
    constructor(props) {
      super(props);
      const { navigation } = this.props;

      Sound.setCategory('Playback', true);

      this.data = flashData[0][this.props.title];
      this.data.sort(function() {
        return 0.5 - Math.random()
      })
     
      this.index = 0;
      this.speed = 1;
      
      this.LEFT_POS = -(Dimensions.get('window').width);
      this.RIGHT_POS = Dimensions.get('window').width;
      this.BASE_TIMER = 3000;
      this.BG_IMG = ImageData[navigation.getParam('img', null)];
      this.autoplay = true;

      this.state = {
        loopingSound: undefined,
        tests: {},

        indicator: new Animated.Value(0),
        pos: new Animated.Value(0),
        moji: this.data[0].moji,
        romaji: this.data[0].romaji, 
        url: this.data[0].url,
      };

      this.interval;

      this.slider = (duration) => {
        this.reset();
        const set = (finished) => {
          if(finished) {
            if(this.index + 1 < this.data.length) {
              this.next();
            } else {
              //TODO exit this thing
            }
          }
        }

        Animated.timing(this.state.indicator, { 
          toValue: 10000, 
          duration: duration
        }).start(set);
      }
    }

    reset = () =>  {
      this.setState({
        indicator : new Animated.Value(0)
      })
    }

    previous(){
      const set = (finished) => {
        if(finished){
          this.index--;
          this.setState({
            pos: new Animated.Value(this.LEFT_POS),
            moji: this.data[this.index].moji,
            romaji: this.data[this.index].romaji,
            url: this.data[this.index].url,
          })
          this.slideBack();
        }
      };
      Animated.spring(this.state.pos, { 
        toValue: this.RIGHT_POS, 
      }).start(set);
      
    }

    next(){
      const set = (finished) => {
        if(finished){
          this.index++;
          this.setState({
            pos: new Animated.Value(this.LEFT_POS),
            moji: this.data[this.index].moji,
            romaji: this.data[this.index].romaji,
            url: this.data[this.index].url,
          })
          this.slideBack();
        }
      };
      Animated.spring(this.state.pos, { 
        toValue: this.RIGHT_POS, 
      }).start(set);
      
    }

    slideBack() {
      playSound(this.state, this);
      const set = (finished) => {
        if(finished) {
          this.autoPlay();
        }
      }
      Animated.spring(this.state.pos, { 
        toValue: 0, 
      }).start(set);
    }

    playNpause() {
      if(this.autoplay) {
        this.autoplay = false;
        Animated.timing(this.state.indicator).stop();
      } else {
        this.autoplay = true;
        this.autoPlay();
      }
    }

    playNext() {
        this.autoplay = false;
        this.next();
    }

    playPrevious() {
        this.autoplay = false;
        this.previous();
    }

    autoPlay() {
      if(this.autoplay){
        this.slider(this.BASE_TIMER/ this.speed);
      } else {
        
      }
    }

    setSpeed() {
      switch(this.speed){
        case 1: 
          this.speed = 2;
          break;
        case 2:
          this.speed = 4;
          break;
        case 4: 
          this.speed = 1;
          break;
      }
    }

    componentDidMount() {
      this.slider(this.BASE_TIMER/ this.speed);
      playSound(this.state , this);
    }

    componentWillUnmount() {
      stopSound(this.state , this);
    }

    render() {
      const autoHeight = {
        height: (Dimensions.get('window').width) * 0.2
      }

      return (
        <ImageBackground source={this.BG_IMG} style={studyStyles.backgroundImg} >
           <View style={[studyStyles.containerBetween, studyStyles.p3]}>
             <View style={[studyStyles.containerTopRel]}>
               <TouchableOpacity onPress={() => {
                  return playSound(this.state , this);
                }} style={studyStyles.iconContainer}>
                <View style={studyStyles.cardIcon} >
                  <Icon name='volume-up' color='#45B3EB' size={40}/>
                </View>
              </TouchableOpacity>
              <TouchableWithoutFeedback>
                <View style={studyStyles.cardContainer}>
                  <Animated.View style={[styles.slideView, {
                    transform: [
                      {
                        translateX: this.state.pos
                      }
                    ]
                  }]}>
                    <View style={[studyStyles.cardText]}>
                      <ResponsiveText 
                        textType={'slider'}
                        content={this.data[this.index]} 
                        title={this.props.title} />
                    </View>
                  </Animated.View>
                </View>
              </TouchableWithoutFeedback>
            </View>

            <View style={[studyStyles.containerBottom, autoHeight]}>
              <FlashButton btnType={'icon'}
                iconName={'arrow-back'}
                disabled={this.index > 0 ? false : true }
                onPress={() => this.playPrevious()} />

              <FlashButton btnType={'icon'} 
                iconName={ this.autoplay ? 'pause' : 'play-arrow' }
                onPress={() => this.playNpause()} />

              <FlashButton btnType={'text'} 
                textName={ this.speed }
                onPress={() => this.setSpeed()} />

              <FlashButton btnType={'icon'} 
                iconName={this.index + 1 < this.data.length ? 'arrow-forward' : 'home' }
                onPress={() => this.index + 1 < this.data.length ? this.playNext() : this.goBack()} />
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

    goBack = () => {
      this.props.navigation.goBack();
    }

  }

  const styles = require('../../styles/style');
  const studyStyles = require('../../styles/study');
export default HiraganaSlidecardScreen;