// ***************************************************************************
//  @Created Date: 04/08/2021.
//  @Update:  04/08/2021.
//  @author:  ClerkedApp team.
//  @description:   A component for inputText with label.
// ***************************************************************************

import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight} from 'react-native';
import { Item, Input, Icon, Label } from 'native-base';
import {S} from '../mainStyle';
import * as MS from '../mainStyle';

export default function InputTextWithLabel(props) {
  const { leftIcon, placeholder, txtValue, onChangeText, onClose, index } = props;
  const [isFocus, setIsFocus] = React.useState(false);

  ///////////////////////////////////////////////////////////////////////
  const _onFocus =()=> {
    setIsFocus(true);
  }

  ///////////////////////////////////////////////////////////////////////
  const onBlur =()=> {
    setIsFocus(false);
  }
  
  ///////////////////////////////////////////////////////////////////////
  return (
    <View style={[S.rowFlex_start, styles.panel]}>
      {
        leftIcon &&
        <TouchableHighlight 
          activeOpacity={0.8}
          underlayColor="transparent"
          onPress={()=>onClose(index)}
        >
          <View style={[styles.leftIcon, {marginRight:16}]}>
            <Icon style={{fontSize:15, color:MS.Gray600}} name={leftIcon} type="Ionicons" />
          </View>
        </TouchableHighlight>
       
      }
      <View style={{flex:1}}>
        {
          (isFocus || txtValue.length>0) &&
          <Text style={[ S.ft10B_G500, {textTransform:"uppercase", letterSpacing:1, marginBottom:4}]}>{placeholder}</Text>
        }
        <Input 
          style={[S.ft16_G900, {  padding:0, paddingLeft:0}]} 
          placeholder = {isFocus? '':placeholder}
          placeholderTextColor={MS.Gray600}
          value={txtValue} 
          onFocus = {()=>_onFocus()}
          onBlur = {()=>onBlur()}
          onChangeText={(ev)=>{ onChangeText(ev)}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    height: 51,
    borderRadius:8,
    backgroundColor: 'white',
    borderColor: MS.Gray200,
    borderWidth:1,
    paddingHorizontal:16,
    paddingVertical: 8,
    alignItems: 'center'
  },
  leftIcon: {
    width:18,
    height: 18,    
    borderRadius: 50,
    backgroundColor: MS.Gray200,
    alignItems: 'center',
    justifyContent:'center'
  },
  input_upper: {
    fontSize: 14,
    color: 'white',
    marginTop: 0,
  },
  input_helper: {
    fontSize: 14,
    color: '#FF5C53',
    marginTop: 5,
    fontWeight: '600'
  },
  input_icon: {
    color: 'white',
    marginBottom: 5
  }
});
