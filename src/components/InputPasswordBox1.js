import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Item, Input, Icon, Label } from 'native-base';
import { S } from '../mainStyle';
import * as MS from '../mainStyle';

export default function InputPasswordBox1({ leftIcon, labelText, helperText, onInputChange, txtValue }) {
  const [isFocus, setFocus] = useState(false);
  const [isVisible, setVisible] = useState(false);

  const handleBlur = () => {
    if (txtValue.length > 0) return;
    else setFocus(false);
  }

  return (
    <View style={styles.input_component}>
      <Item
        floatingLabel
        last
        style={[{ borderBottomWidth: 1, borderBottomColor: isFocus ? 'white' : MS.Blue300 }]}
      >
        <Icon style={[styles.icon, { opacity: isFocus ? 1 : 0.5 }]} name={leftIcon} type="MaterialCommunityIcons" />
        <Label style={styles.input_upper}>{isFocus ? labelText : " "}</Label>
        <Input
          style={[S.ft16S_W, { paddingLeft: 12, letterSpacing: !isFocus? 0 : isVisible? 0:4 }]}
          placeholder={isFocus ? " " : labelText}
          placeholderTextColor={MS.Blue300}
          secureTextEntry={!isVisible}
          value={txtValue}
          onChangeText={(ev) => { onInputChange(ev, "password") }}
          onFocus={() => setFocus(true)}
          onBlur={() => handleBlur()}
        />
        <Icon
          style={[styles.icon, !isFocus && { opacity: 0.5 }]}
          name={isVisible ? "eye-with-line" : "eye"}
          type="Entypo" 
          onPress={() => setVisible(!isVisible)}
        />
      </Item>
      <Label style={styles.input_helper}>{helperText}</Label>
    </View>
  );
}

const styles = StyleSheet.create({
  input_component: {
    marginTop: 5,
    width: '100%',
  },
  input_text: {
    fontSize: 16,
    color: 'white',
    lineHeight: 19,
    fontWeight: '600',
    letterSpacing: 4
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
  icon: {
    color: 'white',
    fontSize: 20,
    marginBottom:10
  }
});
