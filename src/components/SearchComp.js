import React, { useState } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Icon, Input, Item } from 'native-base';
import { hideNavigationBar } from 'react-native-navigation-bar-color';
import { S } from '../mainStyle';
import * as MS from '../mainStyle';

export default function SearchComp(props) {
    const {onChangeText, searchTxt, placeholder, type} = props;
    const [focus, setFocus] = useState(false);

    return (
        <View style={[focus ? styles.outline : styles.noOutline]}>
            <StatusBar backgroundColor='transparent' barStyle = {type===1? "light-content":"dark-content"}/>
            
            <View style={ focus ? styles.inline : styles.noInline }>
                <Item style={{ ...styles.item, backgroundColor: focus ? 'white': MS.Gray200 }}>
                    <Icon name="ios-search" style={{ ...styles.searchIcon }} />
                    <Input
                        placeholder = {placeholder}
                        style = {{  ...styles.inputBox }}
                        placeholderTextColor = {MS.Gray600}
                        onChangeText = {val => onChangeText(val)}
                        underlineColorAndroid='transparent'
                        value = {searchTxt}
                        onFocus={() => setFocus(true)}
                        onBlur={() => { setFocus(false)}}
                    />
                </Item>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        marginLeft:0,
        height: 35, 
        borderRadius: 7, 
        paddingLeft: 10, 
        borderBottomWidth: 0 ,
        backgroundColor: MS.Gray200, 
    },
    inputBox: {
        fontFamily: 'Proxima-Nova-Regular', 
        fontWeight:'600',
        color: MS.Gray900,  
        fontSize: 16, 
        lineHeight: 19, 
    },
    searchIcon: {
        fontFamily: 'Proxima-Nova-Regular', 
        fontSize: 20, 
        lineHeight: 20, 
        fontWeight:'600',
        color: MS.Gray600, 
    },
    inline: {
        borderWidth: 1, 
        borderRadius: 8, 
        borderColor: MS.Blue300
    },
    noInline: {
        borderWidth: 1, 
        borderRadius: 8, 
        borderColor: MS.Gray200,
    },
    outline: {
        borderWidth: 2, 
        borderRadius: 10, 
        borderColor: MS.Blue100,
    },
    noOutline: {
        borderWidth: 2, 
        borderRadius: 10, 
        borderColor: MS.Gray200
    }
});
