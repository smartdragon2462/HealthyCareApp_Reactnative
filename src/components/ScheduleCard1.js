// ***************************************************************************
//  @Created Date:    12/20/2020 
//  @Update:  03/04/2021
//  @author:  ClerkedApp team
//  @description: schedule card component
// ***************************************************************************

import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import moment from 'moment';
import SummaryImgs from '../components/SummaryImgs';
import { S } from '../mainStyle';
import * as MS from '../mainStyle';

export default function ScheduleCard1(props) {
  const { itemData, isComplete, onClick } = props;

  let startTime = moment(itemData.slots[0].start_time).format("HH:mm");
  let endTime = moment(itemData.slots[itemData.slots.length - 1].end_time).format("HH:mm");
  let leftBarColor = "", color = "", backgroundColor = "";
  let statusStr = itemData.type;

  if (isComplete) {
    leftBarColor = MS.Blue100, color = MS.Blue500; backgroundColor = MS.Blue100; statusStr = "Completed";
  }
  else {
    if (itemData.status.toLowerCase() === "pending confirmation") {
      statusStr = itemData.status, leftBarColor = color = MS.Orange500; backgroundColor = MS.Orange100;
    }
    else if (itemData.type.toLowerCase() === "meeting") { leftBarColor = color = MS.Cyan500; backgroundColor = MS.Cyan100 }
    else if (itemData.type.toLowerCase() === "appointment") { leftBarColor = color = MS.Blue500; backgroundColor = MS.Blue100 }
  }

  return (
    <TouchableHighlight style={{ flex: 1 }} activeOpacity={0.8} underlayColor='transparent' onPress={() => onClick(itemData)}>
      <View>
        <View style={styles.card}>
          <View>
            <View style={{ ...styles.leftBar, backgroundColor: leftBarColor }}></View>
          </View>

          <View style={styles.content}>
            <View style={S.rowFlex_start}>
              <Text style={S.ft14_G900}>{startTime + " - " + endTime}</Text>
              <Text style={[styles.type, { color, backgroundColor }]}>{statusStr}</Text>
            </View>

            <View style={styles.userPanel}>
              {
                itemData.clients &&
                <SummaryImgs dataList={itemData.clients} color={color} />
              }
              {
                itemData.clients.length === 1 &&
                <View style={S.ml16}>
                  <Text style={S.ft14_G900}>{itemData.clients[0].name}</Text>
                  <Text style={{ ...S.ft10B_G500, letterSpacing: 1, marginTop: 4 }}>ID: {itemData.clients[0].id}</Text>
                </View>
              }
            </View>
          </View>
        </View>
        {
          props.children
        }
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    backgroundColor: "white",
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 8,
    padding: 8,

    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(0, 71, 179, 0.02)'
  },
  leftBar: {
    flex: 1,
    width: 4,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: "center"
  },
  type: {
    fontFamily: 'Proxima-Nova-Semibold',
    textTransform: "capitalize",
    fontWeight: "600",
    fontSize: 10,
    lineHeight: 10,
    borderRadius: 16,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginLeft: 8,
  },
  userPanel: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 17,
    marginBottom: 1,
  },
});
