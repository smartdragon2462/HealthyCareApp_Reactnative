import React, { useState } from 'react';
import { StyleSheet, View, TouchableHighlight, Image, Text } from 'react-native';
import { Icon } from 'native-base';
import SummaryImgs from '../components/SummaryImgs';
import VScrollItem from '../components/ListItems/VScrollItem';
import { AddInvite_icon } from '../assets/icons';
import { S } from '../mainStyle';

export default function MtDetailComp( props ) {
    const { colleagues, onInvite, onRemove } = props;
    const [isDetail, setDetail] = useState(false);

    return (
        <View>
        {
          isDetail?
          (
            <View style={{...S.card, paddingHorizontal: 16 }}>
              {
                colleagues &&
                colleagues.map((item, i) => (
                  <View key={i} style={{ ...styles.collaspeItem }}>
                    <View style={{...S.rowFlex_start}}>
                      <TouchableHighlight style={ styles.closeItem } activeOpacity={0.8} underlayColor="transparent" onPress={()=> onRemove(2, i)} >
                        <Icon name="close" type="AntDesign" style={styles.selItemIcon} />
                      </TouchableHighlight> 
                      <View >
                        <VScrollItem item={item} isChecked={false}/>
                      </View>  
                    </View>  
                    {
                      i === 0 &&
                      <TouchableHighlight activeOpacity={0.6} underlayColor = 'transparent' onPress={() => setDetail(false)}>
                        <Icon style={{...styles.icon }} name="chevron-up" type="MaterialCommunityIcons" />
                      </TouchableHighlight>
                    }
                  </View>  
                ))
              }
              <View style={styles.inviteButton}>
                {props.children}
              </View> 
            </View> 
          )
          :
          (            
            <View style={{ ...styles.colleagueGroup }}>
              <View style={{...S.rowFlex_start}}>
                <TouchableHighlight activeOpacity={0.8} underlayColor="transparent" onPress={()=>onInvite()}>
                  <Image source={ AddInvite_icon} style={ S.avatar32 } resizeMode="contain" /> 
                </TouchableHighlight> 
                <SummaryImgs dataList = {colleagues} />
              </View>
              <TouchableHighlight activeOpacity={0.8} underlayColor = 'transparent' onPress={() => setDetail(true)}>
                <Icon style={{...styles.icon, color:"#99A1AD"}}  name="chevron-down" type="MaterialCommunityIcons" />
              </TouchableHighlight>
            </View>
          )
        }            
    </View>         
    );
}

const styles = StyleSheet.create({
  collaspeItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'white', 
    marginHorizontal: -16,
    padding: 16,
    paddingVertical: 8,
    justifyContent:'space-between', 
  },
    colleagueGroup: {
      display: 'flex', 
      flexDirection: 'row', 
      alignItems:'center', 
      justifyContent:'space-between', 
      // margin:1, 
      padding:16, 
      backgroundColor:'white', 
      borderRadius: 8, 

      borderWidth: 1,
      borderColor: 'rgba(0, 71, 179, 0.03)'
      // shadowColor: '#000',
      // shadowOffset: { width: 5, height: 1 },
      // shadowOpacity: 0.5,
      // shadowRadius: 2,  
      // elevation: 1,
    },

    closeItem: {
      marginRight: 16
    },

    selItemIcon: {
      fontSize: 13,
      padding: 3,
      color: '#99A1AD',
      backgroundColor: '#F2F3F4',
      borderRadius: 50,
        // shadowColor: '#000',
        // shadowOffset: { width: 2, height: 2 },
        // shadowOpacity: 1,
        // shadowRadius: 5,  
        // elevation: 15,

    },

    Card: {
      backgroundColor: 'white', 
      borderRadius: 8, 
      marginHorizontal:1, 
      shadowColor: '#000',
      shadowOffset: { width: 5, height: 1 },
      shadowOpacity: 0.5,
      shadowRadius: 2,  
      elevation: 2,
     },
    userPhotos:{
        display: 'flex',
        flexDirection: 'row',
        paddingLeft:25,
        alignItems:'center'
    },

    inviteButton: {
      borderTopColor:'#F2F3F4', 
      borderTopWidth:1, 
      marginHorizontal: -16, 
      padding: 16, 
      paddingLeft: 55
    },

    userInfo_panel:{
        marginLeft: 5,
    },

    icon: {
        fontSize: 35,
        color: '#0066FF',
        marginRight:-8, 
    },

    emptyPhoto:{
        width:35,
        height: 35,
        borderRadius: 40,
        backgroundColor: '#ECF8FF',
        borderColor: 'white',
        borderWidth: 2,
        marginLeft: -15,
    },

    userCount: {
        fontFamily: 'Proxima-Nova-Bold',
        fontSize: 12,
        lineHeight: 16,
        color: '#0066FF',
        textAlign: 'center',
        alignItems: 'center',
        marginTop:7
      },
});
