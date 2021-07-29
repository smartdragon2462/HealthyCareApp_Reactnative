// ***************************************************************************
//  @Created Date: 03/09/2021 
//  @Update:  03/09/2021 
//  @author:  ClerkedApp team
//  @description:   A screen for Settings
// ***************************************************************************

import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, StatusBar, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Container, Content, Button, Icon } from 'native-base';
import { hideNavigationBar, showNavigationBar } from 'react-native-navigation-bar-color';
import { Calendar_svg, User_svg, Padlock_svg, Security_svg, Send_svg, Switch_svg, Notification_svg, Preferences_svg, Leave_svg, ArrowRight_svg } from '../../assets/icons';
import { S } from '../../mainStyle';
import * as MS from '../../mainStyle';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShrink: false
    };
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onClickSettingItem = (index) => {
    const { navigate } = this.props.navigation;
    if (index === 1) {
      navigate('MySchedule');
    }else if(index === 2){
      navigate('DoctorAccount')
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  _onScroll = (ev) => {
    const { isShrink } = this.state;
    if (!isShrink && ev.contentOffset.y > 8) this.setState({ isShrink: true });
    else if (isShrink && ev.contentOffset.y < 8) this.setState({ isShrink: false });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    const { isShrink } = this.state;
    return (
      <Container style={styles.container}>
        <View style={[S.rowFlex, { paddingVertical: 16}, isShrink && S.bottomBorder]}>
          <View style={{ flex: 2, alignItems: "center" }}>
            <Text style={{ ...S.ft14S_G800, alignItems: "center" }}>{"Settings"}</Text>
          </View>
        </View>

        <StatusBar backgroundColor={MS.Gray100} barStyle="dark-content" translucent/>
        <ScrollView
          style={[S.pt8, S.pb24]}
          showsVerticalScrollIndicator={false}
          bounces={false}
          onScroll={({ nativeEvent }) => this._onScroll(nativeEvent)}
        >
          <View style={[S.rowFlex_start, { paddingHorizontal: 20 }]}>
            <View style={[styles.supportItem, { marginRight: 3 }]}>
              <View style={[S.textFrame_LBlue, { width: 32, height: 32, alignItems: "center" }]}>
                <View style={{ marginTop: 5 }}>
                  <Send_svg width={16} height={16} fill={MS.Blue500} />
                </View>
              </View>
              <View style={S.mt16}>
                <Text style={{ ...S.ft16S_G800, alignItems: "center" }}>{"Tell a friend"}</Text>
                <Text style={[S.ft12_G600, S.mt8]}>{"Invite friends, whether they are doctors or patients!"}</Text>
              </View>
            </View>
            <View style={[styles.supportItem, { marginLeft: 3 }]}>
              <View style={[S.textFrame_LBlue, { width: 32, height: 32, alignItems: "center" }]}>
                <View style={{ marginTop: 5 }}>
                  <Switch_svg width={16} height={16} fill={MS.Blue500} />
                </View>
              </View>
              <View style={S.mt16}>
                <Text style={S.ft16S_G800}>{"Become a patient"}</Text>
                <Text style={[S.ft12_G600, S.mt8]}>{"Switch app to patient version"}</Text>
              </View>
            </View>
          </View>

          <View style={[S.bottomBorder, { paddingVertical: 8, paddingHorizontal: 24 }]}>
            <View style={styles.settingItem}>
              <View style={S.rowFlex_start}>
                <Calendar_svg width={16} height={16} fill={MS.Blue500} />
                <Text style={[S.ml24, S.ft16S_G800, { lineHeight: null }]}>{"My working hours"}</Text>
              </View>
              <TouchableOpacity activeOpacity={0.3} style={{ paddingHorizontal: 5 }} onPress={() => this.onClickSettingItem(1)}>
                <ArrowRight_svg width={16} height={16} fill={MS.Gray600} />
              </TouchableOpacity>
            </View>
            <View style={styles.settingItem}>
              <View style={S.rowFlex_start}>
                <User_svg width={16} height={16} fill={MS.Blue500} />
                <Text style={[S.ml24, S.ft16S_G800, { lineHeight: null }]}>{"Account"}</Text>
              </View>
              <TouchableOpacity activeOpacity={0.3} style={{ paddingHorizontal: 5 }} onPress={() => this.onClickSettingItem(2)}>
                <ArrowRight_svg width={16} height={16} fill={MS.Gray600} />
              </TouchableOpacity>
            </View>
            <View style={styles.settingItem}>
              <View style={S.rowFlex_start}>
                <Notification_svg width={16} height={16} fill={MS.Blue500} />
                <Text style={[S.ml24, S.ft16S_G800, { lineHeight: null }]}>{"Notifications"}</Text>
              </View>
              <TouchableOpacity activeOpacity={0.3} style={{ paddingHorizontal: 5 }} onPress={() => console.log("")}>
                <ArrowRight_svg width={16} height={16} fill={MS.Gray600} />
              </TouchableOpacity>
            </View>
            <View style={styles.settingItem}>
              <View style={S.rowFlex_start}>
                <Padlock_svg width={16} height={16} fill={MS.Blue500} />
                <Text style={[S.ml24, S.ft16S_G800, { lineHeight: null }]}>{"Privacy"}</Text>
              </View>
              <TouchableOpacity activeOpacity={0.3} style={{ paddingHorizontal: 5 }} onPress={() => console.log("")}>
                <ArrowRight_svg width={16} height={16} fill={MS.Gray600} />
              </TouchableOpacity>
            </View>
            <View style={styles.settingItem}>
              <View style={S.rowFlex_start}>
                <Security_svg width={16} height={16} fill={MS.Blue500} />
                <Text style={[S.ml24, S.ft16S_G800, { lineHeight: null }]}>{"Security"}</Text>
              </View>
              <TouchableOpacity activeOpacity={0.3} style={{ paddingHorizontal: 5 }} onPress={() => console.log("")}>
                <ArrowRight_svg width={16} height={16} fill={MS.Gray600} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ padding: 24, paddingVertical: 8, marginBottom: 24 }}>
            <TouchableOpacity activeOpacity={0.3} style={{ paddingVertical: 12 }} onPress={() => console.log("")}>
              <Text style={S.ft16_B500}>{"Report a problem"}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.3} style={{ paddingVertical: 12 }} onPress={() => console.log("")}>
              <Text style={S.ft16_B500}>{"Help Center"}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.3} style={{ paddingVertical: 12 }} onPress={() => console.log("")}>
              <Text style={S.ft16_B500}>{"Data policy"}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.3} style={{ paddingVertical: 12 }} onPress={() => console.log("")}>
              <Text style={S.ft16_B500}>{"Terms of use"}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.3} style={{ paddingVertical: 12 }} onPress={() => console.log("")}>
              <Text style={S.ft16_B500}>{"Licenses"}</Text>
            </TouchableOpacity>
          </View>

          {/* 

          <View style={styles.settingCard}>
            <View style={styles.settingItem}>
              <View>
                <Notification_svg width={16} height={16} fill={MS.Blue500}/>
              </View>
              <View style={S.ml24}>
                <Text style={{...S.ft16S_G800, marginTop:-2}}>{"Notifications"}</Text>
                <Text style={[S.ft12_G600, S.mt8]}>{"Set up your notifications preferences."}</Text>
              </View>
            </View>
            <TouchableHighlight activeOpacity = {0.6} underlayColor = "transparent" onPress={()=>this.onClickSettingItem(1)}>
              <View style={styles.settingItem}>
                <View>
                  <Preferences_svg width={16} height={16} fill={MS.Blue500}/>
                </View>
                <View style={S.ml24}>
                  <Text style={{...S.ft16S_G800, marginTop:-2}}>{"Account preferences"}</Text>
                  <Text style={[S.ft12_G600, S.mt8]}>{"My schedule and profile preferences."}</Text>
                </View>
              </View>
            </TouchableHighlight>
            <View style={styles.settingItem}>
              <View>
                <Leave_svg width={16} height={16} fill={MS.Blue500}/>
              </View>
              <View style={S.ml24}>
                <Text style={{...S.ft16S_G800, marginTop:-2}}>{"Sign out"}</Text>
                <Text style={[S.ft12_G600, S.mt8]}>{"Hope you came back :)"}</Text>
              </View>
            </View>
          </View> */}
        </ScrollView>
      </Container>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    backgroundColor: MS.Gray100,
    paddingTop:22
  },
  settingItem: {
    ...S.rowFlex,
    paddingVertical: 16
  },
  supportItem: {
    ...S.card,
    flex: 1,
    borderRadius: 8,
    height: 160,
    backgroundColor: "white",
    padding: 16
  },
  supportCard: {
    ...S.rowFlex_start,
    ...S.mt8
  },
  settingCard: {
    ...S.mt8,
    ...S.pd16,
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 8
  }

});
