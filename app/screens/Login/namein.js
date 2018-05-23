import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View,
    AppRegistry,
    TouchableOpacity,
    Text,
    TextInput,
    Picker,
  } from 'react-native';
  import { List, ListItem } from 'react-native-elements';
  import { studyReasonOption } from '../../config/data';
  import { bindActionCreators } from 'redux';
  import { connect } from 'react-redux';
  import * as Actions from '../../actions/user'; //Import your actions
  
  
  class NameScreen extends Component {
    static navigationOptions = {
      title: 'Create Guest Account',
    };
    state = {
      userFB: [],
      userName: "",
      studyReason: 0,
      type : "",
    }
    

    componentDidMount() {
      const { navigation } = this.props;
      this.setState({
        userFB: navigation.getParam('fbData', null),
        userName: navigation.getParam('userName', null),
        type: navigation.getParam('type',null),
      });
    }

    updateName = (name) => {
      this.setState({ userName: name })
    }
    updateReason = (reason) => {
      this.setState({ studyReason: reason })
    }
    
    render() {
      return (
        <View style={styles.containerWhiteTop}>
          <Text style={styles.textBlue}>Name</Text>
          <TextInput style={{height: 40, borderColor: 'gray'}}
            onChangeText={(userName) => this.setState({userName})}
            value={this.state.userName}
          />
          <Text style={styles.textBlue}>Why you want to study Japanese?</Text>
          <Picker style={[styles.picker]}
            // selectedValue={this.state.Reason}
            style={{ height: 50, width: 100 }}
            // onValueChange={(itemValue, itemIndex) => this.setState({Reason: itemValue})}
            selectedValue = {this.state.studyReason} onValueChange = {this.updateReason}
          >
            {studyReasonOption.map((item, key) => (
              <Picker.Item label={item.text} value={item.text} key={key} />
            ))}
          </Picker>
          <TouchableOpacity
            style={styles.buttonBlue}
            onPress={this.addName}
          >
          <Text style={styles.textWhite}>Next ></Text>
          </TouchableOpacity>
        </View>
      );
    }
  
    addName = () => {
      this.props.navigation.navigate('TimeIn',(this.state));
    };

 
  }

  const styles = require('../../styles/style');
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
  export default connect(mapStateToProps, mapDispatchToProps)(NameScreen);
  
