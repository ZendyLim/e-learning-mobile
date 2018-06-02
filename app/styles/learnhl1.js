'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  MainContainer :{
    justifyContent: 'center',
    flex:1,
    padding: 10,
    backgroundColor: '#fff',
    },
     
    GridViewBlockStyle: {
      borderRadius: 5,
      borderColor: 'gray',
      borderWidth: 1,
      flex:1,
      flexDirection: 'column',
      margin: 2,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    }
    ,
     
    HiraganaItem: {
       color: 'black',
       fontSize: 25,
     },
     RomajiItem: {
      color: 'black',
      fontSize: 15,
     },
});