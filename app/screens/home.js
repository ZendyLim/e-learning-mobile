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

  import { AppStack , AuthStack }  from '../config/router';
  
  import { bindActionCreators } from 'redux';
  import { connect } from 'react-redux';
  import { ProgressCircle }  from 'react-native-svg-charts'
  import * as Actions from '../actions/summary'; //Import your actions

  import { ImageData } from '../config/image_list';
  class HomeScreen extends Component {
    static navigationOptions = {
      title: 'Home',
    };
    state = {
      leftDay:0,
    }
    componentWillMount(){
      this.props.getHomeSummary(12);
    }  
    navigatePage=(route)=>{
        this.props.navigation.navigate(route);
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

    getDateFormat = (dateTo) =>{
      var dateTo = new Date(dateTo * 1000);

      const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

      return  monthNames[dateTo.getMonth()] + " " + dateTo.getDate() + ", " + dateTo.getFullYear();
    }
   render() {
     console.log(this.props.data);
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
          {/* <Button title="Show me more of the app" onPress={this._showMoreApp} />
          <Button title="Study Redux" onPress={this.testRedux} />
          <Button title="Quiz" onPress={this.takeQuiz} />
          <Button title="Score Screen Quiz" onPress={this.scoreScreen} />
          <Button title="Score Screen Test" onPress={this.scoreScreenTest} /> 
          <Text>Home Screen</Text>
          <Button title="LogOut" onPress={this._showMoreApp} />*/}
          <View style={ [scoreStyle.containerGraph , scoreStyle.homeTop] }>
            <View style={ scoreStyle.absoluteTextHome }>
              <View style={ scoreStyle.containerScoreHome }>
                <Text style={ scoreStyle.scoreTotal }>{ diffDays ? ( diffDays ) : ( 0 ) }d Left </Text>
                <Text style={ [scoreStyle.scoreText2 , scoreStyle.fontBold] }>Target Date </Text>
                <Text style={ scoreStyle.scoreText2 }>{ targetDate } </Text>
              </View>
            </View>
            <ProgressCircle
                style={ { height: 160 } }
                progress={ persenTotal }
                progressColor={'#43b5e7'}
            />
            <View style={ scoreStyle.containerHome2 }>
              <View style={ scoreStyle.containerHomeinside2 }>
                <TouchableOpacity  style={ scoreStyle.ButtonText } onPress={this.navigatePage.bind(this,'Study')}>
                    <View style={ scoreStyle.HomeIcon }>
                      <Icon  name="book"  type='font-awesome' color="#fff"  size={18}/>
                    </View>
                    <Text style={ scoreStyle.IconText } >Study</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={ scoreStyle.ButtonText } onPress={this.navigatePage.bind(this,'Summary')}>
                    <View style={ scoreStyle.HomeIcon }>
                      <Icon  name="list"  type='font-awesome' color="#fff"   size={18}/>
                    </View>
                    <Text style={ scoreStyle.IconText } >Summary</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={ scoreStyle.ButtonText } onPress={this.navigatePage.bind(this,'Setting')}>
                    <View style={ scoreStyle.HomeIcon }>
                      <Icon name="user" type='font-awesome'  color="#fff"  size={18}/>
                    </View>
                    <Text style={ scoreStyle.IconText } >Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={ scoreStyle.menuBottom }>
              <Text>
                こんにちは！お元気ですか？{'\n'}
                勉強しましょう！
              </Text>
            </View>
            <View style={ scoreStyle.imageHomeCon}>
              <Image
                style={scoreStyle.imageHome}
                source={ ImageData['HomeImg'] }
              />
            </View>
          </View>
        </View>
      );
    }
    _showMoreApp = async () => {
      this.props.deleteUserState();
      this.props.navigation.navigate('AuthLoading');
    };

    takeQuiz = () => {
      this.props.navigation.navigate('QuizFlash');
    };

    testRedux = () => {
      this.props.navigation.navigate('StudyReduxScreen');
    }
    quiz = () => {
      this.props.navigation.navigate('QuizMain');
    };  
    scoreScreen = () => {
      this.props.navigation.navigate('ScoreScreen',{
        index : 2,
        typeQuiz : "Quiz",
      });
    };
    scoreScreenTest = () => {
      this.props.navigation.navigate('ScoreScreen',{
        index : 2,
        typeQuiz : "Test",
      });
    };
  }

const styles = require('../styles/style');
const scoreStyle = require('../styles/score');
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
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
