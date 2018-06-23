import React, { Component } from 'react';
import { Text, View, Animated, Dimensions, Easing} from 'react-native';
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
        duration: this.props.time,
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
          let progressVal = parseFloat(this.seconds - ((progress.value * this.seconds) / 100 )).toFixed(2);
          this.setState({
            progress: progressVal,
            duration:(progressVal * 1000)
          });
      });
      
      this.timerStart();

    }

    componentDidUpdate() {
      this.timerStop();
      this.timerRestart();
      this.timerResume();
    }

    componentWillUnmount() {
      this.progress.removeListener();
    }

    timerStart(resume = false){
      
      if(!resume){
        this.duration = this.props.time;
        this.seconds = this.duration / 1000;
      }
            
      Animated.timing(this.progress, {
        duration: this.duration,
        toValue: 100,
        easing: Easing.linear
      }).start(() => {        
          this.timerEnd();
      });
   
      this.props.onRestart(false);
    }

    timerEnd(){
      
      if(this.props.timerRun && this.state.progress == 0){
        if(!this.props.isTopicTest){           
            this.props.onTimesUp(true);         
        }
        else{
          this.props.onTestEnd(true);          
        }

        this.props.timeStops(this.seconds - this.state.progress);
        this.progress.setValue(0);                 
      }

    }

    timerStop(){    
      //if(!this.props.isTopicTest){  
        if(!this.props.timerRun){
          Animated.timing(
            this.progress
          ).stop();

          this.props.timeStops(this.state.progress);
        }    
      //}  
    }

    timerResume(){      
      if(this.props.timerResume){   
        this.duration = this.state.duration;
        this.timerStart(true);
      }
    }

    timerRestart(){
      
      if(this.props.timerRestart){

        if(!this.props.isTopicTest){
          this.progress.setValue(0);  
          this.timerStart();          
        }
        else{          
          this.duration = this.state.duration;
          this.timerStart(true);
        }        
              
      }  
    }
}
module.exports = TimerBar;

const styles = require('../styles/style');