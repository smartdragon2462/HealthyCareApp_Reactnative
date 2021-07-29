import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { S } from '../../mainStyle';

export default function ContactItem({ userData }) {
    return (
        <View style={styles.item}>
            <View>
                <Image source={userData.photo} style={S.avatar32} resizeMode="contain" />
            </View>
            <View style={styles.userInfo_panel}>
                <Text style={S.ft14_G900}>{userData.name}  </Text>
                <Text style={[S.ft10B_G500, { marginTop: 3 }]}>{"ID: "}{userData.id}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        height: 32,
        width: '100%',
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8
    },
    userInfo_panel: {
        marginLeft: 10,
        width: '100%',
        flex: 1
    },

});
