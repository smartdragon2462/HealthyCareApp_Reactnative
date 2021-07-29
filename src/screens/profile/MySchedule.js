// ***************************************************************************
//  @Created Date: 03/10/2021 
//  @Update:  03/17/2021 
//  @author:  ClerkedApp team
//  @description:   A screen for My schedule
// ***************************************************************************

import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, StatusBar, Dimensions, ScrollView } from 'react-native';
import { Container, Button, Icon, Switch } from 'native-base';
import { hideNavigationBar, showNavigationBar } from 'react-native-navigation-bar-color';
import Modal from 'react-native-modal';
import moment from 'moment';
import { CalendarEdit_svg, Duration_svg, ArrowRight_svg, ArrowDown_svg, ArrowUp_svg } from '../../assets/icons';
import { Calendar, HeaderComp, ScheduleSession } from '../../components';
import { convertHourDigit } from '../../utils/helper';
import { RangeDateStartStyle, RangeDateEndStyle, RangeDefaultDateStyle, SpecificDateStyle, SpecificDateChangeStyle, BlockStartDateStyle, BlockEndDateStyle, BlockDateStyle, BlockedStartDateStyle, BlockedEndDateStyle, BlockedDefaultDateStyle } from '../../utils/const'
import { S } from '../../mainStyle';
import * as MS from '../../mainStyle';
import _ from 'lodash';

const { width, height } = Dimensions.get('screen');
let weekday = ["Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday", "Sunday"];
let scheduleData = [
  { sessions: [{ startTime: "9:00", endTime: "11:00" }] },
  { sessions: [{ startTime: "9:00", endTime: "11:00" }] },
  { sessions: [{ startTime: "9:00", endTime: "11:00" }, { startTime: "13:00", endTime: "15:00" }, { startTime: "15:00", endTime: "17:00" }] },
  { sessions: [{ startTime: "9:00", endTime: "11:00" }] },
  { sessions: [{ startTime: "9:00", endTime: "11:00" }] },
  { sessions: [null] },
  { sessions: [null] },
]

export default class MySchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShrink: false,
      isSelectedBlockDates: false,
      calendarVisible: false,
      calendarButtonsVisible: false,
      openScheduleModal: false,
      openEditDateModal: false,
      openBlockDateModal: false,
      isEditBlockDate: false,
      selectedWeekData: null,
      selectedWeekday: 0,
      selectedDateRange: [],
      markedDates: {},
      dotMarkedDates: {},
      circleMarkedDates: {},
      selectedDate: null,
      dateList: [null, null],
      today: moment().format("YYYY-MM-DD"),
      selectedMonth: moment().format("MMMM, YYYY")
    };
    // this.scrollView = null;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    this.setState({ today: moment().format("YYYY-MM-DD") });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onGotoPrevPage = () => {
    const { navigate } = this.props.navigation;
    navigate('Settings');
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onScroll = (ev) => {
    const { isShrink } = this.state;
    if (!isShrink && ev.nativeEvent.contentOffset.y > 8) this.setState({ isShrink: true });
    else if (isShrink && ev.nativeEvent.contentOffset.y <= 8) this.setState({ isShrink: false })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onChangeMonth = (date) => {
    const { isEditBlockDate } = this.state;
    this.setState({ selectedMonth: moment(date.dateString).format("MMMM, YYYY") });
    if (!isEditBlockDate) this.setState({ markedDates: {}, calendarButtonsVisible: false, isEditBlockDate: false });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onDayPress = (date) => {
    const { dotMarkedDates, circleMarkedDates, selectedDate, isEditBlockDate } = this.state;
    let dateStr = date.dateString, dateList = this.state.dateList.slice();
    let tmpDates = Object.assign({}, circleMarkedDates);

    if (isEditBlockDate) {
      if (dateList[0] !== null && dateList[0].timestamp > date.timestamp) return;
      else if (dateList[0] !== null && dateList[0].timestamp <= date.timestamp) dateList[1] = date;
      this.selectBlockDates(dateList);
    } else {
      if (dotMarkedDates[dateStr] && dotMarkedDates[dateStr].dotColor === MS.Green500) {
        this.selectBlockedDates(dateStr);
      } else {
        dateList[0] = date;
        if (circleMarkedDates[dateStr]) {
          delete tmpDates[dateStr];
          this.setState({ selectedDate: null, calendarButtonsVisible: false, isEditBlockDate: false });
        } else {
          if (selectedDate !== null) delete tmpDates[selectedDate];
          tmpDates[dateStr] = SpecificDateStyle;
          this.setState({ selectedDate: dateStr, calendarButtonsVisible: true });
        }
        let mergedMarkedDates = Object.assign({}, dotMarkedDates, tmpDates);
        this.setState({ markedDates: mergedMarkedDates, circleMarkedDates: tmpDates });
      }
    }
    this.setState({ dateList: dateList });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  selectBlockDates = (dateList) => {
    const { dotMarkedDates, circleMarkedDates } = this.state;
    let tmpDates = Object.assign({}, circleMarkedDates);
    let tmp_DateRange = [];
    let diffDay = Math.abs(moment(dateList[0].dateString).startOf('day').diff(moment(dateList[1].dateString).startOf('day'), 'days'));

    for (let i = 0; i <= diffDay; i++) {
      let rangeDate = moment(dateList[0].dateString).add(i, 'days').format('YYYY-MM-DD');
      tmp_DateRange.push(rangeDate);
      delete tmpDates[rangeDate];
      if (i === 0) tmpDates[rangeDate] = RangeDateStartStyle;
      else if (i === diffDay) tmpDates[rangeDate] = RangeDateEndStyle;
      else tmpDates[rangeDate] = RangeDefaultDateStyle;
    }
    let mergedMarkedDates = Object.assign({}, dotMarkedDates, tmpDates);
    this.setState({ markedDates: mergedMarkedDates, circleMarkedDates: {}, selectedDateRange: tmp_DateRange });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  selectBlockedDates = (dateStr) => {
    const { dotMarkedDates, circleMarkedDates, selectedDate } = this.state;
    //-----------------Find start date of blocked dates ---------------------------
    let tmpDates = Object.assign({}, circleMarkedDates);
    let startDate = "", count = _.size(dotMarkedDates);
    let tmp_DateRange = [];
    for (let j = 0; j < count; j++) {
      let tmpdate = moment(dateStr).subtract(j, 'days').format('YYYY-MM-DD');
      if (dotMarkedDates[tmpdate] && dotMarkedDates[tmpdate].rangeStart === true) {
        startDate = tmpdate;
        break;
      }
    }
    //----------------- Find blocked dates -----------------------------------------
    for (let j = 0; j < count; j++) {
      let tmpdate = moment(startDate).add(j, 'days').format('YYYY-MM-DD');
      tmp_DateRange.push(tmpdate);
      if (dotMarkedDates[tmpdate] && dotMarkedDates[tmpdate].rangeEnd === true) {
        tmpDates[tmpdate] = BlockedEndDateStyle;
        break;
      } else {
        if (j === 0) tmpDates[tmpdate] = BlockedStartDateStyle;
        else tmpDates[tmpdate] = BlockedDefaultDateStyle;
      }
    }
    //----------------- make the marked dates -------------------------------------
    if (selectedDate !== null) delete tmpDates[selectedDate];
    let mergedMarkedDates = Object.assign({}, dotMarkedDates, tmpDates);
    this.setState({ markedDates: mergedMarkedDates, circleMarkedDates: {}, selectedDate: null, selectedDateRange: tmp_DateRange, isSelectedBlockDates:true });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onClickItem = (index) => {
    let tmpData = Object.assign({}, scheduleData[index]);
    for (let i = 0; i < tmpData.sessions.length; i++) {
      tmpData.sessions[i].old = true;
      tmpData.sessions[i].fill = true;
    }
    this.setState({ selectedWeekData: tmpData, selectedWeekday: index, openScheduleModal: true });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onExpandCalendar = () => {
    const { calendarVisible } = this.state;
    this.setState({ calendarVisible: !calendarVisible, markedDates: {}, calendarButtonsVisible: false, isEditBlockDate: false });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onBackGeneralSessionModal = () => {
    this.setState({ openScheduleModal: false });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onBackSpecificDateModal = () => {
    this.setState({ openEditDateModal: false });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onClickBlockDatesButton = () => {
    const { selectedDateRange, dotMarkedDates, isEditBlockDate } = this.state;
    let tmpDates = Object.assign({}, dotMarkedDates);
    if (isEditBlockDate) {
      for (let i = 0; i < selectedDateRange.length; i++) {
        if (i === 0) tmpDates[selectedDateRange[i]] = BlockStartDateStyle;
        else if (i === selectedDateRange.length - 1) tmpDates[selectedDateRange[i]] = BlockEndDateStyle;
        else tmpDates[selectedDateRange[i]] = BlockDateStyle;
      }
      this.setState({
        isEditBlockDate: false, calendarButtonsVisible: false,
        circleMarkedDates: {}, selectedDate: null,
        dotMarkedDates: tmpDates, markedDates: tmpDates
      });
    } else {
      this.setState({ isEditBlockDate: true });
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onSaveSpecificDateSession = () => {
    const { selectedDate, dotMarkedDates } = this.state;
    let tmpDates = Object.assign({}, dotMarkedDates);
    delete tmpDates[selectedDate];
    tmpDates[selectedDate] = SpecificDateChangeStyle;

    this.setState({
      markedDates: tmpDates, dotMarkedDates: tmpDates,
      circleMarkedDates: {}, selectedDate: null, openEditDateModal: false
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onClickUnblockDatesButton =()=> {
    const { dotMarkedDates, selectedDateRange } = this.state;
    for (let i = 0; i < selectedDateRange.length; i++ ){
      let date = selectedDateRange[i];
      delete dotMarkedDates[date];
    }
    this.setState({ markedDates: dotMarkedDates, dotMarkedDates: dotMarkedDates, selectedDate: null, selectedDateRange: {}, isSelectedBlockDates:false });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    const { markedDates, today, selectedWeekday, selectedWeekData, selectedDate, selectedMonth, isShrink,
      openScheduleModal, calendarVisible, openEditDateModal, isEditBlockDate, isSelectedBlockDates, calendarButtonsVisible } = this.state;

    return (
      <Container style={styles.container}>
        <View style={[{ marginTop: 20, borderBottomWidth: 1, borderBottomColor: "transparent" }, isShrink && S.bottomBorder]}>
          <HeaderComp leftText={"My working hours"} rightText={""} onBackpage={this.onGotoPrevPage} />
        </View>

        <StatusBar backgroundColor={MS.Gray100} barStyle="dark-content" translucent={true} />
        <ScrollView style={[S.pd24, S.pt8]} showsVerticalScrollIndicator={false} onScroll={(ev) => this.onScroll(ev)}>
          <View style={[S.bottomBorder, S.pb24]}>
            <View style={{ ...S.rowFlex, alignItems: "flex-start" }}>
              <View style={[S.rowFlex_start, { alignItems: "flex-start" }]}>
                <CalendarEdit_svg width={16} height={16} fill={MS.Blue500} />
                <View style={S.ml24}>
                  <Text style={ S.ft16S_G800 }>{selectedMonth}</Text>
                  <Text style={[S.ft12_G600, S.mt8]}>{"Choose a specific date or block dates."}</Text>
                </View>
              </View>
              <TouchableHighlight style={{ padding: 3, marginTop: -3 }}
                activeOpacity={0.6} underlayColor="transparent"
                onPress={() => this.onExpandCalendar()}
              >
                {
                  calendarVisible ?
                    (<ArrowUp_svg width={16} height={16} fill={MS.Blue500} />)
                    :
                    (<ArrowDown_svg width={16} height={16} fill={MS.Gray600} />)
                }
              </TouchableHighlight>
            </View>
            {
              calendarVisible &&
              <View style={{ width: "100%", marginTop: -24 }}>
                <Calendar
                  theme={{
                    calendarBackground: 'transparent',
                    selectedDayTextColor: '#ffffff',
                    selectedDayFillColor: MS.Blue100,
                    todayTextColor: MS.Blue500,
                    dayTextColor: MS.Gray800,
                    textDisabledColor: MS.Gray600,
                    dotColor: MS.Blue500,
                    selectedDotColor: '#ffffff',
                    arrowColor: 'transparent',
                    disabledArrowColor: 'transparent',
                    monthTextColor: MS.Gray800,
                    textDayFontFamily: 'Proxima-Nova-Semibold',
                    textMonthFontFamily: 'Proxima-Nova-Semibold',
                    textDayHeaderFontFamily: 'Proxima-Nova-Semibold',
                  }}
                  markingType={'period'}
                  onDayPress={(day) => this.onDayPress(day)}
                  onMonthChange={(month) => this.onChangeMonth(month)}
                  renderHeader={(date) => { "" }}
                  hideExtraDays
                  current={today}
                  minDate={today}
                  enableSwipeMonths={true}
                  disableArrowRight={true}
                  disableArrowLeft={true}
                  markedDates={markedDates}
                />
                {
                  calendarButtonsVisible &&
                  <View style={S.mt24} >
                    {
                      !isEditBlockDate &&
                      <Button bordered style={S.BlueButton} onPress={() => this.setState({ openEditDateModal: true })}>
                        <Text style={S.ft16S_W}>{"Edit date"}</Text>
                      </Button>
                    }
                    <Button style={[isEditBlockDate ? S.GreenButton : S.LBlueButton, S.mt8]} onPress={() => this.onClickBlockDatesButton()}>
                      <Text style={isEditBlockDate ? S.ft16S_W : S.ft16S_B500}>{"Block dates"}</Text>
                    </Button>
                  </View>
                }
                {
                  isSelectedBlockDates &&
                  <Button style={[ S.GreenButton , S.mt8]} onPress={() => this.onClickUnblockDatesButton()}>
                    <Text style={S.ft16S_W }>{"Unblock dates"}</Text>
                  </Button>
                }
              </View>
            }
          </View>

          <View style={[S.mt24, S.mb24]}>
            <Text style={[S.ft12_G600]}>{"General sessions will repeat every week"}</Text>
            <View>
              {
                scheduleData.map((item, index) => (
                  <View style={[styles.item, index === 6 && { borderBottomColor: "transparent" }]} key={index}>
                    <View style={[S.rowFlex_start, { alignItems: "flex-start" }]}>
                      <Duration_svg width={16} height={16} fill={MS.Blue500} />
                      <View style={S.ml24}>
                        <Text style={[S.ft16S_G800]}>{weekday[index]}</Text>
                        <View style={{ marginTop: 5 }}>
                          {
                            item.sessions.map((session, index1) => {
                              let timeStr = "Empty";
                              if (session !== null) timeStr = session.startTime.toString() + " - " + session.endTime.toString();
                              return (
                                <Text style={S.ft12_G600} key={index1}>{timeStr}</Text>
                              )
                            })
                          }
                        </View>
                      </View>
                    </View>
                    <TouchableHighlight style={{ padding: 3, marginTop: -3 }} activeOpacity={0.6}
                      underlayColor="transparent" onPress={() => this.onClickItem(index)}
                    >
                      <ArrowRight_svg width={16} height={16} fill={MS.Gray600} />
                    </TouchableHighlight>
                  </View>
                ))
              }
            </View>
          </View>
        </ScrollView>

        <GeneralDatesSetting
          visible={openScheduleModal}
          weekdayData={selectedWeekData}
          selectedWeekday={selectedWeekday}
          onBack={this.onBackGeneralSessionModal}
        />
        <SpecificDateSetting
          visible={openEditDateModal}
          selectedDate={selectedDate}
          onBack={this.onBackSpecificDateModal}
          onSave={this.onSaveSpecificDateSession}
        />
      </Container>
    );
  }
}




//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
class GeneralDatesSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weekdayData: null,
      toggleButtonFlag: false
    };
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    const { weekdayData } = this.props;
    this.setState({ weekdayData: weekdayData });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { weekdayData } = nextProps;
    this.setState({ weekdayData });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onRemoveSession = (index) => {
    const { weekdayData } = this.state;
    let sessionData = weekdayData.sessions;
    sessionData.splice(index, 1);
    this.setState({ selectedWeekData: { sessions: sessionData } });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onChangeToggleButton = (flag) => {
    this.setState({ toggleButtonFlag: !flag });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onAddSession = () => {
    const { weekdayData } = this.state;
    if (weekdayData.sessions.length === 0) {
      this.setState({ weekdayData: { sessions: [{ startTime: "00:00", endTime: "01:00", fill: false, old: false }] } });
    } else {
      let tmp_sessionData = weekdayData.sessions;
      const lastIndex = tmp_sessionData.length - 1;
      let startTime = parseInt(tmp_sessionData[lastIndex].endTime.split(":")[0]);

      if (startTime >= 23) return;
      tmp_sessionData.push({ startTime: convertHourDigit(startTime + 1) + ":00", endTime: convertHourDigit(startTime + 2) + ":00", fill: false, old: false });
      this.setState({ weekdayData: { sessions: tmp_sessionData } });
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onUpdateSession = (index, session) => {
    const { weekdayData } = this.state;
    let sessionData = weekdayData.sessions;
    sessionData[index] = session;
    this.setState({ weekdayData: { sessions: sessionData } });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    const { selectedWeekday, visible, onBack } = this.props;
    const { weekdayData, toggleButtonFlag } = this.state;

    return (
      <Modal
        style={styles.modal}
        animationInTiming={400}
        animationOutTiming={300}
        backdropTransitionInTiming={400}
        backdropTransitionOutTiming={300}
        onBackdropPress={() => onBack()}
        isVisible={visible}
        backdropOpacity={0.6}
        useNativeDriverForBackdrop
        statusBarTranslucent
      >
        <View style={[styles.modalContainer, { maxHeight: height }]}>
          <View style={S.modalIndicator} />
          <ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false}>
            <Text style={[S.ft16S_G800, { lineHeight: 26, textAlign: "center" }]}>{weekday[selectedWeekday] + " schedule"}</Text>
            <View style={{ ...S.mt8, width: "100%" }}>
              {
                weekdayData && weekdayData.sessions.length >= 0 &&
                weekdayData.sessions.map((session, index) => (
                  <View key={index}>
                    <ScheduleSession sessionData={session} onRemove={this.onRemoveSession} onUpdate={this.onUpdateSession} sessionIndex={index} />
                  </View>
                ))
              }
            </View>
            <View style={[S.mt24, S.mb24, { width: "100%" }]}>
              <Button style={styles.addSessionButton} onPress={() => this.onAddSession()}>
                <Text style={S.ft16_B500}>{"Add another session"}</Text>
                <View style={{ position: "absolute", right: 0 }}>
                  <Icon type="Feather" name="plus" style={{ color: MS.Blue500, fontSize: 20 }} />
                </View>
              </Button>
              <View style={[S.rowFlex, { paddingVertical: 8, marginVertical: 24 }]}>
                <Text style={S.ft16_G800}>{"Apply to all days"}</Text>
                <Switch
                  value={toggleButtonFlag}
                  trackColor={{ false: MS.Gray400, true: MS.Blue500 }} thumbColor={"white"} ios_backgroundColor={MS.Blue500}
                  onValueChange={() => this.onChangeToggleButton(toggleButtonFlag)}
                />
              </View>
              <Button style={[S.GreenButton, S.mt8]} onPress={() => console.log("d")}>
                <Text style={S.ft16S_W}>{"Save session"}</Text>
              </Button>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  }
}



//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
class SpecificDateSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weekdayData: null,
      selectedWeekday: 0,
    };
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    const { selectedDate } = this.props;
    let weekdayIndex = selectedDate ? moment(selectedDate).day() : 0;
    let tmpData = Object.assign({}, scheduleData[weekdayIndex]);

    for (let i = 0; i < tmpData.sessions.length; i++) {
      tmpData.sessions[i].old = true;
      tmpData.sessions[i].fill = true;
    }
    this.setState({ weekdayData: tmpData, selectedWeekday: weekdayIndex });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  UNSAFE_componentWillReceiveProps(nextProps) {
    // const { selectedDate } = nextProps;
    // let weekdayIndex = selectedDate? moment(selectedDate).day():0 ;   
    // let tmpData = Object.assign({}, scheduleData[weekdayIndex]);   
    // console.log("eeeeeee========>", tmpData.sessions);
    // for (let i = 0; i < tmpData.sessions.length; i++) {
    //   console.log("ttttttt========>", tmpData.sessions[i]);
    //   tmpData.sessions[i]['old'] = true;
    //   tmpData.sessions[i]['fill'] = true;
    // }
    // this.setState({ weekdayData: tmpData, selectedWeekday:weekdayIndex });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onRemoveSession = (index) => {
    const { weekdayData } = this.state;
    let sessionData = weekdayData.sessions;
    sessionData.splice(index, 1);
    this.setState({ selectedWeekData: { sessions: sessionData } });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onAddSession = () => {
    const { weekdayData } = this.state;
    if (weekdayData.sessions.length === 0) {
      this.setState({ weekdayData: { sessions: [{ startTime: "00:00", endTime: "01:00", fill: false, old: false }] } });
    } else {
      let tmp_sessionData = weekdayData.sessions;
      const lastIndex = tmp_sessionData.length - 1;
      let startTime = parseInt(tmp_sessionData[lastIndex].endTime.split(":")[0]);
      if (startTime >= 23) return;
      tmp_sessionData.push({ startTime: convertHourDigit(startTime + 1) + ":00", endTime: convertHourDigit(startTime + 2) + ":00", fill: false, old: false });
      this.setState({ weekdayData: { sessions: tmp_sessionData } });
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onUpdateSession = (index, session) => {
    const { weekdayData } = this.state;
    let sessionData = weekdayData.sessions;
    sessionData[index] = session;
    this.setState({ weekdayData: { sessions: sessionData } });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    const { selectedDate, visible, onBack, onSave } = this.props;
    const { weekdayData } = this.state;
    let titleString = selectedDate ? moment(selectedDate).format("dddd, DD MMMM") : "";

    return (
      <Modal
        style={{ justifyContent: 'flex-end', margin: 0, maxHeight: height, marginTop: 65 }}
        isVisible={visible} backdropOpacity={0.6}
        animationInTiming={400} animationOutTiming={300}
        backdropTransitionInTiming={400} backdropTransitionOutTiming={300}
        statusBarTranslucent useNativeDriverForBackdrop
        onBackdropPress={() => onBack()}
      >
        <View style={[styles.modalContainer, { maxHeight: height }]}>
          <View style={S.modalIndicator} />
          <ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false}>
            <Text style={[S.ft12_G600, { textAlign: "center" }]}>{"This changes will only be added to this date"}</Text>
            <Text style={[S.ft16S_G800, S.mt8, { lineHeight: 26, textAlign: "center" }]}>{titleString}</Text>
            <View style={{ ...S.mt8, width: "100%" }}>
              {
                weekdayData && weekdayData.sessions.length >= 0 &&
                weekdayData.sessions.map((session, index) => (
                  <View key={index}>
                    <ScheduleSession
                      sessionData={session} sessionIndex={index}
                      onRemove={this.onRemoveSession}
                      onUpdate={this.onUpdateSession}
                    />
                  </View>
                ))
              }
            </View>
            <View style={{ width: "100%", marginBottom: 24 }}>
              <Button style={S.LBlueButton} onPress={() => this.onAddSession()}>
                <Text style={S.ft16_B500}>{"Add another session"}</Text>
                <View style={{ position: "absolute", right: 0 }}>
                  <Icon type="Feather" name="plus" style={{ color: MS.Blue500, fontSize: 20 }} />
                </View>
              </Button>
              <Button style={[S.GreenButton, { marginTop: 40 }]} onPress={() => onSave()}>
                <Text style={S.ft16S_W}>{"Save session"}</Text>
              </Button>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    backgroundColor: MS.Gray100,
  },
  item: {
    ...S.rowFlex,
    alignItems: "flex-start",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: MS.Gray300
  },
  modalContainer: {
    backgroundColor: MS.Gray100,
    alignItems: "center",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 24,
    paddingBottom: 0,
  },
  modal: {
    maxHeight: height,
    margin: 0,
    marginTop: 65,
    justifyContent: 'flex-end',
  },
  addSessionButton: {
    height: 50,
    width: '100%',
    backgroundColor: MS.Blue100,
    justifyContent: "center",
    borderRadius: 8,
    elevation: 0
  },
});
