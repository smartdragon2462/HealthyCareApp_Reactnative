// ***************************************************************************
//  @Created Date:    12/20/2020 
//  @Update:  03/04/2021
//  @author:  ClerkedApp team
//  @description:  A component for inputting phone number
// ***************************************************************************

import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Input, Icon, Label } from "native-base";
import { hideNavigationBar } from 'react-native-navigation-bar-color';
import { User_svg } from '../assets/icons';
import { S } from '../mainStyle';
import * as MS from '../mainStyle';

export default function phoneNumberInput(props) {
  const { helperText, onInputChange, phoneCode, phoneNumber, onClick } = props;
  const [isFocus, setFocus] = useState((phoneCode.length !== 0 || phoneNumber.length !== 0) ? true : false);

  const onFocus = () => {
    setFocus(true);
  }

  const onBlur = () => {
    // hideNavigationBar();
    if (phoneCode.length === 0 && phoneNumber.length === 0) setFocus(false);
  }

  const labelStyle = isFocus ? styles.label : styles.label;
  let errorColor = MS.Blue300;
  if (helperText) errorColor = MS.Red500;
  
  return (
    <View style={{ width: '100%' }}>
      <Text style={[labelStyle, { color: errorColor }]}>
        {isFocus ? "Handphone number" : " "}
      </Text>

      <View style={{ ...styles.content, borderBottomColor: errorColor }}>
        <User_svg width={16} height={16} fill={isFocus ? MS.Blue100 : MS.Blue300} />
        <View style={{ ...styles.flatStyle, flex: 1 }} onBlur={() => onBlur()}>
          {
            isFocus &&
            <View style={{ ...S.rowFlex_start, width: 85 }}>
              <Input
                keyboardType='numeric'
                inputContainerStyle={{ borderBottomWidth: 0 }}
                autoCapitalize="none"
                placeholder={phoneCode.length === 0 ? "+000" : ""}
                placeholderTextColor={MS.Blue300}
                style={[styles.phoneCode, phoneCode.length === 0 && { fontFamily: "Proxima-Nova-Regular" }]}
                value={phoneCode}
                onChangeText={(ev) => { onInputChange(ev, "phonecode") }}
              />
              <TouchableOpacity
                style={{ paddingVertical: 3 }}
                activeOpacity={0.5}
                onPress={() => onClick()}
              >
                <Icon style={{ color: MS.Cyan500, fontSize: 20 }} name="chevron-down" type="Ionicons" />
              </TouchableOpacity>
            </View>
          }
          <Input
            style={[styles.phoneNumber, phoneNumber.length === 0 && { fontFamily: "Proxima-Nova-Regular" }]}
            placeholder={phoneNumber.length === 0 ? "Handphone Number" : ""}
            placeholderTextColor={MS.Blue300}
            keyboardType='numeric'
            value={phoneNumber}
            onChangeText={(ev) => { onInputChange(ev, "phonenumber") }}
            onFocus={() => onFocus()}
          />
        </View>
      </View>
      <Label style={styles.helper}>{ helperText? helperText:" "}</Label>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Proxima-Nova-Semibold',
    fontSize: 10,
    color: MS.Blue100,
    fontWeight: '100',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginLeft: 30,
    opacity: 0.7
  },
  content: {
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: MS.White,
  },
  phoneCode: {
    fontFamily: 'Proxima-Nova-Semibold',
    fontWeight: "100",
    color: MS.White,
    fontSize: 16,
    lineHeight: 20,
    paddingLeft: 14,
  },
  phoneNumber: {
    fontFamily: 'Proxima-Nova-Semibold',
    fontWeight: "100",
    color: MS.White,
    fontSize: 16,
    lineHeight: 20,
    marginLeft: 10
  },
  helper: {
    fontFamily: 'Proxima-Nova-Regular',
    fontSize: 14,
    color: MS.Red500,
    fontWeight: '600',
    marginTop:4,
  },
  flatStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 35
  }
});
