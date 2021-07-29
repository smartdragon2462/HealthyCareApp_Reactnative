import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { S } from '../../mainStyle';
import * as MS from '../../mainStyle';

export default function DetailPropertyItem(props) {
    const { IconComp, title, subtitle, count } = props;
    return (
        <View style={styles.item}>
            <View style={S.mr32}>
                <IconComp width={16} height={16} fill={MS.Blue500} />
            </View>
            <View style={{ ...S.mr16, flex: 1 }}>
                <View>
                    <View style={styles.titlePanel}>
                        <Text style={S.ft16S_G800}>{title}</Text>
                        <Text style={[S.ml8, S.ft10S_B500, styles.count, { paddingTop: 4 }]}>{count}</Text>
                    </View>
                    <Text style={[S.ft12_G700, S.mt8]}>{subtitle}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        display: "flex",
        flexDirection: 'row',
    },
    count: {
        backgroundColor: MS.Blue100,
        borderRadius: 20,
        paddingVertical: 1,
        paddingHorizontal: 4,
        paddingTop: 3
    },
    titlePanel: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }

});

