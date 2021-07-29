import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Input, Item } from 'native-base';
import { S } from '../mainStyle';

export default function SearchComp1(props) {
    const {onChangeText, searchTxt, placeholder} = props
    const [focus, setfocus] = useState(false);

    return (
        <View >
            <Item style={[styles.item, {backgroundColor: focus ? '#0047B3': '#0047B3'}]}>
                <Icon name="ios-search" style={[S.ft18B_G700, {color: '#80B3FF'}] } />
                <Input
                    placeholder= {placeholder}
                    style={[S.ft16_W]}
                    placeholderTextColor={'#80B3FF'}
                    onChangeText={val => onChangeText(val)}
                    value = {searchTxt}
                    onFocus={() => setfocus(true)}
                    onBlur={() => setfocus(false)}
                />
            </Item>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#0047B3', 
        borderRadius: 8, 
        paddingHorizontal: 16, 
        height: 35, 
        borderBottomWidth: 0,
    }
});
