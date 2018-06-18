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

  class HiraganaSlidecardScreen extends Component {
    static navigationOptions = {
      header: null,
      title: 'Summary',
    };
    
    constructor(props) {
      super(props);

      this.state = {
        visible: false,
        x: new Animated.Value(0)
      };

      this.leftInterpolate = -(Dimensions.get('window').width);
      this.rightInterpolate = -(Dimensions.get('window').width);
    }

    slide = () => {
      Animated.spring(this.state.x, { 
        toValue: 500, 
      }).start();
      this.setState({
        visible: true,
      });
    }

    render() {
      const autoHeight = {
        height: (Dimensions.get('window').width) * 0.2
      }

      return (
        <ImageBackground style={studyStyles.backgroundImg} >
           <View style={[studyStyles.containerBetween, studyStyles.p3]}>
             <View style={[studyStyles.containerTopRel]}>
               <TouchableOpacity onPress={() => {
                  return playSound(this.state , this);
                }} style={studyStyles.iconContainer}>
                <View style={studyStyles.cardIcon} >
                  <Icon name='volume-up' color='#45B3EB' size={40}/>
                </View>
              </TouchableOpacity>
              <TouchableWithoutFeedback onPress={() => this.slide()}>
                <View style={studyStyles.cardContainer}>
                  <Animated.View style={[styles.slideView, {
                    transform: [
                      {
                        translateX: this.state.x
                      }
                    ]
                  }]}>
                    <View style={[studyStyles.cardText]}>
                      <Text>LALALA</Text>
                    </View>
                  </Animated.View>
                </View>
              </TouchableWithoutFeedback>
            </View>

            <View style={[studyStyles.containerBottom, autoHeight]}>
             
            </View>
          </View>
        </ImageBackground>
      );
    }

    // constructor(props) {
    //   super(props);

    //   Sound.setCategory('Playback', true);
    //   // Special case for stopping
    //   this.stopSoundLooped = () => {
    //     if (!this.state.loopingSound) {
    //       return;
    //     }
    //     this.state.loopingSound.stop().release();
    //     this.setState({loopingSound: null, tests: {...this.state.tests, ['mp3 in bundle (looped)']: 'win'}});
    //   };

    //   this.state = {
    //     visible: false,
    //     x: new Animated.Value(-100)
    //   }

    //   this.animatedValue = new Animated.Value(0);
    //   this.value = 0;
    //   this.animatedValue.addListener(({ value }) => {
    //     this.value = value;
    //   });
    //   this.frontInterpolate = this.animatedValue.interpolate({
    //     inputRange: [0, 180],
    //     outputRange: ['0deg', '180deg'],
    //   });
    //   this.backInterpolate = this.animatedValue.interpolate({
    //     inputRange: [0, 180],
    //     outputRange: ['180deg', '360deg']
    //   });
    //   this.frontOpacity = this.animatedValue.interpolate({
    //     inputRange: [89, 90],
    //     outputRange: [1, 0]
    //   })
    //   this.backOpacity = this.animatedValue.interpolate({
    //     inputRange: [89, 90],
    //     outputRange: [0, 1]
    //   })

    //   this.data = flashData[0][this.props.title];
    //   this.data.sort(function() {
    //     return 0.5 - Math.random()
    //   })

    //   const { navigation } = this.props;

    //   this.state = {
    //     front: this.data[0].moji,
    //     back: this.data[0].romaji,
    //     url: this.data[0].url,
    //     fakeFront: null,
    //     fakeBack: null, 
    //     flipped: false,
    //     img : ImageData[navigation.getParam('img', null)],
    //     isPause: false,
    //     loopingSound: undefined,
    //     tests: {},
    //     btnDisable: true,
    //     isFinish: false,
    //     mojiLength: this.data[0].moji.length,
    //     romajiLength: this.data[0].romaji.length,
    //   };

    //   this.progressCounter = 0;

    //   this.auto = true;

    //   this.flipIndicator = 0;
    //   this.tickInterval = 100;
    //   this.flipSpeed = 1;

    //   this.flipperInterval;

    //   this.flipperFunction = (time) => {

    //     this.flipperInterval = setInterval(() => {
    //       this.flipIndicator += 4;
    //       if(this.flipIndicator >= 100) {
    //         if(this.state.flipped) {
    //           this.updateNext();
    //         } else {
    //           this.flipCard();
    //         }
    //         this.flipIndicator = 0;
    //       }
    //     }, time);
    //   }
    // }

    // componentDidMount() {
    //   this.flipperFunction(this.tickInterval / this.flipSpeed);
    //   playSound(this.state , this);
    // }

    // pause(){
    //   this.flipIndicator = 0;
    //   clearInterval(this.flipperInterval);
    // }

    // resume(){
    //   if(this.auto){
    //     this.flipperFunction(this.tickInterval / this.flipSpeed);
    //   }
    // }

    // setToNSpeed(){
    //   switch(this.flipSpeed){
    //     case 1: 
    //       this.flipSpeed = 2;
    //       break;
    //     case 2:
    //       this.flipSpeed = 4;
    //       break;
    //     case 4: 
    //       this.flipSpeed = 1;
    //       break;
    //   }
    //   this.pause();
    //   this.resume();
    // }

    // setAutoOrManual(){
    //   if(this.auto){
    //     this.pause();
    //     this.auto = false;
    //     this.setState((previousState) => {
    //       let state = previousState;
    //       state.isPause = true;
    //       return state;
    //     })
    //   } else {
    //     this.flipperFunction(this.tickInterval / this.flipSpeed);
    //     this.auto = true;
    //     this.setState((previousState) => {
    //       let state = previousState;
    //       state.isPause = false;
    //       return state;
    //     })
    //   }
    // }

    // updateNext(){
    //   this.setState({
    //     btnDisable: false
    //   });
    //   if(this.progressCounter + 1 === this.data.length) {
    //     this.setState({
    //       isFinish: true
    //     });
    //     return;
    //   }
    //   this.pause();
    //   this.progressCounter++;
    //   this.setState({
    //     url: this.data[this.progressCounter].url, 
    //     mojiLength: this.data[this.progressCounter].moji.length,
    //     romajiLength: this.data[this.progressCounter].romaji.length,
    //   });
    //   playSound(this.data[this.progressCounter], this);
    //   this.setState((previousState) => {
    //     let state = previousState;
    //     this.value = 180;

    //     if(this.value >= 90){
    //       state.front = this.data[this.progressCounter].moji;
    //       state.fakeBack = this.data[this.progressCounter].romaji;
    //     } else {
    //       state.fakeFront = this.data[this.progressCounter].romaji;
    //       state.back = this.data[this.progressCounter].moji;
    //     }
        
    //     state.flipped = true;

    //     return state;
    //   }, this.flipCard)
    // }

    // updatePrevious(){
    //   if(this.progressCounter < 1){
    //     this.setState({
    //       btnDisable: true
    //     });
    //     return;
    //   }
    //   this.pause();
    //   this.progressCounter--;
    //   this.setState({
    //     isFinish: false, 
    //     url: this.data[this.progressCounter].url, 
    //     mojiLength: this.data[this.progressCounter].moji.length,
    //     romajiLength: this.data[this.progressCounter].romaji.length,
    //   });
    //   playSound(this.data[this.progressCounter] , this);
    //   this.setState((previousState) => {
    //     let state = previousState;
    //     this.value = 180;
    //     if(this.value >= 90){
    //       state.front = this.data[this.progressCounter].moji;
    //       state.fakeBack = this.data[this.progressCounter].romaji;
    //     } else {
    //       state.fakeFront = this.data[this.progressCounter].romaji;
    //       state.back = this.data[this.progressCounter].moji;
    //     }
        
    //     state.flipped = true;
    //     return state;
    //   }, this.flipCard)
    // }
    
    // flipCard() {
    //   const set = (finished) => {
    //     if(finished){
    //       this.pause();
    //       this.resume();
    
    //       this.setState((previousState) => {
    //         let state = previousState;
            
    //         if(state.fakeBack != null){
    //           state.back = state.fakeBack;
    //           state.fakeBack = null;
    //         }

    //         if(state.fakeFront != null){
    //           state.front = state.fakeFront;
    //           state.fakeFront = null;
    //         }

    //         state.flipped = !previousState.flipped;
    //         return state;
    //       })
    //     }
    //   };

    //   if (this.value >= 90) {
    //     Animated.spring(this.animatedValue, {
    //       toValue: 0, 
          // friction: 100, 
          // tension: 100,  
    //     }).start(set);
    //   } else {
    //     Animated.spring(this.animatedValue, {
    //       toValue: 180, 
    //       friction: 100, 
    //       tension: 100,  
    //     }).start(set);
    //   }
    // }

    // render() {
    //   const frontAnimatedStyle = {
    //     transform: [
    //       { rotateY: this.frontInterpolate }
    //     ],
    //     opacity: this.frontOpacity,
    //     position: 'absolute', 
    //     width: '100%', 
    //     height: '100%'
    //   }
    //   const backAnimatedStyle = {
    //     transform: [
    //       { rotateY: this.backInterpolate }
    //     ],
    //     opacity: this.backOpacity,
    //     position: 'absolute', 
    //     width: '100%', 
    //     height: '100%'
    //   }

    //   const help = {
    //     opacity: this.helpMe
    //   }
      
      // const autoHeight = {
      //   height: (Dimensions.get('window').width) * 0.2
      // }
    //   return (
    //     <ImageBackground source={this.state.img} style={studyStyles.backgroundImg} >
    //       <View style={[studyStyles.containerBetween, studyStyles.p3]}>
    //         <View style={[studyStyles.containerTopRel]}>
    //           <TouchableOpacity onPress={() => {
    //               return playSound(this.state , this);
    //             }} style={studyStyles.iconContainer}>
    //             <View style={studyStyles.cardIcon} >
    //               <Icon name='volume-up' color='#45B3EB' size={40}/>
    //             </View>
    //           </TouchableOpacity>
    //           <TouchableWithoutFeedback onPress={() => this.flipCard()}>
    //             <View style={studyStyles.cardContainer}>
    //               <Animated.View style={[frontAnimatedStyle]}>
    //                 <View style={[studyStyles.cardText]}>
    //                   <ResponsiveText 
    //                     content={this.state.front} 
    //                     title={this.props.title} 
    //                     textLength={this.state.mojiLength} />
    //                 </View>
    //               </Animated.View>
    //               <Animated.View  style={[backAnimatedStyle]}>
    //                 <View style={[studyStyles.cardText]}>
    //                 <ResponsiveText 
    //                   content={this.state.back} 
    //                   title={this.props.title} 
    //                   textLength={this.state.romajiLength} />
    //                 </View>
    //               </Animated.View>
    //             </View>
    //           </TouchableWithoutFeedback>
    //         </View>

    //         <View style={[studyStyles.containerBottom, autoHeight]}>
    //           <FlashButton btnType={'icon'}
    //             iconName={'arrow-back'}
    //             disabled={this.state.btnDisable}
    //             onPress={() => this.updatePrevious()} />

    //           <FlashButton btnType={'icon'} 
    //             iconName={ this.state.isPause ? 'play-arrow' : 'pause' }
    //             onPress={() => this.setAutoOrManual()} />
          
    //           <FlashButton btnType={'text'} 
    //             textName={ this.flipSpeed }
    //             onPress={() => this.setToNSpeed()} />

    //           {this.state.isFinish ? (
    //             <FlashButton btnType={'icon'} 
    //               iconName={ 'home'}
    //               onPress={() => this.props.navigation.goBack()} />
    //           ): (
    //             <FlashButton btnType={'icon'} 
    //               iconName={'arrow-forward'}
    //               onPress={() => this.updateNext()} />
    //           )}
    //         </View>
    //       </View>
    //     </ImageBackground>
    //   );
    // }
  
    //createGuest = async () => {
    createGuest = () => {
      //await AsyncStorage.setItem('userToken', 'abc');
      this.props.navigation.navigate('NameIn');
    };

  }

  const styles = require('../../styles/style');
  const studyStyles = require('../../styles/study');
export default HiraganaSlidecardScreen;