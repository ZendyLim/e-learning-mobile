'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Dimensions
} = React;

const window = Dimensions.get('window');

let englishFont = 'Roboto-Regular';
let japaneseFont = 'NotoSansJP-Regular';
let primaryColor = '#45b4e7'; // blue
let secondaryColor = '#d2f9fc';
let textColor = '#333';
let grayColor = '#ccc';

module.exports = StyleSheet.create({

    // container: {
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     position: 'relative',
    //     flexDirection: 'row',
		//   },
		wrapper:{
			backgroundColor:secondaryColor,
			paddingLeft:10
		},
		container: {
			flex: 1,
			alignItems: 'center',
			backgroundColor: secondaryColor,
			position: 'relative',
			// height: '100%',
			// width: '100%',
	  },
	  containerCenter: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: secondaryColor,
			position: 'relative',
			// height: '100%',
			// width: '100%',
    },
		row: {
			flexDirection: 'row',
			flex: 1,
			flexWrap: 'wrap'
		},
		// 12 column grid system (Like Bootstrap)
		col12 : {
			width: '100%'
		},
		col11 : {
			width: '91.667%'
		},
		col10 : {
			width: '83.333%'
		},
		col9 : {
			width: '75%'
		},
		col8 : {
			width: '66.667%'
		},
		col7 : {
			width: '58.333%'
		},
		col6 : {
			width: '50%'
		},
		col5 : {
			width: '41.667%'
		},
		col4 : {
			width: '33.333%'
		},
		col3 : {
			width: '25%'
		},
		col2 : {
			width: '16.667%'
		},
		col2Tbl : {
			width: '16%'
		},
		col1 : {
			width: '8.333%'
		}, 
		// Helper
		shadow : {
			shadowColor: "#000",
			shadowOpacity: 0.5,
			elevation: 2
		},  
		displayInlineContainer:{
			flexWrap: 'wrap', 
			flexDirection:'row',

		},
		displayInline:{
			flexDirection:'column'
		},
		tabBar:{
			backgroundColor: primaryColor,
		},
      
		toolbar: {
			height: 56,
			backgroundColor: primaryColor,
		}, 
	//Header
	headContainer:{
		backgroundColor:primaryColor,
		padding:10,
		height:60,
		flexWrap: 'wrap', 
		alignItems: 'center',
		flexDirection:'row',
	},
	titleHeadContainer:{
		paddingLeft:10,
		
	},
	titleHead:{
		color:'#fff',
		fontSize:20
	},
	subTitleHead:{
		color:'#fff',
		fontSize:16
	},
	headerIcon:{
		fontSize:36,
		color:'#fff',
		
	},
    topbackground: {
    	backgroundColor: secondaryColor,
    	flex: 26,
    	width: '100%',
 	 },

 	downbackground: {
    	backgroundColor: 'white',
    	flex: 74,
    	width: '100%',
	 },
	  
	mainscreen: {
		 position: 'absolute',
		 width: '100%',
		 height: '100%',
		 alignItems: 'center', 
		   
	},
	
	topinfor: {
		width: '82%',
		alignItems: 'center',
		marginTop: 20,
	},

   downinfor: {
		width: '92%',
		alignContent: 'space-between',
	  marginTop: 5, 
	},
	

    avatar: {
       borderWidth:1,
       borderColor:'black',
       width:120,
       height:120,
	   position: 'absolute',
       borderRadius:100,
   	 },

 	avatarinformation: {
 	 	width: '100%',
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
	  
 	txtinfor: {
 		fontWeight: 'bold',
 		fontSize: 12,
		marginStart: 5,
		marginTop: 5,
 		color: 'black',
 	},
 	txtdata: {
 		fontSize: 15,
 		marginStart: 5, 
 		color: 'grey', 
		marginTop: 5,
 	},
 	vline: {
 		borderWidth: 0.7, 
 		borderColor:'#cccccc',
		marginTop: 5,
		// marginBottom: 5,
 	},
 	txtbiginfor: {
 		fontSize: 15,
		marginStart: 5,
		marginTop: 5,
 		color: '#9ba1ca',
	 },
	vgsignin: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 5,
	},
	btnupdate: {
		backgroundColor: '#4573e7',
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: 40,
		marginTop: 5,
	},
	btnsigning: {
		backgroundColor: '#ec6f86',
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		width: '48%',
		height: 40,
	},
	btnsigninf: {
		backgroundColor: '#4573e7',
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		width: '48%',
		height: 40,
	},
	txtbutton: {
		fontFamily: 'Roboto',
		color: 'white',
		fontWeight: 'bold',
	},
	txtbuttonicon: {
		fontSize: 16,
	},
	containerBlue: {
		flex: 1,
		alignItems: 'stretch',
		justifyContent: 'center',
		padding: 10,
		backgroundColor: secondaryColor,
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
		color: primaryColor,
	  },
	  buttonBlue:{
		alignSelf: 'flex-end',
		justifyContent: 'center',
		backgroundColor: primaryColor,
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
	socialContainer: {
		flexDirection: 'row',
		height: 150,
	},
	socialButton: {
		flex: 1,
	},
	socialFacebook:{
		marginTop: 5,
		height: 40,
		width: "100%",
		backgroundColor: "#3B5998",
		alignItems: "center",
		justifyContent: "center",
	},
	facebookText: {
		color: "#ffffff",
		},
		//Character
		character: {
			width:112,
			height:318
		},
		// Timer Bar
		timerContainer: {
			borderColor: '#333',
			backgroundColor: '#fff'
		},
		timerStatus: {
			color: '#222',
			fontSize: 18,
			position: 'absolute',
			alignSelf: 'flex-end',
		  right:5,
			zIndex: 2
		},
		timerWrapper: {
			position: 'relative',
			zIndex:5,
			backgroundColor:'#fff'
		},
		timerBox: {
			zIndex:10,
			backgroundColor: '#fff',
			borderRadius: 5,
			top:0,
			height:25,
			width:25,
			marginLeft:-10,
			position:'absolute'
		},
		// Question Panel
		questionWrapper: {
			padding:10,
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
		},
		questionContainer:{
			backgroundColor:'rgba(255,255,255,0.8)',
			height:100,
			padding:10,
			flexWrap: 'wrap', 
			alignItems: 'center',
			flexDirection:'row',
		},
		questionBigText:{
			fontSize: 60,
			color: primaryColor
		},
		questionInsText:{
			fontSize: 36,
			color:textColor
		},
		questionText:{
			flexDirection: 'column'
		},
		questionLongInstruction:{
			fontSize: 32,
			width:'100%',
			lineHeight:32
		},
		questionLong:{
			fontSize: 40,
			width:'100%',
			lineHeight:40
		},
		questionRomaji:{
			fontFamily:englishFont,
			marginLeft:5
		},
		//Quiz Screen
		quizFlashTop: {
			height:180,
			zIndex:5,
			overflow:'hidden'
		},
		quizChar: {
			position:'absolute',
			right:5,
			top: 5,
			zIndex:5
		},
		quizBanner:{
			flex:1,
			zIndex:1
		},
		timesUp:{
			position:'absolute',
			width:'100%',
			height:'100%',
			top:0,
			left:0,
			backgroundColor:'rgba(0,0,0,0.7)',
			zIndex:10,
			alignItems: 'center',
			justifyContent: 'center'
		},
		timesUpText:{
			color:'#fff',
			flexDirection:'column',
			fontSize:36
		},
		quizBtnContainer:{
			position:'relative'
		},
		quizBtn:{
			backgroundColor:'#fff',
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius:5,
			margin:5,
			zIndex:1
		},
		quizSquared:{
			height:125,
			width:125,
		},
		quizLong:{
			padding:5,
			width: window.width - 30
		},
		quizBtnPress:{
			backgroundColor: primaryColor
		},
		quizBtnTextPress:{
			color:'#fff'
		},
		quizSquaredText:{
			fontSize:55,
			color:textColor
		},
		quizLongText:{
			fontSize:30,
			color:textColor
		},
		quizBtnIconWrapper:{
			width:50,
			height:50,
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius:50,
			position:'absolute',
			left:'50%',
			top:-10,
			marginLeft:-25,
			zIndex:9,
			elevation:2
		},
		quizBtnIconLeft:{
			left:-5,
			marginLeft:0
		},
		quizBtnIcon:{
			fontSize:36,
			color:"#fff",
		},
		quizBtnIconCorrect:{
			backgroundColor:"#7fe900"
		},
		quizBtnIconWrong:{
			backgroundColor:"#ec6f86"
		},
		answerContainer:{
			alignItems: 'center',
			justifyContent: 'center',
			paddingTop:13
		},
		quizAnswerWrapper:{
			position:'relative'
		},
		blocker:{
			position:'absolute',
			width:'100%',
			height:'100%',
			left:0,
			top:0,
			elevation:10,
			zIndex:10
		}
});