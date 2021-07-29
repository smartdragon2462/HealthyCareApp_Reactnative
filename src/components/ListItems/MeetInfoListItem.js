// ***************************************************************************
//  @created Date:    02/09/2021 
//  @Update:  03/03/2021 
//  @author:  ClerkedApp team
//  @description:   A component to display an meeting clients in detail
// ***************************************************************************

import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Doc_img3 } from '../../assets/images';
import { S } from '../../mainStyle';
import * as MS from '../../mainStyle';

export default function MeetInfoListItem(props) {
  const { item } = props;

  let BgColor = "black", ForeColor = "black";
  if (item.invitation_status === "Confirmed") { BgColor = MS.Blue100, ForeColor = MS.Blue500 }
  else if (item.invitation_status === "Declined") { BgColor = "#FFE2DF", ForeColor = "#FF1900" }
  else if (item.invitation_status === "Pending confirmation") { BgColor = "#FFF3E3", ForeColor = "#FF9500" }

  return (
    <View style={styles.item}>
      <View style={{ padding: 0 }}>
        <View style={S.avatarFrame}>
          <Image source={Doc_img3} style={S.avatar32} resizeMode="contain" />
        </View>
      </View>

      <View style={{ marginLeft: 16 }}>
        <View style={{ ...S.rowFlex, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ ...S.ft14_G900, marginRight: 8 }}>{item.name}</Text>
          <Text style={{ ...styles.status, backgroundColor: BgColor, color: ForeColor }}>{item.invitation_status}</Text>
        </View>
        <Text style={{ ...S.ft10B_G500, marginTop: 5 }}>ID: {item.id}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  status: {
    fontFamily: 'Proxima-Nova-Bold',
    fontSize: 10,
    color: MS.Blue500,
    backgroundColor: MS.Blue100,
    textTransform: "capitalize",
    borderRadius: 16,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
});
