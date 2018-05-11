import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import HomeScreen from '../components/home';
import OtherScreen from '../components/other';
//import login screen
import LoginScreen from '../components/Login/login';
//import LoginScreen from '../components/exampleRedux';
import NameScreen from '../components/Login/namein';
import TimeScreen from '../components/Login/timein';
//import study screen
import StudyListScreen from '../components/Study/studyList';
import HiraganaListScreen from '../components/Study/hiraganaList';
//import Summary Screen
import StudySummaryScreen from '../components/Summary/studySummary';
//import setting data
import SettingScreen from '../components/Setting/setting';

//import 
const StudyStack = StackNavigator({ 
    StudyList: StudyListScreen ,
    HiraganaList: HiraganaListScreen
});

const SummaryStack = StackNavigator({
    StudySummary: StudySummaryScreen
});

const SettingStack = StackNavigator({
    SettingList: SettingScreen
});


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
    }, 
}, {
    tabBarPosition: 'bottom',
});

export const AuthStack = StackNavigator(
    { LoginSr: LoginScreen, NameIn: NameScreen, TimeIn: TimeScreen
});


