/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import { Icon } from 'react-native-elements';
import { hiraganaList , katakanaList } from '../config/data';
import { sketchList } from '../config/sketchData';

  var HLlist = hiraganaList.concat(katakanaList) ;

  const hiragana = sketchList;
  

export default class HL4 extends Component {

      constructor(props) {
        super(props)
    
        this.state = {
          example: 0,
          color: '#000000',
          thickness: 5,
          message: '',
          progress: 0,
          currentData: 'h_a',
          index: 0,
          touchEnabled: true,
          hiraganaModal: false,
          katakanaModal : false
        }
      }
      
      componentDidMount(){
        this.addNewData(this.state.currentData);
      }

      addNewData = (data) =>{
        console.log(data);
        var count = hiragana[data].length;
        for(var i = 0; i<count;i++){
          this.canvasBg.addPath(this.makePath(hiragana[data][i],i,"#dddddd"));          
        }
        this.canvasDirection.clear();
        this.canvasDirection.addPath(this.makePath(hiragana[data][0],0,"#00ff00"))
      }
      makePath = (path, i, color) =>{
        var value = {
          drawer: 'user1',
          size: { // the size of drawer's canvas
            width: 280,
            height: 280
          },
          path: {
            id: i, // path id
            color: color, 
            width: 5,
            data: path.data,
          } 
          }
          return value;
      }

      getRandom = () =>{
        var count = HLlist.length;
        var random = Math.floor(Math.random() * count);
        while( HLlist[random]['id'] == ""){
          var random = Math.floor(Math.random() * count);
          }
        this.canvasBg.clear();
        this.canvasCorrect.clear();
        this.canvas2.clear();
        var nextindex = random ;
        var nextData = HLlist[nextindex]['id'];
        this.setState({ 
          currentData : HLlist[nextindex]['id'],
          index : nextindex,
          progress : 0
        });
        this.addNewData(nextData);

      }

      
      goBack = () => {

      }

      ListHiragana = () => {
        
      }

      listKatakana = () => {
        
      }

    
      updateNext = () =>{
        this.canvasBg.clear();
        this.canvasCorrect.clear();
        this.canvas2.clear();
        var nextindex = this.state.index + 1;
        while( HLlist[nextindex]['id'] == ""){
          var nextindex = nextindex + 1;  
        }
        var nextData = HLlist[nextindex]['id'];
        this.setState({ 
          currentData : HLlist[nextindex]['id'],
          index : nextindex,
          progress : 0
        });

        if (nextindex < HLlist.length){
          this.addNewData(nextData);
        }else{
          alert('finish');
          this.setState({ touchEnabled : false });
        }
      }

      resetData = () => {
        this.canvasBg.clear();
        this.canvasCorrect.clear();
        this.canvas2.clear();
        var nextindex = this.state.index ;

        var nextData = HLlist[nextindex]['id'];
        this.setState({ 
          currentData : HLlist[nextindex]['id'],
          index : nextindex,
          progress : 0
        });
        this.addNewData(nextData);
 
      }

      validationStrokeEnd = (path) =>{
        if(this.state.progress < hiragana[this.state.currentData].length){
          if(this.checkValidation(hiragana[this.state.currentData][this.state.progress], path.path)){
            var next = this.state.progress + 1;
            if(next <= hiragana[this.state.currentData].length){
              this.canvasCorrect.addPath(this.makePath(hiragana[this.state.currentData][this.state.progress],this.state.progress,"#ff0000"));
              if(next < hiragana[this.state.currentData].length ){
                this.canvasDirection.addPath(this.makePath(hiragana[this.state.currentData][next],next,"#00ff00"))
              }
              this.setState({ progress : next })
              this.canvas2.clear();
            }else{
              this.updateNext();
            }  
          }else{
            this.canvas2.clear();
            alert('wrong stroke');
          }
        }else{
          this.updateNext();
        }
      }

      checkValidation = (path1, path2) => {
        var blurWidth = 10;
        var count =  path1.data.length;
        var countStoke =  path2.data.length;
        var check = 0;
        for(var i = 0; i < count; i++){
          var flag = false;
          for(y=0;y<countStoke;y++){
            var data1 = path1.data[i].split(",");
            var data2 = path2.data[y].split(",");
            if(!flag){
              if( parseInt(data1[0]) - blurWidth <= parseInt(data2[0]) && parseInt(data1[0]) + blurWidth >= parseInt(data2[0]) ){
                if( parseInt(data1[1]) - blurWidth <= parseInt(data2[1]) && parseInt(data1[1]) + blurWidth >= parseInt(data2[1]) ){
                  console.log('success',i);
                  flag = true;
                }    
              }  
            }
          }
          if (flag == true){
            check += 1;
          }
        }
        if(check == 0){
          return false;
        }else{
          if((check/count) >= 0.7){
            return true;
          }else{
            return false;
          }
        }
      }

      render() {
        return (
          <View style={styles.container}>
              <View style={{ flex: 4, justifyContent:'center', alignItems:'center'}}>
                  <View style={{ flex: 1 ,  justifyContent:'center', alignItems:'center'}}>
                    <View  style={{ width: 280, height:280, position: 'relative' }}>
                      <SketchCanvas
                        ref={ref => this.canvasBg=ref}
                        style={{ width: 280, height:280 , backgroundColor:'#eeeeee', position: 'absolute'}}
                        strokeColor={this.state.color}
                        strokeWidth={this.state.thickness}
                      />
                      <SketchCanvas
                        ref={ref => this.canvasDirection=ref}
                        style={{ width: 280, height:280 , backgroundColor:'rgba(255,255,255,0)', position: 'absolute'}}
                        strokeColor={this.state.color}
                        strokeWidth={this.state.thickness}
                      />
                      <SketchCanvas
                        ref={ref => this.canvasCorrect=ref}
                        style={{ width: 280, height:280 , backgroundColor:'rgba(255,255,255,0)', position: 'absolute', zIndex: 2}}
                        strokeColor={this.state.color}
                        strokeWidth={this.state.thickness}
                      />
                      <SketchCanvas
                        ref={ref => this.canvas2=ref}
                        style={{ width: 280, height:280 , backgroundColor:'rgba(255,255,255,0)', position: 'absolute', zIndex: 3}}
                        strokeColor={this.state.color}
                        strokeWidth={this.state.thickness}
                        touchEnabled={this.state.touchEnabled}
                        onStrokeStart={() => {
                          this.setState({ message: 'Start' })
                        }}
                        onStrokeChanged={() => {
                          this.setState({ message: 'Changed' })
                        }}
                        onStrokeEnd={(path) => {
                          this.validationStrokeEnd(path);
                         this.setState({ message: 'End' })
                        }}
                        onPathsChange={(pathsCount) => {
                          //console.log('pathsCount', pathsCount)
                        }}
                      />
                    </View>
                  </View>
              </View>
              <View style={{ flex: 3, justifyContent:'center', alignItems:'center'}}>
                <View style={ styles.containerText }>
                  <View  style={ styles.containerTextInside }><TouchableHighlight style={ styles.containerTextButton }><Text style={ styles.containerTextMain }>あ</Text></TouchableHighlight></View>
                  <View  style={ styles.containerTextInside }><TouchableHighlight style={ styles.containerTextButton }><Text style={ styles.containerTextMain }>ア</Text></TouchableHighlight></View>
                  <View  style={ styles.containerTextInside }><TouchableHighlight style={ styles.containerTextButton } onPress={() => this.resetData() }><Icon name="undo" size={25} color={"white"} /></TouchableHighlight></View>
                </View>
                <View style={ styles.containerText }>
                  <View  style={ styles.containerTextInside }><TouchableHighlight style={ styles.containerTextButton } onPress={() => this.updateNext() }><Icon name="arrow-right"  type='font-awesome'  size={25} color={"white"} /></TouchableHighlight></View>
                  <View  style={ styles.containerTextInside }><TouchableHighlight style={ styles.containerTextButton } onPress={() => this.getRandom() }><Icon name="random"  type='font-awesome'  size={25} color={"white"} /></TouchableHighlight></View>
                  <View  style={ styles.containerTextInside }><TouchableHighlight style={ styles.containerTextButton }><Icon name="home"  type='font-awesome'  size={25} color={"white"} /></TouchableHighlight></View>
                </View>
              </View>
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
      strokeColorButton: {
        marginHorizontal: 2.5,
        marginVertical: 8,
        width: 30,
        height: 30,
        borderRadius: 15,
      },
      strokeWidthButton: {
        marginHorizontal: 2.5,
        marginVertical: 8,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#39579A'
      },
      functionButton: {
        marginHorizontal: 2.5,
        marginVertical: 8,
        height: 30,
        width: 60,
        backgroundColor: '#39579A',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
      },
      containerText: {
        height: 70, 
        flexDirection: 'row', 
        padding:10  
      },
      containerTextInside :{
        flex: 1, 
        padding:10
      },
      containerTextButton : {
        width:'100%', 
        height: 60,
        backgroundColor: '#45B5E7',
        borderRadius: 10,
        justifyContent : 'center',
        alignItems : 'center',
      },
      containerTextMain : {
        color: '#ffffff',
        fontSize: 20,
      }
      
    });