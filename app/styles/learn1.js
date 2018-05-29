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
      height: 60,
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

     ModalTabBar: {
       flexDirection: 'row', 
       width: '100%',
       backgroundColor: '#45B5E7', 
       alignItems: 'center', 
       padding: 10
      },

    ModalTextTitle: {color: 'white',
    fontSize: 30,
    marginStart: 20,
      },

    ModalContent: {
      width: '100%',
       padding: 10
      },

    ModalContentTitle: {
      fontSize: 40, 
      alignSelf: 'center',
    },

    

    //  RomajiItem: {
    //   flex: 1,
    //   color: 'black',
    //   fontSize: 30,
      // textAlign: 'right',
      // textAlign: 'center',
    //  },
    //  TextTitle: {
    //   color: 'black',
    //   fontSize: 35,
      // textAlign: 'right',
    //  },
});