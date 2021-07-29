import React, { useState } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { Icon, Input, Item } from 'native-base';
import { S } from '../mainStyle';
import * as MS from '../mainStyle';
import { RECORD_SLIDER_DATA } from '../config/data';
import { RECORDS_ITEM_WIDTH, RECORDS_ITEM_SPACING } from '../config/theme'

export default function RecordsSlider(props) {
    const {active} = props
    return (
        <FlatList 
            data = {RECORD_SLIDER_DATA}
            keyExtractor={(item)=> item.id}
            horizontal
            snapToInterval={ RECORDS_ITEM_WIDTH+RECORDS_ITEM_SPACING }
            contentContainerStyle = {{ paddingRight: 24}}
            decelerationRate={'fast'}
            showsHorizontalScrollIndicator={false}
            renderItem={({item})=>{
                return (
                    <View style={[styles.itemContainer, {backgroundColor:"blue"}]}>
                        <Text style={active? S.ft12S_W:S.ft12S_G600}>{item.title}</Text>
                    </View>
                )
            }}
        >
            
        </FlatList>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: 'transparent', 
        height: 24, 
        padding: 8,
        borderRadius: 8, 
    },
});
