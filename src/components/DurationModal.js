import React from 'react';
import { StyleSheet, View, Text, Dimensions,} from 'react-native';
import Modal from 'react-native-modal';
import DurationComp from '../components/DurationComp';
import { S } from '../mainStyle';

const { width, height } = Dimensions.get('screen');

export default function DurationModal(props) {
  const { visible, durationType, onBack, onSelectDuration} = props  

  return (
    <Modal 
      statusBarTranslucent 
      animationInTiming={500}
      animationOutTiming={500}
      backdropTransitionInTiming={500}
      backdropTransitionOutTiming={500}
      isVisible={visible} 
      onBackdropPress={()=>onBack()}
      style={{ justifyContent:'flex-end', margin: 0}}
      useNativeDriverForBackdrop
      backdropOpacity={0.6}
    >      
      <View style={{...styles.modalView, height: 177}}>          
        <View style={styles.modalIndicator}/>
        <View style={{ marginTop:24, width:"100%" }}>
          <Text style = { S.ft14_G700 } >{ "Please select an appointment duration" }</Text>
          <DurationComp onSelectDuration = { onSelectDuration } index = {durationType}/>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "#FAFAFB",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 20,
    alignItems: "center",
  },

  modalIndicator: { 
    backgroundColor: '#80B3FF', 
    width: 40, 
    height: 3, 
    borderRadius: 10,
    marginTop:-16
  },
  option18: {
    width: 18,
    height: 18,
    margin:3,
  },
  option20: {
    width: 24,
    height: 24,
  },
  title: {
    color: "#667285",
    fontFamily: 'Proxima-Nova-Regular',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 17,
  },
  optionCard: { 
    marginTop: 8, 
    width:"100%", 
    borderRadius:8, 
    backgroundColor:'white',
    padding:16,
    borderWidth: 1, 
    borderColor: 'rgba(0, 71, 179, 0.03)'
  }
});


