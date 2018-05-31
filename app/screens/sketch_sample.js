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
} from 'react-native';

import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';

export default class HL4 extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          example: 0,
          color: '#FF0000',
          thickness: 5,
          message: ''
        }
      }
    
      render() {
        return (
          <View style={styles.container}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={styles.functionButton} onPress={() => {
                      this.setState({ example: 0 })
                    }}>
                      <Text style={{color: 'white'}}>Close</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity style={styles.functionButton} onPress={() => {
                        this.setState({ thickness: 10 })
                      }}>
                        <Text style={{color: 'white'}}>Thick</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.functionButton} onPress={() => {
                        this.setState({ thickness: 5 })
                      }}>
                        <Text style={{color: 'white'}}>Thin</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <SketchCanvas
                    ref={ref => this.canvas=ref}
                    style={{ flex: 1 }}
                    strokeColor={this.state.color}
                    strokeWidth={this.state.thickness}
                    onStrokeStart={() => {
                      this.setState({ message: 'Start' })
                    }}
                    onStrokeChanged={() => {
                      this.setState({ message: 'Changed' })
                    }}
                    onStrokeEnd={() => {
                      this.setState({ message: 'End' })
                    }}
                    onPathsChange={(pathsCount) => {
                      console.log('pathsCount', pathsCount)
                    }}
                  />
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity style={[styles.functionButton, {backgroundColor: 'red'}]} onPress={() => {
                        this.setState({ color: '#FF0000' })
                      }}>
                        <Text style={{color: 'white'}}>Red</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.functionButton, {backgroundColor: 'black'}]} onPress={() => {
                        this.setState({ color: '#000000' })
                      }}>
                        <Text style={{color: 'white'}}>Black</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={{marginRight: 8, fontSize: 20}}>{ this.state.message }</Text>
                    <TouchableOpacity style={[styles.functionButton, {backgroundColor: 'black', width: 90}]} onPress={() => {
                      console.log(this.canvas.getPaths())
                      Alert.alert(JSON.stringify(this.canvas.getPaths()))
                      this.canvas.getBase64('jpg', false, (err, result) => {
                        console.log(result)
                      })
                    }}>
                      <Text style={{color: 'white'}}>Get Paths</Text>
                    </TouchableOpacity>
                  </View>
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
      }
    });