'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({

  container: { 
    flex: 1, 
  },

  containerCentered: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap'
  },

  cardBox: {
    flex: 1,
    backgroundColor: 'white',
    width: '94%',
    margin: '2%',
    alignItems: 'stretch'
  },
  
  cardImg: {
    backgroundColor: 'steelblue',
    flex: 1,
    width: null, 
    height: 150,
    alignItems: 'stretch', 
  },
  
  cardBoxDisabled: {
    position: 'relative', 
  },
  
  cardImgDisabled: {
    position: 'absolute',
    top:  0,
    left: 0,
    width: '100%', 
    height: '100%', 
    zIndex: 2, 
    backgroundColor: 'dimgrey', 
    opacity: 0.8,
    justifyContent: 'center',
  },
  
  borderBox: {
    borderWidth: 2,
    borderColor: '#45B5E7',
  },

  textLg: {
    fontSize: 28,
  }, 

  textMd: {
    fontSize: 22,
  }, 

  textCenter: {
    textAlign: 'center', 
  }, 

  textBold: {
    fontWeight: 'bold', 
  }, 

  p3: {
    padding: '3%', 
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between' 
  }, 

  button: {
    backgroundColor: '#45B5E7',
    flex: 1,
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems:'center', 
    width: '40%',
    height: 50,
    borderRadius: 4,  
    padding: 0, 
  },
  
  mR10: {
    marginRight: 10, 
  }, 

  textBlack: {
    color: 'black',
  }, 

  textWhite: {
    color: 'white', 
  }

});

