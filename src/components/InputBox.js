import React, { useState } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { Input, Label } from 'native-base';
import { S } from '../mainStyle';

export default function InputBox(props) {
    const { name, autoCorrect, labelText, helperText, value, placeholder, onChange, KeyboardType, type } = props;
    const [isActive, setIsActive] = useState(false);
    let outborder, inborder;
    let isError = helperText ? true : false;

    if (isActive && !isError) {
        outborder = styles.focus_outline;
        inborder = styles.focus_inline;
    }
    else if (isError) {
        outborder = styles.focus_errorOutline;
        inborder = styles.focus_errorinline;
    }
    else if (!isActive) {
        outborder = styles.focus_noOutline;
        inborder = styles.focus_noInline;
    }

    return (
        <View style={{flex:1}}>
            <StatusBar backgroundColor='transparent' barStyle={type === 1 ? "light-content" : "dark-content"} />
            <View style={outborder}>
                <View style={inborder}>
                    <View style={styles.item}>
                        {
                            value.length > 0 &&
                            <Text style={[styles.upperTxt, , !isActive && { color: "#B3B9C2" }]}>{labelText}</Text>
                        }
                        <Input
                            autoCorrect={autoCorrect}
                            placeholder={placeholder}
                            style={[S.ft16_G900, { color: '#33435C', paddingVertical: 0 }]}
                            placeholderTextColor={'#99A1AD'}
                            keyboardType={KeyboardType}
                            onChangeText={val => onChange(name, val)}
                            onFocus={() => setIsActive(true)}
                            value={value}
                            onBlur={() => { setIsActive(false) }} //hideNavigationBar()
                        />
                    </View>
                </View>
            </View>
            {
                isError &&
                <Label style={styles.input_helper}>{helperText}</Label>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    focus_outline: {
        borderWidth: 2,
        borderRadius: 11,
        borderColor: '#E6F0FF',
    },
    focus_noOutline: {
        // margin: 1,
        borderWidth: 2,
        borderRadius: 11,
        borderColor: 'rgba(0, 71, 179, 0.0)',
        opacity: 0.8,
    },
    focus_inline: {
        borderWidth: 1,
        borderRadius: 9,
        borderColor: '#80B3FF'
    },
    focus_noInline: {
        borderWidth: 1,
        borderRadius: 9,
        borderColor: 'rgba(0, 71, 179, 0.03)',
    },
    focus_errorOutline: {
        borderWidth: 3,
        borderRadius: 11,
        borderColor: '#FFE2DF',
    },
    focus_errorinline: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#FF1900'
    },
    input_helper: {
        fontSize: 12,
        color: '#FF1900',
        lineHeight: 18,
        marginTop: 2,
        marginLeft: 3,
        fontWeight: '600',

    },
    item: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginLeft: 0,
        padding: 0,
        paddingHorizontal: 10,
        height: 45,
        borderBottomWidth: 0,

    },
    upperTxt: {
        fontFamily: 'Proxima-Nova-Bold',
        fontSize: 10,
        lineHeight: 12,
        letterSpacing: 1,
        textTransform: 'uppercase',
        color: '#0066FF',
        marginTop: 5,
        marginLeft: 5,
        padding: 0
    }
});


