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
//import study screen
import StudyListScreen from '../screens/Study/studyList';
import HiraganaListScreen from '../screens/Study/hiraganaList';
//import Summary Screen
import StudySummaryScreen from '../screens/Summary/studySummary';
//import setting data
import SettingScreen from '../screens/Setting/setting';

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


