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
        backgroundColor: '#d2f9fc',
    },
    rowRelative: {
        flexDirection: 'row',
        flex: 1,
        flexWrap:'wrap',
        position: 'relative',
        backgroundColor: 'red'
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
        width: "95%",
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
        borderRadius:5,
		alignItems: "center",
		justifyContent: "center",  
    },
    buttonText: {
		fontSize: 24,
		color: '#ffffff',
	},
    menuContainer: {
		flexDirection: 'row',
		height: 70,
    },
    mojiList:{
        position: 'relative',
        backgroundColor:"#ffffff",
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "black",
        width:50,
        height:50,
        margin:2,
        flexDirection: "row",
    },
    mojiListActive:{
        position: 'relative',
        backgroundColor:"#ec6f86",
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "black",
        width:50,
        height:50,
        margin:2,
        flexDirection: "row",
    },
    mojiListText: {
        color: "black",
        justifyContent: 'center',
        fontSize: 30,
    },
    mojiListTextActive: {
        color: "white",
        justifyContent: 'center',
        fontSize: 30,
    },
    romajiList:{
        position: 'absolute',
        bottom : 1,
        right: 1,
        color: "black",
        justifyContent: 'center',
        fontSize: 12,
    },
    romajiListActive:{
        position: 'absolute',
        bottom : 1,
        right: 1,
        color: "white",
        justifyContent: 'center',
        fontSize: 12,
    },
    bgWhite : {
        height: 50,
    },
    displayNone : {
        display: 'none',
    },
    // listContainerRow:{
    //     flexDirection: 'row',
    //     width: '16.667%',
    // },
    // rowButton:{
    //     flex:5
    // },
    // rowButtonRadio:{
    //     flex:1,
    //     paddingLeft:20,
    // },
   listContainerRow:{
        flexDirection: 'row',
        width: '16.667%',
    },
    listContainerRow2:{
        flexDirection: 'row',
        width: '30.667%',
    },
    rowButton:{
        flex:5
    },
    rowButtonRadio:{
        position: 'absolute',
        top:15,
        right: 0,
    },
});

