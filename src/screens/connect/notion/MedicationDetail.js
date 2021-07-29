// ***************************************************************************
//  @Created Date: 04/08/2021.
//  @Update:  04/08/2021.
//  @author:  ClerkedApp team.
//  @description:  A screen for the detail medication.
// ***************************************************************************

import React from 'react';
import { StyleSheet, SafeAreaView, Text, Switch, TextInput, View, Image, TouchableHighlight, TouchableOpacity, StatusBar, Dimensions, Animated } from 'react-native';
import { hideNavigationBar, showNavigationBar } from 'react-native-navigation-bar-color';
import Modal from 'react-native-modal';
import moment from 'moment';
import { AddNewButton, HeaderComp, InputTextWithLabel, SearchComp } from '../../../components';
import { Medication_svg, ArrowUp_svg, ArrowDown_svg, ArrowLeft_svg } from '../../../assets/icons';
import { S } from '../../../mainStyle';
import * as MS from '../../../mainStyle';

const { width, height } = Dimensions.get('screen');
const ITEM_HEIGHT = 50;
const usageDuration = ['Time of day', 'Per day', 'Hourly'];
const usageTime = [
  ['01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'],
  ['1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x'],
  ['1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h', '24h'],
];

const durationPeriodData = ['Days', 'Weeks', 'Months'];
const durationValueData = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
];

const routeArray = [
  'Liquid',
  'LiquidCleanser',
  'LiquidLiquidEmulsion',
  'LiquidSolidSuspension',
  'LotionDrugForm',
  'OilDrugForm',
  'OintmentDrugForm',
  'OralCapsule',
  'OralSolution',
  'OralSuspension',
  'Abilify',
  'Liquid',
  'LiquidCleanser',
  'LiquidLiquidEmulsion',
  'LiquidSolidSuspension',
  'LotionDrugForm',
  'OilDrugForm',
  'OintmentDrugForm',
  'OralCapsule',
  'OralSolution',
  'OralSuspension',
  'Abilify',
];


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export default class MedicationDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      entryDate: moment(), //.format("DD MMM YYYY mm:ss"),
      route: "Oral use",
      isAsNeeded: false,
      routeSearchText: "",
      medicineRemarks: "",
      asNeeded: "",
      durationObj: { value: "", period: "" },
      formObj: { form: "", concentration: "", reason: "" },
      dosageAndtimeList: [{ dosage: "", usage_time: "", usage_duration: "" }],
      isOptionalDetail: false,
      isHeaderBorder: false,
      isSearchModalHeaderBorder: false,
      openRouteSettingModal: false,
    };
  }

  ///////////////////////////////////////////////////////////////////////
  componentDidMount() {
    // hideNavigationBar();
    const { navigation } = this.props;
    const title = navigation.getParam('title');
    this.setState(
      {
        entryDate: moment(),
        title: title
      });
  }

  // ////////////////////////////////////////////////////////////////////////////////////////////////////
  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   const { navigation } = nextProps;
  //   const title = navigation.getParam('title');
  //   this.setState(
  //     {
  //       entryDate: moment().format("DD MMM YYYY mm:ss"),
  //       title: title
  //     });
  // }

  ///////////////////////////////////////////////////////////////////////
  onBackScreen = () => {
    const { navigate } = this.props.navigation;
    navigate('Medications');
  }

  ///////////////////////////////////////////////////////////////////////
  onScroll = (ev) => {
    const { isHeaderBorder } = this.state;
    if (!isHeaderBorder && ev.contentOffset.y > 8) this.setState({ isHeaderBorder: true });
    else if (isHeaderBorder && ev.contentOffset.y < 8) this.setState({ isHeaderBorder: false });
  }

  ///////////////////////////////////////////////////////////////////////
  onScrollSearchModalContent = (ev) => {
    const { isSearchModalHeaderBorder } = this.state;
    if (!isSearchModalHeaderBorder && ev.contentOffset.y > 8) this.setState({ isSearchModalHeaderBorder: true });
    else if (isSearchModalHeaderBorder && ev.contentOffset.y < 8) this.setState({ isSearchModalHeaderBorder: false });
  }

  ///////////////////////////////////////////////////////////////////////
  onCreateDosageAndTime = () => {
    const { dosageAndtimeList } = this.state;
    let tmp = dosageAndtimeList.slice();
    tmp.push({ dosage: "", usage_time: "", usage_duration: "" });
    this.setState({ dosageAndtimeList: tmp });
  }

  ///////////////////////////////////////////////////////////////////////
  onRemoveDosageAndTime = (index) => {
    const { dosageAndtimeList } = this.state;
    let tmp = dosageAndtimeList.slice();
    tmp.splice(index, 1);
    this.setState({ dosageAndtimeList: tmp });
  }

  ///////////////////////////////////////////////////////////////////////
  onChangeAsneededButton = () => {
    const { isAsNeeded } = this.state;
    this.setState({ isAsNeeded: !isAsNeeded });
  };

  ///////////////////////////////////////////////////////////////////////
  onChangeText = (ev, type) => {
    if (type === 'remarks') this.setState({ medicineRemarks: ev });
    else if (type === 'asneeded') this.setState({ asNeeded: ev });
  }

  ///////////////////////////////////////////////////////////////////////
  onChangeSearchText = (ev) => {
    this.setState({ routeSearchText: ev })
  }

  ///////////////////////////////////////////////////////////////////////
  onClickSave = () => {
    const { navigation } = this.props;
    const { title, route, isAsNeeded, medicineRemarks, asNeeded, durationObj, formObj, entryDate, dosageAndtimeList } = this.state;

    let new_data = {
      title: title,
      // isFlagged: false,
      asneedObj: { flag: isAsNeeded, content: asNeeded },
      createdDate: entryDate,
      expireDate: moment().add(durationObj.value, durationObj.period),
      form: formObj,
      route: route,
      medicineRemarks: medicineRemarks,
      remarks: {picture:true, name:"", content:""},
      dosageAndtimeList: dosageAndtimeList,
      prescribed: { picture: true, name: "Dr. Lisa Sidnay" }
    };

    const onGetNewMedication = navigation.getParam('onGetNewMedication');
    onGetNewMedication(new_data);
    // this.setState({ openConfirmModal: false });
    navigation.goBack();
  }

  ///////////////////////////////////////////////////////////////////////
  render() {
    const {
      title, route, medicineRemarks, asNeeded, formObj, durationObj, routeSearchText, isOptionalDetail,
      dosageAndtimeList, openRouteSettingModal, isHeaderBorder, isAsNeeded, isSearchModalHeaderBorder
    } = this.state;

    return (
      <View style={styles.container}>
        <View style={[{ height: "100%", width: "100%", backgroundColor: MS.Gray100 }]}>
          <View style={{ width: "100%", paddingTop: 22 }}>
            <HeaderComp
              active={true}
              leftText={""}
              rightText={"Save"}
              onSave={() => this.onClickSave()}
              onBackpage={this.onBackScreen}
              isBorder={isHeaderBorder}
            />
          </View>

          <Animated.ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            decelerationRate={0.9}
            onScroll={({ nativeEvent }) => this.onScroll(nativeEvent)}
          >
            <View style={{ width: "100%", padding: 24, paddingTop: 0 }} >
              <StatusBar backgroundColor={MS.Gray100} barStyle="dark-content" translucent={true} />

              <View style={S.rowFlex_start}>
                <Medication_svg width={24} height={24} fill={MS.Blue500} />
                <Text style={[S.ft20S_G800, S.ml16, { marginTop: 5 }]}>{title}</Text>
              </View>

              <View style={[S.rowFlex, S.card, S.mt24, { paddingHorizontal: 16, paddingVertical: 8 }]}>
                <View>
                  <Text style={[S.ft10B_G500, { textTransform: "uppercase", letterSpacing: 1 }]}>{"route"}</Text>
                  <Text style={[S.ft16S_G900, { marginTop: 4 }]}>{route}</Text>
                </View>
                <TouchableHighlight style={{ padding: 5 }}
                  activeOpacity={0.7}
                  underlayColor="transparent"
                  onPress={() => this.setState({ openRouteSettingModal: true })}
                >
                  <ArrowDown_svg width={16} height={16} fill={MS.Gray700} />
                </TouchableHighlight>
              </View>

              <View style={{ marginTop: 14 }}>
                <TouchableHighlight
                  activeOpacity={0.7}
                  underlayColor="transparent"
                  onPress={() => this.setState({ isOptionalDetail: !isOptionalDetail })}
                >
                  <View style={[S.rowFlex_start, { alignSelf: 'flex-start' }]}>
                    {
                      isOptionalDetail ?
                        (<ArrowUp_svg width={10} height={10} fill={MS.Blue500} />)
                        :
                        (<ArrowDown_svg width={10} height={10} fill={MS.Gray600} />)
                    }
                    <Text style={[S.ml8, S.ft14S_G600]}>{"Optional details"}</Text>
                  </View>
                </TouchableHighlight>
                {
                  isOptionalDetail &&
                  <View style={S.mt16}>
                    <FormGroup data={formObj} />
                  </View>
                }
              </View>

              <View style={S.mt24}>
                {
                  dosageAndtimeList.map((item, index) => (
                    <View style={index > 0 && S.mt8} key={index}>
                      <DosageComp
                        isIcon={index > 0 ? true : false}
                        data={item}
                        onRemove={this.onRemoveDosageAndTime}
                        index={index}
                      />
                    </View>
                  ))
                }
              </View>

              <View style={{ marginTop: 16, marginBottom: 24, alignItems: "flex-end" }}>
                <AddNewButton onAddNew={this.onCreateDosageAndTime} />
              </View>

              <View style={[S.card, S.pd16]}>
                <View style={[S.rowFlex]}>
                  <Text style={[S.ft16_B500]}>{"As needed"}</Text>
                  <Switch onValueChange={this.onChangeAsneededButton} value={isAsNeeded} />
                </View>
                {
                  isAsNeeded &&
                  <TextInput
                    spellCheck={true}
                    autoCorrect={false}
                    style={[S.mt12, S.ft16_G900, { height: 26, padding: 0 }]}
                    placeholder={"Take as needed for (optional)"}
                    placeholderTextColor={MS.Gray600}
                    value={asNeeded}
                    onChangeText={(ev) => this.onChangeText(ev, "asneeded")}
                  />
                }
              </View>

              <View style={S.mt8}>
                <DurationComp data={durationObj} />
              </View>

              <View style={S.mt24}>
                <Text style={[S.ft14_G700]}>{"Remarks "}<Text style={[S.ft14_G500]}>{"(optional)"}</Text></Text>
                <TextInput
                  multiline
                  spellCheck={true}
                  autoCorrect={false}
                  placeholder={"type your remark..."}
                  placeholderTextColor={MS.Gray600}
                  style={[S.mt8, S.ft16_G900]}
                  value={medicineRemarks}
                  onChangeText={(ev) => this.onChangeText(ev, "remarks")}
                />
              </View>
            </View>
          </Animated.ScrollView>
        </View>

        <Modal
          statusBarTranslucent
          useNativeDriverForBackdrop
          isVisible={openRouteSettingModal}
          animationInTiming={400}
          animationOutTiming={400}
          backdropTransitionInTiming={400}
          backdropTransitionOutTiming={400}
          onBackdropPress={() => this.setState({ openRouteSettingModal: false })}
          style={{ justifyContent: 'flex-end', margin: 0 }}
          backdropOpacity={0.6}
        >
          <View style={[styles.modalContainer, { maxHeight: height - 62 }]}>
            <View style={{ paddingBottom: 21, width: '100%', alignItems: "center" }}>
              <View style={styles.modalIndicator} />
            </View>
            <View style={[S.pv8, S.ph24, { width: "100%", borderBottomWidth: 1, borderBottomColor: 'transparent' }, isSearchModalHeaderBorder && S.bottomBorder]}>
              <SearchComp
                onChangeText={this.onChangeSearchText}
                searchTxt={routeSearchText}
                placeholder={"Search type of form"}
                type={2}
              />
            </View>
            <Animated.ScrollView
              style={[S.ph24, { marginLeft: 16 }]}
              showsVerticalScrollIndicator={false}
              onScroll={({ nativeEvent }) => this.onScrollSearchModalContent(nativeEvent)}
            >
              {
                routeArray &&
                routeArray.map((item, index) => (
                  <TouchableHighlight
                    key={index}
                    style={{ paddingVertical: 8 }}
                    activeOpacity={0.7}
                    underlayColor="transparent"
                    onPress={() => this.setState({ route: item, openRouteSettingModal: false })}
                  >
                    <Text style={[S.ft16_G800]}>{item}</Text>
                  </TouchableHighlight>
                ))
              }
            </Animated.ScrollView>
          </View>
        </Modal>
      </View >
    );
  }
}





//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
class DosageComp extends React.Component {
  dosageScroll = new Animated.Value(0);
  timmingScroll = new Animated.Value(0);

  constructor(props) {
    super(props);
    this.state = {
      dosage: "",
      usage_time: "",
      usage_duration: "",
      selectedUsageTimeInd: 0,
      selectedUsageDurationInd: 0,
      USAGE_TIME: usageTime[0],
      USAGE_DURATION: usageDuration,
      openUsageTimeSettingModal: false,
    };
    this.usageTimeScrollRef = null;
    this.usageDurationScrollRef = null;

  }

  ///////////////////////////////////////////////////////////////////////
  componentDidMount() {
    const { data } = this.props;
    this.setState({ dosage: data.dosage, usage_time: data.usage_time, usage_duration: data.usage_duration });
  }

  ///////////////////////////////////////////////////////////////////////
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    this.setState({ dosage: data.dosage, usage_time: data.usage_time, usage_duration: data.usage_duration });
  }

  ///////////////////////////////////////////////////////////////////////
  onChangeDosageText = (val) => {
    const { data } = this.props;
    data.dosage = val;
    this.setState({ dosage: val });
  }

  ///////////////////////////////////////////////////////////////////////
  onSetUsageTime = (usage_time, usage_duration) => {
    const { data } = this.props;
    data.usage_time = usage_time;
    data.usage_duration = usage_duration;
    this.setState({ usage_time: usage_time, usage_duration: usage_duration, openUsageTimeSettingModal: false });
  }


  ///////////////////////////////////////////////////////////////////////
  onHideModal = () => {
    this.setState({ openUsageTimeSettingModal: false });
  }

  ///////////////////////////////////////////////////////////////////////
  onShowModal = () => {
    const { data } = this.props;
    const index1 = usageDuration.findIndex((item) => item === data.usage_duration);

    if (index1 !== -1) {
      const index2 = usageTime[index1].findIndex((item) => item === data.usage_time);
      this.setState({ selectedUsageDurationInd: index1, selectedUsageTimeInd: index2 });
    }
    this.setState({ openUsageTimeSettingModal: true });
  }

  ///////////////////////////////////////////////////////////////////////
  onChangeTimeScroll = ({ nativeEvent }) => {
    const index = Math.round(nativeEvent.contentOffset.y / 50);
    this.setState({ selectedUsageTimeInd: index });
  }

  ///////////////////////////////////////////////////////////////////////
  onChangeTimeTypeScroll = ({ nativeEvent }) => {
    const index = Math.round(nativeEvent.contentOffset.y / 50);
    this.setState({ USAGE_TIME: usageTime[index], selectedUsageDurationInd: index });
  }

  ///////////////////////////////////////////////////////////////////////
  timeScrollToInitialPosition = () => {
    const { selectedUsageTimeInd } = this.state;
    if (this.usageTimeScrollRef) {
      this.usageTimeScrollRef.scrollTo({ y: 50 * selectedUsageTimeInd });
    }
  };

  ///////////////////////////////////////////////////////////////////////
  timeTypeScrollToInitialPosition = () => {
    const { selectedUsageDurationInd } = this.state;
    if (this.usageDurationScrollRef) {
      this.usageDurationScrollRef.scrollTo({ y: 50 * selectedUsageDurationInd });
    }
  };

  ///////////////////////////////////////////////////////////////////////
  render() {
    const { isIcon, index, onRemove } = this.props;
    const {
      USAGE_TIME,
      USAGE_DURATION,
      dosage,
      usage_time,
      usage_duration,
      selectedUsageTimeInd,
      selectedUsageDurationInd,
      openUsageTimeSettingModal
    } = this.state;

    return (
      <View style={S.rowFlex}>
        <View style={{ flex: 1, marginRight: 4 }}>
          <InputTextWithLabel
            leftIcon={isIcon ? 'close' : null}
            placeholder={'Dosage'}
            txtValue={dosage}
            onChangeText={this.onChangeDosageText}
            onClose={onRemove}
            index={index}
          />
        </View>

        <TouchableHighlight
          style={{ flex: 1, marginLeft: 4 }}
          activeOpacity={0.6} underlayColor='transparent'
          onPress={() => this.onShowModal()}
        >
          <View style={styles.panel}>
            {
              usage_time.length > 0 &&
              <Text style={[S.ft10B_G500, { textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }]}>{usage_duration}</Text>
            }
            <Text style={[S.ft16_G900, { color: usage_time.length > 0 ? MS.Gray900 : MS.Gray600 }]}>{usage_time.length > 0 ? usage_time : "Timming"}</Text>
          </View>
        </TouchableHighlight>

        <Modal
          statusBarTranslucent
          useNativeDriverForBackdrop
          isVisible={openUsageTimeSettingModal}
          animationInTiming={400}
          animationOutTiming={400}
          backdropTransitionInTiming={400}
          backdropTransitionOutTiming={400}
          onBackdropPress={() => this.setState({ openUsageTimeSettingModal: false })}
          style={{ margin: 24 }}
          backdropOpacity={0.6}
        >
          <View style={styles.modalContent}>
            <View style={{ ...S.rowFlex, width: "100%" }}>
              <TouchableHighlight
                style={{ padding: 5, marginLeft: -5, marginTop: -5 }}
                activeOpacity={0.6}
                underlayColor='transparent'
                onPress={() => this.onHideModal()}
              >
                <ArrowLeft_svg width={16} height={16} fill={MS.Gray600} />
              </TouchableHighlight>
              <TouchableHighlight
                style={{ padding: 5, marginLeft: -5, marginTop: -5 }}
                activeOpacity={0.6}
                underlayColor='transparent'
                onPress={() => this.onSetUsageTime(USAGE_TIME[selectedUsageTimeInd], USAGE_DURATION[selectedUsageDurationInd])}
              >
                <Text style={[S.ft12B_G400, { color: MS.Blue500 }]}>{"Add"}</Text>
              </TouchableHighlight>
            </View>

            <View style={[S.rowFlex_start, { height: ITEM_HEIGHT * 3, margin: 8 }]}>
              <View style={[S.bottomBorder, { position: 'absolute', top: ITEM_HEIGHT, width: '100%' }]} />
              <View style={[S.bottomBorder, { position: 'absolute', top: ITEM_HEIGHT * 2, width: '100%' }]} />
              <Animated.ScrollView
                nestedScrollEnabled
                bounces={false}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={0}
                style={{ flex: 1 }}
                ref={(ref) => { this.usageTimeScrollRef = ref }}
                onLayout={this.timeScrollToInitialPosition}
                snapToInterval={ITEM_HEIGHT}
                onScroll={
                  Animated.event(
                    [{ nativeEvent: { contentOffset: { y: this.dosageScroll } } }],
                    { useNativeDriver: false },
                  )
                }
                onMomentumScrollEnd={this.onChangeTimeScroll}
                decelerationRate={0.8}
              >
                {
                  USAGE_TIME.map((item, index) => {
                    var color = this.dosageScroll.interpolate({
                      inputRange: [(index - 1) * ITEM_HEIGHT, index * ITEM_HEIGHT, (index + 1) * ITEM_HEIGHT],
                      outputRange: [MS.Gray500, MS.Blue500, MS.Gray500],
                      extrapolate: 'clamp',
                    });
                    var size = this.dosageScroll.interpolate({
                      inputRange: [(index - 1) * ITEM_HEIGHT, index * ITEM_HEIGHT, (index + 1) * ITEM_HEIGHT],
                      outputRange: [14, 18, 14],
                      extrapolate: 'clamp',
                    });

                    return (
                      <View key={index}>
                        <Animated.Text style={
                          [
                            S.ft14S_G500,
                            {
                              fontSize: size, color: color, textAlign: 'center', lineHeight: ITEM_HEIGHT, height: ITEM_HEIGHT,
                              marginBottom: (index === USAGE_TIME.length - 1) ? ITEM_HEIGHT : 0, marginTop: (index === 0) ? ITEM_HEIGHT : 0,
                            }
                          ]}
                        >
                          {item}
                        </Animated.Text>
                      </View>
                    )
                  })
                }
              </Animated.ScrollView>

              <Animated.ScrollView
                nestedScrollEnabled
                bounces={false}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={0}
                style={{ flex: 1 }}
                ref={(ref) => { this.usageDurationScrollRef = ref }}
                onLayout={this.timeTypeScrollToInitialPosition}
                snapToInterval={50}
                onScroll={
                  Animated.event(
                    [{ nativeEvent: { contentOffset: { y: this.timmingScroll } } }],
                    { useNativeDriver: false },
                  )
                }
                onMomentumScrollEnd={this.onChangeTimeTypeScroll}
                decelerationRate={0.0}
              >
                {
                  USAGE_DURATION.map((item, index) => {
                    var color = this.timmingScroll.interpolate({
                      inputRange: [(index - 1) * ITEM_HEIGHT, index * ITEM_HEIGHT, (index + 1) * ITEM_HEIGHT],
                      outputRange: [MS.Gray500, MS.Blue500, MS.Gray500],
                      extrapolate: 'clamp',
                    });
                    var size = this.timmingScroll.interpolate({
                      inputRange: [(index - 1) * ITEM_HEIGHT, index * ITEM_HEIGHT, (index + 1) * ITEM_HEIGHT],
                      outputRange: [14, 18, 14],
                      extrapolate: 'clamp',
                    });

                    return (
                      <View key={index}>
                        <Animated.Text style={
                          [
                            S.ft14S_G500,
                            {
                              fontSize: size, color: color, textAlign: 'center', lineHeight: ITEM_HEIGHT, height: ITEM_HEIGHT,
                              marginBottom: (index === USAGE_DURATION.length - 1) ? ITEM_HEIGHT : 0, marginTop: (index === 0) ? ITEM_HEIGHT : 0,
                            }
                          ]}
                        >
                          {item}
                        </Animated.Text>
                      </View>
                    )
                  })
                }
              </Animated.ScrollView>
            </View>
          </View>
        </Modal>
      </View >
    );
  }
}




//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
class DurationComp extends React.Component {
  durationValueScroll = new Animated.Value(0);
  durationPeriodScroll = new Animated.Value(0);

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      period: "",
      selectedValueInd: 0,
      selectedPeriodInd: 0,
      DURATION_PERIOD: durationPeriodData,
      DURATION_VALUE: durationValueData[0],
      openDurationSettingModal: false,
    };
    this.durationValueScrollRef = null;
    this.durationPeriodScrollRef = null;
  }

  ///////////////////////////////////////////////////////////////////////
  componentDidMount() {
    const { data } = this.props;
    this.setState({ value: data.value, period: data.period });
  }

  ///////////////////////////////////////////////////////////////////////
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    this.setState({ value: data.value, period: data.period });
  }

  ///////////////////////////////////////////////////////////////////////
  onSetValues = (value, period) => {
    const { data } = this.props;
    data.value = String(value);
    data.period = period;
    this.setState({ value: String(value), period: period, openDurationSettingModal: false });
  }

  ///////////////////////////////////////////////////////////////////////
  onHideModal = () => {
    this.setState({ openDurationSettingModal: false });
  }

  ///////////////////////////////////////////////////////////////////////
  onShowModal = () => {
    const { data } = this.props;
    const index1 = durationPeriodData.findIndex((item) => item === data.period);


    if (index1 !== -1) {
      const index2 = durationValueData[index1].findIndex((item) => item.toString() === data.value);
      this.setState({ selectedPeriodInd: index1, selectedValueInd: index2 });
    }
    this.setState({ openDurationSettingModal: true });
  }

  ///////////////////////////////////////////////////////////////////////
  onChangeValueScroll = ({ nativeEvent }) => {
    const index = Math.round(nativeEvent.contentOffset.y / 50);
    this.setState({ selectedValueInd: index });
  }

  ///////////////////////////////////////////////////////////////////////
  onChangePeriodScroll = ({ nativeEvent }) => {
    const index = Math.round(nativeEvent.contentOffset.y / 50);
    this.setState({ DURATION_VALUE: durationValueData[index], selectedPeriodInd: index });
  }

  ///////////////////////////////////////////////////////////////////////
  valueScrollToInitialPosition = () => {
    const { selectedValueInd } = this.state;
    if (this.durationValueScrollRef) {
      this.durationValueScrollRef.scrollTo({ y: 50 * selectedValueInd });
    }
  };

  ///////////////////////////////////////////////////////////////////////
  periodScrollToInitialPosition = () => {
    const { selectedPeriodInd } = this.state;
    if (this.durationPeriodScrollRef) {
      this.durationPeriodScrollRef.scrollTo({ y: 50 * selectedPeriodInd });
    }
  };

  ///////////////////////////////////////////////////////////////////////
  render() {
    const {
      DURATION_PERIOD,
      DURATION_VALUE,
      value,
      period,
      selectedValueInd,
      selectedPeriodInd,
      openDurationSettingModal,
    } = this.state;

    return (
      <View>
        <TouchableHighlight
          activeOpacity={0.7}
          underlayColor='transparent'
          onPress={() => this.onShowModal()}
        >
          <View style={styles.panel}>
            {
              value.length > 0 &&
              <Text style={[S.ft10B_G500, { textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }]}>{period}</Text>
            }
            <Text style={[S.ft16_G900, { color: value.length > 0 ? MS.Gray900 : MS.Gray600 }]}>{value.length > 0 ? value : "Duration"}</Text>
          </View>
        </TouchableHighlight>

        <Modal
          statusBarTranslucent
          useNativeDriverForBackdrop
          isVisible={openDurationSettingModal}
          animationInTiming={400}
          animationOutTiming={400}
          backdropTransitionInTiming={400}
          backdropTransitionOutTiming={400}
          onBackdropPress={() => this.setState({ openDurationSettingModal: false })}
          style={{ margin: 24 }}
          backdropOpacity={0.6}
        >
          <View style={styles.modalContent}>
            <View style={{ ...S.rowFlex, width: "100%" }}>
              <TouchableHighlight
                style={{ padding: 5, marginLeft: -5, marginTop: -5 }}
                activeOpacity={0.6}
                underlayColor='transparent'
                onPress={() => this.onHideModal()}
              >
                <ArrowLeft_svg width={16} height={16} fill={MS.Gray600} />
              </TouchableHighlight>
              <TouchableHighlight
                style={{ padding: 5, marginLeft: -5, marginTop: -5 }}
                activeOpacity={0.6}
                underlayColor='transparent'
                onPress={() => this.onSetValues(DURATION_VALUE[selectedValueInd], DURATION_PERIOD[selectedPeriodInd])}
              >
                <Text style={[S.ft12B_G400, { color: MS.Blue500 }]}>{"Add"}</Text>
              </TouchableHighlight>
            </View>

            <View style={[S.rowFlex_start, { height: ITEM_HEIGHT * 3, margin: 8 }]}>
              <View style={[S.bottomBorder, { position: 'absolute', top: ITEM_HEIGHT, width: '100%' }]} />
              <View style={[S.bottomBorder, { position: 'absolute', top: ITEM_HEIGHT * 2, width: '100%' }]} />
              <Animated.ScrollView
                nestedScrollEnabled
                bounces={false}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={0}
                style={{ flex: 1 }}
                ref={(ref) => { this.durationValueScrollRef = ref }}
                onLayout={this.valueScrollToInitialPosition}
                snapToInterval={ITEM_HEIGHT}
                onScroll={
                  Animated.event(
                    [{ nativeEvent: { contentOffset: { y: this.durationValueScroll } } }],
                    { useNativeDriver: false },
                  )
                }
                onMomentumScrollEnd={this.onChangeValueScroll}
                decelerationRate={0.8}
              >
                {
                  DURATION_VALUE.map((item, index) => {
                    var color = this.durationValueScroll.interpolate({
                      inputRange: [(index - 1) * ITEM_HEIGHT, index * ITEM_HEIGHT, (index + 1) * ITEM_HEIGHT],
                      outputRange: [MS.Gray500, MS.Blue500, MS.Gray500],
                      extrapolate: 'clamp',
                    });
                    var size = this.durationValueScroll.interpolate({
                      inputRange: [(index - 1) * ITEM_HEIGHT, index * ITEM_HEIGHT, (index + 1) * ITEM_HEIGHT],
                      outputRange: [14, 18, 14],
                      extrapolate: 'clamp',
                    });

                    return (
                      <View key={index}>
                        <Animated.Text style={
                          [
                            S.ft14S_G500,
                            {
                              fontSize: size, color: color, textAlign: 'center', lineHeight: ITEM_HEIGHT, height: ITEM_HEIGHT,
                              marginBottom: (index === DURATION_VALUE.length - 1) ? ITEM_HEIGHT : 0, marginTop: (index === 0) ? ITEM_HEIGHT : 0,
                            }
                          ]}
                        >
                          {item}
                        </Animated.Text>
                      </View>
                    )
                  })
                }
              </Animated.ScrollView>

              <Animated.ScrollView
                nestedScrollEnabled
                bounces={false}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={0}
                style={{ flex: 1 }}
                ref={(ref) => { this.durationPeriodScrollRef = ref }}
                onLayout={this.periodScrollToInitialPosition}
                snapToInterval={50}
                onScroll={
                  Animated.event(
                    [{ nativeEvent: { contentOffset: { y: this.durationPeriodScroll } } }],
                    { useNativeDriver: false },
                  )
                }
                onMomentumScrollEnd={this.onChangePeriodScroll}
                decelerationRate={0.0}
              >
                {
                  DURATION_PERIOD.map((item, index) => {
                    var color = this.durationPeriodScroll.interpolate({
                      inputRange: [(index - 1) * ITEM_HEIGHT, index * ITEM_HEIGHT, (index + 1) * ITEM_HEIGHT],
                      outputRange: [MS.Gray500, MS.Blue500, MS.Gray500],
                      extrapolate: 'clamp',
                    });
                    var size = this.durationPeriodScroll.interpolate({
                      inputRange: [(index - 1) * ITEM_HEIGHT, index * ITEM_HEIGHT, (index + 1) * ITEM_HEIGHT],
                      outputRange: [14, 18, 14],
                      extrapolate: 'clamp',
                    });

                    return (
                      <View key={index}>
                        <Animated.Text style={
                          [
                            S.ft14S_G500,
                            {
                              fontSize: size, color: color, textAlign: 'center', lineHeight: ITEM_HEIGHT, height: ITEM_HEIGHT,
                              marginBottom: (index === DURATION_PERIOD.length - 1) ? ITEM_HEIGHT : 0, marginTop: (index === 0) ? ITEM_HEIGHT : 0,
                            }
                          ]}
                        >
                          {item}
                        </Animated.Text>
                      </View>
                    )
                  })
                }
              </Animated.ScrollView>
            </View>
          </View>
        </Modal>
      </View >
    );
  }
}




//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
class FormGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formObj: { form: "", concentration: "", reason: "" },
      formSearchText: '',
      openFormSettingModal: false,
      isSearchModalHeaderBorder: false
    };
  }

  ///////////////////////////////////////////////////////////////////////
  componentDidMount() {
    const { data } = this.props;
    this.setState({ formObj: data });
  }

  ///////////////////////////////////////////////////////////////////////
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    this.setState({ formObj: data });
  }

  ///////////////////////////////////////////////////////////////////////
  onSetValues = (value, period) => {
    const { data } = this.props;
    data.value = String(value);
    data.period = period;
    this.setState({ value: String(value), period: period, openDurationSettingModal: false });
  }

  ///////////////////////////////////////////////////////////////////////
  onChangeText = (txt, type) => {
    const { formObj } = this.state;
    let tmp = Object.assign({}, formObj);

    if (type === "concentration") tmp.concentration = txt;
    else if (type === "reason") tmp.reason = txt;
    else if (type === "form") {
      tmp.form = txt;
      this.setState({ formSearchText: txt, openFormSettingModal: false });
    }
    this.setState({ formObj: tmp });

    const { data } = this.props;
    data.form = tmp.form;
    data.concentration = tmp.concentration;
    data.reason = tmp.reason;
  }

  ///////////////////////////////////////////////////////////////////////
  onScrollSearchModalContent = (ev) => {
    const { isSearchModalHeaderBorder } = this.state;
    if (!isSearchModalHeaderBorder && ev.contentOffset.y > 8) this.setState({ isSearchModalHeaderBorder: true });
    else if (isSearchModalHeaderBorder && ev.contentOffset.y < 8) this.setState({ isSearchModalHeaderBorder: false });
  }

  ///////////////////////////////////////////////////////////////////////
  onChangeSearchText = (ev) => {
    this.setState({ formSearchText: ev })
  }
  
  ///////////////////////////////////////////////////////////////////////
  render() {
    const { formObj, formSearchText, openFormSettingModal, isSearchModalHeaderBorder } = this.state;

    return (
      <View>
        <View style={S.rowFlex_start}>
          <View style={[styles.form, S.rowFlex, { flex: 1, marginRight: 4 }]}>
            <View style={{ flex: 1 }}>
              {
                formObj.form.length > 0 &&
                <Text style={[S.ft10B_G500, { textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }]}>{"Form"}</Text>
              }
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[S.ft16_G900, { overflow: "hidden", color: formObj.form.length > 0 ? MS.Gray900 : MS.Gray600 }]}
              >
                {formObj.form.length > 0 ? formObj.form : "Form"}
              </Text>
            </View>
            <TouchableHighlight
              activeOpacity={0.7}
              underlayColor="transparent"
              onPress={() => this.setState({ openFormSettingModal: true })}
            >
              <ArrowDown_svg width={16} height={16} fill={MS.Gray700} />
            </TouchableHighlight>
          </View>
          <View style={[styles.panel, S.rowFlex, { flex: 1, marginLeft: 4 }]}>
            <TextInput
              spellCheck={true}
              autoCorrect={false}
              style={[S.ft16_G900, { padding: 0 }]}
              placeholder={"Concentration"}
              placeholderTextColor={MS.Gray600}
              value={formObj.concentration}
              onChangeText={(ev) => this.onChangeText(ev, "concentration")}
            />
            <Text style={[S.ft16_B500, { lineHeight: null }]}>{" ml"}</Text>
          </View>
        </View>
        <View style={[styles.reason, S.mt8]}>
          <TextInput
            multiline
            spellCheck={true}
            autoCorrect={false}
            style={[S.ft16_G900, { padding: 0 }]}
            placeholder={"Reason for medication"}
            placeholderTextColor={MS.Gray600}
            value={formObj.reason}
            onChangeText={(ev) => this.onChangeText(ev, "reason")}
          />
        </View>


        <Modal
          statusBarTranslucent
          useNativeDriverForBackdrop
          isVisible={openFormSettingModal}
          animationInTiming={400}
          animationOutTiming={400}
          backdropTransitionInTiming={400}
          backdropTransitionOutTiming={400}
          onBackdropPress={() => this.setState({ openFormSettingModal: false })}
          style={{ justifyContent: 'flex-end', margin: 0 }}
          backdropOpacity={0.6}
        >
          <View style={[styles.modalContainer, { maxHeight: height - 62 }]}>
            <View style={{ paddingBottom: 21, width: '100%', alignItems: "center" }}>
              <View style={styles.modalIndicator} />
            </View>
            <View style={[S.pv8, S.ph24, { width: "100%", borderBottomWidth: 1, borderBottomColor: 'transparent' }, isSearchModalHeaderBorder && S.bottomBorder]}>
              <SearchComp
                onChangeText={this.onChangeSearchText}
                searchTxt={formSearchText}
                placeholder={"Search type of form"}
                type={2}
              />
            </View>
            <Animated.ScrollView
              style={[S.ph24, { marginLeft: 16 }]}
              showsVerticalScrollIndicator={false}
              onScroll={({ nativeEvent }) => this.onScrollSearchModalContent(nativeEvent)}
            >
              {
                routeArray &&
                routeArray.map((item, index) => (
                  <TouchableHighlight
                    key={index}
                    style={{ paddingVertical: 8 }}
                    activeOpacity={0.7}
                    underlayColor="transparent"
                    onPress={() => this.onChangeText(item, "form")}
                  >
                    <Text style={[S.ft16_G800]}>{item}</Text>
                  </TouchableHighlight>
                ))
              }
            </Animated.ScrollView>
          </View>
        </Modal>
      </View >
    );
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    backgroundColor: MS.Gray100,
    height: "100%"
  },
  content: {
    backgroundColor: MS.Gray100,
    paddingTop: 8
  },
  panel: {
    height: 51,
    borderRadius: 8,
    backgroundColor: 'white',
    borderColor: MS.Gray200,
    justifyContent: 'center',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  form: {
    height: 51,
    borderRadius: 8,
    backgroundColor: 'white',
    borderColor: MS.Gray200,
    justifyContent: 'center',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  reason: {
    borderRadius: 8,
    backgroundColor: 'white',
    borderColor: MS.Gray200,
    justifyContent: 'center',
    borderWidth: 1,
    padding: 16,
    paddingVertical: 12
  },
  modalContent: {
    backgroundColor: MS.Gray100,
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: 8,
    padding: 16,
    paddingBottom: 32,
  },
  modalContainer: {
    backgroundColor: MS.Gray100,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  modalIndicator: {
    backgroundColor: MS.Blue300,
    width: 40,
    height: 3,
    marginTop: 8,
    borderRadius: 10,
  },
});


