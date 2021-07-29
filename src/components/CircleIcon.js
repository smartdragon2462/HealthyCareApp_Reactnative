import React from 'react';
import { View, Text } from 'react-native';
import { S } from '../mainStyle';
import * as MS from '../mainStyle';

export default function CircleIcon(props) {
    const { SVGIcon, bottomTxt, fillcolor = MS.Blue500, frameBGcolor = MS.Blue100, textStyle = S.ft12S_G800 } = props
    return (
        <View style={{ alignItems: 'center', width: 76 }}>
            <View style={[S.iconFrame, { backgroundColor: frameBGcolor }]}>
                <SVGIcon width={16} height={16} fill={fillcolor} />
            </View>
            <Text style={[textStyle, S.mt8, { textAlign: "center" }]}>{bottomTxt}</Text>
        </View>
    );
}