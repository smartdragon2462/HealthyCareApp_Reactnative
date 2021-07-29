// ***************************************************************************
//  @Created Date:    12/15/2020 
//  @Update:  03/08/2021
//  @author:  ClerkedApp team
//  @description:   A screen to display Schedule table
// ***************************************************************************

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Image, StatusBar, Dimensions } from 'react-native';
import { Container, Content, Spinner, Button, Icon } from 'native-base';
import AnimatedScreen from 'react-native-animated-screen';
import { hideNavigationBar, showNavigationBar } from 'react-native-navigation-bar-color';
import Dash from 'react-native-dash';
import Modal from 'react-native-modal';
import Gradient from '../../components/react-native-css-gradient';
import moment from 'moment';
import { ApptInfoDetail, CalendarDays, CalendarModal, LineComp, MeetInfoList, Reschedule, ScheduleCard1, ScheduleCard2, Toast } from '../../components';
import { convertHourDigit } from '../../utils/helper';
import { GRADIENT_TEXTURE } from '../../utils/const'
import { AddPluse_icon, Calendar_svg, Close_svg } from '../../assets/icons';
import { S } from '../../mainStyle';
import * as MS from '../../mainStyle';
import eventData from '../../Data/eventsData.json';

const { width, height } = Dimensions.get('screen');


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: moment().format("YYYY-MM-DD"),
      headerDate: moment().format("MMM YYYY"),
      dateObj: null,
      data: null,
      openToast: false,
      openDetail: false,
      openCalendar: false,
      isShrink: false,
    };
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    // hideNavigationBar();
    this.setState({
      headerDate: moment().format("MMM YYYY"),
      selectedDate: moment().format("YYYY-MM-DD"),
      dateObj: {
        today: moment().format("YYYY-MM-DD"),
        startOfMonth: moment().startOf('month').format('YYYY-MM-DD'),
        endOfMonth: moment().endOf('month').format('YYYY-MM-DD'),
        days: moment().daysInMonth(),
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onChangeDate = date => {
    this.setState({ selectedDate: date });
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onUpdateDate = (date) => {
    let dateStr = date.dateString;
    this.setState({
      openCalendar: false,
      selectedDate: dateStr,
      headerDate: moment(dateStr).format("MMM YYYY"),
      dateObj: {
        today: moment().format("YYYY-MM-DD"),
        startOfMonth: moment(dateStr).startOf('month').format('YYYY-MM-DD'),
        endOfMonth: moment(dateStr).endOf('month').format('YYYY-MM-DD'),
        days: moment(dateStr, "YYYY-MM").daysInMonth(),
      }
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////
  handleScroll = (ev) => {
    const { selectedDate, isShrink } = this.state;
    if (!isShrink && ev.nativeEvent.contentOffset.y > 165) {
      this.setState({ isShrink: true, headerDate: moment(selectedDate).format("DD MMM YYYY") });
    }
    else if (isShrink && ev.nativeEvent.contentOffset.y <= 0) {
      this.setState({ isShrink: false, headerDate: moment(selectedDate).format("MMM YYYY") });
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  handleCalendar = () => {
    const { navigate } = this.props.navigation;
    navigate('CalendarPage',
      {
        selectedDate: this.state.selectedDate,
        onUpdateDate: this.onUpdateDate,
        prevPage: "Schedule"
      })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onBackDetailModal = () => {
    this.setState({ openDetail: false });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onCloseToast = () => {
    this.setState({ openToast: false });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onRemoveEvent = () => {
    this.setState({ openDetail: false, openToast: true });
    setTimeout(() => { this.setState({ openToast: false }) }, 2000);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onClick = (data) => {
    this.setState({ data: data, openDetail: true });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  getBreakTime = (breakhHourList, keyIndex) => {
    return (
      <View style={[styles.scheduledCell]} key={keyIndex + 1000}>
        <View>
          {
            breakhHourList.map((breakHour, index3) => (
              <Text style={[styles.scheduledTime]} key={index3}>{breakHour}</Text>
            ))
          }
        </View>
        <View style={{ height: breakhHourList.length * 33, overflow: "hidden", borderRadius: 8, marginVertical: 8 }}>
          <Gradient gradient={GRADIENT_TEXTURE} style={{
            width: Math.max(width - 110, breakhHourList.length * 33),
            height: Math.max(width - 110, breakhHourList.length * 33),
            borderRadius: 8,
            alignItems: "flex-start",
            justifyContent: "flex-end",
          }}></Gradient>
        </View>
      </View>
    )
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  handleScheduleTable = () => {
    let nowHour = moment().hour();
    let availableDates = [], scheduleList = [], breakhHourList = [];
    let isBreaHour = false;

    try {
      for (let i = 0; i <= 24; i++) {
        availableDates.push(convertHourDigit(i) + ":00");
      }

      // --------Get event start time ---------------------------------------------------------
      let eventStartHours = [];
      for (let i = 0; i < eventData.events.length; i++) {
        eventStartHours.push(moment(eventData.events[i].slots[0].start_time).hour());
      }

      //-------------------------------------------------------------------------------------
      let n = 0;
      for (let i = 0; i < availableDates.length; i++) {
        if (n < eventData.events.length && eventStartHours[n] === i) {
          if (breakhHourList.length > 0) {
            scheduleList.push(this.getBreakTime(breakhHourList, i));
            breakhHourList = [];
          }

          if (i === nowHour) {
            scheduleList.push(
              <View style={[styles.scheduledCell]} key={i}>
                <Text style={[styles.scheduledTime]}>{availableDates[i]}</Text>
                <ScheduleCard2 itemData={eventData.events[n]} />
              </View>
            );
          } else if (i < nowHour) {
            scheduleList.push(
              <View style={[styles.scheduledCell]} key={i}>
                <Text style={[styles.scheduledTime]}>{availableDates[i]}</Text>
                <ScheduleCard1 itemData={eventData.events[n]} isComplete={true} onClick={this.onClick}>
                  {
                    i + 1 === nowHour &&
                    <LineComp />
                  }
                </ScheduleCard1>
              </View>
            );
          } else {
            scheduleList.push(
              <View style={[styles.scheduledCell]} key={i}>
                <Text style={[styles.scheduledTime]}>{availableDates[i]}</Text>
                <ScheduleCard1 itemData={eventData.events[n]} isComplete={false} onClick={this.onClick} />
              </View>
            );
          }
          n += 1;
        } else {
          if (i === 12 || i === 13 || i === 19 || i === 20 || i === 21 || i === 22) {
            breakhHourList.push(availableDates[i]); isBreaHour = true;
          } else isBreaHour = false;

          if (isBreaHour) continue;
          else {
            if (breakhHourList.length > 0) {
              scheduleList.push(this.getBreakTime(breakhHourList, i));
              breakhHourList = [];
            }

            scheduleList.push(
              <View style={[styles.scheduledCell]} key={i}>
                <Text style={[styles.scheduledTime]}>{availableDates[i]}</Text>
                <Dash
                  style={{ width: '100%', height: 1, paddingVertical: 16 }}
                  dashColor={MS.Gray700}
                  dashGap={7}
                  dashThickness={1}
                  dashLength={1}
                />
              </View>
            );
          }
        }
      }
    } catch (err) {
      console.log("Error:", err); return [];
    }

    return scheduleList;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    const { data, dateObj, selectedDate, headerDate, isShrink, openCalendar, openDetail, openToast } = this.state;
    const { navigate } = this.props.navigation;

    let scheduleList = this.handleScheduleTable();

    return (
      <Container style={styles.container}>
        <Toast messageText={"Appointment cancelled successfully"} type={2} isVisible={openToast} onClose={this.onCloseToast} />

        <AnimatedScreen.Wrapper headerMaxHeight={130} headerMinHeight={71} onScroll={(ev) => this.handleScroll(ev)}>
          <AnimatedScreen.Header>
            <View style={[styles.header, isShrink && S.bottomBorder]}>
              <View style={styles.titlePanel}>
                <Text style={{ flex: 1 }}>{" "}</Text>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text style={{ ...S.ft14S_G800, alignItems: "center" }}>{"Schedule"}</Text>
                </View>
                <TouchableOpacity
                  style={{ flex: 1, alignItems: "flex-end", paddingVertical: 5 }}
                  activeOpacity={0.5}
                  onPress={() => this.setState({ openCalendar: true })}
                >
                  <View style={S.rowFlex_start}>
                    <Text style={S.ft12S_G800}>{headerDate}  </Text>
                    <Calendar_svg width={16} height={16} fill={MS.Blue500} />
                  </View>
                </TouchableOpacity>
              </View>

              <AnimatedScreen.CollapsibleElement
                animatedStyle={scrollY => ({
                  opacity: scrollY.interpolate({
                    inputRange: [0, 20, 30, 100],
                    outputRange: [1, 1, 0.2, 0]
                  })
                })}
                style={{ paddingBottom: 100 }}
              >
                <View style={S.mt8}>
                  {
                    dateObj !== null &&
                    <CalendarDays
                      firstDate={dateObj.startOfMonth}
                      lastDate={dateObj.endOfMonth}
                      numberOfDays={dateObj.days}
                      selectedDate={selectedDate}
                      todayDate={dateObj.today}
                      daysInView={6}
                      onDateSelect={date => this.onChangeDate(date)}
                    />
                  }
                </View>
              </AnimatedScreen.CollapsibleElement>
            </View>
          </AnimatedScreen.Header>

          <StatusBar backgroundColor={MS.Gray100} barStyle="dark-content" translucent />
          <AnimatedScreen.ScrollView style={styles.contents}>
            <View style={{ marginBottom: 20 }}>
              {
                scheduleList
              }
            </View>
          </AnimatedScreen.ScrollView>
        </AnimatedScreen.Wrapper>

        <View style={styles.addeventButton} >
          <TouchableOpacity
            style={{ borderRadius: 100 }}
            activeOpacity={0.8} underlayColor='transparent'
            onPress={() => navigate('AddEvents')}
          >
            <Image source={AddPluse_icon} style={styles.addEventImg} resizeMode="contain" />
          </TouchableOpacity>
        </View>
        
        {
          data &&
          <ReviewModal elemEvent={data} visible={openDetail} onBackModal={this.onBackDetailModal} onRemoveEvent={this.onRemoveEvent} {...this.props} />
        }
        <CalendarModal
          selectedDate={selectedDate}
          visible={openCalendar}
          onDayLongPress={this.onUpdateDate}
        />
      </Container>
    );
  }
}



//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
class ReviewModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      elemEvent: null,
      clients: null,
      selectedDate: null,
      tmpData: null,
      timeRange: "",
      date: "",
      duration: 5,

      openConfirmModal: false,
      openRescheduleModal: false,
      isChange: false,
      openToast: false,
    };
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  setMarkedDates = (date) => {
    var temp = {};
    temp[date] = {
      customStyles: {
        container: { backgroundColor: MS.Blue500, borderRadius: 8, elevation: 2 },
        text: { color: 'white' }
      }
    }
    return temp;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onCloseToast = () => {
    this.setState({ openToast: false });
  }

  ///////////////////////////////////////////////////////////////////////
  componentDidMount() {
    const { elemEvent } = this.props;
    this.setState({ elemEvent: elemEvent });

    let startTime = "", endTime = "", date = "", duration = "";
    let clients = null, slots = null;

    if (elemEvent !== null) {
      clients = elemEvent.clients[0];
      slots = elemEvent.slots;

      let selectedDate = moment(slots[0].start_time).format("YYYY-MM-DD");
      startTime = moment(slots[0].start_time).format("HH:mm");
      endTime = moment(slots[slots.length - 1].end_time).format("HH:mm");
      date = moment(slots[0].start_time).format("ddd DD MMM YYYY");
      var start = moment(slots[0].start_time, "HH:mm");
      var end = moment(slots[slots.length - 1].end_time, "HH:mm");
      duration = moment.duration(end.diff(start)).minutes();

      this.setState({ timeRange: startTime + " - " + endTime, selectedDate, date, clients, duration });
      this.setState({ tmpData: { timeRange: startTime + " - " + endTime, date, duration } });
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { elemEvent } = nextProps;
    this.setState({ elemEvent: elemEvent });

    let startTime = "", endTime = "", date = "", duration = "";
    let clients = null, slots = null;

    if (elemEvent !== null) {
      clients = elemEvent.clients[0];
      slots = elemEvent.slots;

      let selectedDate = moment(slots[0].start_time).format("YYYY-MM-DD");
      startTime = moment(slots[0].start_time).format("HH:mm");
      endTime = moment(slots[slots.length - 1].end_time).format("HH:mm");
      date = moment(slots[0].start_time).format("ddd DD MMM YYYY");
      var start = moment(slots[0].start_time, "HH:mm");
      var end = moment(slots[slots.length - 1].end_time, "HH:mm");
      duration = moment.duration(end.diff(start)).minutes();

      this.setState({ timeRange: startTime + " - " + endTime, selectedDate, date, clients, duration });
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onUpdateTime = (date, time) => {
    this.setState({ date: date, selectedDate: date, timeRange: time, isChange: true });
  }

  ///////////////////////////////////////////////////////////////////////
  onHideRescheduleModal = () => {
    this.setState({ openRescheduleModal: false });
  }

  ///////////////////////////////////////////////////////////////////////
  onHideDetailModal = () => {
    this.setState({ isChange: false });
    this.props.onBackModal();
  }

  ///////////////////////////////////////////////////////////////////////
  onSaveChange = () => {
    this.setState({ openToast: true, isChange: false });
    setTimeout(() => { this.setState({ openToast: false }) }, 2000);
  }

  ///////////////////////////////////////////////////////////////////////
  onDismiss = () => {
    const { tmpData } = this.state;
    this.setState({ isChange: false });
    this.setState(tmpData);
  }

  ///////////////////////////////////////////////////////////////////////
  onRemoveEvent = () => {
    this.setState({ openConfirmModal: false });
    this.props.onRemoveEvent();
  }

  ///////////////////////////////////////////////////////////////////////
  render() {
    const { elemEvent, selectedDate, openConfirmModal, openRescheduleModal, timeRange, date, duration, isChange, openToast } = this.state;
    const B = (props) => <Text style={{ fontWeight: 'bold' }}>{props.children}</Text>

    let clients = [];
    if (elemEvent !== null) {
      clients = elemEvent.clients;
      slots = elemEvent.slots;
    }

    return (
      <View>
        <Modal
          statusBarTranslucent
          animationInTiming={500}
          animationOutTiming={500}
          backdropTransitionInTiming={500}
          backdropTransitionOutTiming={500}
          isVisible={this.props.visible}
          onBackdropPress={() => this.onHideDetailModal()}
          style={{ justifyContent: 'flex-end', margin: 0 }}
          useNativeDriverForBackdrop
          backdropOpacity={0.6}
        >
          <View style={[styles.modalContainer, { maxHeight: height }]}>
            <View style={styles.modalIndicator} />
            <View style={{ width: "100%", marginTop: 24 }}>
              <View style={S.rowFlex_start}>
                <Text style={{ ...S.textFrame_Blue, fontSize: 12 }}>{elemEvent?.type}</Text>
                {
                  isChange &&
                  <Text style={{ ...S.textFrame_Brown, fontSize: 12, marginLeft: 4 }}>{"Pending confirmation"}</Text>
                }
              </View>

              {
                elemEvent?.type === "meeting" ?
                  <Text style={[S.ft20S_G800, S.mt24, { lineHeight: 30 }]}>{"CVM Group"}</Text>
                  :
                  <Text style={[S.ft20S_G800, S.mt24, { lineHeight: 30 }]}>{date}</Text>
              }

              <View style={[S.rowFlex_start, S.bottomBorder, S.pt8, S.pb24]}>
                {
                  elemEvent?.type === "meeting" ?
                    (
                      <View style={{ ...S.rowFlex_start, flex: 1 }}>
                        <Calendar_svg width={16} height={16} fill={MS.Blue500} />
                        <Text style={[S.ft16_G800, S.ml16]}>{date}</Text>
                      </View>
                    ) :
                    (
                      <View style={{ ...S.rowFlex_start, flex: 1 }}>
                        <Icon type="MaterialCommunityIcons" name="circle-slice-2" style={S.ft20_B500} />
                        <Text style={[S.ft16_G800, S.ml16]}>{duration + " minutes"}</Text>
                      </View>
                    )
                }
                <View style={{ ...S.rowFlex_start, flex: 1 }}>
                  <Icon type="MaterialCommunityIcons" name="clock-time-four-outline" style={S.ft20_B500} />
                  <Text style={[S.ft16_G800, S.ml16]}>{timeRange}</Text>
                </View>
              </View>

              <View style={[S.mt8, S.mb16]}>
                {
                  elemEvent &&
                    elemEvent.type.toLowerCase() === "appointment" ?
                    <ApptInfoDetail clients={clients} /> : <MeetInfoList clients={clients} />
                }
              </View>

              <View>
                {
                  isChange ?
                    (
                      <View>
                        <Button bordered style={S.GreenButton} onPress={() => this.onSaveChange()}>
                          <Text style={S.ft16S_W}>{"Save changes"}</Text>
                        </Button>
                        <Button style={[S.LBlueButton, S.mt8]} onPress={() => this.onDismiss()}>
                          <Text style={S.ft16S_B500}>{"Dismiss"}</Text>
                        </Button>
                      </View>
                    )
                    :
                    (
                      <View>
                        <Button style={S.BlueButton} onPress={() => this.setState({ openRescheduleModal: true })}>
                          <Text style={S.ft16S_W}>{"Change " + elemEvent?.type}</Text>
                        </Button>
                        <Button style={[S.LBlueButton, S.mt8]} onPress={() => this.setState({ openConfirmModal: true })}>
                          <Text style={S.ft16S_B500}>{"Cancel " + elemEvent?.type}</Text>
                        </Button>
                      </View>
                    )
                }
              </View>
            </View>
          </View>
          <Toast messageText={"Your changes as been saved"} type={2} isVisible={openToast} onClose={this.onCloseToast} />
        </Modal>

        {/*=================================== MODAL ==============================================================*/}
        <Modal
          isVisible={openConfirmModal} backdropOpacity={0.5}
          useNativeDriverForBackdrop statusBarTranslucent
        >
          <View style={styles.modalView}>
            <TouchableHighlight style={styles.modalClose}
              activeOpacity={0.6} underlayColor='transparent'
              onPress={() => { this.setState({ openConfirmModal: false }) }}
            >
              <Close_svg width={16} height={16} fill={MS.Gray400} />
            </TouchableHighlight>
            <View style={{ marginTop: 16, width: "100%" }} >
              <Text style={{ ...S.ft16_G800, lineHeight: 26, textAlign: "center" }}>Are you sure you want to cancel Mr. John Bryans appointment <B>on Mon, 25 March 2020, 10:30-10:45 ?</B></Text>
              <TouchableHighlight style={{ marginTop: 24, width: "100%" }}
                activeOpacity={0.6} underlayColor='transparent'
                onPress={() => this.onRemoveEvent()}
              >
                <View style={styles.openButton}>
                  <Text style={[S.ft16B_R500, { lineHeight: 19 }]}>Cancel appointment</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        {/*=================================== Reschedule modal =====================================*/}
        <Modal
          isVisible={openRescheduleModal}
          statusBarTranslucent
          backdropOpacity={0.5}
          useNativeDriverForBackdrop
          style={{ justifyContent: 'flex-end', margin: 0 }}
        >
          <Reschedule
            handleDatetime={this.onUpdateTime}
            onHide={this.onHideRescheduleModal}
            selectedDate={selectedDate}
            timeRange={timeRange}
          />
        </Modal>
      </View>
    );
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    backgroundColor: MS.Gray100,
  },
  header: {
    backgroundColor: MS.Gray100,
    paddingTop: 32,
    height: '100%',
    borderWidth: 1,
    borderColor: "transparent"
  },
  titlePanel: {
    ...S.rowFlex,
    paddingHorizontal: 24,
  },
  scheduledCell: {
    display: 'flex',
    flexDirection: 'row',
  },
  scheduledTime: {
    fontFamily: 'Proxima-Nova-Regular',
    fontSize: 14,
    color: MS.Gray800,
    lineHeight: 16,
    width: 60,
    paddingVertical: 8,
  },
  contents: {
    padding: 24,
  },
  addeventButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: 'transparent'
  },
  addEventImg: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },

  modalContainer: {
    backgroundColor: MS.Gray100,
    alignItems: "center",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 24,
  },
  modalIndicator: {
    backgroundColor: '#80B3FF',
    width: 40,
    height: 3,
    borderRadius: 10,
    marginTop: -16
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 24,
    alignItems: "center",
  },
  openButton: {
    backgroundColor: MS.Red100,
    borderRadius: 8,
    padding: 8,
    alignItems: "center"
  },
  modalClose: {
    position: "absolute",
    top: 11,
    right: 11,
    padding: 5
  }
});
