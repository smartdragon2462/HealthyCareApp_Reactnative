// ***************************************************************************
//  @Created Date: 04/17/2021 
//  @Update:  04/17/2021 
//  @author:  ClerkedApp team
//  @description:   A screen for setting the account 
// ***************************************************************************

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar, Dimensions, ScrollView } from 'react-native';
import { Container, Button, Icon, Switch } from 'native-base';
import { hideNavigationBar, showNavigationBar } from 'react-native-navigation-bar-color';
import Modal from 'react-native-modal';
import { ArrowRight_svg } from '../../../assets/icons';
import { HeaderComp } from '../../../components';
import { S } from '../../../mainStyle';
import * as MS from '../../../mainStyle';
import _ from 'lodash';

export default class DoctorAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {

  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    const { navigate } = this.props.navigation;
    const { } = this.state;

    return (

      <Container style={styles.container}>
        <View style={{ marginTop: 20 }}>
          <HeaderComp leftText={"Account"} rightText={""} onBackpage={this.onGotoPrevPage} />
        </View>
        <StatusBar backgroundColor={MS.Gray100} barStyle="dark-content" translucent={true} />

        <View style={S.pd24}>
          <View style={S.rowFlex}>
            <Text style={S.ft16_G800}>{"Personal information"}</Text>
            <TouchableOpacity activeOpacity={0.3} style={{ paddingHorizontal: 5 }} onPress={() => navigate('DoctorAccountSetting')}>
              <ArrowRight_svg width={16} height={16} fill={MS.Gray600} />
            </TouchableOpacity>
          </View>

          <View style={S.mt32}>
            <TouchableOpacity activeOpacity={0.3}>
              <Text style={S.ft16_B500}>{"Switch to my personal patient account"}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.3} style={S.mt24}>
              <Text style={[S.ft16_B500, { color: MS.Red500 }]}>{"Deactivate my provider account"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    );
  }
}


////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    backgroundColor: MS.Gray100,
  }
});
