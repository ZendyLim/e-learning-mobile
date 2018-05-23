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
import QuizMainScreen from '../screens/Quiz/quizMain';
import QuizListScreen from '../screens/Quiz/quizList';
import QuizHiraganaListScreen from '../screens/Quiz/quizHiraganaList';
import QuizKatakanaListScreen from '../screens/Quiz/quizKatakanaList';
import HiraganaFlashcardScreen from '../screens/Study/hiraganaFlashcard';
import ScoreScreen from '../screens/Study/score';
//import MainView from '../screens/sound';
import example from '../screens/sketch';
//import Summary Screen
import StudySummaryScreen from '../screens/Summary/studySummary';
//import Quiz Flash Screen
import QuizFlashScreen from '../screens/Quiz/quizFlash';
//import setting data
import SettingScreen from '../screens/Setting/setting';
//import testing redux
import StudyReduxScreen from '../screens/studyRedux';
//import learn lh1 screen
import LearnHL1Screen from '../screens/Learn/learnhl1';
import HiraganaLearnScreen from '../screens/Learn/hiraganalearn';
import KatakanaLearnScreen from '../screens/Learn/katakanalearn';

const styles = require('../styles/style');

export const QuizStack = TabNavigator({ 
    QuizHiraganaList: QuizHiraganaListScreen, 
    QuizKarakanaList: QuizKatakanaListScreen
}, {
    tabBarPosition: 'top',
});

//import 
const StudyStack = StackNavigator({ 
    StudyList: StudyListScreen,
    TopicList: TopicListScreen,
    HiraganaList: HiraganaListScreen,    
    QuizFlash: QuizFlashScreen,
    LearnListScreen:  LearnListScreen,
    QuizMain: QuizMainScreen,
    QuizList: QuizStack,
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
    HiraganaFlash: HiraganaFlashcardScreen , 
    LearnHL1: LearnHL1Screen,
});

const SummaryStack = StackNavigator({
    StudySummary: StudySummaryScreen,
});

const SettingStack = StackNavigator({
    SettingList: SettingScreen
});

// const QuizHiraganaListStack = StackNavigator({
//     QuizHiraganaList: QuizHiraganaListScreen
// })
// const QuizKatakanaListStack = StackNavigator({
//     QuizKarakanaList: QuizKatakanaListScreen
// })

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
})

export const AuthStack = StackNavigator(
    { 
        LoginSr: LoginScreen,
        NameIn: NameScreen,
        TimeIn: TimeScreen,
        Confirmation: ConfirmationScreen
});

export const HiraganaLearnStack = TabNavigator({
    Hiragana: {
        screen: HiraganaLearnScreen,
        navigationOptions: { 
            tabBarLabel: 'Hiragana',
        }
        }, 
    Katakana: {
        screen: KatakanaLearnScreen, 
        navigationOptions: { 
            tabBarLabel: 'Katakana',
        }
        }, 
},
{ 
    navigationOptions: {
        tabBarVisible: true,
    },
    tabBarPosition: 'top',
    tabBarOptions: {
        activeTintColor: '#45B5E7',
        inactiveTintColor: 'black',
        indicatorStyle: {
            backgroundColor: '#45B5E7',
            height: 1,
            // width: '25%',
            },
        upperCaseLabel: false,
        labelStyle: {
            fontSize: 25,
        },
        style:{
            backgroundColor: 'white',
        },
    },
    tabBarVisible: true,
    swipeEnabled: false,
    // headerTitle: 'Learn',
    // initialRouteName: 'Learn',
});
