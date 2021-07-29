// ***************************************************************************
//  @Created Date:    1/15/2021
//  @Update:  2/4/2021
//  @author:  ClerkedApp team
//  @description:   A component for item in vertical scroll
// ***************************************************************************

import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Caregiver_icon, AvatarCheck_icon } from '../../assets/icons';
import { S } from '../../mainStyle';

export default function VScrollItem(props) {
  const { item, isChecked } = props;

  let type = 0;
  if (item.role === "") type = 0;
  else if (item.role === "doctor") type = 1;
  else if (item.role === "caregiver") type = 2;
  else type = 3;

  return (
    <View style={styles.item}>
      <View style={{ padding: 0 }}>
        <View style={[S.avatarFrame, isChecked && { elevation: 0 }]}>
          <Image source={item.photo} style={S.avatar32} resizeMode="contain" />
        </View>
        {
          isChecked &&
          <View style={{ ...styles.checkMark }} >
            <Image source={AvatarCheck_icon} style={{ width: 24, height: 24 }} resizeMode="contain" />
          </View>
        }
      </View>

      <View style={styles.userInfo_panel}>
        <View style={{ ...S.rowFlex, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ ...S.ft14_G900, marginRight: 8 }}>{item.name}</Text>
          {
            type === 1 ?
              <Image source={Caregiver_icon} style={S.mark_caregiver} resizeMode="contain" />
              :
              (type === 2 || type === 3) && <Text style={type === 3 ? S.specialist : S.patientType}>{item.role}</Text>
          }
        </View>
        <Text style={{ ...S.ft10B_G500, marginTop: 5 }}>ID: {item.id}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    height: 50,
    width: '100%',
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 0
  },
  userInfo_panel: {
    marginLeft: 10,
  },
  checkMark: {
    position: 'absolute',
    right: -7,
    bottom: -1,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: 'white',
  }
});
