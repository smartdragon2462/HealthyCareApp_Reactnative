// ***************************************************************************
//  @Created Date: 03/09/2021 
//  @Update:  03/09/2021 
//  @author:  ClerkedApp team
//  @description:   A screen for dashboard
// ***************************************************************************

import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, BackHandler, ScrollView } from 'react-native';
import { Container } from 'native-base';
import { hideNavigationBar, showNavigationBar } from 'react-native-navigation-bar-color';
import AsyncStorage from "@react-native-community/async-storage";
import { EventCard3 } from '../../components';
import { ArrowRight_svg } from '../../assets/icons';
import { Doc_img3, Doc_img5 } from '../../assets/images';
import { S } from '../../mainStyle';
import * as MS from '../../mainStyle';

let dashboard_data = {
  "events":
  {
    "ID": 4,
    "CreatedAt": "2021-02-26T19:25:06.157354+03:00",
    "UpdatedAt": "2021-02-26T19:25:06.157354+03:00",
    "DeletedAt": null,
    "clients": [
      {
        "id": 124784657,
        "name": "Phill Reynolds",
        "phone": "123456789",
        "type": "user",
        "invitation_status": "Pending confirmation",
        "is_essential": true,
        "photo": Doc_img5
      }
    ],
    "doctor_id": 3,
    "slots": [
      { "start_time": "2021-02-26T09:00:00", "end_time": "2021-02-26T09:05:00" },
      { "start_time": "2021-02-26T09:05:00", "end_time": "2021-02-26T09:10:00" },
      { "start_time": "2021-02-26T09:10:00", "end_time": "2021-02-26T09:15:00" }
    ],
    "date": "0001-01-01T02:30:17+02:30",
    "type": "appointment",
    "status": "Pending confirmation",
    "comment": "blabla"
  }
}

let statsdata = [1, 2, 3, 4];

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_role: "",
      statusBarColor: MS.Gray100,
      barStyle: "dark-content"
    };
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.setStatusbar);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.setStatusbar);
  }
  
  setStatusbar = () => {
    this.setState({ statusBarColor: 'transparent', barStyle: 'light-content' });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  UNSAFE_componentWillMount = async () => {
    let user_role = await AsyncStorage.getItem('user_role');
    this.setState({ user_role });
    // this.setStatusbar();
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    const { statusBarColor, barStyle } = this.state;

    return (
      <Container style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 24 }}>
          <StatusBar backgroundColor={statusBarColor} barStyle={barStyle} translucent />
          <View style={[S.rowFlex, { marginTop: 16 }]}>
            <Text style={{ flex: 0.5 }}>{" "}</Text>
            <View style={{ flex: 2, alignItems: "center" }}>
              <Text style={{ ...S.ft14S_G800, alignItems: "center" }}>{"New Orleans East Hospital"}</Text>
            </View>
            <View style={{ flex: 0.5, alignItems: "flex-end" }}>
              <Image source={Doc_img3} style={S.avatar32} resizeMode="contain" />
            </View>
          </View>

          <View>
            <Text style={S.ft14S_B500}>{"Hello, Dr. Sarah Bryans"}</Text>
            <Text style={{ ...S.ft20S_G800, lineHeight: 28, marginTop: 2 }}>{"23 February, 2021"}</Text>
          </View>

          <View style={S.mt24}>
            <View style={S.rowFlex}>
              <Text style={S.ft14_G700}>{"Next event"}</Text>
              <View style={S.rowFlex}>
                <Text style={S.ft14S_B500}>{"See all  "}</Text>
                <ArrowRight_svg width={10} height={10} fill={MS.Blue500} />
              </View>
            </View>
            <EventCard3 itemData={dashboard_data.events} />
          </View>

          <View style={S.mt24}>
            <Text style={S.ft14_G700}>{"Stats"}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {
                statsdata.map((item, index) => (
                  <View style={{ borderRadius: 8, width: 140, height: 140, backgroundColor: MS.Blue100, margin: 4 }} key={index}>
                  </View>
                ))
              }
            </ScrollView>
          </View>

          <View style={{ ...S.mt24, ...S.mb32 }}>
            <Text style={S.ft14_G700}>{"Features"}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {
                statsdata.map((item, index) => (
                  <View style={{ borderRadius: 8, width: 216, height: 140, backgroundColor: MS.Blue100, margin: 4 }} key={index}>
                  </View>
                ))
              }
            </ScrollView>
          </View>
        </ScrollView>
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
