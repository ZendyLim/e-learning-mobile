import React, { Component } from 'react';
import  { strings }   from '../../config/localization';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    FlatList,
    Text,
    TextInput,
    View,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
  } from 'react-native';
  import { NavigationActions } from 'react-navigation'; 
  import { List, ListItem } from 'react-native-elements';
  import { ProgressCircle }  from 'react-native-svg-charts'
  import { Icon } from 'react-native-elements';

  import { bindActionCreators } from 'redux';
  import { connect } from 'react-redux';
  import * as Actions from '../../actions/summary'; //Import your actions
  import { StudyList } from '../../config/studyList';
  import { quizItems } from '../../config/quiz';
  import Header   from '../../component/header';
  import score from '../Study/score';
  import * as Helper from '../../actions/helper';  

  class historyListScreen extends Component {
    static navigationOptions = ({ navigation }) =>{
        //header: null,
        const {state} = navigation;
        return {
          title: `${strings['HISTORY']}`,
        };
      };
          
    constructor(props) {
      super(props);
      
    }
    state = {
      type : ""
    }

  componentWillMount() {
    const { navigation } = this.props;
    this.setState({
      type: navigation.getParam('type', null),
    });
  }
  countScore = (quiz) => {
    return Helper.countScore(quiz) + '/100';
  }

  getDateFormat = (dateTo) =>{
    var datefinish = new Date(dateTo * 1000);

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
    return  datefinish.getDate() + " " + monthNames[datefinish.getMonth()] + " " + datefinish.getFullYear() + "\n" + datefinish.getHours() + ":" + datefinish.getMinutes();
  }

  checkType = (itemType) =>{
    
  }
  
  gotoHistoryDetail = (item) =>{
    this.props.navigation.navigate('historyDetailScreen', (item));
  }
  render() {
    console.log(this.state.type);
    return (
            <ScrollView style={study.StudyContainer}>
              <View style={study.historyFlex}>
                <View style={study.historyFlexRow2}>
                  <Text style={study.historyFont}>{ strings['TIME'] }</Text>
                </View>                          
                <View style={study.historyFlexRow1}>
                  <Text style={study.historyFont}>{ strings['SCORE'] }</Text>
                </View>                          
                <View style={study.historyFlexRow1}>
                  <Text style={study.historyFont}>{ strings['DETAIL'] }</Text>
                </View>                          
              </View>           
             { this.props.historyData ? (      
                <View> 
                    { this.props.historyData.map((item, key)=>( 
                        <View key={key}>
                          { item.type == this.state.type ? (  
                            <View style={study.historyFlex}>
                              <View style={study.historyFlexRow2}>
                                <Text style={study.historyFont}>{ this.getDateFormat(item.startTime) }</Text>
                              </View>                          
                              <View style={study.historyFlexRow1}>
                                <Text style={study.historyFont}>{ this.countScore(item.questions) }</Text>
                              </View>                          
                              <View style={study.historyFlexRow1}>
                                <TouchableOpacity style={study.styleButon} onPress={ () => this.gotoHistoryDetail(item) }> 
                                  <Icon name='forward'   color='#fff'/>
                                </TouchableOpacity>
                              </View>                          
                            </View>
                          ) : (
                            <View></View>
                          )}
                        </View>
                    ))}
                </View>
            ) : (
                <Text>not data</Text>
            )}
            </ScrollView>
        );
      }
  }

const styles = require('../../styles/style');
const scoreStyle = require('../../styles/score');
const study = require('../../styles/study');

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {

  return {
    historyData: state.summary.historyData,
  }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(historyListScreen);

