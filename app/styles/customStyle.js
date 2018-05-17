'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#d2f9fc',
    },
    logoContainer: {
        flex : 1,
        width: '100%',
        backgroundColor: 'red',
    },
    charaContainer: {
        flex : 3,
        width: '100%',
        backgroundColor: 'blue',
    },
    textContainer: {
        flex : 1,
        width: '100%',
        backgroundColor: 'white',
    },
    buttonContainer: {
        flex : 1,
        width: '100%',
        backgroundColor: 'white',
    },
});