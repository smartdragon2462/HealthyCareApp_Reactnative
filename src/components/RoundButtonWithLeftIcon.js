// ***************************************************************************
//  @created Date:    03/25/2021 
//  @Update:  03/25/2021 
//  @author:  ClerkedApp team
//  @description:   A component to round button
// ***************************************************************************

import React from 'react';
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';
import {  ArrowDown_svg } from '../assets/icons';
import { S } from '../mainStyle';
import * as MS from '../mainStyle';

export default function RoundButtonWithLeftIcon( props ) {
    const { caption, onClick, index } = props;  
    let orangeList = ["possible","refuted","entered in error"];
    let color = "", bgColor = "";
    if ( caption.toLowerCase() === "active" ) {color = MS.Green500, bgColor = MS.Green100 }
    else if ( caption.toLowerCase() === "inactive" ) {color = MS.Red500, bgColor = MS.Red100 }
    else if ( caption.toLowerCase() === "confirmed" ) {color = MS.Blue500, bgColor = MS.Blue100 }
    else if ( orangeList.includes(caption.toLowerCase())) {color = MS.Orange500, bgColor = MS.Orange100 }

    return (
        <TouchableHighlight activeOpacity = {0.8} underlayColor = "transparent" onPress = { () => onClick(index) }>
            <View style = {[ S.rowFlex_start, styles.frame, { backgroundColor:bgColor, alignSelf:"flex-start" } ]} >
                <Text style={[styles.caption, S.mr8, {color}]}>{caption}</Text>
                <ArrowDown_svg width={10} height={10} fill={color}/>
            </View>
        </TouchableHighlight>               
    );
}

const styles = StyleSheet.create({
    frame: {
        backgroundColor: "gray",
        borderRadius: 16,
        paddingVertical: 4,
        paddingHorizontal: 8,
    }, 
    caption: {
        fontFamily: 'Proxima-Nova-Semibold',
        fontWeight:"600",
        fontSize: 14,
        color: "black",       
        textTransform: "capitalize",
    }
});
