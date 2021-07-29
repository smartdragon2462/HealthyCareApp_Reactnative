import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableHighlight} from 'react-native';
import Modal from 'react-native-modal';
import { OptionOn_icon, OptionOff_icon} from '../assets/icons';
import { S } from '../mainStyle';

const { width, height } = Dimensions.get('screen');

export default function OptionModal(props) {
  const { visible, option, selectedIndex=-1 , onSelectItem, onBack, visibleH=62} = props  

  return (
    <Modal 
      statusBarTranslucent 
      animationInTiming={500}
      animationOutTiming={300}
      backdropTransitionInTiming={500}
      backdropTransitionOutTiming={300}
      isVisible={visible} 
      onBackdropPress={()=>onBack()}
      style={{ justifyContent:'flex-end', margin: 0}}
      useNativeDriverForBackdrop
      backdropOpacity={0.6}
    >      
      <View style={{...styles.modalView, height: height-visibleH}}>          
        <View style={styles.modalIndicator}/>
        <View style={{alignSelf:"flex-start", marginTop:29 }}>
          <Text style={styles.title}>{option?.title}</Text>
        </View>
        <View style={styles.optionCard}>
          {
            option &&
            option.component.map((item, i)=>
            {
              let icon = null, option= null;
              if( selectedIndex === i ) {icon = OptionOn_icon; option=styles.option20}
              else {icon = OptionOff_icon; option=styles.option18}

              return(
                <TouchableHighlight key={i} activeOpacity={0.8} 
                  underlayColor = 'transparent' onPress={() => onSelectItem(i)}
                >
                  <View style={{ ...S.rowFlex_start, paddingVertical:12 }}>
                    <Image source={ icon } style={option} resizeMode="contain" />
                    <Text style={{marginLeft:24, ...S.ft16_G800 }}>{item}</Text>
                  </View>
                </TouchableHighlight>
              )
            })
          }
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
    padding: 24,
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
    width:"100%", 
    marginTop: 8, 
    borderRadius:8, 
    backgroundColor:'white',
    padding:16,
    borderWidth: 1, 
    borderColor: 'rgba(0, 71, 179, 0.03)'
  }
});


