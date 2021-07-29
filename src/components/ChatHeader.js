import React from 'react';
import { StyleSheet, TouchableHighlight, Image, Text, View } from 'react-native';
import { GreenOnline_icon, Phone_svg, CameraOn_svg,  ArrowLeft_svg, ThreeDot_svg } from '../assets/icons';
import { S } from '../mainStyle';


export default function ChatHeader(props) {
  const { selectedUser, onclickMoreinfo, onclickVideoChat, onBack } = props;
  const { user, isOnline } = selectedUser;
  return (
    <View style={styles.chatHeader}>
      <View style={styles.info_panel}>
        <View>
          <View style={styles.userinfo}>
            <TouchableHighlight style={{ paddingRight: 16, paddingVertical: 8}} activeOpacity={0.6} underlayColor='transparent' onPress={() => onBack()}>
              <ArrowLeft_svg width={16} height={16} fill={"#1A2C47"} />
            </TouchableHighlight>
            <View>
              <Image source={user.photo} style={ S.avatar32 } resizeMode="contain" />
              {
                isOnline &&
                <Image source={GreenOnline_icon} style={styles.onlineMark} resizeMode="contain" />
              }
            </View>
            <View style={styles.userInfo_panel}>
              <Text style={S.ft16_G800}>{user.name}  </Text>
              <Text style={[S.ft10B_G500, { marginTop: 5, color:"#99A1AD" }]}>ID: {user.id}</Text>
            </View>
          </View>
        </View>
        <View style={[S.rowFlex, {marginRight:-10}]}>
          <TouchableHighlight style={{ padding:8 }} 
            activeOpacity={0.6} 
            underlayColor='transparent' 
            onPress={() => onclickVideoChat()}
          >
            <Phone_svg width={16} height={16} fill={"#0066FF"} />
          </TouchableHighlight>
          <TouchableHighlight style={{ padding:8 }} 
            activeOpacity={0.6} 
            underlayColor='transparent' 
            onPress={() => onclickVideoChat()}
          >
            <CameraOn_svg width={16} height={16} fill={"#0066FF"} />
          </TouchableHighlight>
          <TouchableHighlight style={{ padding:8 }} 
            activeOpacity={0.6} 
            underlayColor='transparent' 
            onPress={() => onclickMoreinfo()}
          >
            <ThreeDot_svg width={16} height={16} fill={"#0066FF"} />
          </TouchableHighlight>
        </View>
      </View>
      {
        props.children
      }
    </View>
  );
}

const styles = StyleSheet.create({
  chatHeader: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    borderBottomWidth:1,
    borderBottomColor: "#E6E8EB",
    // height: 190,
  },
  userInfo_panel: {
    marginLeft: 16
  },

  userinfo: {
    width: '100%',
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineMark: {
    width: 10,
    height: 10,
    position: 'absolute',
    right: 0,
    bottom: 0
  },
  photo: {
    width: 55,
    height: 55,
    borderWidth: 0,
    borderRadius: 100,
    borderColor: 'white',
    marginLeft: -10,
    marginTop: 10
  },
  info_panel: {
    padding: 24,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  icon: {
    width: 16,
    height: 16,
  },

  infoIcon: {
    fontSize: 25,
    color: 'white'
  },

  controlItemImg: {
    width: 42,
    height: 42,
  }
});
