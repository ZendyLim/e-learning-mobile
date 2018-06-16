import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import { List, ListItem , Icon} from 'react-native-elements';
  import * as Actions from '../../actions/user'; //Import your actions
  import { ProgressCircle , LineChart, Grid, YAxis, XAxis }  from 'react-native-svg-charts'
  import  { strings }   from '../../config/localization';

  import { bindActionCreators } from 'redux';
  import { connect } from 'react-redux';
  import { ImageData } from '../../config/image_list';

  
  class StudySummaryScreen extends Component {
  
    static navigationOptions = {
      header: null,
      title: 'Summary',
    };


    gotoSelectTopic = (categoryId) => {
      //await AsyncStorage.setItem('userToken', 'abc');
      this.props.navigation.navigate('PickTopicSummary', {
        categoryId : categoryId
      });
    };
    _onSetLanguageTo = (value) => {
      if(value){
        strings.setLanguage(value);
      }else{
        strings.setLanguage('en');
      }
    }    
    updateDate = (dateTo) => {
      if(dateTo == ''){
        return 0;
      }else{
        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds

        var firstDate = new Date();
        var secondDate = new Date(dateTo * 1000);
  
        var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
        return diffDays;
  
      }
    }

    getDateFormat = (dateTo) =>{
      var datefinish = new Date(dateTo * 1000);

      const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

      return  monthNames[datefinish.getMonth()] + " " + datefinish.getDate() + ", " + datefinish.getFullYear();
    }

    persen = (dateTo, dateFrom) => {
      if(dateTo == ''){
        return 0;
      }else{
        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds

        var firstDate = new Date();
        var secondDate = new Date(dateTo * 1000);
        var startDate = new Date(dateFrom  * 1000);
  
        var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
        var total = Math.round(Math.abs((startDate.getTime() - secondDate.getTime())/(oneDay)));
  
        var totalPersen = 1 - (diffDays/total) ;
   
        return totalPersen;
  
      }
    }  
      
    render() {
      this._onSetLanguageTo(this.props.lang);
      if(this.props.data.finishDate && this.props.data.startDate){
       var diffDays = this.updateDate(this.props.data.finishDate);
       var targetDate = this.getDateFormat(this.props.data.finishDate);
       var persenTotal = this.persen(this.props.data.finishDate, this.props.data.startDate);
      }else{
       var diffDays = 0;
       var targetDate = '';
       var persenTotal = 0;        
      }       
      return (
        <View style={scoreStyle.scoreContainer}>
          <View style={summary.summaryMainTop}>
            <View style={summary.flexTop1}>
                <View style={ summary.absoluteTextHome }>
                  <View style={ summary.containerScoreHome }>
                    <Text style={ summary.persentTitle }>{ persenTotal !== 0 ? ( persenTotal * 100 ) : ( 0 ) }%</Text>
                  </View>
                </View>
                <ProgressCircle
                    style={ { height: 140 } }
                    progress={ persenTotal }
                    progressColor={'#43b5e7'}
                />
            </View>         
            <View style={summary.flexTop2}>
              <Text style={ summary.toptitle }> { strings['SUMMARY_LEFT'] }</Text>
              <Text style={ summary.topsub }>{ diffDays ? ( diffDays ) : ( 0 ) } { strings['HOME_LEFT'] }</Text>
              <Text style={ summary.toptitle }> { strings['HOME_TARGET'] }</Text>
              <Text style={ summary.topsub }>{ targetDate }</Text>
            </View>         
          </View>       
          <View style={summary.summaryMainTop2}>
            <View style={summary.flexRow}>
              <View style={summary.flexBot1}>
                <View   style={summary.conGraph}>
                  <TouchableHighlight  onPress={this.gotoSelectTopic.bind(this, 'C001')}>
                    <View style={summary.graphButton}>
                    <View style={ summary.absoluteGr }>
                        <Text style={ summary.btnText }>200/200{strings['SUMMARY_WORD_LEARN']}</Text>
                      </View>
                      <Text style={ summary.TextGr }>{strings['SUMMARY_VOCABULARY'] }</Text>
                      <ProgressCircle
                        style={ { height: 75 } }
                        progress={ (70/100) }
                        progressColor={'#b3ee68'}
                      />  
                    </View>
                  </TouchableHighlight >                  
                </View>
              </View>
              <View style={summary.flexBot1}>
                <View   style={summary.conGraph}>
                <TouchableHighlight  onPress={this.gotoSelectTopic.bind(this, 'C002')}>
                  <View style={summary.graphButton}>
                      <View style={ summary.absoluteGr }>
                        <Text style={ summary.btnText }>200/200{strings['SUMMARY_WORD_LEARN']}</Text>
                      </View>
                      <Text style={ summary.TextGr }>{strings['SUMMARY_GRAMMAR'] }</Text>
                      <ProgressCircle
                        style={ { height: 80 } }
                        progress={ (70/100) }
                        progressColor={'#43b5e7'}
                      />  
                    </View>
                  </TouchableHighlight >                  
                </View>
              </View>
              <View style={summary.flexBot1}>
                <View   style={summary.conGraph}>
                <TouchableHighlight  onPress={this.gotoSelectTopic.bind(this, 'C003')}>
                    <View style={summary.graphButton}>
                    <View style={ summary.absoluteGr }>
                        <Text style={ summary.btnText }>200/200{strings['SUMMARY_WORD_LEARN']}</Text>
                      </View>
                      <Text style={ summary.TextGr }>{strings['SUMMARY_KANJI'] }</Text>
                      <ProgressCircle
                        style={ { height: 80 } }
                        progress={ (70/100) }
                        progressColor={'#ea7085'}
                      />  
                    </View>
                  </TouchableHighlight >                  
                </View>
              </View>              
            </View>
          </View>    
          <View style={ scoreStyle.menuBottom }>
              <Text>{ strings['SUMMARY_SUMMARY_MESSAGE']}
              </Text>
            </View>
            <View style={ scoreStyle.imageHomeCon}>
              <Image
                style={scoreStyle.imageHome}
                source={ ImageData['HomeImg'] }
              />
            </View>
        </View>
      );
    }
  
    //createGuest = async () => {
  
  }

  const styles = require('../../styles/style');
  const summary = require('../../styles/summary');
  const scoreStyle = require('../../styles/score');
  // The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
  return {
      //loading: state.user.loading,
      data: state.user.user,
      dateFrom: state.summary.dateFrom,
      dateTo: state.summary.dateTo,
      lang: state.user.lang
  }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(StudySummaryScreen);
