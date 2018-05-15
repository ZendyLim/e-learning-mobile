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
//import Summary Screen
import StudySummaryScreen from '../screens/Summary/studySummary';
//import Quiz Flash Screen
import QuizFlashScreen from '../screens/Quiz/quizFlash';
//import setting data
import SettingScreen from '../screens/Setting/setting';


//import 
const StudyStack = StackNavigator({ 
    StudyList: StudyListScreen,
    TopicList: TopicListScreen,
    HiraganaList: HiraganaListScreen,
    QuizFlash: QuizFlashScreen,
    LearnListScreen:  LearnListScreen,
    LearnHiraganaModule: LearnHiraganaModule,
    QuizMain: QuizMainScreen,
    QuizList: QuizListScreen,
});

const SummaryStack = StackNavigator({
    StudySummary: StudySummaryScreen
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
    Home: HomeScreen,    
    Study: {
        screen: StudyStack, 
        navigationOptions: { 
            tabBarLabel: 'Study' 
        }
    }, 
    Summary: { 
        screen: SummaryStack, 
        navigationOptions: { 
            tabBarLabel: 'Summary' 
        }
    }, 
    Setting: { 
        screen: SettingStack, 
        navigationOptions: { 
            tabBarLabel: 'Setting' 
        }
    }
}, {
    tabBarPosition: 'bottom',
});

export const QuizStack = TabNavigator({ 
    QuizHiraganaList: QuizHiraganaListScreen, 
    QuizKarakanaList: QuizKatakanaListScreen
}, {
    tabBarPosition: 'top',
});

export const AuthStack = StackNavigator(
    { 
        LoginSr: LoginScreen,
        NameIn: NameScreen,
        TimeIn: TimeScreen,
        Confirmation: ConfirmationScreen
});

