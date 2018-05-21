import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    FlatList,
    Alert,
    Platform,
  } from 'react-native';
  import { List, ListItem, Icon } from 'react-native-elements';
  // import {Table, TableWrapper, Row, Rows, Col, Cols, Cell} from 'react-native-table-component';
  // import GridView from 'react-native-gridview';
  
  import { TabNavigator, StackNavigator } from 'react-navigation';
  import { bindActionCreators } from 'redux';
  import { connect } from 'react-redux';
  import { HiraganaLearnStack }  from '../../config/router';
  import * as Actions from '../../actions/user'; //Import your actions

  class FlatListItem extends Component {

    ButtonClick(item) {
      Alert.alert(item);
    }

    render(){
      return(
        <TouchableOpacity style={learnlh1.GridViewBlockStyle} onPress={this.ButtonClick.bind(this, this.props.item.hiragana)}>
          <Text style={learnlh1.HiraganaItem}>{this.props.item.hiragana}</Text>
          <Text style={learnlh1.RomajiItem} >{this.props.item.romaji}</Text>
        </TouchableOpacity>
      );
    }
  }

  const data = [
    {hiragana: 'ア', romaji: 'a'},
    {hiragana: 'イ', romaji: 'i'},
    {hiragana: 'ウ', romaji: 'u'},
    {hiragana: 'エ', romaji: 'e'},
    {hiragana: 'オ', romaji: 'o'},
    {hiragana: 'カ', romaji: 'ka'},
    {hiragana: 'キ', romaji: 'ki'},
    {hiragana: 'ク', romaji: 'ku'},
    {hiragana: 'ケ', romaji: 'ke'},
    {hiragana: 'コ', romaji: 'ko'},
    {hiragana: 'サ', romaji: 'sa'},
    {hiragana: 'シ', romaji: 'shi'},
    {hiragana: 'ス', romaji: 'su'},
    {hiragana: 'セ', romaji: 'se'},
    {hiragana: 'ソ', romaji: 'so'},
    {hiragana: 'タ', romaji: 'ta'},
    {hiragana: 'チ', romaji: 'chi'},
    {hiragana: 'ツ', romaji: 'tsu'},
    {hiragana: 'テ', romaji: 'te'},
    {hiragana: 'ト', romaji: 'to'}
  ];

  export class HiraganaLearnScreen extends Component {

    static navigationOptions = {
        // header: null,
        // title: 'LearnHL1',
        tabBarLabel: 'Hiragana',
      };

    constructor(props) {
      super(props);
      this.state = {}
    }

    render() {
      return (
        <View style={learnlh1.MainContainer}>
          <FlatList 
          data={data}
          renderItem={({item}) => {
            return(
              <FlatListItem item={item}/>
              );
            }}
          numColumns={5}
          />

        </View>
      );
    }
  }

  const learnlh1 = require('../../styles/learnhl1');
  
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
  export default connect(mapStateToProps, mapDispatchToProps)(HiraganaLearnScreen);
  // export default LearnHL1Screen;