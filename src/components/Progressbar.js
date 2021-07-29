// ***************************************************************************
//  @Date:    04/06/2021: 
//  @Update:  04/06/2021: 
//  @author:  ClerkedApp team: 
//  @description: component for progressbar. 
// ***************************************************************************

import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as MS from '../mainStyle';

export default function Progressbar(props) {
    const {percent=0, color=MS.Blue500, bgColor=MS.Blue100 } = props;
    return (
        <View style={{width:"100%"}}>
            <View style={[styles.progressbar, { backgroundColor:bgColor }]}>
                <View style={[styles.progressbar, {width:String(percent)+'%', backgroundColor:color}]}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    progressbar: {
        height:6, 
        borderRadius:32, 
    },
});
