// ***************************************************************************
//  @Created Date: 04/06/2021.
//  @Update:  04/06/2021.
//  @author:  ClerkedApp team.
//  @description:   A component for item of medication list.
// ***************************************************************************

import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import moment from 'moment';
import Progressbar from '../Progressbar';
import { Bookmark_svg } from '../../assets/icons';
import { Doc_img4 } from '../../assets/images';
import { S } from '../../mainStyle';
import * as MS from '../../mainStyle';


export default function MedicationListItem(props) {
    const { itemData } = props;
    let leftDays = 0, percent = 0;
    if (itemData.expireDate) {
        leftDays = moment(itemData.expireDate).startOf('day').diff(moment().startOf('day'), 'days');
        let totalDays = Math.abs(moment(itemData.createdDate).startOf('day').diff(moment(itemData.expireDate).startOf('day'), 'days'));
        percent = Math.floor((totalDays - leftDays) * 100 / totalDays);
        if (leftDays < 0) {
            leftDays = 0; percent = 100
        }
    }

    return (
        <View style={styles.card}>
            <View style={styles.markIcon}>
                <Bookmark_svg width={16} height={16} fill={itemData.isFlagged ? MS.Orange500 : MS.Gray600} />
            </View>
            <View>
                {
                    itemData && itemData.asneedObj.flag &&
                    <Text style={[S.textFrame_Blue, { alignSelf: "flex-start" }]}>{"As needed"}</Text>
                }
                {
                    itemData &&
                    <View style={[S.rowFlex_start, { marginTop: 4 }]}>
                        {
                            itemData.prescribed.picture &&
                            <Image source={Doc_img4} style={[S.avatar16, S.mr8]} resizeMode="contain" />
                        }
                        <Text style={[S.ft16S_G800, { lineHeight: null }]}>{itemData.title}, {itemData.form.concentration}</Text>
                    </View>
                }
                <View>
                    {
                        itemData && itemData.dosageAndtimeList &&
                        itemData.dosageAndtimeList.map((item, index) => {
                            let timeText = item.usage_time + " " + item.usage_duration;
                            if (item.usage_duration.toLowerCase() === "time of day") {
                                timeText = "at " + item.usage_time;
                            } else if (item.usage_duration.toLowerCase() === "hourly") {
                                let time = parseInt(item.usage_time.replace('h', ''));
                                if (time <= 1) timeText = "every " + time + " hour";
                                else timeText = "every " + + time + " hours";
                            }
                            return (
                                <Text key={index} style={[S.ft14_G600,{marginTop:4}]}>
                                    {item.dosage}, {timeText}
                                </Text>
                            )
                        })
                    }
                </View>
            </View>
            <View style={S.mt8}>
                <Text style={[S.ft14_B500, { alignSelf: "flex-end" }]}>{leftDays} {leftDays <= 1 ? "day left" : "days left"}</Text>
                <View style={S.mt8}>
                    <Progressbar percent={percent} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        ...S.border,
        backgroundColor: "white",
        padding: 16,
        borderRadius: 8,
        marginTop: 8,
    },
    markIcon: {
        position: 'absolute',
        top: 16,
        right: 16
    }
});
