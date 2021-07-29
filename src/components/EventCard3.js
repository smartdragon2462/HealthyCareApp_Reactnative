import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import SummaryImgs from './SummaryImgs';
import {S} from '../mainStyle';
import * as MS from '../mainStyle';

export default function EventCard3(props) {
  const { itemData } = props;
  let startTime = moment(itemData.slots[0].start_time).format("HH:mm");
  let endTime = moment(itemData.slots[itemData.slots.length-1].end_time).format("HH:mm");
  let date = moment(itemData.slots[0].start_time).format("DD MMM");

  return (
    <View style={styles.content}>
      <View style={styles.header}>    
        <Text style={S.ft16S_G100}>{"Today, "+date}</Text>                
        <Text style={[S.textFrame_Blue, S.ml8]}>{itemData.type}</Text>
      </View>
      <Text style={[S.ft14_G100, S.mt8]}>{startTime+" - "+endTime}</Text>

      <View style={styles.userPanel}> 
        <View style={styles.userInfo}> 
          {
            itemData.clients &&
              <SummaryImgs dataList={itemData.clients}/>        
          }                 
          {
            itemData.clients.length===1 &&
            <View style={{marginLeft: 16}}>           
              <Text style={S.ft14_B100}>{itemData.clients[0].name}</Text>
              <Text style={{...S.ft10B_B300, letterSpacing:1, marginTop:4}}>ID: {itemData.clients[0].id}</Text>
            </View>  
          }
          </View> 
        
        <View>           
          <Text style={styles.status}>START IN</Text>
          <Text style={styles.delayTime}>5 min</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    backgroundColor: MS.Blue500,
    elevation:2
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  userPanel:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:"center",
    marginTop: 16,
  },

  status: {
    fontFamily: 'Proxima-Nova-Regular',
    fontSize: 10,
    color: MS.Blue300,
    fontWeight: '600',
    lineHeight: 10,
    textTransform:'uppercase',
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
  userInfo:{
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
  },
});
