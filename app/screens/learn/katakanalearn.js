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
  // import {Table, TableWrapper, Row, Rows, Col, Cols, Cell} from 'react-native-table-component';
  // import GridView from 'react-native-gridview';
  
  import { TabNavigator, StackNavigator } from 'react-navigation';
  import { bindActionCreators } from 'redux';
  import { connect } from 'react-redux';
  import { HiraganaLearnStack }  from '../../config/router';
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
        <TouchableOpacity style={learnlh1.GridViewBlockStyle} onPress={() => {
          return playSound(this.props.item , this.props.component);
        }}>
          <Text style={learnlh1.HiraganaItem}>{this.props.item.hiragana}</Text>
          <Text style={learnlh1.RomajiItem} >{this.props.item.romaji}</Text>
        </TouchableOpacity>
      );
    }
  }

  const data = [
    {hiragana: 'ア', romaji: 'a' , url: 'ka.mp3' },
    {hiragana: 'イ', romaji: 'i' , url: 'ke.mp3' },
    {hiragana: 'ウ', romaji: 'u' , url: 'ka.mp3' },
    {hiragana: 'エ', romaji: 'e' , url: 'ka.mp3' },
    {hiragana: 'オ', romaji: 'o' , url: 'ka.mp3' },
    {hiragana: 'カ', romaji: 'ka' , url: 'ka.mp3' },
    {hiragana: 'キ', romaji: 'ki' , url: 'ka.mp3' },
    {hiragana: 'ク', romaji: 'ku' , url: 'ka.mp3' },
    {hiragana: 'ケ', romaji: 'ke' , url: 'ka.mp3' },
    {hiragana: 'コ', romaji: 'ko' , url: 'ka.mp3' },
    {hiragana: 'サ', romaji: 'sa' , url: 'ka.mp3' },
    {hiragana: 'シ', romaji: 'shi' , url: 'ka.mp3' },
    {hiragana: 'ス', romaji: 'su' , url: 'ka.mp3' },
    {hiragana: 'セ', romaji: 'se' , url: 'ka.mp3' },
    {hiragana: 'ソ', romaji: 'so' , url: 'ka.mp3' },
    {hiragana: 'タ', romaji: 'ta' , url: 'ka.mp3' },
    {hiragana: 'チ', romaji: 'chi' , url: 'ka.mp3' },
    {hiragana: 'ツ', romaji: 'tsu' , url: 'ka.mp3' },
    {hiragana: 'テ', romaji: 'te' , url: 'ka.mp3' },
    {hiragana: 'ト', romaji: 'to' , url: 'ka.mp3'}
  ];


  export class KatakanaLearnScreen extends Component {

    static navigationOptions = {
        // header: null,
        // title: 'LearnHL1',
        tabBarLabel: 'Hiragana',
      };

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

    render() {
      return (
        <View style={learnlh1.MainContainer}>
          <FlatList 
          data={data}
          renderItem={({item}) => {
            return(
              <FlatListItem item={item} component={this}/>
              );
            }}
          numColumns={5}
          />

        </View>
      );
    }
  }

  const learnlh1 = require('../../styles/learnhl1');
  
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
  export default connect(mapStateToProps, mapDispatchToProps)(KatakanaLearnScreen);
  // export default LearnHL1Screen;