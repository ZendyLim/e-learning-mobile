import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image,
    TouchableOpacity, 
} from 'react-native';
import { Icon } from 'react-native-elements';
import  { strings }   from '../../config/localization';
import { LearnListData, StudyList } from '../../config/studyList';
import style from 'react-native-datepicker/style';
import { summaryStyle } from '../../config/summaryLearn';
import { ImageData } from '../../config/image_list';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions/summary'; 

class SummaryLearnDetail extends Component {
  constructor() {
    super();
  }
  static navigationOptions = ({ navigation }) =>{
    const {state} = navigation;
    return {
        title: strings['SUMMARY_HEADER'],
    };
  };
  state = {
    type: "",
  }
  componentDidMount() {
    const { navigation } = this.props;
    this.setState({
        categoryId: navigation.getParam('categoryId', null),
        topic_id: navigation.getParam('topic_id', null),
        img: navigation.getParam('img', null),
    });
    console.log(navigation.getParam('img', null));
//    this.props.getSummaryV2( navigation.getParam('topic_id', null),  navigation.getParam('topic_id', null) + navigation.getParam('categoryId', null), navigation.getParam('topic_id', null) + navigation.getParam('categoryId', null) );

  }
 
  render() {
    if(this.state.categoryId ){
      return (
        <ScrollView style={study.StudyContainer}>
            <Image 
              style={ study.cardImg }
              source= { this.state.img ? ( ImageData[this.state.img] ) :   ImageData['loading'] }
              resizeMode="cover"  
            />
                <View style={study.summaryLearn} >
                    <Text style={[study.summaryTitle, study.fontBold]}>{strings['SUMMARY_TITLE']}</Text>
                    <Text style={[study.summaryDetail, study.fontBold]}>{strings['SUMMARY_CORRECT']}</Text>
                    <Text style={[study.summaryDetail, study.fontBold]}>{strings['SUMMARY_MISTAKE']}</Text>
                    <Text style={[study.summaryDetail, study.fontBold]}>{strings['SUMMARY_TOTAL']}</Text>
                </View>
            { this.props.showLearn.map((item, key)=>(
                <View key={key} style={study.summaryLearn} >
                    <Text style={study.summaryTitle}>{ item.title }</Text>
                    <Text style={study.summaryDetail}>{ item.correct }</Text>
                    <Text style={study.summaryDetail}>{ item.total - item.correct }</Text>
                    <Text style={study.summaryDetail}>{ item.total }</Text>
                </View>
            ))}
        </ScrollView>
      );
    }else{
      return (
        <Text>none</Text> 
      );
    }
  }


}

const styles = require('../../styles/style');
const study = require('../../styles/study');


  // The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
  return {
      //loading: state.user.loading,
      lang: state.user.lang,
      showLearn: state.summary.showLearn
  }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(SummaryLearnDetail);
