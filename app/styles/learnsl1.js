'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  MainContainer :{
    // justifyContent: 'center',
    flex:1,
    padding: '2%',
    backgroundColor: 'white',
    },

    GridViewBlockStyle: {
      borderRadius: 5,
      borderColor: 'gray',
      borderWidth: 1,
      flex:1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems : 'center',
      marginBottom: 5,
      padding: 5,
      backgroundColor: 'white'
    },
    NumberItem: {
      flex: 1,
      color: 'black',
      fontSize: 30,
      // marginLeft: 10,
      // textAlign: 'center',
    },
    HiraganaItem: {
      flex: 1,
      color: 'black',
      fontSize: 20,
      // textAlign: 'center',
       
     },
     RomajiItem: {
      flex: 1,
      color: 'black',
      fontSize: 20,
      // textAlign: 'right',
      textAlign: 'center',
     },
     GridViewBlockStyle2: {
      borderRadius: 5,
      borderColor: 'gray',
      borderWidth: 1,
      flex:1,
      // flexDirection: 'row',
      flexWrap: 'wrap',
      // alignItems : 'center',
      marginBottom: 5,
      padding: 5,
      backgroundColor: 'white'
    },
     NumberItem2: {
      flex: 1,
      color: 'black',
      fontSize: 30,
      // textAlign: 'center',
    },
    HiraganaItem2: {
      flex: 1,
      color: 'black',
      fontSize: 20,
      // textAlign: 'center',
       
     },
     RomajiItem2: {
      flex: 1,
      color: 'black',
      fontSize: 20,
      // textAlign: 'right',
      // textAlign: 'center',
     },     
     TextTitle: {
      color: 'black',
      fontSize: 35,
      // textAlign: 'right',
     },
});