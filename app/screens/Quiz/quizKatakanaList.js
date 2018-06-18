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

import { katakanaList } from '../../config/data';
import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox'; 
import  { strings }   from '../../config/localization';

  class QuizKatakanaListScreen extends Component {
  
    static navigationOptions = ({ navigation }) =>{
        const {state} = navigation;
        return {
            title: `${strings['KATAKANA_LIST_TITLE']}`,
        };
      };

    state = {
        checkAllText: strings['CHECK_ALL'],
        statusCheckAll: false,
        stsList : false,
        statusPerRow: false,
        idList:[],
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.setState({
            test: navigation.getParam('idList', null),
        });     
        this.setStatusfalse();
      }

    constructor(props){
        super(props);
        
        this.checkItems = [];
        this.checkRows = [];
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
                        <Text style={quizStyles.buttonText}>{strings['PROCEED']}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    {katakanaList.map((item, key)=>(
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
                                <Text style={quizStyles.displayNone}>None</Text>
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
        for(i=0;i<katakanaList.length;i++){
            if(this.checkRows[i] == true){
                this.setState({statusCheckAll: !this.state.statusCheckAll})
                this.setState({ checkAllText: strings['CHECK_ALL'] }) 
                status=true;
            }
        }
        if (status == false) error = strings['HIRAGANA_KATAKANA_LIST_VALIDATION'];
        if (error) {
            Alert.alert('Warning', error);
            return true; 
        }
        else{
            return false;
        }
    }

    setStatusfalse(){
        for(i=0;i<katakanaList.length;i++){
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

    // checkSingle(key) {
    //     if(this.checkItems[key]){
    //         this.checkItems[key] = false;
    //         this.setState({ stsList: this.checkItems });
    //         this.selectedList(key)
    //     }
    //     else{
    //         this.checkItems[key] = true;
    //         this.setState({ stsList: this.checkItems });
    //         this.selectedList(key)
    //     }
    // };

    checkAll(){
        this.setState({statusCheckAll: !this.state.statusCheckAll})
        if(this.state.statusCheckAll){
            {katakanaList.map((item, key)=>(
                this.checkItems[key] = false,
                this.setState({ stsList: this.checkItems }),
                this.selectedList(key),

                this.checkRows[key] = false,
                this.setState({ statusPerRow: this.checkRows })
            ))};  
            this.setState({ checkAllText: strings['CHECK_ALL'] })     
        }else{
            {katakanaList.map((item, key)=>(
                this.checkItems[key] = true,
                this.setState({ stsList: this.checkItems }),
                this.selectedList(key),

                this.checkRows[key] = true,
                this.setState({ statusPerRow: this.checkRows })
            ))};  
            this.setState({ checkAllText: strings['UNCHECK_ALL'] })    
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
                key=key-1
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
            this.setState({ checkAllText: strings['UNCHECK_ALL'] }) 
        }else{
            this.setState({statusCheckAll: false})
            this.setState({ checkAllText: strings['CHECK_ALL'] }) 
        }
    }

    proceed = () => {
        const { navigation } = this.props;
        
        if(!this.validation()){
            this.props.navigation.navigate('QuizFlash', {
                type: navigation.getParam('type',null),
                title: navigation.getParam('title',null),
                studyType: navigation.getParam('studyType',null),
                img: navigation.getParam('img',null),
                topicId: navigation.getParam('topicId',null),
                typeQuiz: navigation.getParam('typeQuiz',null),
                quizOptions: navigation.getParam('quizOptions',null),
                oneType: navigation.getParam('quizOptions',null),
                idList: this.state.idList,
                index:  navigation.getParam('index',null),
                categoryId :  navigation.getParam('categoryId',null),              
                headerTitle:  navigation.getParam('headerTitle',null),
            });
        }
    };

    selectedList(key){
        if(this.checkItems[key]){
            if(katakanaList[key].id !=""){
                this.setState((previousState) => {
                    previousState.idList.push(katakanaList[key].id);
                    return previousState;
                })
            }
        }else{
            if(katakanaList[key].id !=""){
                this.setState((previousState) => {
                    var idIndex =  previousState.idList.indexOf(katakanaList[key].id);
                    previousState.idList.splice(idIndex,1);
                    return previousState;
                })
            }
        }
    }


  }

  const quizStyles = require('../../styles/quizStyle');
  const styles = require('../../styles/style');
export default QuizKatakanaListScreen;