import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Icon } from 'native-base';
import { S } from '../../mainStyle';
import * as MS from '../../mainStyle';

export default function CareTeamItem(props) {
  const { item, isChecked } = props;

  return (
    <View style={styles.item}>
      <View style={{ padding: 3 }}>
        <View style={S.avatarFrame}>
          <Image source={item.photo} style={S.avatar32} resizeMode="contain" />
        </View>
        {
          isChecked &&
          <View style={{ ...styles.checkMark, elevation: 3 }} >
            <Icon name="checkcircle" type="AntDesign" style={{ fontSize: 20, color: MS.Blue500 }} />
          </View>
        }
      </View>
      <View style={styles.userInfo_panel}>
        <View style={{ ...S.rowFlex, justifyContent: 'flex-start' }}>
          <Text style={S.ft16_G800}>{item.name}  </Text>
          <Text style={S.specialist}>{item.role}  </Text>
        </View>
        <Text style={{ ...S.ft10B_G500, marginTop: 3 }}>{"ID: "}{item.id}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  photo: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginLeft: 0,
    marginTop: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
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
    marginLeft: 16,
    width: '100%',
    flex: 1
  },
  checkMark: {
    position: 'absolute',
    right: -7,
    bottom: -1,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white'
  }
});
