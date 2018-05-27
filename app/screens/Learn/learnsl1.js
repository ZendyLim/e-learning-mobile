import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    FlatList,
    Alert,
    Platform,
  } from 'react-native';
  import { List, ListItem, Icon } from 'react-native-elements';
  
  import { bindActionCreators } from 'redux';
  import { connect } from 'react-redux';
  import { HiraganaLearnStack }  from '../../config/router';
  import { number } from '../../config/numberlearn'
  import { ImageData } from '../../config/image_list';
  import  { strings }   from '../../config/localization';
  import * as Actions from '../../actions/user'; //Import your actions

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

  class FlatListItem extends Component {

    ButtonClick = (item) => {
      Alert.alert(item);
    }

    render(){
      return(
        <TouchableOpacity style={learnsl1.GridViewBlockStyle} onPress={() => {
          return playSound(this.props.item , this.props.component);
        }}>
          <Text style={learnsl1.NumberItem}>{this.props.item.number}</Text>
          <Text style={learnsl1.HiraganaItem} >{this.props.item.hiragana}</Text>
          <Text style={learnsl1.RomajiItem} >{this.props.item.romaji}</Text>
        </TouchableOpacity>
      );
    }
  }

  export class NumberLearnScreen extends Component {

    // static navigationOptions = {
        // header: null,
        // title: 'LearnHL1',
        // tabBarLabel: 'Hiragana',
      // };

    constructor(props) {
      super(props);
      Sound.setCategory('Playback', true); // true = mixWithOthers

      // Special case for stopping
      this.stopSoundLooped = () => {
        if (!this.state.loopingSound) {
          return;
        }
  
        this.state.loopingSound.stop().release();
        this.setState({loopingSound: null, tests: {...this.state.tests, ['mp3 in bundle (looped)']: 'win'}});
      };
      this.state = {
        loopingSound: undefined,
        tests: {},
      };    
    }
    
    componentWillMount() {
      // const { navigation } = this.props;
      this.setState({
        // studyType: navigation.getParam('studyType', null),
        studyType: this.props.studyType,
        img: this.props.img,
      });
      }

    render() {
      console.log(this.state.img);
      console.log(this.state.studyType);
      return (
      <ScrollView>
        <View style={study.StudyContainer}>
          <View style={[study.titleContainer , study.bgWhite]}>
            <Image 
              style={ study.cardImg }
              source= { ImageData[this.state.img] }
              // resizeMode="stretch" 
            />
            <Text style={study.title}> { strings[this.props.studyType] } </Text>
          </View>
          {/* <Text style={learnsl1.TextTitle}>{this.props.title}</Text> */}
          <FlatList 
          data={number}
          renderItem={({item}) => {
            return(
              <FlatListItem item={item} component={this}/>
              );
            }}
          numColumns={1}
          />
        </View>
      </ScrollView>
      );
    }
  }

  const learnsl1 = require('../../styles/learnsl1');
  const study = require('../../styles/study');
  
  function mapStateToProps(state, props) {
    return {
        loading: state.user.loading,
        data: state.user.user
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
  }
  
  //Connect everything
  export default connect(mapStateToProps, mapDispatchToProps)(NumberLearnScreen);
  // export default LearnHL1Screen;