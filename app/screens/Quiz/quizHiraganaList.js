import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button,
    StatusBar,
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    
  } from 'react-native';
import { hiraganaList } from '../../config/data';
import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox'; 

  class QuizHiraganaListScreen extends Component {
  
    static navigationOptions = {
      title: 'Hiragana',
    };
    state = {
        checkAllText: "Check All",
        statusCheckAll: false,
        stsList : false,
        statusPerRow: false,
        idList:[],
    }

    constructor(props){
        super(props);
        this.checkItems = [hiraganaList.map.length];
        this.checkRows=[hiraganaList.map.length];
    }
   
    render() {
      return ( 
        <ScrollView style={quizStyles.container}>
             <View style={quizStyles.containerWhiteTop}>
                <View style={quizStyles.menuContainer} >
                    <TouchableOpacity style={quizStyles.menuButton}  
                        onPress={()=> { this.checkAll() }}
                    >
                        <Text style={quizStyles.buttonText}>{this.state.checkAllText}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={quizStyles.menuButton}
                        onPress={this.proceed}
                    >
                        <Text style={quizStyles.buttonText}>Proceed ></Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    {hiraganaList.map((item, key)=>(
                        <View key={key} style={(key + 1) % 5 == 0 ? ( quizStyles.listContainerRow2  ) : ( quizStyles.listContainerRow )}>
                            <View style={quizStyles.rowButton}>
                                <TouchableOpacity
                                style={[quizStyles.mojiList,this.state.stsList[key] && quizStyles.mojiListActive]}
                                    onPress={()=> { this.checkSingle(key) }}
                                >
                                    <Text style={[quizStyles.mojiListText, this.state.stsList[key] 
                                        && quizStyles.mojiListTextActive]}> {item.moji}
                                    </Text>
                                    <Text style={[quizStyles.romajiList, this.state.stsList[key] 
                                        && quizStyles.romajiListActive]}> {item.romaji}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            { (key + 1) % 5 == 0 ? (
                            <View style={quizStyles.rowButtonRadio}>
                                <CircleCheckBox
                                    checked={this.state.statusPerRow[key]}
                                    onToggle={(checked) => this.checkRow(key)}
                                    outerColor ={"#ec6f86"}
                                    innerColor ={"#ec6f86"}
                                /> 
                            </View>      
                            ) : (
                                <Text style={quizStyles.displayNone}>None </Text>
                            ) }
 
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
      );
    }
    
    checkSingle(key) {
        if(this.checkItems[key]){
            this.checkItems[key] = false;
            this.setState({ stsList: this.checkItems});
            this.selectedList(key)   
        }
        else{
            this.checkItems[key] = true;
            this.setState({ stsList: this.checkItems});
            this.selectedList(key)
        }
    };
    checkAll(){
        this.setState({statusCheckAll: !this.state.statusCheckAll})
        if(this.state.statusCheckAll){
            hiraganaList.map((item, key)=>(
                this.checkItems[key] = false,
                this.setState({ stsList: this.checkItems }),
                this.selectedList(key)
            ));  
            this.setState({ checkAllText: "Check All" })     
        }else{
            {hiraganaList.map((item, key)=>(
                this.checkItems[key] = true,
                this.setState({ stsList: this.checkItems }),
                this.selectedList(key)
            ))};  
            this.setState({ checkAllText: "Uncheck All" })    
        }
    };

    checkRow(key){
        if(this.checkRows[key]){
            this.checkRows[key] = false,
            this.setState({ statusPerRow: this.checkRows })
            for(x=0;x<5;x++){
                this.checkItems[key] = false,
                this.setState({ stsList: this.checkItems })
                this.selectedList(key)
                key=key-1;
            }     
        }else{
            this.checkRows[key] = true,
            this.setState({ statusPerRow: this.checkRows })
            for(x=0;x<5;x++){
                this.checkItems[key] = true,
                this.setState({ stsList: this.checkItems })
                this.selectedList(key)
                key=key-1
            }    
        }
    }

    proceed = () => {
        const { navigation } = this.props;
        
        this.props.navigation.navigate('QuizFlash',
        (
            {
                type: navigation.getParam('type',null),
                title: navigation.getParam('title',null),
                studyType: navigation.getParam('studyType',null),
                img: navigation.getParam('img',null),
                topicId: navigation.getParam('topicId',null),
                typeQuiz: navigation.getParam('typeQuiz',null),
                quizOptions: navigation.getParam('quizOptions',null),
                oneType: navigation.getParam('quizOptions',null),
                idList: this.state.idList
            }
        )
        );
    };

    selectedList(key){
        if(this.checkItems[key]){
            if(hiraganaList[key].id !=""){
                this.setState((previousState) => {
                    previousState.idList.push(hiraganaList[key].id);
                    return previousState;
                })
            }
        }else{
            if(hiraganaList[key].id !=""){
                this.setState((previousState) => {
                    var idIndex =  previousState.idList.indexOf(hiraganaList[key].id);
                    previousState.idList.splice(idIndex,1);
                    return previousState;
                })
            }
        }
    }
  }
  
  const quizStyles = require('../../styles/quizStyle');
  const styles = require('../../styles/style');
export default QuizHiraganaListScreen;