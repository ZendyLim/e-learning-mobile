'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

let primaryColor = '#45b4e7'; // blue
let secondaryColor = '#d2f9fc';
let textColor = '#333';
let grayColor = '#ccc';

module.exports = StyleSheet.create({

    // container: { 
    //     backgroundColor:"white",
    // },

    container: {
        flex: 1,
        alignItems: 'center',
        position: 'relative',
        backgroundColor: 'white'
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
    profileContent:{
        width: '92%',
		alignContent: 'space-between',
        marginTop: 100, 
    },
    userProfileLabelParent:{
        color: grayColor,
        fontSize:20,
    },
    userProfileLabelChild:{
        // color: textColor
        fontWeight: 'bold',
 		fontSize: 12,
		marginStart: 5,
		marginTop: 5,
 		color: 'black',
    },
    userProfileData:{
        color: grayColor
    },
    inputStyle:{
        height:40,
        borderColor:"gray",
        color: "gray",
        fontSize:15
    },
    vline: {
        borderWidth: 0.7, 
        borderColor:'#cccccc',
        marginTop: 5,
    },
    socialContainer: {
		flex:1,
		height: 70,
    },
    bgColortop:{
        backgroundColor: secondaryColor,
        height:150,
        width:"100%",
        alignItems:'center',
        position: 'relative'
    },
    topinfor: {
		width: '82%',
		alignItems: 'center',
		marginTop: 20,
	},
    avatarinformation: {
        position:'absolute',
        zIndex:1,
        width: '82%',
        height: 150,
        backgroundColor: 'white',
        marginTop: 60,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 70,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
    },
    profilePicture : {
        position: 'absolute',
        top:0,
        width: '100%',
        height: 180,
        zIndex:2
    },
    btnupdate: {
		backgroundColor: '#4573e7',
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: 40,
		marginTop: 5,
        marginBottom:30,
    },
    txtupdateButton: {
		fontFamily: 'Roboto',
		color: 'white',
        fontWeight: 'bold',
	},
    nameEmail:{
        position: 'absolute',
        top:80,
        width: '100%',
        height: 50,
        zIndex:3,
        alignItems:'center',
    },
    vline2: {
        borderWidth: 1, 
        borderColor:'#999999',
        marginTop: 5,
        marginBottom:5,
    },
    menuOption:{
        // color: textColor
        fontWeight: 'bold',
 		fontSize: 15,
 		color: 'black',
    },
    modalContainer : {
        height: "100%",
        width: "100%",
        justifyContent : 'center',
        alignItems : 'center'
    },
    modalContainerInside : {
        backgroundColor : '#ffffff',
        height: 200,
        width : '100%',
        justifyContent : 'center',
        alignItems : 'center'
    },
    modalTitle : {
        fontWeight : 'bold',
        fontSize : 20,
    },
    modalRow : {
        flex : 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        height : 50,
        padding: 30,
    },
    modalActiveContainer:{
        flex : 1,
        padding: 10,
        height : 70,
    },
    modalActive :{
        justifyContent : 'center',
        alignItems : 'center',
        borderColor: '#0000ff',
        borderWidth : 2,
        height: 50,
        borderRadius: 10
    },
    modalNonActive :{
        justifyContent : 'center',
        alignItems : 'center',
        borderColor: '#dddddd',
        borderWidth : 2,
        height: 50,
        borderRadius: 10
    },
    modalClose : {
        justifyContent: 'center',
        borderColor: '#dddddd',
        backgroundColor : '#dddddd',
        borderWidth : 2,
        borderRadius: 10,
        paddingTop: 5 ,
        paddingBottom: 5 ,
        paddingLeft: 10 ,
        paddingRight: 10 ,
        marginBottom: 10,
    },
    modalCloseText : {
        fontSize: 14,
        color: '#ffffff',
        fontWeight : 'bold',
    }
});

