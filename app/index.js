'use strict';

import React, { Component } from 'react';
import { AsyncStorage, View } from 'react-native';

import {Router, Scene, Reducer} from 'react-native-router-flux';
// Import Screens
import Home from './screens/Home';

const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        return defaultReducer(state, action);
    };
};

export default class Main extends Component{

    render(){
        return(
            <View style={{flex:1}}>
                <Router createReducer={reducerCreate}>
                    <Scene key="root">
                        <Scene key="Home" component={Home} title="Home" initial/>
                    </Scene>
                </Router>
            </View>
        );
    }
}