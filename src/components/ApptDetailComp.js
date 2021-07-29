// ***************************************************************************
//  @created Date:    1/15/2021 
//  @Update:  2/9/2021
//  @author:  ClerkedApp team
//  @description:   A component to display a new appt event. 
// ***************************************************************************

import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, TouchableHighlight, Image, Text } from 'react-native';
import { Icon } from 'native-base';
import SummaryImgs from '../components/SummaryImgs';
import VScrollItem from '../components/ListItems/VScrollItem';
import { Caregiver_icon, AddInvite_icon } from '../assets/icons';
import { S } from '../mainStyle';
import * as MS from '../mainStyle';

export default function ApptDetailComp(props) {
    const { data, children, onInvite, onRemove } = props;
    const { patient, caregiver, careteam } = data;

    const [isDetail, setDetail] = useState(false);

    //--------------------------------------------------------------
    const datalist = [];
    datalist.push(patient);
    if (caregiver && caregiver.length > 0) {
        for (let i = 0; i < caregiver.length; i++) datalist.push(caregiver[i]);
    }
    if (careteam && careteam.length > 0) {
        for (let i = 0; i < careteam.length; i++) datalist.push(careteam[i]);
    }

    //--------------------------------------------------------------
    let summaryName = "", isNewData = true, type = 0;
    if (patient && patient.role === "doctor") type = 1;
    else if (patient && patient.role === "caregiver") type = 2;

    if (patient.photo === null) {
        isNewData = false;
        summaryName = patient.name.toUpperCase().match(/\b\w/g).join('');
    }

    return (
        <View style={[S.card, S.ph16]}>
            {
                <View style={[styles.patientItem]}>
                    {
                        (isDetail || !isNewData) &&
                        <TouchableOpacity
                            style={styles.closeButton}
                            activeOpacity={0.5}
                            onPress={() => onRemove(1)}
                        >
                            <Icon name="close" type="AntDesign" style={styles.closeIcon} />
                        </TouchableOpacity>
                    }

                    {/*-----------------------------------------------------------------*/}
                    <View style={{ marginRight: 16, flex: 0 }}>
                        {
                            isNewData ?
                                (
                                    isDetail ?
                                        (
                                            <Image source={patient.photo} style={S.avatar32} resizeMode="contain" />
                                        )
                                        :
                                        (
                                            <View style={{ ...S.rowFlex_start }}>
                                                <TouchableOpacity
                                                    activeOpacity={0.5}
                                                    onPress={() => onInvite()}
                                                >
                                                    <Image source={AddInvite_icon} style={S.avatar32} resizeMode="contain" />
                                                </TouchableOpacity>
                                                <SummaryImgs dataList={datalist} />
                                            </View>
                                        )
                                )
                                :
                                (
                                    <View style={styles.summaryNameAvatar}>
                                        <Text style={styles.summaryName}>{summaryName}</Text>
                                    </View>
                                )
                        }
                    </View>

                    {/*-----------------------------------------------------------------*/}
                    <View style={{ ...S.rowFlex, flex: 1 }}>
                        <View style={{ ...S.rowFlex_start, flex: type === 1 ? 0.95 : 0.75 }}>
                            {
                                (isDetail || (!isDetail && !caregiver && !careteam)) &&
                                <View style={S.rowFlex_start}>
                                    <View style={S.rowFlex_start}>
                                        <View style={{ flex: 0 }}>
                                            <Text 
                                                numberOfLines={1} 
                                                ellipsizeMode="tail" 
                                                style={[S.ft14S_G800, S.mr16]}
                                            >
                                                {patient.name}
                                            </Text>
                                        </View>
                                        <View style={{ position: "absolute", right: type === 1 ? -8 : -50, top: type === 1 ? 2 : 1 }}>
                                            {
                                                type === 1 ?
                                                    <Image source={Caregiver_icon} style={S.mark_caregiver} resizeMode="contain" />
                                                    :
                                                    type === 2 && <Text style={S.patientType}>{patient.role}</Text>
                                            }
                                        </View>
                                    </View>
                                </View>
                            }
                        </View>
                        <View>
                            <TouchableOpacity
                                style={{ marginRight: -8 }}
                                activeOpacity={0.5}
                                onPress={() => setDetail(!isDetail)}
                            >
                                <Icon
                                    style={[styles.icon, !isDetail && { color: MS.Gray600 }]}
                                    name={isDetail ? "chevron-up" : "chevron-down"}
                                    type="MaterialCommunityIcons"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            }

            {
                isDetail &&
                <View>
                    {
                        isNewData ?
                            (
                                <View>
                                    <View style={styles.patientInfoItem}>
                                        <Text style={S.ft14_G600}>{"ID number"}</Text>
                                        <Text style={S.ft16_G800}>{patient.id}</Text>
                                    </View>
                                    <View style={styles.patientInfoItem}>
                                        <Text style={S.ft14_G600}>{"Gender"}</Text>
                                        <Text style={S.ft16_G800}>{patient.gender}</Text>
                                    </View>
                                    <View style={[styles.patientInfoItem, { borderRadius: 8 }]}>
                                        <Text style={S.ft14_G600}>{"Birthday"}</Text>
                                        <Text style={S.ft16_G800}>{patient.birthday}</Text>
                                    </View>
                                </View>
                            ) :
                            (
                                <View>
                                    <View style={styles.patientInfoItem}>
                                        <Text style={S.ft14_G600}>{"ID number"}</Text>
                                        <Text style={S.ft16_G800}>{patient.id}</Text>
                                    </View>
                                    <View style={styles.patientInfoItem}>
                                        <Text style={S.ft14_G600}>{"Hand phone number"}</Text>
                                        <Text style={S.ft16_G800}>{patient.phoneNum}</Text>
                                    </View>
                                </View>
                            )
                    }


                    {
                        ((caregiver && caregiver.length > 0) || (careteam && careteam.length > 0)) &&
                        <View style={styles.careteamPanel}>
                            {
                                caregiver && caregiver.length > 0 &&
                                <View style={{ paddingVertical: 8 }}>
                                    {
                                        caregiver.map((item, i) => (
                                            <View key={i} style={{ ...S.rowFlex_start }}>
                                                <TouchableOpacity
                                                    style={styles.closeButton}
                                                    activeOpacity={0.5}
                                                    onPress={() => onRemove(2, i)}
                                                >
                                                    <Icon active name="close" type="AntDesign" style={styles.closeIcon} />
                                                </TouchableOpacity>
                                                <VScrollItem item={item} isChecked={false} />
                                            </View>
                                        ))
                                    }
                                </View>
                            }

                            {
                                careteam && careteam.length > 0 &&
                                <View style={{ paddingVertical: 8 }}>
                                    <Text style={S.ft14_G700}>{"Care team"}</Text>
                                    {
                                        careteam.map((item, i) => (
                                            <View key={i} style={{ ...S.rowFlex_start }}>
                                                <TouchableOpacity
                                                    style={[styles.closeButton]}
                                                    activeOpacity={0.5}
                                                    onPress={() => onRemove(3, i)}
                                                >
                                                    <Icon active name="close" type="AntDesign" style={styles.closeIcon} />
                                                </TouchableOpacity>
                                                <VScrollItem item={item} isChecked={false} />
                                            </View>
                                        ))
                                    }
                                </View>
                            }

                            <View style={{ ...styles.inviteButton }}>
                                {
                                    children
                                }
                            </View>
                        </View>
                    }
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    patientItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: 'white',
        paddingVertical: 16,
    },

    patientInfoItem:
    {
        marginHorizontal: -16,
        padding: 16,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    icon: {
        fontSize: 35,
        color: MS.Blue500,
    },

    closeIcon: {
        fontSize: 13,
        padding: 3,
        color: MS.Gray600,
        backgroundColor: MS.Gray200,
        borderRadius: 50,
    },

    summaryNameAvatar: {
        borderRadius: 50,
        borderWidth: 1,
        backgroundColor: MS.Blue100,
        borderColor: 'white',
        alignItems: 'center',
        marginLeft: 16
    },
    summaryName: {
        fontFamily: 'Proxima-Nova-Semibold',
        fontWeight: 'normal',
        color: MS.Blue500,
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 17,
        width: 35,
        height: 35,
        paddingTop: 9,
    },
    careteamPanel: {
        borderTopColor: MS.Gray200,
        borderTopWidth: 1,
        marginTop: 16,
        paddingTop: 8,
        marginHorizontal: -16,
        paddingHorizontal: 16,
    },
    inviteButton: {
        borderTopColor: MS.Gray200,
        borderTopWidth: 1,
        marginHorizontal: -16,
        padding: 16,
        paddingLeft: 52
    }
});
