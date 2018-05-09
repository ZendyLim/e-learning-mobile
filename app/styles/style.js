'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({

  containerBlue: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#d2f9fc',
  },
  containerWhite: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
  },
  containerWhiteTop: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor: '#ffffff',
  },
  createGuestButton: {
    backgroundColor: '#495057',
    alignItems: 'center',
    borderRadius: 5,
  },
  textWhite: {
    fontSize: 24,
    color: '#ffffff',
  },
  textBlack: {
    fontSize: 24,
    color: '#999999',
  },
  textBlue: {
    fontSize: 24,
    color: '#45b4e7',
  },
  buttonBlue:{
    alignSelf: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '#45b4e7',
    padding:10,
    borderRadius: 5,
    
  },
  picker: {
    textDecorationLine: 'underline',
    alignSelf: 'stretch',
    
  },
  textCon: {
    width: 320,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textSignWith: {
    color: '#999999',
    alignSelf: 'center',
  },
  
});