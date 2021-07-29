// ***************************************************************************
//  @Created Date:    12/20/2020 
//  @Update:  03/04/2021
//  @author:  ClerkedApp team
//  @description:  A component for inputting password 
// ***************************************************************************

import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Keyboard, TouchableHighlight } from 'react-native';
import { Item, Input, Icon, Label } from 'native-base';
import { hideNavigationBar, ShowNavigationBar } from 'react-native-navigation-bar-color';
import { S } from '../mainStyle';
import * as MS from '../mainStyle';

export default function InputPasswordBox({ leftIcon, labelText, helperText, onInputChange, password, onClick }) {
  const [isFocus, setFocus] = useState(false);

  const handleBlur = () => {
    // hideNavigationBar();
    if (password.length > 0) return;
    else setFocus(false);
  }

  const labelStyle = isFocus ? styles.label : styles.label1;
  let errorColor = MS.Blue300;
  if (isFocus && helperText) errorColor = MS.Red500;

  return (
    <View style={{ width: '100%' }}>
      <View style={[styles.content, { borderBottomColor: errorColor }]}>
        <Item floatingLabel style={styles.item} last>
          <Icon style={[styles.leftIcon, !isFocus && { opacity: 0.5 }]} name={leftIcon} type="MaterialCommunityIcons" />
          <Label style={[labelStyle, { color: errorColor }]}>{labelText}</Label>
          <Input
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            secureTextEntry={true} style={styles.password}
            value={password}
            onChangeText={(text) => onInputChange(text, "password")}
            onFocus={() => setFocus(true)}
            onBlur={() => handleBlur()}
            onSubmitEditing={Keyboard.dismiss}
          />
        </Item>
        <TouchableOpacity
          style={styles.forgotButton}
          activeOpacity={0.5}
          // underlayColor="transparent"
          onPress={() => onClick()}
        >
          <Text style={S.ft12S_W}>{"Forgot it?"}</Text>
        </TouchableOpacity>
      </View>
      <Label style={styles.helper}>{isFocus && helperText}</Label>
    </View>
  );
}

const styles = StyleSheet.create({
  input_component: {
    marginTop: 5,
    width: '100%',
  },
  label: {
    fontFamily: 'Proxima-Nova-Semibold',
    textTransform: 'uppercase',
    fontSize: 10,
    color: MS.Blue100,
    fontWeight: '100',
    lineHeight: 10,
    letterSpacing: 1,
    paddingTop: 12,
    marginLeft: -10
  },
  label1: {
    fontFamily: 'Proxima-Nova-Regular',
    fontSize: 16,
    color: MS.Blue300,
    fontWeight: '100',
    lineHeight: 16,
    marginTop: -5,
    marginLeft: -10,
    paddingVertical: 5,
  },
  item: {
    flex: 1,
    borderBottomWidth: 0,
    marginBottom: 5
  },
  helper: {
    fontFamily: 'Proxima-Nova-Regular',
    fontSize: 14,
    color: MS.Red500,
    fontWeight: '100',
    marginTop: 5,
  },
  leftIcon: {
    color: MS.White,
    fontSize: 20,
    paddingBottom: 10,
    marginLeft: -5
  },
  content: {
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  password: {
    fontFamily: 'Proxima-Nova-Semibold',
    fontSize: 18,
    lineHeight: 18,
    color: 'white',
    fontWeight: '600',
    letterSpacing: 4,
    height: 35,
    alignItems: 'center',
  },
  forgotButton: {
    marginLeft: 'auto',
    marginBottom: 10
  },
});
