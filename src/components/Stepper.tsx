import React, {FC, useState, ReactElement} from 'react';
import {View, Text, TouchableOpacity,  ViewStyle,  TextStyle,  ScrollView, StyleSheet} from 'react-native';

export interface StepperProps {  
  active: number;  
  content: ReactElement[];  
  step: number[];
  onNext: Function;  
  onBack: Function;  
  onFinish: Function;  
  wrapperStyle?: ViewStyle;  
  stepStyle?: ViewStyle;
  stepTextStyle?: TextStyle;  
  buttonStyle?: ViewStyle;  
  buttonTextStyle?: TextStyle;  
  showButton?: boolean;
}

const search = (keyName: number, myArray: number[]): boolean => {
  let value = false;
  myArray.map((val) => { if (val === keyName) {   value = true; } });
  return value;
};

const Stepper: FC<StepperProps> = (props) => {
  const { active, content, onBack, onNext, step, onFinish, wrapperStyle, stepStyle,  stepTextStyle,  buttonStyle,  buttonTextStyle,  showButton = true,} = props;
  return (
    <View style={wrapperStyle}>
      <View style={ styles.stepItem}>
        {
          content.map((_, i) => {
            return (
              <React.Fragment key={i}>
                { i !== 0 && <View style={[styles.stepLine, {opacity: search(i, step) ? 1 : 0.3}]}/> }
                <View style={styles.stepperNode}>
                  <View style={[ styles.stepShape, {opacity: search(i, step) ? 1 : 0.3}]}></View>
                </View>              
              </React.Fragment>
            );            
          })
        }
      </View>
      <View style={ styles.stepItem1}>
        {
          content.map((contenTxt, i) => {
            return (
              <React.Fragment key={i}>
                <View style ={[{flexDirection : 'column', justifyContent: 'center',},  {opacity: search(i, step) ? 1 : 0.3}]}>  
                  <Text style={styles.stepText}>{contenTxt} </Text>            
                </View>                
              </React.Fragment>
            );            
          })
        }
      </View>
    </View>
  );
};

export default Stepper;

const styles = StyleSheet.create({
  stepItem: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center'},
  stepItem1: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop:10, 
    marginLeft:-20, 
    marginRight:-10
  },
  stepLine: { 
    flex: 1, 
    height: 1, 
    backgroundColor: '#FFFFFF',  
    marginHorizontal: 0,
  },
  stepShape: { 
    backgroundColor: '#FFFFFF', 
    width: 10, 
    height: 10, 
    borderRadius: 10, 
    justifyContent: 'center',
    alignItems: 'center', 
    marginTop:3
  }, 
  stepText: {
    color: 'white',
    fontFamily:'Proxima-Nova-Bold',
    fontSize: 12,
    lineHeight: 15
  },
  stepperNode: {
    display: 'flex',
    flexDirection: 'row',
    width: 18, 
    height: 18, 
    borderRadius: 18, 
    borderColor: '#80B3FF',
    borderWidth: 1,
    textAlign: 'center',
    justifyContent: 'center',
  },
  container: {
    // backgroundColor: '#0066FF',
  },
  header: {
    backgroundColor: '#0066ff'
  },

  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'left',
    lineHeight: 22,
    marginTop: 0
  },
  subtitle: {
    color: 'white',
    fontSize: 14,
    textAlign: 'left',
    lineHeight: 22,
    marginTop: 8
  }, 
  continue_btn: {
    backgroundColor: '#FFFFFF',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 'auto',
    marginBottom: 24,
    width: '100%',
  },
  continue_btn_caption: {
    fontFamily: 'Proxima Nova',
    color: '#0066FF',
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '700'
  },
  inputitem: {
    marginTop: 10,
    width: '100%'
  }
});
