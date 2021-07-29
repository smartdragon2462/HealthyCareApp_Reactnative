// ***************************************************************************
//  @Created Date:    12/20/2020 
//  @Update:  2/24/2021
//  @author:  ClerkedApp team
//  @description:   A screen to create new event data
// ***************************************************************************

import React from 'react';
import { Platform, StyleSheet, Text, View, TouchableHighlight, StatusBar, Dimensions } from 'react-native';
import { Container, Label, Content, Icon, Footer, FooterTab } from 'native-base';
import { hideNavigationBar, showNavigationBar } from 'react-native-navigation-bar-color';
import Modal from 'react-native-modal';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import {
  ApptDetailComp, Button as Button1, CalendarModal, DurationComp, HeaderComp,
  InputBox, InviteButton, MtDetailComp, SegmentButton
} from '../../components';
import { S } from '../../mainStyle';
import * as MS from '../../mainStyle';

const { width, height } = Dimensions.get('window');
const durations = [5, 10, 15, 30, 45, 60];

//Start Appointment Class <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
class Appointment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      datetimeType: 1,
      durationInd: 0,
      newApptData: null,
      markedDates: {},
      today: moment().format("YYYY-MM-DD"),
      selectedDate: moment().format("YYYY-MM-DD"),
      dateTime: { date: "", time: "" },
      isContinue: false,
      isDateOnly: false,
      isDatetime: false,
      isInviting: false,
      modalVisible: false,
      durationModalOpen: false,
    };
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onSelectDuration = (index) => {
    this.setState({ durationInd: index });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onBackOptionModal = () => {
    this.setState({ durationModalOpen: false });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onDayLongPress = (ev) => {
    let date = moment(ev.dateString).format('DD MMMM YYYY');
    this.setState({ markedDates: this.onSetMarkedDates(ev.dateString) });
    this.setState({ dateTime: { date: date, time: "" }, isContinue: true, isDateOnly: true, modalVisible: false });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onSetMarkedDates = (date) => {
    var temp = {};
    temp[date] = {
      customStyles: {
        container: { backgroundColor: MS.Blue500, borderRadius: 8 },
        text: { color: 'white' }
      }
    }
    return temp;
  }

  ///////////////////////////////////////////////////////////////////////
  handleEventData = (data) => {
    const { onGetNewApptData } = this.props;
    this.setState({ newApptData: data, isInviting: true });
    onGetNewApptData(data);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  handleDatetimeType = (type) => {
    this.setState({ datetimeType: type });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  handleDatetime = (date, time) => {
    this.setState({ isDatetime: true });
    this.setState({ dateTime: { date: date, time: time }, isContinue: true });
  }

  ///////////////////////////////////////////////////////////////////////
  onClickDatetime = () => {
    const { navigate } = this.props.navigation;
    const { dateTime, durationInd, isDateOnly } = this.state;

    if (!isDateOnly) {
      navigate('TimeSlotPage',
        {
          handleDatetime: this.handleDatetime,
          selectedDate: dateTime?.date,
          timeRange: dateTime?.time,
          duration: durations[durationInd],
          prevPage: "AddEvents"
        })
    } else Toast.show('Selected the date already.');
  }

  ///////////////////////////////////////////////////////////////////////
  onClickDateonly = () => {
    const { dateTime, isDatetime } = this.state;

    if (!isDatetime) {
      const today = moment().format("YYYY-MM-DD");
      const chosenDate = dateTime.date ? moment(dateTime.date, "DD MMMM YYYY").format("YYYY-MM-DD") : today;

      this.setState({
        selectedDate: chosenDate,
        modalVisible: true,
        today: today,
        markedDates: this.onSetMarkedDates(chosenDate)
      });

    } else
      Toast.show('Selected the date and time already.');
  }

  ///////////////////////////////////////////////////////////////////////
  onRemovePeople = (type, index) => {
    let newApptData = this.state.newApptData;

    if (type === 1) this.setState({ isInviting: false, newApptData: null });
    else if (type === 2) {
      let caregiver = newApptData.patient.caregiver;
      caregiver.splice(index, 1);
      newApptData.patient.caregiver = caregiver;
      this.setState({ newApptData: newApptData });
    } else if (type === 3) {
      let careteam = newApptData.patient.careteam;
      careteam.splice(index, 1);
      newApptData.patient.careteam = careteam;
      this.setState({ newApptData: newApptData });
    }
  }

  ///////////////////////////////////////////////////////////////////////
  onClickInvite = () => {
    const { navigate } = this.props.navigation;
    const { dateTime, newApptData, isContinue } = this.state;

    if (isContinue) {
      navigate('ChoosePatient',
        {
          newEventData: newApptData?.patient,
          selDateTime: dateTime,
          handleEventData: this.handleEventData,
        });
    }
  }

  ///////////////////////////////////////////////////////////////////////
  handleDateTimeComp = (index) => {
    const { dateTime, isDatetime, isDateOnly } = this.state

    if (index === 1) {
      return (
        <Text style={[S.ft14_G500, S.mt8, { lineHeight: 22 }]}>
          {"Patient will suggest the date & time"}
        </Text>
      )
    }
    else if (index === 2) {
      return (
        <TouchableHighlight style={S.mt8} activeOpacity={0.8} underlayColor="transparent" onPress={this.onClickDateonly}   >
          <View style={{ ...styles.dateComp }}>
            <Icon style={[isDateOnly ? S.ft20_B500 : S.ft20_G600, S.mr16]} name="calendar-blank" type="MaterialCommunityIcons" />
            <Label style={isDateOnly ? S.ft16_G800 : S.ft16_G600}>{isDateOnly ? dateTime.date : "Choose date"}</Label>
          </View>
        </TouchableHighlight>
      )
    }
    else if (index === 3) {
      return (
        <TouchableHighlight style={S.mt8} activeOpacity={0.8} underlayColor="transparent" onPress={() => this.onClickDatetime()}>
          {
            isDatetime ?
              (
                <View last style={{ ...styles.dateComp }}>
                  <View style={{ flex: 1 }}>
                    <View last style={{ display: 'flex', flexDirection: 'row' }}>
                      <Icon style={[S.ft20_B500, S.mr16]} name="calendar-blank" type="MaterialCommunityIcons" />
                      <Label numberOfLines={1} ellipsizeMode="tail" style={{ ...S.ft16_G800, flex: 1 }}>{dateTime.date}</Label>
                    </View>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View last style={[S.rowFlex_start, S.ml16]}>
                      <Icon style={[S.ft20_B500, S.mr16]} name="clock-time-four-outline" type="MaterialCommunityIcons" />
                      <Label style={S.ft16_G800}>{dateTime.time}</Label>
                    </View>
                  </View>
                </View>
              )
              :
              (
                <View style={{ ...styles.dateComp }} >
                  <Icon style={[S.ft20_G600, S.mr16]} name="clock-time-four-outline" type="MaterialCommunityIcons" />
                  <Label style={S.ft16_G600}>Choose date and slot</Label>
                </View>
              )
          }
        </TouchableHighlight>
      )
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    const { newApptData, durationInd, datetimeType, isInviting, modalVisible, selectedDate } = this.state

    return (
      <View>
        <View style={{ marginTop: 16 }}>
          <Text style={S.ft14_G700} >{"Appointment duration"}</Text>
          <DurationComp onSelectDuration={this.onSelectDuration} index={durationInd} />
        </View>

        <View style={{ marginTop: 8 }}>
          <Text style={[S.ft14_G700, S.mb8]}>{"Choose date & time"}</Text>
          <SegmentButton
            btnTextList={["Patient's choice", "Date only", "Date & time"]}
            selButton={datetimeType - 1}
            onclick_Button={this.handleDatetimeType}
          />
        </View>

        {
          this.handleDateTimeComp(datetimeType)
        }

        {/* Invited Patient Section-------------------------------------------------- */}
        {
          isInviting ?
            <View style={{ marginTop: 24 }}>
              <ApptDetailComp data={newApptData.patient} onRemove={this.onRemovePeople} onInvite={this.onClickInvite} >
                <InviteButton caption={"Invite Patient"} onInvite={this.onClickInvite} />
              </ApptDetailComp>
            </View>
            :
            (
              <View style={{ marginTop: 24 }}>
                <View style={{ ...styles.inviteItem }}>
                  <InviteButton caption={"Invite Patient"} onInvite={this.onClickInvite} />
                </View>
              </View>
            )
        }

        <CalendarModal selectedDate={selectedDate} visible={modalVisible} onDayLongPress={this.onDayLongPress} />
      </View>
    )
  }
}
//End Appointment Class >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//






//Start Main Class<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//
export default class AddEvents extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventType: 1,
      durationInd: 0,
      newData: null,
      dateTime: { date: "", time: "" },
      titleText: "",
      title_error: "",
      isContinue: false,
      isDatetime: false,
      isInviting: false,
      isHeaderBorder: false,
    };
    this.actionSheet = null;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  handleEventType = (type) => {
    this.setState({
      durationInd: 0,
      eventType: type,
      isInviting: false,
      isContinue: false,
      isDatetime: false,
      openToast: false,
      dateTime: { date: "", time: "" },
      newData: null,
      titleText: "",
      isHeaderBorder: false,
      openConfirmModal: false,
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onCloseToast = () => {
    this.setState({ openToast: false });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onGotoPrevPage = () => {
    const { navigate } = this.props.navigation;
    navigate('Schedule');
  }

  ///////////////////////////////////////////////////////////////////////
  onGetNewData = (mtData) => {
    const { onGetData } = this.props;
    this.setState({ newApptData: apptData, isInviting: true });

    onGetData(mtData);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onClickInvite = () => {
    const { navigate } = this.props.navigation;
    const { dateTime, newData, isContinue } = this.state;

    if (isContinue) {
      navigate('ChooseColleagues',
        {
          colleagues: newData ? newData.colleagues : null,
          SelDateTime: dateTime,
          onGetData: this.handleEventData,
        });
    } else Toast.show('Please select the date and time.');
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onSelectDuration = (index) => {
    this.setState({ durationInd: index });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onClickDatetime = () => {
    const { navigate } = this.props.navigation;
    const { dateTime, durationInd } = this.state;

    navigate('TimeSlotPage',
      {
        selectedDate: dateTime?.date,
        timeRange: dateTime?.time,
        duration: durations[durationInd],
        prevPage: "AddEvents",
        handleDatetime: this.handleDatetime,
      });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onGetNewApptData = (apptData) => {
    this.setState({ newData: apptData, isInviting: true });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  handleEventData = (mtData) => {
    this.setState({ newData: mtData, isInviting: true });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  handleAccess = (type) => {
    this.setState({ openConfirmModal: false });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onClick_CreateAppt = () => {
    // console.log("DDDDDD=======>", this.state.newData)
    this.setState({ openConfirmModal: true });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onClick_CreateMeeting = () => {
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  handleDatetime = (date, time) => {
    this.setState({ dateTime: { date: date, time: time } });
    this.setState({ isContinue: true });
  }

  ///////////////////////////////////////////////////////////////////////
  onTitleChange = (name, val) => {
    this.setState({ titleText: val })
  }

  ///////////////////////////////////////////////////////////////////////
  onRemovePeople = (index) => {
    let newData = this.state.newData;
    newData.colleagues.splice(index, 1);
    this.setState({ newData: newData });
  }

  ///////////////////////////////////////////////////////////////////////
  onScroll = (ev) => {
    const { isHeaderBorder } = this.state;
    if (!isHeaderBorder && ev.contentOffset.y > 8) this.setState({ isHeaderBorder: true });
    else if (isHeaderBorder && ev.contentOffset.y < 8) this.setState({ isHeaderBorder: false });
  }

  ///////////////////////////////////////////////////////////////////////
  componentDidMount() {
    // hideNavigationBar();
  }

  ///////////////////////////////////////////////////////////////////////
  render() {
    const { newData, durationInd, eventType, dateTime, titleText, title_error, isContinue, isHeaderBorder, isInviting, openConfirmModal } = this.state;

    return (
      <Container style={styles.container}>
        <View style={[{ marginTop: 20 }, isHeaderBorder ? S.bottomBorder : S.noBottomBorder]}>
          <HeaderComp leftText={"Add new event"} rightText={""} onBackpage={this.onGotoPrevPage} />
        </View>
        <StatusBar backgroundColor='transparent' translucent barStyle="dark-content" />

        <Content
          style={styles.contents}
          showsVerticalScrollIndicator={false}
          onScroll={({ nativeEvent }) => this.onScroll(nativeEvent)}
        >
          <SegmentButton btnTextList={["Appointment", "Meeting"]} selButton={eventType - 1} onclick_Button={this.handleEventType} />
          {
            eventType === 1 ?
              <Appointment navigation={this.props.navigation} onGetNewApptData={this.onGetNewApptData} />
              :
              (
                <View>
                  <View style={S.mt8}>
                    <InputBox
                      name="meetingTitle"
                      labelText={"Meeting Title"}
                      placeholder={"Meeting Title"}
                      helperText={title_error}
                      value={titleText}
                      onChange={(name, val) => this.onTitleChange(name, val)}
                    />
                  </View>
                  <View style={{ marginTop: 24 }}>
                    <Text style={S.ft14_G700} >{"Meeting duration"}</Text>
                    <DurationComp onSelectDuration={this.onSelectDuration} index={durationInd} />
                  </View>

                  {
                    isContinue ?
                      (
                        <TouchableHighlight style={{ marginTop: 14 }} activeOpacity={0.8} underlayColor="transparent" onPress={() => this.onClickDatetime()}>
                          <View style={styles.dateComp}>
                            <View style={{ flex: 1 }}>
                              <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Icon style={[S.ft20_B500, S.mr16]} name="calendar-blank" type="MaterialCommunityIcons" />
                                <Label numberOfLines={1} ellipsizeMode="tail" style={[S.ft16_G800, { flex: 1 }]}>{dateTime.date}</Label>
                              </View>
                            </View>
                            <View style={{ flex: 1 }}>
                              <View style={[S.rowFlex_start, S.ml16]}>
                                <Icon style={[S.ft20_B500, S.mr16]} name="clock-time-four-outline" type="MaterialCommunityIcons" />
                                <Label style={S.ft16_G800}>{dateTime.time}</Label>
                              </View>
                            </View>
                          </View>
                        </TouchableHighlight>
                      )
                      :
                      (
                        <TouchableHighlight activeOpacity={0.8} underlayColor="transparent" onPress={() => this.onClickDatetime()}>
                          <View style={styles.dateComp} >
                            <Icon style={[S.ft20_G600, S.mr16]} name="calendar-blank" type="MaterialCommunityIcons" />
                            <Label style={S.ft16_G600}>{"Select a date and free slot"}</Label>
                          </View>
                        </TouchableHighlight>
                      )
                  }

                  {/* Invited Colleagues Section-------------------------------------------------- */}
                  {
                    isInviting ?
                      <View style={{ marginVertical: 24 }}>
                        <MtDetailComp colleagues={newData.colleagues} onInvite={this.onClickInvite} onRemove={this.onRemovePeople} >
                          <InviteButton caption={"Invite Colleagues"} onInvite={this.onClickInvite} />
                        </MtDetailComp>
                      </View>
                      :
                      <View style={S.mt24}>
                        <View style={{ ...styles.inviteItem }}>
                          <InviteButton caption={"Invite Colleagues"} onInvite={this.onClickInvite} />
                        </View>
                      </View>
                  }
                </View>
              )
          }
        </Content>

        <Modal
          isVisible={openConfirmModal}
          statusBarTranslucent
          backdropOpacity={0.5}
          useNativeDriverForBackdrop
        >
          <View style={styles.modalView}>
            <View style={{ marginTop: 16, width: "100%" }} >
              <Text style={{ ...S.ft16S_G800, lineHeight: 26, textAlign: "center" }}>{"You currently have no access to John Bryans's health records. Would you like to request for full access?"}</Text>
              <TouchableHighlight style={{ marginTop: 24, width: "100%" }}
                activeOpacity={0.6} underlayColor='transparent'
                onPress={() => this.handleAccess("yes")}
              >
                <View style={S.BlueButton}>
                  <Text style={[S.ft16B_G100, { lineHeight: 19 }]}>{"Yes, please."}</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight style={{ marginTop: 8, width: "100%" }}
                activeOpacity={0.6} underlayColor='transparent'
                onPress={() => this.handleAccess("no")}
              >
                <View style={S.LBlueButton}>
                  <Text style={[S.ft16B_B500, { lineHeight: 19 }]}>{"Maybe later"}</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        {/* ========= Footer Part ===============================================*/}
        <Footer noShadow style={{ height: 70, elevation: 0 }} >
          <FooterTab style={{ borderWidth: 0, backgroundColor: MS.Gray100 }} >
            <View style={{ width: '100%', paddingHorizontal: 20, marginTop: 10 }}>
              <Button1
                caption={eventType === 1 ? "Create new appointment" : "Create new meeting"}
                onClick={eventType === 1 ? this.onClick_CreateAppt : this.onClick_CreateMeeting}
                active={isInviting}
              />
            </View>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MS.Gray100,
  },
  apptType_comp: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 71, 179, 0.03)'
  },
  contents: {
    padding: 20,
    paddingTop: 8
  },
  dateComp: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: 1,
    borderWidth: 1,
    borderColor: 'rgba(0, 71, 179, 0.03)'
  },
  inviteItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 71, 179, 0.03)'
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 24,
    alignItems: "center",
  },
});

