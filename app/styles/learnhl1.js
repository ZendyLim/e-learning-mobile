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
      flexWrap: 'wrap',
      margin: 5,
      padding: 5,
      backgroundColor: 'white'
     
    }
    ,
     
    HiraganaItem: {
       color: 'black',
       fontSize: 34,
      textAlign: 'left',
       
     },
     RomajiItem: {
      color: 'black',
      fontSize: 15,
      textAlign: 'right',
     },
});