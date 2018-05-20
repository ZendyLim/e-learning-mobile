'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
    containerFlex : {
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center',          
    },
    containerTitle: {
        justifyContent: 'center',
        alignItems: 'center',  
        height: 60,  
        paddingTop: 15,
        paddingBottom: 15,
    },
    containerGraph : {
        position : 'relative',   
    },
    textTitle: {
       fontSize : 30,
       fontWeight : 'bold',
       color : '#556c95',
    },
    absoluteText : {
        position : 'absolute',
        width : '100%',
        height : '100%',
        justifyContent: 'center',
        alignItems: 'center',  
    },
    containerScore : {
        height : 140,
        width : 140,
        backgroundColor: '#fff',
        borderRadius: 70,
        justifyContent: 'center',
        alignItems: 'center',  
    },
    scoreTotal : {
        fontSize : 25,
        fontWeight : 'bold',
        color : '#556c95',
    },
    containerMistake : {
        padding : 15,
    },
    containerMainMistake : {
        padding : 15,
        height : 240,
        backgroundColor : '#fff',
        borderColor: '#ccc',
        borderWidth: 1,     
        borderRadius: 5,   
    },    
    sumaryTitle : {
        fontSize : 20,
        fontWeight : 'bold',
        textAlign : 'center',
    },
    RecordRow: {
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap',
        height: 35,
        backgroundColor : '#fff',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        paddingTop:5,
        paddingBottom:3,
    },
    recordTitle : {
        flex : 3,
        fontSize: 20,
        textAlign : 'left',
    },
    recordCorrect : {
        flex : 1,
        alignItems : 'flex-end',
    },
    recordMistake : {
        flex : 1,
        alignItems : 'flex-end',
    },
    RecordRowButton: {
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        justifyContent:'space-between',

    },
    buttonWin : {
        height: 50,
        borderRadius: 5,
        backgroundColor: '#45b5e7',
        justifyContent: 'center',
        alignItems: 'center',  
    },
    RecordRowButtonContainer : {
        flex: 2,        
        height: 200,
    },
    scoreContainer : {
        height: '100%',
        backgroundColor: '#d2fafc',
      },
      buttonWinText : {
          fontSize: 20,
          color: "#fff",
          
      }


});

