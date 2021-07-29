// ***************************************************************************
//  @created Date:    02/08/2021 
//  @Update:  02/10/2021 
//  @author:  ClerkedApp team
//  @description:   A component to display an appointment in detail
// ***************************************************************************

import React from 'react';
import { View, Image, Text } from 'react-native';
import { User_img1 } from '../assets/images';
import { Caregiver_icon } from '../assets/icons';
import { S } from '../mainStyle';

export default function ApptDetailComp(props) {
    const { clients } = props;
    return (
        <View>
            {
                clients &&
                clients.map((item, i) =>
                    <View key={i} style={{ ...S.rowFlex_start, paddingVertical: 12 }} >
                        <Image source={User_img1} style={S.avatar32} resizeMode="contain" />
                        <View style={{ marginLeft: 16 }}>
                            <View style={{ ...S.rowFlex_start, alignItems: "flex-start" }}>
                                <View>
                                    <Text style={{ ...S.ft14B_G900, marginTop: 0, marginRight: 8 }}>{item.name}</Text>
                                    {
                                        !item.is_essential &&
                                        <Text style={{ ...S.ft10B_G500, marginTop: 5 }}>ID: {item.id}</Text>
                                    }
                                </View>
                                {
                                    item.is_essential ?
                                        <Image source={Caregiver_icon} style={{ ...S.mark_caregiver, marginTop: 2 }} resizeMode="contain" />
                                        :
                                        <Text style={S.patientType}>{"caregiver"}</Text>
                                }
                            </View>
                        </View>
                    </View>)
            }
        </View>
    );
}
