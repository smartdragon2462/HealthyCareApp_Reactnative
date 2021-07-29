import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import { S } from '../mainStyle';

export default function Button({ caption, onClick, active }) {
    return (
        <TouchableHighlight activeOpacity={0.8} underlayColor="transparent" onPress={()=> onClick()}>    
            {/* <LinearGradient style={[styles.button]} colors={['#0066ff', '#0250c7']} >                            */}
            <View style={[styles.button, {backgroundColor: active? '#0066FF':'#E6E8EB'}]} >
                <Text style={[styles.caption, {color: active? '#FFFFFF':'#B3B9C2'}]}>{ caption }</Text>
            </View>
        </TouchableHighlight >
    );
}

const styles = StyleSheet.create({
    button:{
        width: '100%',
        paddingVertical: 14,
        borderRadius: 8,
        backgroundColor: '#0066FF',
        alignItems: 'center',
    },
    caption:{
        color: 'white',
        fontFamily: 'Proxima-Nova-Bold',
        fontSize: 16,
        lineHeight: 19,
        marginTop: 0
    },
});
