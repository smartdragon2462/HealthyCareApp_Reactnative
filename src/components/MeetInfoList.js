// ***************************************************************************
//  @created Date:    02/09/2021 
//  @Update:  03/03/2021 
//  @author:  ClerkedApp team
//  @description:   A component to display an meeting client in detail
// ***************************************************************************

import React from 'react';
import { StyleSheet, View } from 'react-native';
import MeetInfoListItem from '../components/ListItems/MeetInfoListItem';
import { S } from '../mainStyle';

export default function MeetInfoList(props) {
    const { clients } = props;

    return (
        <View>
        {
            clients &&
            clients.map((item, i) =>
            (
                <View key={i} style={{ ...S.rowFlex, paddingVertical: 12 }}>
                    <MeetInfoListItem item={item} />
                </View>
            ))
        }
        </View>
    );
}

