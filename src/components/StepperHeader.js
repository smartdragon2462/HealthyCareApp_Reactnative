import React from 'react';
import { StyleSheet, TouchableHighlight, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Stepper from '../components/Stepper';
import { Icon } from 'native-base';
import { S } from '../mainStyle';

export default function StepperHeader({pageIndex, onBackpage, onNextpage, content, isContinue, isVisible, isShrink}) {
  const step = [];
  for(let i = 0; i<=pageIndex; i++){
    step.push(i);
  }

  return (
    // <View style={[styles.header, isShrink&& {height: 50}]}>
    <LinearGradient style={{ width: '100%', height:'100%' }} colors={['#0066ff', '#0250c7']}>
      <View style={styles.topBar}>
        <TouchableHighlight activeOpacity={0.8} underlayColor="transparent" onPress={onBackpage}>
          <View style={{ display:'flex', flexDirection:'row', alignItems:'center'}}>
            <Icon name='chevron-back-outline' style={{ fontSize: 26, color: 'white' }} />
            {
              isShrink && 
              <Text style={isShrink? styles.headerTxt: null}>{content[pageIndex]}</Text> 
            }
          </View>
        </TouchableHighlight>
        <TouchableHighlight disabled={!isContinue} activeOpacity={0.8} underlayColor="transparent" onPress={onNextpage}>
          <View style={{opacity: isContinue? 1: 0.6}}>
            {
              isVisible &&
              <Text style={[S.ft12B_W, {padding:5}]}>Continue</Text>
            }
          </View>
        </TouchableHighlight>
      </View>
      <View style={[{ paddingHorizontal: 50, marginTop: 10 }, isShrink&& {display:'none'}]}>
        <Stepper
          active = { pageIndex }
          content = { content }
          onFinish = {() => alert('Finish')}
          step = {step}
          stepTextStyle = {{ color: 'white' }}
          showButton = { true }
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  topBar: { 
    padding: 20, 
    paddingTop: 10, 
    paddingBottom: 5 , 
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent:'space-between'
  }, 
  headerTxt: {
    fontSize: 16, 
    fontWeight:'600', 
    fontFamily: 'Proxima-Nova-Regular', 
    color:'white'
  }
});
