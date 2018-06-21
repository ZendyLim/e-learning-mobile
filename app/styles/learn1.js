'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  MainContainer :{
    justifyContent: 'center',
    flex:1,
    // padding: 10,
    backgroundColor: '#fff',
    },
     
    FlatListItem: {
      flex:1,
      // height: 60,
      flexDirection: 'row',
      flexWrap: 'wrap',
    //   marginBottom: 5,
      // padding: 5,
      backgroundColor: 'white'
    },

    GoiGroup: {
      flex: 3,
      justifyContent: 'center',
      // alignItems : 'center',
      // borderRadius: 5,
      // borderColor: 'gray',
      // borderWidth: 1,
      flexDirection: 'column',
      // marginLeft: 10,
    },

    ButtonGroup: {
      flex: 1,
      justifyContent: 'center',
      alignItems : 'center',
      // borderRadius: 5,
      // borderColor: 'gray',
      // borderWidth: 1,
      flexDirection: 'row',
      // marginLeft: 10,
    },

    Button: {
      flex: 1,
    },

    vline: {
      borderWidth: 0.7, 
      borderColor:'#cccccc',
    },
    
    GoiItem: {
      // flex: 1,
      color: 'black',
      fontSize: 20,
      marginLeft: 5,
      // textAlign: 'center',
    },
    MeaningItem: {
      // flex: 1,
      color: 'black',
      fontSize: 15,
      marginLeft: 5,
      // textAlign: 'center',
       
     },

     ModalContainer: {
      alignSelf: 'center', 
      width: '90%',
      height: '80%', 
      backgroundColor: 'white',
     },

     ModalContainerGrammar: {
      alignSelf: 'center', 
      width: '95%',
      height: '95%', 
      backgroundColor: 'white',
     },

     ModalTabBar: {
       flexDirection: 'row',
       flexWrap: 'wrap',
       width: '100%',
       backgroundColor: '#45B5E7', 
       alignItems: 'center', 
       padding: 10
      },

    ModalTextTitle: {color: 'white',
    fontSize: 20,
    marginStart: 10,
      },

    ModalContent: {
      width: '100%',
      paddingStart: 5,
      paddingEnd: 5,
      },

    ModalContentTitle: {
      fontSize: 15,
      fontWeight: 'bold',
      // alignSelf: 'center',
    },
    ModalExplainText: {
      fontSize: 15,
    },

});