'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
    summaryMainTop: {
        flex: 1,
        flexDirection: 'row',
    },
    summaryMainTop2: {
        flex: 2,
        flexDirection: 'row',
    },

    flexTop1:{
        position: 'relative',
        flex: 5,
        paddingTop: 10,
    },
    mainConTop : {
        height: 150,
    },
    flexTop2:{
        flex: 5,
        paddingTop: 32,
        paddingLeft: 20,
    },
      absoluteTextHome: {
        position : 'absolute',
        width : '100%',
        height : 140,
        top: 10,
        justifyContent: 'center',
        alignItems: 'center',  
      },
      containerScoreHome : {
        height : 140,
        width : 140,
        backgroundColor: '#fff',
        borderRadius: 80,
        justifyContent: 'center',
        alignItems: 'center',  
    },
    persentTitle : {
        fontSize: 40,
        color:'#43b5e7',
    },
    toptitle : {
        fontWeight : 'bold',
    },
    topsub : {
        fontSize: 16,
        paddingBottom: 10,
        color: '#6c85a5',
        fontWeight : 'bold',
    },
    flexMid1:{
        position: 'relative',
        flex: 1,
        padding: 10,
    },
    midContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        width: '100%',
        height: '100%',
    },
    flexBot1 : {
        flex: 1,
        padding:8,
        
    },
    flexRow: {
        flex: 1,
        flexDirection: 'row',
        height: 130,
    },
    botButton : {
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center'

    },
    graphMain : {
        height: 30,
    },
    absoluteTextHome2: {
        position : 'absolute',
        width : '100%',
        height : 50,
        top: 10,
        justifyContent: 'center',
        alignItems: 'center',  
      },
      containerScoreHome2 : {
        height : 50,
        width : 50,
        backgroundColor: '#fff',
        borderRadius: 80,
        justifyContent: 'center',
        alignItems: 'center',  
    },
    flexTop3:{
        position: 'relative',
        flex: 4.7,
        height: 80,
        paddingTop: 10,
    },
    graphConMain: {
        height: 40,
    },
    graphButton :{
        height: 120,
        width: 90,

    },
    graphButtonCon:{
        height: 75,
        width: 75,
        position: 'relative',
        
    },
    TextGr: {
        textAlign : 'center',
        paddingBottom: 3,
        paddingTop: 2,
    },
    conGraph :{
        backgroundColor: '#fff',
        width : '100%',
        height: 120,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
      
    },
    absoluteGr: {
        position: 'absolute',
        height: 80,
        width: 80,
        backgroundColor: '#fff',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        top: 23,
        marginLeft: 5,
    },
    btnText : {
        textAlign: 'center',
        fontSize: 12,
    }
});

