import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { GreenOnline_icon } from '../assets/icons';
import { S } from '../mainStyle';

export default function MsgItemComp(props) {
    const {data, isBorder } = props
    const {user, Msg, groupType, isOnline } = data;

    let nameStyle, msgTxtStyle, timeStyle ;
    if(Msg.unReadCount>0){
        nameStyle = S.ft16B_G900;
        msgTxtStyle = S. ft14B_G900;
        timeStyle = S.ft10_B500;
    }else{
        nameStyle = S.ft16_G800;
        msgTxtStyle = S.ft14_G600;
        timeStyle = S.ft10;
    }

    let isPatient = false;
    if(user.role === "patient" || user.role === "doctor") isPatient = true;

    return (
        <View style={styles.card}>
            <View style={styles.content}>
                <View style={{ paddingVertical:16 }}>
                    <Image source={user.photo} style={ S.avatar48 } resizeMode="contain" />
                    {
                        isOnline &&
                        <Image source={GreenOnline_icon} style={styles.onlineMark} resizeMode="contain" />
                    }   
                </View>
                <View style={[styles.userInfo_panel]}>
                    <View style={S.rowFlex}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={[nameStyle, { marginTop: -5 }]}>{user.name}  </Text>
                            {
                                !isPatient &&
                                <Text style={ S.specialist }>{ user.role }</Text>
                            }
                        </View>
                        <Text style={timeStyle}>{Msg. time}</Text>
                    </View>
                    <Text style={[S.ft10B_G500]}>ID: {user.id}</Text>
                    <View style={[S.rowFlex, {marginTop: 8}]}>
                        <Text style={msgTxtStyle}>{Msg.txt}</Text>
                        {   
                        Msg.unReadCount>0 &&
                        <View style={styles.msgCount}>
                            <Text style={[S.ft10, {color: 'white'}]}>{Msg.unReadCount}</Text>
                        </View>
                        }
                        
                    </View>
                </View>
            </View>
            {isBorder&& <View style={styles.spliteLine}></View>}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        backgroundColor: '#FAFAFB',
        // paddingHorizontal:24        
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // borderBottomColor: '#F2F3F4',
    },
    userInfo_panel: {
        marginLeft: 10,
        width: '100%',
        flex: 1
    },

    msgCount: {
        backgroundColor:'#0066FF',
        borderRadius: 50,     
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    onlineMark:{
        width: 16,
        height: 16,
        position: 'absolute',
        right: -2,
        bottom: 18
    },
    spliteLine:{
        borderBottomWidth:1, 
        marginLeft:58, 
        borderBottomColor:"#E6E8EB"
      }
});
