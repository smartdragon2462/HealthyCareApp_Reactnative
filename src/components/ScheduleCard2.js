import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import SummaryImgs from '../components/SummaryImgs';
import { S } from '../mainStyle';
import * as MS from '../mainStyle';

export default function ScheduleCard2(props) {
  const { itemData } = props;
  let startTime = moment(itemData.slots[0].start_time).format("HH:mm");
  let endTime = moment(itemData.slots[itemData.slots.length - 1].end_time).format("HH:mm");

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.timeRange}>
            <Text style={S.ft14S_G100}>{startTime + " - " + endTime}</Text>
            <Text style={[S.textFrame_LBlue, S.ml8]}>{itemData.type}</Text>
          </View>
        </View>

        <View style={styles.userPanel}>
          <View style={styles.userInfo}>
            {
              itemData.clients &&
              <SummaryImgs dataList={itemData.clients} />
            }
            {
              itemData.clients.length === 1 &&
              <View style={{ marginLeft: 16 }}>
                <Text style={S.ft14_B100}>{itemData.clients[0].name}</Text>
                <Text style={{ ...S.ft10B_B100, letterSpacing: 1, marginTop: 4 }}>ID: {itemData.clients[0].id}</Text>
              </View>
            }
          </View>

          <View>
            <Text style={styles.status}>START IN</Text>
            <Text style={styles.delayTime}>5 min</Text>
          </View>
        </View>
      </View>
      {
        props.children
      }
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    backgroundColor: MS.Cyan500,

    // borderBottomWidth:2, 
    // borderTopWidth:1, 
    // borderLeftWidth:1,
    // borderRightWidth:1,
    // borderColor: 'rgba(0, 71, 179, 0.03)'
    elevation: 2
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeRange: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },

  userPanel: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    marginTop: 16,
  },

  status: {
    fontFamily: 'Proxima-Nova-Regular',
    fontSize: 10,
    color: MS.Cyan300,
    fontWeight: '600',
    lineHeight: 10,
    textTransform: 'uppercase',
  },
  delayTime: {
    fontFamily: 'Proxima-Nova-Semibold',
    fontSize: 14,
    color: MS.Gray100,
    fontWeight: '600',
    lineHeight: 14,
    letterSpacing: 1,
    marginTop: 5,
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
