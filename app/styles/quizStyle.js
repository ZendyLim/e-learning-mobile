'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({

    container: { 
        backgroundColor:"white",
    },
    containerFlexColumn: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: "center",
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

    quizList: {
        backgroundColor: "#ffffff",
        alignItems: 'center',
        padding: 10,
        margin: '1%',
        borderRadius: 5,
        width: "95%"
    },

    quizListText: {
        color: "#666666",
        justifyContent: 'center',
    },

    menuButton: {
        flex: 1,
        margin: 5,
        height: 40,
        width: "40%",
        backgroundColor: "#45b4e7",
        borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",  
    },
    menuContainer: {
		flexDirection: 'row',
		height: 70,
    },
    hiraganaList:{
        position: 'relative',
        backgroundColor:"#ffffff",
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "black",
        width:50,
        height:50,
        margin:2,
    },
    hiraganaListText: {
        color: "black",
        justifyContent: 'center',
        fontSize: 30,

    },
    hiraganaListRomaji:{
        position: 'absolute',
        bottom : 1,
        right: 2,
        color: "black",
        justifyContent: 'center',
        fontSize: 15,
    },
    bgWhite : {
        height: 50,
    }

    
    

});

