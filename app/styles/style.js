'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

let englishFont = 'Roboto-Regular';
let japaneseFont = 'NotoSansJP-Regular';

module.exports = StyleSheet.create({

    // container: {
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     position: 'relative',
    //     flexDirection: 'row',
		//   },
		wrapper:{
			backgroundColor:'#d2f9fc',
			paddingLeft:10
		},
		container: {
			flex: 1,
			alignItems: 'center',
			backgroundColor: '#d2fafc',
			position: 'relative',
			// height: '100%',
			// width: '100%',
	  },
	  containerCenter: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: 'powderblue',
			position: 'relative',
			// height: '100%',
			// width: '100%',
    },
		row: {
			flexDirection: 'row',
			flex: 1
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
		col1 : {
			width: '8.333%'
		}, 
		// Helper
		shadow : {
			shadowColor: "#000000",
			shadowOpacity: 1,
		},   
      
		toolbar: {
			height: 56,
			backgroundColor: '#45B5E7',
		}, 

    topbackground: {
    	backgroundColor: '#d2f9fc',
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
		//Quiz Screen
		quizFlashTop: {
			height:200
		}
});