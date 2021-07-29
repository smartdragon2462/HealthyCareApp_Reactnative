import React from 'react';
import { Text, TouchableOpacity, TouchableHighlight, View } from 'react-native';
import { Add_svg } from '../assets/icons';
import { S } from '../mainStyle';
import * as MS from '../mainStyle';

export default function AddNewButton(props) {
    const { onAddNew } = props;

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => onAddNew()}
        >
            <View style={S.rowFlex_start}>
                <Text style={[S.ft16S_B500, S.mr8, { lineHeight: null }]}>{"Add new"}</Text>
                <Add_svg width={16} height={16} fill={MS.Blue500} />
            </View>
        </TouchableOpacity>
    );
}
