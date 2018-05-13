'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({

    // container: {
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     position: 'relative',
    //     flexDirection: 'row',
    //   },

       container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'powderblue',
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
	  }
});