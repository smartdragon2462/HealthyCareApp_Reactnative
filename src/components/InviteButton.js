import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View, Image} from 'react-native';
import { AddInvite_icon } from '../assets/icons';

export default function InviteButton(props) {
    const { onInvite, caption } = props;

    return (
        <TouchableHighlight  activeOpacity={0.9} underlayColor="transparent" onPress={ onInvite }>
            <View style={{ ...styles.button }}>
                <Image source={ AddInvite_icon} style={ styles.avatar } resizeMode="contain" /> 
                <Text style={{ ...styles.caption }}>{caption}</Text>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 32,
    },
    caption: {
        marginLeft: 16,
        width: "80%",
        fontFamily: 'Proxima-Nova-Regular',
        fontWeight:'normal',
        color: '#0066FF',
        fontSize: 14,
        lineHeight: 17,
    },
    button: { 
        width: "100%",
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent:'flex-start', 
        backgroundColor:"white", 
      }
});
