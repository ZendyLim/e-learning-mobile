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
    Alert
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
        stsList : "",
        statusPerRow: false,
        idList:[],
        index : '',
        typeQuiz : '',
    }

    constructor(props){
        super(props);
        this.checkItems = [];
        this.checkRows = [];
    }

    componentDidMount(){
        this.setStatusfalse();
    }
    render() {
        let idLength = 0;
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
                        idLength=item.moji.length,
                        <View key={key} style={(key + 1) % 5 == 0 ? ( quizStyles.listContainerRow2  ) : ( quizStyles.listContainerRow )}>
                            <View style={quizStyles.rowButton}>
                                <TouchableOpacity
                                style={[quizStyles.mojiList,this.state.stsList[key] && quizStyles.mojiListActive]}
                                >
                                    { this.mojiAutoSize(idLength, item.moji, key) }
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


    validation = () => {
        // const { studyReason, statusDays, finishDate} = this.state;
        let error = '';
        let status = false;
        for(i=0;i<hiraganaList.length;i++){
            if(this.checkRows[i] == true){
                this.setState({statusCheckAll: !this.state.statusCheckAll})
                this.setState({ checkAllText: "Check All" }) 
                status=true;
            }
        }
        if (status == false) error = "You need to choose at least 1 row";
        if (error) {
          Alert.alert('Warning', error);
          return true; 
        }
        else{
          return false;
        }
      }
    
    // checkSingle(key) {
    //     if(this.checkItems[key]){
    //         this.checkItems[key] = false;
    //         this.setState({ stsList: this.checkItems});
    //         this.selectedList(key)   
    //     }
    //     else{
    //         this.checkItems[key] = true;
    //         this.setState({ stsList: this.checkItems});
    //         this.selectedList(key)
    //     }
    // };

    setStatusfalse(){
        for(i=0;i<hiraganaList.length;i++){
            if((i + 1) % 5 == 0){
                this.checkRows[i] = false
                this.setState({ statusPerRow: this.checkRows })
            }
        }
    }


    mojiAutoSize(length, moji, key){
        if(length == 2){
            return(
            <Text style={[quizStyles.mojiListText2, this.state.stsList[key] 
                && quizStyles.mojiListTextActive2]}
            > 
            {moji}
            </Text>
            )
        }else{
            return(
            <Text style={[quizStyles.mojiListText, this.state.stsList[key] 
                && quizStyles.mojiListTextActive]}
            > 
            {moji}
            </Text>
            )
        }
     }

    checkAll(){
        this.setState({statusCheckAll: !this.state.statusCheckAll})
        if(this.state.statusCheckAll){
            hiraganaList.map((item, key)=>(
                this.checkItems[key] = false,
                this.setState({ stsList: this.checkItems }),
                this.selectedList(key),

                this.checkRows[key] = false,
                this.setState({ statusPerRow: this.checkRows })
            ));  
            this.setState({ checkAllText: "Check All" })     
        }else{
            {hiraganaList.map((item, key)=>(
                this.checkItems[key] = true,
                this.setState({ stsList: this.checkItems }),
                this.selectedList(key),

                this.checkRows[key] = true,
                this.setState({ statusPerRow: this.checkRows })
            ))};  
            this.setState({ checkAllText: "Uncheck All" })    
        }
    };

    checkRow(key){
        if(this.checkRows[key]){
            this.checkRows[key] = false,
            this.setState({ statusPerRow: this.checkRows })
            this.checkAllStatus();

            for(x=0;x<5;x++){
                this.checkItems[key] = false,
                this.setState({ stsList: this.checkItems })
                this.selectedList(key)
                key=key-1;
            }     
        }else{
            this.checkRows[key] = true,
            this.setState({ statusPerRow: this.checkRows })
            this.checkAllStatus();

            for(x=0;x<5;x++){
                this.checkItems[key] = true,
                this.setState({ stsList: this.checkItems })
                this.selectedList(key)
                key=key-1
            }    
        }
    }

    checkRowStatus(status) {
        return status == true;
    }
    checkAllStatus = () => {   
        if(this.checkRows.every(this.checkRowStatus)){
            this.setState({statusCheckAll: true})
            this.setState({ checkAllText: "Uncheck All" }) 
        }else{
            this.setState({statusCheckAll: false})
            this.setState({ checkAllText: "Check All" }) 
        }
    }

    proceed = () => {
        const { navigation } = this.props;

        if(!this.validation()){
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
                        oneType: navigation.getParam('oneType',null),
                        idList: this.state.idList,
                        index:  navigation.getParam('index',null),
                        categoryId :  navigation.getParam('categoryId',null), 
                        headerTitle:  navigation.getParam('headerTitle',null), 
                    }
                )
            );
        }     
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