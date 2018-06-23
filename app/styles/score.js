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
        height : 200,
    },
    containerMainMistake : {
        padding : 15,
        backgroundColor : '#fff',
        borderColor: '#ccc',
        borderWidth: 1,     
        borderRadius: 5,   
        paddingBottom: 20,
    }, 
    getData :{
        height: 40,
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
          
      },
      homeTop : {
          flex: 1,
          paddingTop: 20,
      },
      absoluteTextHome: {
        position : 'absolute',
        width : '100%',
        height : 160,
        top: 20,
        justifyContent: 'center',
        alignItems: 'center',  
      },
      containerScoreHome : {
        height : 160,
        width : 160,
        backgroundColor: '#fff',
        borderRadius: 80,
        justifyContent: 'center',
        alignItems: 'center',  
    },
    scoreText2: {
        fontSize: 16,
        color: '#000000',
    },
    fontBold : {
        fontWeight: 'bold',
    },
    containerHome2 : {
        position: 'relative',
        padding : 20        
    },
    containerHomeinside2: {
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    homeContainer : {
        flex: 1,
        backgroundColor: '#d2fafc',
    },
    containerButon: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ButtonText : {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems:'center', 
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    NoBorder : {
        borderBottomWidth: 0
    },
    HomeIcon : {
        backgroundColor : '#45b4e7',
        height: 30,
        width : 30,
        borderRadius : 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    IconText : {
        fontSize: 17,
        paddingLeft: 4,
        fontWeight: 'bold'
    },
    menuBottom : {
        position : 'absolute',
        bottom: 0,
        width: '100%',
        height: 80,
        backgroundColor: '#fff',
        borderTopColor : '#ddd',
        borderTopWidth : 1,
        padding: 20,
        zIndex:120
    },
    imageHomeCon : {
        position : 'absolute',
        bottom: 0,
        right: 0,
        width: 80,
        height: 200,
        zIndex: 121
    },
    imageHome : {
        width: '100%',
        height: '100%',
    }
      
});

