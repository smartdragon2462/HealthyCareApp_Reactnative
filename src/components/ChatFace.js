import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { S } from '../mainStyle';

export default function ChatFace({ data }) {
    const {user, Msg } = data;
    return (
        <View activeOpacity={0.8} underlayColor="transparent">
            <View style={styles.searchCard}>
                <View>
                    <Image source={user.photo} style={S.avatar32} resizeMode="contain" /> 
                </View>
                <View style={styles.userInfo_panel}>
                    <Text style={[S.ft12_G700, { marginTop: -5 }]}>{user.name}</Text>       
                    <Text style={S.ft12_G700}>{Msg. time}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    photo: {
        width: 40,
        height: 40,
        marginLeft: 0,
        marginTop: 0
      },
      searchCard: {
        width: '100%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 0
      },
      userInfo_panel: {
        marginLeft: 8,
        flex: 1
      },
});
