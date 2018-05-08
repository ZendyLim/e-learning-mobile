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
  
  import { bindActionCreators } from 'redux';
  import { connect } from 'react-redux';
  import * as Actions from '../../actions/user'; //Import your actions
  
  
  class NameScreen extends Component {
    static navigationOptions = {
      title: 'Create Guest Account',
    };
    state = {
      name: '',
      reason: '',
    }
    updateName = (name) => {
      this.setState({ name: name })
    }
    updateReason = (reason) => {
      this.setState({ reason: reason })
    }

    
    render() {
      return (
        <View style={styles.containerWhite}>
          <Text style={styles.textBlue}>Name</Text>
          <TextInput style={{height: 40, borderColor: 'gray'}}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
          />
          <Text style={styles.textBlue}>Why you want to study Japanese?</Text>
          <Picker style={[styles.picker]}
            // selectedValue={this.state.Reason}
            style={{ height: 50, width: 100 }}
            // onValueChange={(itemValue, itemIndex) => this.setState({Reason: itemValue})}
            selectedValue = {this.state.reason} onValueChange = {this.updateReason}
          >
            <Picker.Item label="I want to go Japan" value="1" />
            <Picker.Item label="other" value="2" />
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
      this.props.navigation.navigate('TimeIn');
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
  
