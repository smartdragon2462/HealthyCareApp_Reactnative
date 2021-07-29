// ***************************************************************************
//  @Date:    03/25/2021: 
//  @Update:  03/25/2021: 
//  @author:  ClerkedApp team: 
//  @description: component for header. 
// ***************************************************************************

import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { PDF_svg, Sucess_svg, Refresh_svg } from '../assets/icons';
import { Progressbar } from './Progressbar';
import { S } from '../mainStyle';
import * as MS from '../mainStyle';

export default function UploadPdfProgressBar(props) {
    const { name, size, percent, isError } = props;

    let progressColor = "", progressbarBgColor = "", RightIcon = null;
    if (percent < 100) { progressColor = MS.Blue500, progressbarBgColor = MS.Blue100, RightIcon = null }
    else if (percent === 100) { progressColor = MS.Green500, progressbarBgColor = MS.Green100, RightIcon = Sucess_svg }
    if (isError) { progressColor = MS.Red500, progressbarBgColor = MS.Red100, RightIcon = Refresh_svg }


    return (
        <View style={[S.rowFlex_start, S.pd16]}>
            <View style={{ marginTop: -15 }}>
                <PDF_svg width={16} height={16} fill={MS.Red500} />
            </View>
            <View style={[S.ml16, { flex: 1 }]}>
                <View style={[S.rowFlex, { alignItems: "center" }]}>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={[S.ft16_G800, { flex: 1 }]}>{name}</Text>
                    <Text style={S.ft12_G600}>{percent}%</Text>
                </View>
                <View style={S.mt8}>
                    <Progressbar percent={percent} bgColor={progressbarBgColor} color={progressColor}/>
                </View>
                {/* <View style={{width:"100%", marginTop:8 }}>
                    <View style={[styles.progressbar, { backgroundColor:progressbarBgColor }]}>
                        <View style={[styles.progressbar, {width:String(percent)+'%', backgroundColor:progressColor}]}/>
                    </View>
                </View> */}
            </View>
            <View style={{ width: 40 }}>
                {
                    RightIcon &&
                    <View style={styles.rightIcon}>
                        <RightIcon width={24} height={24} fill={progressColor} />
                    </View>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    // progressbar: {
    //     height: 6,
    //     borderRadius: 32,
    // },
    rightIcon: {
        borderRadius: 50,
        backgroundColor: "white",
        alignSelf: "flex-end"
    }
});

