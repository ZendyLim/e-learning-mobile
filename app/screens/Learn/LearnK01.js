import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    FlatList,
    Alert,
  } from 'react-native';
  import { List, ListItem, Icon } from 'react-native-elements';
  import Modal from 'react-native-modal';
  
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ImageData } from '../../config/image_list';
import  { strings }   from '../../config/localization';
import  { learnData } from '../../config/learnTopic';
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

    render(){
      return(
      <View style={{padding: 5,}}>
        <View style={learn1.FlatListItem}>
          <View style={learn1.GoiGroup}>
            <Text style={learn1.GoiItem}>{this.props.item.kanji}</Text>
            {/* <Text style={learn1.MeaningItem} >{this.props.item.romaji}</Text> */}
          </View>
          <View style={learn1.ButtonGroup}>
            <Icon reverseColor={'black'} name="info-circle"  type='font-awesome' size={45} color={"#45B5E7"} containerStyle={{flex: 1}}
            onPress={this.props.onPressButtonItem}
            />
            <Icon name="play-circle"  type='font-awesome' size={45} color={"#45B5E7"} containerStyle={{flex: 1}}
            onPress={() => {return playSound(this.props.item , this.props.component);}}
            />
          </View>
        </View>
        <View style={learn1.vline}></View>
      </View>
      );
    }
  }

  export class LearnGK01Screen extends Component {

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
        modalVisible: false,
        studyType: this.props.studyType,
        img: this.props.img,
        listType: this.props.listType,
        kanji: '',
        read: '',
        english: '',
        word: '',
      };    
    }
    
    render() {
      var dataDisplay = learnData[this.state.studyType];
      console.log(this.state.studyType);
      console.log(dataDisplay);
      return (
      <ScrollView>
        <View style={learn1.MainContainer}>
          <View style={[study.titleContainer , study.bgWhite]}>
            <Image 
              style={ study.cardImg }
              source= { ImageData[this.state.img] }
              // resizeMode="stretch" 
            />
          </View>
          <FlatList 
          // keyExtractor={this._keyExtractor}
          data={ dataDisplay }
          keyExtractor={this._keyExtractor} 
          renderItem={({item}) => {
            return(
              <FlatListItem id={item.key} item={item} component={this} 
              onPressButtonItem={() => {this._setModalVisible(!this.state.modalVisible, item.kanji, item.read, item.english, item.word)}}
              />);
            }}
          numColumns={1}
          />
        </View>
          <Modal
            // animationType="fade"
            isVisible = {this.state.modalVisible}
            animationIn={'zoomInDown'}
            animationOut={'zoomOutUp'}
            animationInTiming={500}
            animationOutTiming={500}
            onRequestClose={() => {
              this._setModalVisible(!this.state.modalVisible);
            }}>
           { this._renderModalContent() }
          </Modal>
      </ScrollView>
      );
    }

    _keyExtractor = (item) => item.key;
  
    _setModalVisible = (visible, kanji, read, english, word) => {
      this.setState({modalVisible: visible , kanji: kanji, read: read, english: english, word: word});
    }

    _setModalInvisible = () => {
      if(this.state.modalVisible == true) {
        this.setState({modalVisible: false});
      }
    }

    _renderModalContent = () => (
      <View style={learn1.ModalContainer}>
        <View style={learn1.ModalTabBar}>
            <Icon name="times"  type='font-awesome' size={30} color={"white"} underlayColor = '#45B5E7'
            onPress={this._setModalInvisible}
            />
            <Text style={learn1.ModalTextTitle}>{ this.state.kanji }</Text>
        </View>
        <View style={learn1.ModalContent}>
          <Text style={learn1.ModalContentTitle}>How to read: </Text>
          <Text style={learn1.ModalExplainText}>{ this.state.read }</Text>
          <Text style={learn1.ModalContentTitle}>Meaning: </Text>
          <Text style={learn1.ModalExplainText}>{ this.state.english }</Text>
          <Text style={learn1.ModalContentTitle}>Word: </Text>
          <Text style={learn1.ModalExplainText}>{ this.state.word }</Text>
        </View>
    </View>
    )
  }

  const learn1 = require('../../styles/learn1');
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
  export default connect(mapStateToProps, mapDispatchToProps)(LearnGK01Screen);
  // export default LearnGK01Screen;