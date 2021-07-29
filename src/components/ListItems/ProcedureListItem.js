import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Bookmark_svg } from '../../assets/icons';
import { S } from '../../mainStyle';
import * as MS from '../../mainStyle';

export default function ProcedureListItem(props) {
    const { itemData } = props;
    return (
        <View style={styles.card}>
            <View style={[S.rowFlex, { alignItems: "flex-start" }]}>
                <Text style={[S.ft16S_G800, { lineHeight: 22, flex: 1 }]}>{itemData.title}</Text>
                <Bookmark_svg width={16} height={16} fill={itemData.isFlagged ? MS.Orange500 : MS.Gray600} />
            </View>
            <Text style={[S.ft12_G600, S.mt8]}>{itemData.createdDate}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        ...S.border,
        padding: 16,
        backgroundColor: "white",
        marginTop: 8,
        borderRadius: 8
    }
});
