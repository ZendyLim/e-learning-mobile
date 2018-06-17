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
import { LearnListData } from '../../config/studyList';
import style from 'react-native-datepicker/style';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StudyList } from '../../config/studyList';
import * as SummaryHelper from '../../actions/summaryHelper'; 
import * as Actions from '../../actions/summary'; 
import { ImageData } from '../../config/image_list';

class SummaryTopicList extends Component {
  constructor() {
    super();
  }
  static navigationOptions = {
    title: 'Learn',
  };
  state = {
    type: "",
  }
  componentDidMount() {
    const { navigation } = this.props;
    this.setState({
        categoryId: navigation.getParam('categoryId', null),
    });
  }
 
  navigateToPage=(item, index)=>{
    this.props.getSummaryV2(item['topic_id'], item['topic_id'] + this.state.categoryId, item['topic_id'] + this.state.categoryId );
    item['categoryId'] = this.state.categoryId;
    this.props.navigation.navigate('summaryLearn',(
        item
    ));
  }

  render() {
    if(this.state.categoryId == "C001"){
      var exportData = StudyList.slice(0, StudyList.length);
    }else{
      var exportData = StudyList.slice(3, StudyList.length);
    }
    if(this.state.categoryId ){
      return (
        <ScrollView style={study.StudyContainer}>
            { exportData.map((item, key)=>(
                <TouchableOpacity key={key} style={study.btnLearn} onPress={this.navigateToPage.bind(this, item, key)}>
                    <Text>{strings[item.title]}</Text>
                </TouchableOpacity>
            ))}
            <View style={study.height40}></View>
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
      data: state.user.user,
      dateFrom: state.summary.dateFrom,
      dateTo: state.summary.dateTo,
      lang: state.user.lang,
      countSummary: state.summary.countSummary
  }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(SummaryTopicList);
