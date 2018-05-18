import React, { Component } from 'react';
import { Text, View, Animated, Dimensions} from 'react-native';
import PropTypes from 'prop-types';

var { width } = Dimensions.get('window');
var availableWidth = width;
/**
  Timer Component
**/
class TimerBar extends Component {
  static propTypes = {
    time: PropTypes.number,
    timerRun: PropTypes.bool,
    timerRestart: PropTypes.bool
  };

  constructor(props) {
      super(props);

      this.progress = new Animated.Value(0);
      this.duration = this.props.time;
      this.seconds = this.duration / 1000;

      this.state = {
        progress: 0,
        start: true
      };   
      
  }

    render(){
      

      return (
        <View style={[styles.timerWrapper, styles.shadow]}>
          <View style={[styles.timerContainer]}>
            <Animated.View
              style={[this.getProgressStyles.call(this)]}
            > 
            </Animated.View>

            <Animated.View 
              style={[this.getBoxStyles.call(this), styles.timerBox, styles.shadow]}
            > 
            </Animated.View>
          </View>
          <Text style={styles.timerStatus}>
          { this.state.progress }
          </Text>
        </View>
      );
    }

    getProgressStyles() {
        var animatedWidth = this.progress.interpolate({
          inputRange: [0, 50, 100],
          outputRange: [0, availableWidth / 2, availableWidth]
        });
       
        return {
          width: animatedWidth,
          height: 25, //height of the progress bar
          backgroundColor: "#45b4e7"
        }
    }

    getBoxStyles() {
        var animatedWidth = this.progress.interpolate({
          inputRange: [0, 50, 100],
          outputRange: [0, availableWidth / 2, availableWidth + 10]
        });
       
        return {
          left: animatedWidth
        }
    }

    componentDidMount() {

      this.progress.addListener((progress) => {
          this.setState({
            progress: parseFloat(this.seconds - ((progress.value * this.seconds) / 100 )).toFixed(2) 
          });
      });

      this.timerStart();

    }

    componentDidUpdate() {
      this.timerStop();
      this.timerRestart();
    }

    componentWillMount() {
      this.progress.removeListener();
    }

    timerStart(){

      this.progress.setValue(0);
      
      Animated.timing(this.progress, {
        duration: this.duration,
        toValue: 100
      }).start(() => {
          this.timerEnd();
      });

      
      this.props.onRestart(false);
    }

    timerEnd(){
        if(this.props.timerRun){
          this.props.onTimesUp(true);
          this.props.timeStops(this.seconds - this.state.progress);
        }
    }

    timerStop(){
      if(!this.props.timerRun){
        Animated.timing(
          this.progress
        ).stop();

        this.props.timeStops(this.state.progress);
      }    
    }

    timerRestart(){
      if(this.props.timerRestart){
        this.timerStart();
      }
    }
}
module.exports = TimerBar;

const styles = require('../styles/style');