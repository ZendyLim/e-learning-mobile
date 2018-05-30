import React, { Component } from 'react';
import {
    StyleSheet,
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
// import { HiraganaLearnStack }  from '../../config/router';
import { goi } from '../../config/MeFamilyLearn'
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

    render(){
      return(
      <View style={{padding: 5,}}>
        <View style={learn1.FlatListItem}>
          <View style={learn1.GoiGroup}>
            <Text style={learn1.GoiItem}>{this.props.item.title}</Text>
            <Text style={learn1.MeaningItem} >{this.props.item.meaning}</Text>
          </View>
          <View style={learn1.ButtonGroup}>
            <Icon reverseColor={'black'} name="info-circle"  type='font-awesome' size={45} color={"#45B5E7"} containerStyle={{flex: 1}}
            onPress={this.props.onPressButtonItem}/>
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

  export class GoiLearn1 extends Component {

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
        title: '',
        detail: '',
        studyType: this.props.studyType,
        img: this.props.img,
        datatopic: this.props.datatopic,
        // config: this.props.config,
      };    
    }
    
    render() {
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
          data={goi}
          renderItem={({item, id}) => {
            return(
              <FlatListItem item={item} component={this} onPressButtonItem={() => {this._setModalVisible(true, item.title, item.detail)}}/>
              );
            }}
          numColumns={1}
          />
        </View>
          <Modal
            animationType="slide"
            isVisible = {this.state.modalVisible}
            onRequestClose={() => {
              this._setModalVisible(!this.state.modalVisible);
            }}
            // style={{}}
            >
           { this._renderModalContent() }
          </Modal>
      </ScrollView>
      );
    }

    // _keyExtractor = (item, index) => item.id;
  
    _setModalVisible = (visible, title, detail) => {
      this.setState({modalVisible: visible , title: title, detail: detail});
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
            <Text style={learn1.ModalTextTitle}>{ this.state.title }</Text>
        </View>
        <View style={learn1.ModalContent}>
          <Text style={learn1.ModalContentTitle}>{ this.state.title }</Text>
          <Text>{ this.state.detail }</Text>
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
  export default connect(mapStateToProps, mapDispatchToProps)(GoiLearn1);
  // export default GoiLearn1;