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

  const HLlist = ['a','i']

  const hiragana = {
  a : [
    {
      data: ["80,88","120,70","160,60","200,50"]
    },
    {
      data:  ["138.62,35.43", "138.62,36.13", "138.62,36.82", "138.62,38.08", "138.62,38.74", "138.62,41.69", "138.62,50.73", "138.62,59.47", "138.62,68.22", "138.62,73.67", "134.45,89.67", "122.98,126.17", "121.59,135.56", "120.90,142.98", "120.90,144.94", "120.90,152.68", "120.90,153.63", "120.90,158.11", "120.90,163.37", "120.90,166.62", "120.90,168.23", "120.90,173.10", "120.90,174.49", "120.90,177.38", "120.90,177.97", "120.90,179.71", "120.90,180.40", "120.90,181.10", "120.90,183.25", "120.90,184.57", "121.50,185.48", "121.59,186.90", "121.93,187.70", "122.63,187.70", "122.29,191.18", "122.29,193.96", "122.29,195.35", "122.29,197.78", "122.29,200.80", "122.29,201.26", "123.68,204.04", "124.40,205.46", "125.07,205.78", "125.07,206.48", "125.07,207.32", "125.76,208.84"]
    },
    { 
      data:    ["159.82,156.07", "159.47,156.07", "158.14,156.07", "156.81,157.21", "155.49,158.15", "155.30,159.53", "153.15,160.30", "153.21,160.93", "149.74,164.41", "141.75,171.71", "139.66,173.80", "133.35,178.63", "126.98,183.53", "123.59,185.41", "121.59,187.01", "120.20,188.40", "118.46,189.79", "111.51,193.96", "110.12,194.66", "106.30,195.70", "100.91,195.70", "99.66,195.70", "96.22,192.57", "94.61,187.95", "93.44,180.40", "92.75,171.02", "92.75,168.93", "92.75,161.62", "93.20,154.73", "94.49,147.38", "95.18,146.33", "96.22,144.59", "96.22,142.51", "96.92,142.16", "117.14,123.42", "123.55,117.35", "126.11,115.22", "128.54,112.61", "131.15,111.10", "134.80,109.48", "148.35,106.53", "170.42,100.79", "171.28,100.44", "173.37,100.44", "175.45,100.44", "182.06,100.44", "183.45,100.44", "190.40,100.44", "196.30,104.62", "197.69,104.62", "204.99,110.53", "208.99,116.78", "209.51,117.13", "211.60,122.00", "213.68,128.95", "213.68,132.08", "213.68,137.99", "212.29,142.86", "212.29,143.55", "207.43,153.63", "206.38,157.46", "204.45,160.33", "203.60,162.32", "201.86,163.02", "199.08,168.23", "198.39,168.93", "196.30,171.71", "192.13,177.62", "184.61,188.01", "179.97,193.26", "179.97,193.96", "178.23,195.62", "178.23,195.86"]
    }],
  i : [
      {
        data: ["120.91,87.21", "120.21,88.91", "119.90,89.61", "117.20,96.36", "109.38,107.09", "109.09,108.07", "103.51,118.20", "100.49,126.32", "100.23,127.89", "99.42,128.81", "96.58,138.32", "96.93,137.62", "96.93,140.75", "96.93,145.62", "97.97,149.96", "98.67,151.88", "99.71,155.48", "99.71,156.23", "103.26,160.50", "104.23,161.96", "104.07,163.93", "104.57,165.43", "104.23,165.60", "105.62,166.48", "107.01,167.87", "108.05,168.91", "108.40,168.91", "109.09,170.30", "110.12,171.68", "110.13,172.39", "110.83,173.08", "112.39,173.95", "114.25,175.11", "115.26,176.13", "116.04,175.86", "115.69,177.25", "117.08,177.25", "120.91,177.25", "122.82,177.25", "124.03,177.25", "127.51,175.52", "128.55,174.47"]        
      },
      {
        data:   ["202.22,95.90", "202.22,96.60", "202.22,98.02", "202.22,99.89", "202.92,103.64", "203.61,106.12", "206.74,111.55", "206.39,113.28", "206.04,139.36", "205.70,140.00", "205.70,140.40", "205.00,140.75", "203.51,140.75", "202.92,140.75", "202.22,140.75", "200.48,140.75", "199.79,140.75"]        
      }]
  };
  
  

export default class HL4 extends Component {

      constructor(props) {
        super(props)
    
        this.state = {
          example: 0,
          color: '#000000',
          thickness: 5,
          message: '',
          progress: 0,
          currentData: 'a',
          index: 0,
          touchEnabled: true
        }
        
      }
      componentDidMount(){
        this.addNewData(this.state.currentData);
      }

      addNewData = (data) =>{

        var count = hiragana[data].length;
        for(var i = 0; i<count;i++){
          this.canvasBg.addPath(this.makePath(hiragana[data][i],i,"#dddddd"));          
        }
      }
      makePath = (path, i, color) =>{
        var value = {
          drawer: 'user1',
          size: { // the size of drawer's canvas
            width: 320,
            height: 320
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
    
      updateNext = () =>{
        this.canvasBg.clear();
        this.canvasCorrect.clear();
        this.canvas2.clear();
        var nextindex = this.state.index + 1;

        var nextData = HLlist[nextindex];
        this.setState({ 
          currentData : HLlist[nextindex],
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

      validationStrokeEnd = (path) =>{
        if(this.state.progress < hiragana[this.state.currentData].length){
          if(this.checkValidation(hiragana[this.state.currentData][this.state.progress], path.path)){
            var next = this.state.progress + 1;
            if(next <= hiragana[this.state.currentData].length){
              this.canvasCorrect.addPath(this.makePath(hiragana[this.state.currentData][this.state.progress],this.state.progress,"#ff0000"));
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
              <View style={{ flex: 3, justifyContent:'center', alignItems:'center'}}>
                  <View style={{ flex: 1 ,  justifyContent:'center', alignItems:'center'}}>
                    <View  style={{ width: 320, height:320, position: 'relative' }}>
                      <SketchCanvas
                        ref={ref => this.canvasBg=ref}
                        style={{ width: 320, height:320 , backgroundColor:'#eeeeee', position: 'absolute'}}
                        strokeColor={this.state.color}
                        strokeWidth={this.state.thickness}
                      />
                      <SketchCanvas
                        ref={ref => this.canvasCorrect=ref}
                        style={{ width: 320, height:320 , backgroundColor:'rgba(255,255,255,0)', position: 'absolute'}}
                        strokeColor={this.state.color}
                        strokeWidth={this.state.thickness}
                      />
                      <SketchCanvas
                        ref={ref => this.canvas2=ref}
                        style={{ width: 320, height:320 , backgroundColor:'rgba(255,255,255,0)', position: 'absolute', zIndex: 2}}
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
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <TouchableHighlight><Text>HIRAGANA</Text></TouchableHighlight>
                <TouchableHighlight><Text>KATAKANA</Text></TouchableHighlight>
                <TouchableHighlight><Text>RESET</Text></TouchableHighlight>
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <TouchableHighlight><Text>NEXT</Text></TouchableHighlight>
                <TouchableHighlight><Text>RANDOM</Text></TouchableHighlight>
                <TouchableHighlight><Text>HOME</Text></TouchableHighlight>
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
      }
    });