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

  import { bindActionCreators } from 'redux';
  import { connect } from 'react-redux';
  
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
    
    render() {
      const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
      const contentInsetY = { top: 20, bottom: 20 }
      const contentInsetX = { top: 20, bottom: 20 }
      return (
        <View style={scoreStyle.scoreContainer}>
          <View style={summary.summaryMainTop}>
            <View style={summary.flexTop1}>
              <View style={ summary.absoluteTextHome }>
                <View style={ summary.containerScoreHome }>
                  <Text style={ summary.persentTitle }>100%</Text>
                </View>
              </View>
              <ProgressCircle
                  style={ { height: 150 } }
                  progress={ (70/100) }
                  progressColor={'#43b5e7'}
              />
            </View>         
            <View style={summary.flexTop2}>
              <Text style={ summary.toptitle }>Days Left</Text>
              <Text style={ summary.topsub }>40 days</Text>
              <Text style={ summary.toptitle }>Target Date</Text>
              <Text style={ summary.topsub }>September 18, 2018</Text>
            </View>         
          </View>     
          <View style={summary.summaryMainTop}>
            <View style={summary.flexMid1}>
              <View style={summary.midContainer}>
                <LineChart
                  style={{ height: 200 }}
                  data={ data }
                  svg={{ stroke: 'rgb(134, 65, 244)' }}
                  contentInset={{ top: 20, bottom: 20 }}
                >
                <Grid/>
                </LineChart>
              </View>
            </View>
          </View>    
          <View style={summary.summaryMainTop}>
            <View style={summary.flexRow}>
              <View style={summary.flexBot1}>
                <View   style={summary.conGraph}>
                  <TouchableHighlight  onPress={this.gotoSelectTopic.bind(this, 'C001')}>
                    <View style={summary.graphButton}>
                    <View style={ summary.absoluteGr }>
                        <Text style={ summary.btnText }>200/200{"\n"}Words{"\n"}learned</Text>
                      </View>
                      <Text style={ summary.TextGr }>Vocabulary</Text>
                      <ProgressCircle
                        style={ { height: 80 } }
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
                        <Text style={ summary.btnText }>200/200{"\n"}Words{"\n"}learned</Text>
                      </View>
                      <Text style={ summary.TextGr }>Grammar</Text>
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
                        <Text style={ summary.btnText }>200/200{"\n"}Words{"\n"}learned</Text>
                      </View>
                      <Text style={ summary.TextGr }>Kanji</Text>
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
