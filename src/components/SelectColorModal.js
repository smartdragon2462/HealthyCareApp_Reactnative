import React from 'react';
import {  ScrollView, StyleSheet, View, Text, Dimensions, TouchableHighlight} from 'react-native';
import { Content } from 'native-base';
import Modal from 'react-native-modal';
import { Txt_svg } from '../assets/icons';
import { S } from '../mainStyle';

const { width, height } = Dimensions.get('screen');

export default function SelectColorModal(props) {
  const { visible, onBack, onSelectColor, onSelectHighlight } = props;
  const [isBorder, setBorder] = React.useState(false);

  ///////////////////////////////////////////////////////////////////////
  const onScroll = (ev) => {
    if (!isBorder && ev.contentOffset.y > 8) setBorder( true );
    else if (isBorder && ev.contentOffset.y < 8) setBorder(false );
  }

  return (
    <Modal 
      statusBarTranslucent 
      animationInTiming={500}
      animationOutTiming={500}
      backdropTransitionInTiming={500}
      backdropTransitionOutTiming={500}
      isVisible={visible} 
      onBackdropPress={()=>onBack()}
      style={{ justifyContent:'flex-end', margin:0 }}
      useNativeDriverForBackdrop
      backdropOpacity={0.6}
    >      
      <View style={{...styles.modalView, height:height}}>          
        <View style={{ paddingBottom:16, paddingHorizontal:24, borderBottomWidth:1, borderBottomColor:isBorder? "#E6E8EB":"transparent"}}>
          <TouchableHighlight style={{alignSelf:"flex-end"}} onPress={()=>onBack()}>
            <Text style={S.ft12_B500}>Cancel</Text> 
          </TouchableHighlight>
        </View>

        <Content style={{paddingHorizontal:24}} onScroll={({ nativeEvent }) => onScroll(nativeEvent)}>
          <Text style={{...S.ft14_G700, marginVertical:8}}>Color</Text> 
          
          <View style={{...S.card, paddingVertical:8 }}>
            <TouchableHighlight activeOpacity={0.6} underlayColor="red" onPress={()=>onSelectColor("#33435C")}>
              <View style={styles.foreColorItem} >
                <View style={styles.colorMarkFrame}>
                  <Txt_svg width={16} height={16} fill={"#33435C"}/>
                </View>
                <Text style={styles.colorItemText}>Default</Text> 
              </View>
            </TouchableHighlight>
            <TouchableHighlight activeOpacity={0.6} underlayColor="transparent"  onPress={()=>onSelectColor("#CCD0D6")}>
              <View style={styles.foreColorItem} >
                <View style={styles.colorMarkFrame}>
                  <Txt_svg width={16} height={16} fill={"#CCD0D6"}/>
                </View>
                <Text style={styles.colorItemText}>Gray</Text> 
              </View>
            </TouchableHighlight>
            <TouchableHighlight activeOpacity={0.6} underlayColor="transparent" onPress={()=>onSelectColor("#FF9500")}>
              <View style={styles.foreColorItem} >
                <View style={styles.colorMarkFrame}>
                  <Txt_svg width={16} height={16} fill={"#FF9500"}/>
                </View>
                <Text style={styles.colorItemText}>Orange</Text> 
              </View>
            </TouchableHighlight>
            <TouchableHighlight activeOpacity={0.6} underlayColor="transparent" onPress={()=>onSelectColor("#54C1FB")}>
              <View style={styles.foreColorItem} >
                <View style={styles.colorMarkFrame}>
                  <Txt_svg width={16} height={16} fill={"#54C1FB"}/>
                </View>
                <Text style={styles.colorItemText}>Blue</Text> 
              </View>
            </TouchableHighlight>
            <TouchableHighlight activeOpacity={0.6} underlayColor="transparent" onPress={()=>onSelectColor("#9900FF")}>
              <View style={styles.foreColorItem} >
                <View style={styles.colorMarkFrame}>
                  <Txt_svg width={16} height={16} fill={"#9900FF"}/>
                </View>
                <Text style={styles.colorItemText}>Purple</Text> 
              </View>
            </TouchableHighlight>
            <TouchableHighlight activeOpacity={0.6} underlayColor="transparent" onPress={()=>onSelectColor("#FF00E6")}>
              <View style={styles.foreColorItem} >
                <View style={styles.colorMarkFrame}>
                  <Txt_svg width={16} height={16} fill={"#FF00E6"}/>
                </View>
                <Text style={styles.colorItemText}>Pink</Text> 
              </View>
            </TouchableHighlight>
            <TouchableHighlight activeOpacity={0.6} underlayColor="transparent" onPress={()=>onSelectColor("#FF1900")}>
              <View style={{...S.rowFlex_start, paddingVertical:15}} >
                <View style={styles.colorMarkFrame}>
                  <Txt_svg width={16} height={16} fill={"#FF1900"}/>
                </View>
                <Text style={styles.colorItemText}>Red</Text> 
              </View>
            </TouchableHighlight>
          </View>

          <Text style={{...S.ft14_G700, marginTop:24, marginBottom:8}}>Color</Text> 
          <View style={{...S.card, paddingVertical:8, marginBottom:24 }}>
            <TouchableHighlight activeOpacity={0.6} underlayColor="transparent" onPress={()=>onSelectHighlight("#FFFFFF")}>
              <View style={styles.foreColorItem}>
                <View style={{...styles.colorMarkFrame, backgroundColor:"#FFFFFF"}}>
                  <Txt_svg width={16} height={16} fill={"#33435C"}/>
                </View>
                <Text style={styles.colorItemText}>Default background</Text> 
              </View>
            </TouchableHighlight>
            <TouchableHighlight activeOpacity={0.6} underlayColor="transparent" onPress={()=>onSelectHighlight("#E6E8EB")}>
              <View style={styles.foreColorItem}>
                <View style={{...styles.colorMarkFrame, backgroundColor:"#E6E8EB"}}>
                  <Txt_svg width={16} height={16} fill={"#33435C"}/>
                </View>
                <Text style={styles.colorItemText}>Gray background</Text> 
              </View>
            </TouchableHighlight>
            <TouchableHighlight activeOpacity={0.6} underlayColor="transparent" onPress={()=>onSelectHighlight("#FFF3E3")}>
              <View style={styles.foreColorItem}>
                <View style={{...styles.colorMarkFrame, backgroundColor:"#FFF3E3"}}>
                  <Txt_svg width={16} height={16} fill={"#33435C"}/>
                </View>
                <Text style={styles.colorItemText}>Orange background</Text> 
              </View>
            </TouchableHighlight>
            <TouchableHighlight activeOpacity={0.6} underlayColor="transparent" onPress={()=>onSelectHighlight("#ECF8FF")}>
              <View style={styles.foreColorItem}>
                <View style={{...styles.colorMarkFrame, backgroundColor:"#ECF8FF"}}>
                  <Txt_svg width={16} height={16} fill={"#33435C"}/>
                </View>
                <Text style={styles.colorItemText}>Blue background</Text> 
              </View>
            </TouchableHighlight>
            <TouchableHighlight activeOpacity={0.6} underlayColor="transparent" onPress={()=>onSelectHighlight("#F4E3FF")}>
              <View style={styles.foreColorItem}>
                <View style={{...styles.colorMarkFrame, backgroundColor:"#F4E3FF"}}>
                  <Txt_svg width={16} height={16} fill={"#33435C"}/>
                </View>
                <Text style={styles.colorItemText}>Purple background</Text> 
              </View>
            </TouchableHighlight>
            <TouchableHighlight activeOpacity={0.6} underlayColor="transparent" onPress={()=>onSelectHighlight("#FFE3FC")}>
              <View style={styles.foreColorItem}>
                <View style={{...styles.colorMarkFrame, backgroundColor:"#FFE3FC"}}>
                  <Txt_svg width={16} height={16} fill={"#33435C"}/>
                </View>
                <Text style={styles.colorItemText}>Pink background</Text> 
              </View>
            </TouchableHighlight>
            <TouchableHighlight activeOpacity={0.6} underlayColor="transparent" onPress={()=>onSelectHighlight("#FFE2DF")}>
              <View style={{...S.rowFlex_start, paddingVertical:15}}>
                <View style={{...styles.colorMarkFrame, backgroundColor:"#FFE2DF"}}>
                  <Txt_svg width={16} height={16} fill={"#33435C"}/>
                </View>
                <Text style={styles.colorItemText}>Red background</Text> 
              </View>
            </TouchableHighlight>
          </View>
        </Content>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "#FAFAFB",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingTop: 36,
  },
  foreColorItem: {
    ...S.rowFlex_start,
    paddingVertical:15, 
    borderBottomWidth:1, 
    borderBottomColor:"#E6E8EB"
  },
  colorMarkFrame:{
    marginLeft:16, 
    padding:8,
    borderWidth:1, 
    borderRadius:50, 
    borderColor:"#CCD0D6"
  },
  colorItemText: {
    ...S.ft16B, 
    color:"#33435C", 
    marginLeft:24,
    marginTop:2
  }  
});


