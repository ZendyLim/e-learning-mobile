import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View, 
    ToolbarAndroid, 
    Image, 
    ScrollView, 
    Text, 
    TouchableOpacity, 
} from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';

class LearningModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      learType: 'HL1'
    };
  }
  static navigationOptions = {
    header: null,
    title: 'HiraganaList',
  };

  render() {
    return (
      <View></View>
    );
  }
}



function mapStateToProps(state, props) {
  return {
      loading: state.user.loading,
      data: state.user.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(LearningModule);
