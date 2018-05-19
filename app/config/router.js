import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import HomeScreen from '../screens/home';
import OtherScreen from '../screens/other';
//import login screen
import LoginScreen from '../screens/Login/login';
//import LoginScreen from '../screens/exampleRedux';
import NameScreen from '../screens/Login/namein';
import TimeScreen from '../screens/Login/timein';
import ConfirmationScreen from '../screens/Login/confirmation';
//import study screen
import StudyListScreen from '../screens/Study/studyList';
import TopicListScreen from '../screens/Study/topiclist';
import HiraganaListScreen from '../screens/Study/hiraganaList';
import LearnListScreen from '../screens/Learn/LearnList';
import LearnHiraganaModule from '../screens/Learn/LearnModule';
import HiraganaExplanationScreen from '../screens/Study/hiraganaExplanation';
import ScoreScreen from '../screens/Study/score';
//import Summary Screen
import StudySummaryScreen from '../screens/Summary/studySummary';
//import Quiz Flash Screen
import QuizFlashScreen from '../screens/Quiz/quizFlash';
//import setting data
import SettingScreen from '../screens/Setting/setting';
//import testing redux
import StudyReduxScreen from '../screens/studyRedux';

const styles = require('../styles/style');
//import 
const StudyStack = StackNavigator({ 
    StudyList: StudyListScreen,
    TopicList: TopicListScreen,
    HiraganaList: HiraganaListScreen,    
    QuizFlash: QuizFlashScreen,
    LearnListScreen:  LearnListScreen,
    LearnHiraganaModule: 
    {
        screen: LearnHiraganaModule, 
        navigationOptions: { tabBarVisible: false  }
    },
    ScoreScreen : {
        screen: ScoreScreen, 
        navigationOptions: { tabBarVisible: false  }
    },
    StudyList: StudyListScreen ,
    HiraganaExp: HiraganaExplanationScreen , 
});

const SummaryStack = StackNavigator({
    StudySummary: StudySummaryScreen
});

const SettingStack = StackNavigator({
    SettingList: SettingScreen
});


export const AppStack = TabNavigator({ 
    Home: {
        screen: HomeScreen, 
        navigationOptions: { 
            tabBarLabel: () => {
                return <Icon name="home"  type='font-awesome' size={25} color={"white"} />;
              }
        }
    }, 
    Study: {
        screen: StudyStack, 
        navigationOptions: { 
            tabBarLabel: () => {
                return <Icon name="book"  type='font-awesome'  size={25} color={"white"} />;
              }
        }
    }, 
    Summary: { 
        screen: SummaryStack, 
        navigationOptions: { 
            tabBarLabel: () => {
                return <Icon name="list"  type='font-awesome'  size={25} color={"white"} />;
              }
        }
    }, 
    Setting: { 
        screen: SettingStack, 
        navigationOptions: { 
            tabBarLabel: () => {
                return <Icon name="user" type='font-awesome'  size={25} color={"white"} />;
              } 
        }
    }
}, {
    tabBarPosition: 'bottom',
    tabBarOptions:{
        style:styles.tabBar
    }
});

export const MainStack = StackNavigator({
    AppStack: {
        screen: AppStack,
        navigationOptions: { 
            header: null 
        }
    },
    StudyReduxScreen: StudyReduxScreen,
    QuizFlash: QuizFlashScreen,
})

export const AuthStack = StackNavigator(
    { 
        LoginSr: LoginScreen,
        NameIn: NameScreen,
        TimeIn: TimeScreen,
        Confirmation: ConfirmationScreen
});

