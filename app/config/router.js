import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import HomeScreen from '../component/home';
import OtherScreen from '../component/other';
//import login screen
import LoginScreen from '../component/Login/login';
import NameScreen from '../component/Login/namein';
import TimeScreen from '../component/Login/timein';
//import study screen
import StudyListScreen from '../component/Study/studyList';
import HiraganaListScreen from '../component/Study/hiraganaList';
//import Summary Screen
import StudySummaryScreen from '../component/Summary/studySummary';
//import setting data
import SettingScreen from '../component/Setting/setting';

//import 
const StudyStack = StackNavigator({ 
    StudyList: StudyListScreen ,
    HiraganaList: StudySummaryScreen
});

const SummaryStack = StackNavigator({
    StudySummary: StudySummaryScreen
});

const SettingStack = StackNavigator({
    SettingList: SettingScreen
});


export const AppStack = TabNavigator({ 
    Home: HomeScreen, 
    Study: { screen: StudyStack, navigationOptions: { tabBarLabel: 'Study' }}, 
    Summary: { screen: SummaryStack, navigationOptions: { tabBarLabel: 'Summary' }}, 
    Setting: { screen: SettingStack, navigationOptions: { tabBarLabel: 'Setting' }}, 
}, {
    tabBarPosition: 'bottom',
});

export const AuthStack = StackNavigator(
    { LoginSr: LoginScreen, NameIn: NameScreen, TimeIn: TimeScreen});


