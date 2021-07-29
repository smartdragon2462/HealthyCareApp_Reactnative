// ***************************************************************************
//  @Date:    1/10/2021: 
//  @Update:  2/19/2021
//  @author:  ClerkedApp team: 
//  @description: component for header. 
// ***************************************************************************

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Left, Right, Button, Body } from 'native-base';
import { ArrowLeft_svg } from '../assets/icons';
import { S } from '../mainStyle';
import * as MS from '../mainStyle';

export default function HeaderComp(props) {
  const { leftText, rightText, onBackpage, onSave, active, background, isBorder = false, children } = props;
  return (
    <Header noShadow style={{ ...styles.header, backgroundColor: background ? background:MS.Gray100, borderBottomColor: isBorder ? MS.Gray300:"transparent"}}>
      <Left style={{ flex: 0 }}>
        <Button transparent onPress={() => onBackpage()}>
          <ArrowLeft_svg width={16} height={16} fill={"#000000"} />
        </Button>
      </Left>
      <Body style={{ flex: 2 }}>
        <View style={{ width: "100%", alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ ...S.ft14B_G800, textTransform:"capitalize" }}>{leftText}</Text>
        </View>
      </Body>
      <Right style={{ flex:0 }}>
        <Button transparent onPress={() => onSave()} disabled={!active}>
          <View style={S.rowFlex_start}>
            <Text style={[S.ft12_B500, !active && { color:MS.Gray400 }]}>{rightText}</Text>
            {
              children
            }
          </View>
        </Button>
      </Right>
    </Header>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    height: 48
  }
});
