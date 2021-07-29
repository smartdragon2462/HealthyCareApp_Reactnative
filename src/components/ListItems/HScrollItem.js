import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Icon } from 'native-base';
import { S } from '../../mainStyle';
import * as MS from '../../mainStyle';

export default function HScrollItem(props) {
  const { item, onCancel } = props;
  return (
    <View style={{ marginVertical: 8 }}>
      <View style={{ padding: 3, margin: 7 }}>
        <Image source={item.photo} style={styles.avatar} resizeMode="contain" />
        <TouchableOpacity
          style={{ ...styles.closeBtn }}
          activeOpacity={0.5}
          onPress={() => onCancel(item)}
        >
          <Icon active name="close" type="AntDesign" style={styles.closeIcon} />
        </TouchableOpacity>
      </View>
      <Text style={S.ft10_G900, { marginTop: -10 }}>
        {item.name.replace(/(.{8})..+/, "$1...")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  closeBtn: {
    position: 'absolute',
    top: -7,
    right: -10,
    padding: 5,
    zIndex: 99,
    backgroundColor: 'transparent'
  },
  closeIcon: {
    fontSize: 13,
    padding: 2,
    backgroundColor: 'white',
    borderRadius: 50,
    color: MS.Gray800,

    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 32
  }
});
