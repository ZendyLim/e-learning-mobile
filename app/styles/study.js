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
    width: '100%',
    marginBottom: 10,
    alignItems: 'stretch',
    position: 'relative'
  },
  
  cardImg: {
    backgroundColor: 'steelblue',
    flex: 1,
    width: '100%', 
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
  },
  title :{
    textAlign: 'center',
    fontSize: 25,
    marginTop: 5,
    marginBottom : 5,
    fontWeight: 'bold',
  },
  lockButton : {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left : 0,
    zIndex : 2,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems:'flex-end', 
    padding: 15,
  },
  NotlockButton : {
    display : 'none',
  },
  StudyContainer : {
    padding: '2%',
    backgroundColor: '#d2fafc',
  },
  titleContainer : {
    borderColor: '#2771e8',
    borderWidth: 1,
    borderTopWidth : 0, 
  },
  btnLearn : {
    width: '100%',
    height: 70,
    justifyContent: 'center',
    alignItems : 'center',
    borderColor: '#2771e8',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 5
  }
});

