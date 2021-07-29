// ***************************************************************************
//  @Created Date: 04/17/2021 
//  @Update:  04/17/2021 
//  @author:  ClerkedApp team
//  @description:   A screen for setting the account 
// ***************************************************************************

import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TouchableHighlight, Image, StatusBar, Dimensions, ScrollView, Animated } from 'react-native';
import { Slider } from 'react-native'

import { Container, Button, Icon, Switch } from 'native-base';
import { hideNavigationBar, showNavigationBar } from 'react-native-navigation-bar-color';
import Modal from 'react-native-modal';
import moment from 'moment';

import _ from 'lodash';
import { HeaderComp, InputBox, ActionSheet, SearchComp } from '../../../components';
import { Photography_svg, ArrowDown_svg, ArrowUp_svg, ArrowLeft_svg } from '../../../assets/icons';
import { S } from '../../../mainStyle';
import * as MS from '../../../mainStyle';
import PhoneCode from '../../../Data/PhoneCode.json'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../utils/const'

const ITEM_HEIGHT = 50;
let actionSheetOptions = [
  { component: <Text style={S.ft20S_G800}>{'Female'}</Text>, height: ITEM_HEIGHT },
  { component: <Text style={S.ft20S_G800}>{'Male'}</Text>, height: ITEM_HEIGHT },
  { component: <Text style={S.ft20S_G800}>{'Prefer not to say'}</Text>, height: ITEM_HEIGHT }
]

let genderArray = ['Female', 'Male', 'Prefer not to say']


export default class DoctorAccountSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genderIndex: -1,
      filteredCountry: PhoneCode,
      openCountrySettingModal: false,
      isSearchModalHeaderBorder: false,
      countrySearchText: '',
      persionalDetails: {
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        birthday: { year: '', month: '', day: '' },
        country: ''
      },

      image: 'http://i.imgur.com/tCatS2c.jpg',
      height: 200,
      width: 300,
      zoom: 50,
      showNew: true,
      newImage: 'http://i.imgur.com/tCatS2c.jpg',
    };
    this.actionSheet = null;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    setTimeout(() => {
      this.setState({ filteredCountry: require('../../../Data/PhoneCode.json') });
    }, 0);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  showActionSheet = () => this.actionSheet.show();
  getActionSheetRef = ref => (this.actionSheet = ref);
  handlePress = (index) => {
    const { persionalDetails } = this.state;
    let tmpObj = Object.assign({}, persionalDetails);
    tmpObj.gender = genderArray[index];
    this.setState({ persionalDetails: tmpObj, genderIndex: index });
  };

  ///////////////////////////////////////////////////////////////////////
  handleFilterList = (_dataList, _searchStr) => {
    let filteredList = _dataList.filter((elem) => elem.name.toLowerCase().includes(_searchStr.toLowerCase()));
    return filteredList;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onTextChange = (type, txt) => {
    const { persionalDetails } = this.state;
    let tmpObj = Object.assign({}, persionalDetails);
    if (type === 'firstname') tmpObj.firstName = txt;
    else if (type === 'lastname') tmpObj.lastName = txt;
    else if (type === 'email') tmpObj.email = txt;
    this.setState({ persionalDetails: tmpObj });
  }

  ///////////////////////////////////////////////////////////////////////
  onScrollSearchModalContent = (ev) => {
    const { isSearchModalHeaderBorder } = this.state;
    if (!isSearchModalHeaderBorder && ev.contentOffset.y > 8) this.setState({ isSearchModalHeaderBorder: true });
    else if (isSearchModalHeaderBorder && ev.contentOffset.y < 8) this.setState({ isSearchModalHeaderBorder: false });
  }

  ///////////////////////////////////////////////////////////////////////
  onChangeSearchText = (val) => {
    if (val === "") {
      this.setState({ filteredCountry: PhoneCode });
    } else {
      this.setState({ countrySearchText: val });
      let filteredList = this.handleFilterList(PhoneCode, val);
      this.setState({ filteredCountry: filteredList });
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onSetCountry = (name) => {
    const { persionalDetails } = this.state;
    let tmpObj = Object.assign({}, persionalDetails);
    tmpObj.country = name;
    this.setState({ persionalDetails: tmpObj, openCountrySettingModal: false });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onGotoPrevPage =()=> {
    const { navigate } = this.props.navigation;
    navigate("DoctorAccount");
  }

  capture(){
    this.refs.cropper.crop()
    .then(res =>{
      this.setState({
        showNew: true,
        newImage: res,
      });
    })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    const { navigate } = this.props.navigation;
    const { filteredCountry, persionalDetails, countrySearchText, isSearchModalHeaderBorder, openCountrySettingModal } = this.state;

    const renderItem = ({ item }) => (
      <TouchableOpacity
        key={item.name}
        activeOpacity={0.3}
        onPress={() => this.onSetCountry(item.name)}
      >
        <View style={styles.items}>
          <Text style={S.ft16_G800}> {item.name} </Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <Container style={styles.container}>
        <View style={{ marginTop: 20 }}>
          <HeaderComp leftText={"Personal information"} rightText={""} onBackpage={this.onGotoPrevPage} />
        </View>

        <ActionSheet
          title={'Gender'}
          options={actionSheetOptions}
          ref={this.getActionSheetRef}
          onPress={this.handlePress}
        />

        <ScrollView style={[S.pd24, S.pt8]}>
          <StatusBar backgroundColor={MS.Gray100} barStyle="dark-content" translucent={true} />
          <View style={{ alignItems: "center" }}>
            <View style={[S.iconFrame, { backgroundColor: MS.Blue100, padding: 22 }]}>
              <Photography_svg width={24} height={24} fill={MS.Blue500} />
            </View>
            <Text style={[S.ft12S_B500, S.mt8]}>{"Upload photo"}</Text>
          </View>

          <View style={S.mt32}>
            <Text style={S.ft16S_G800}>{"Personal details"}</Text>
            <View style={S.mt8}>
              <InputBox
                autoCorrect={false}
                name="firstname"
                labelText={"First name"}
                placeholder={"First name"}
                helperText={''}
                value={persionalDetails.firstName}
                onChange={(type, txt) => this.onTextChange(type, txt)}
              />
            </View>
            <View style={S.mt8}>
              <InputBox
                autoCorrect={false}
                name="lastname"
                labelText={"Last name"}
                placeholder={"Last name"}
                helperText={''}
                value={persionalDetails.lastName}
                onChange={(type, txt) => this.onTextChange(type, txt)}
              />
            </View>

            <View style={[S.rowFlex_start, S.mt8]}>
              <View style={[S.rowFlex, S.card, { marginBottom: 0, marginRight: 4, paddingHorizontal: 16, paddingVertical: 8, flex: 0.8 }]}>
                <View style={{ flex: 1 }}>
                  {
                    persionalDetails && persionalDetails.gender.length > 0 &&
                    <Text style={[S.ft10B_G500, { textTransform: "uppercase", letterSpacing: 1 }]}>{"Gender"}</Text>
                  }
                  {
                    persionalDetails &&
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={[S.ft16_G900, { overflow: "hidden", color: persionalDetails.gender.length > 0 ? MS.Gray900 : MS.Gray500 }]}
                    >
                      {persionalDetails.gender.length > 0 ? persionalDetails.gender : "Gender"}
                    </Text>
                  }
                </View>
                <TouchableOpacity
                  style={{ paddingVertical: 8 }}
                  activeOpacity={0.3}
                  onPress={() => this.showActionSheet()}
                >
                  <ArrowDown_svg width={16} height={16} fill={persionalDetails.gender.length > 0 ? MS.Gray600:MS.Blue500} />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, paddingRight:2 }}>
                <BirthdaySelectComp data={persionalDetails.birthday} />
              </View>
            </View>
        

            <View style={[S.rowFlex, S.card, S.mt8, { marginBottom: 0, marginRight: 4, paddingHorizontal: 16, paddingVertical: 8 }]}>
              <View style={{ flex: 1 }}>
                {
                  persionalDetails && persionalDetails.country.length > 0 &&
                  <Text style={[S.ft10B_G500, { textTransform: "uppercase", letterSpacing: 1 }]}>{"Country"}</Text>
                }
                {
                  persionalDetails &&
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[S.ft16_G900, { overflow: "hidden", color: persionalDetails.country.length > 0 ? MS.Gray900 : MS.Gray500 }]}
                  >
                    {persionalDetails.country.length > 0 ? persionalDetails.country : "Country"}
                  </Text>
                }
              </View>
              <TouchableOpacity
                style={{ paddingVertical: 7 }}
                activeOpacity={0.3}
                onPress={() => this.setState({ openCountrySettingModal: true })}
              >
                <ArrowDown_svg width={16} height={16} fill={persionalDetails.country.length > 0 ? MS.Gray600:MS.Blue500} />
              </TouchableOpacity>
            </View>

            <View style={S.mt8}>
              <InputBox
                autoCorrect={false}
                name="email"
                labelText={"Email"}
                placeholder={"Email"}
                helperText={''}
                value={persionalDetails.lastName}
                onChange={(type, txt) => this.onTextChange(type, txt)}
              />
            </View>
          </View>

        </ScrollView>


        <Modal
          statusBarTranslucent
          useNativeDriverForBackdrop
          isVisible={openCountrySettingModal}
          animationInTiming={400}
          animationOutTiming={400}
          backdropTransitionInTiming={400}
          backdropTransitionOutTiming={400}
          onBackdropPress={() => this.setState({ openCountrySettingModal: false })}
          style={{ justifyContent: 'flex-end', margin: 0 }}
          backdropOpacity={0.6}
        >
          <View style={[styles.modalContainer, { maxHeight: SCREEN_HEIGHT - 62 }]}>
            <View style={{ paddingBottom: 21, width: '100%', alignItems: "center" }}>
              <View style={styles.modalIndicator} />
            </View>
            <View style={[S.pv8, S.ph24, { width: "100%", borderBottomWidth: 1, borderBottomColor: 'transparent' }, isSearchModalHeaderBorder && S.bottomBorder]}>
              <SearchComp
                onChangeText={this.onChangeSearchText}
                searchTxt={countrySearchText}
                placeholder={"Search country"}
                type={2}
              />
            </View>
            <View style={{ paddingHorizontal: 24 }}>
              {
                filteredCountry ?
                  <FlatList
                    data={filteredCountry}
                    showsVerticalScrollIndicator={false}
                    initialNumToRender={20}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                  />
                  :
                  <View style={{ marginTop: 100 }}>
                    <Spinner size={50} />
                  </View>
              }
            </View>
          </View>
        </Modal>
      </Container>
    );
  }
}





//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
class BirthdaySelectComp extends React.Component {
  daysScroll = new Animated.Value(0);
  monthScroll = new Animated.Value(0);
  yearScroll = new Animated.Value(0);

  Years = new Array(100);
  Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  Days = new Array(31);

  constructor(props) {
    super(props);
    this.state = {
      year: "",
      month: "",
      day: "",
      selectedDayInd: 0,
      selectedMonthInd: 0,
      selectedYearInd: 0,
      openModal: false,
    };
    this.daysScrollRef = null;
    this.monthScrollRef = null;
    this.yearScrollRef = null;

    this.Years.fill(0);
    this.Days.fill(0);

  }

  ///////////////////////////////////////////////////////////////////////
  componentDidMount() {
    const { data } = this.props;
    this.setState({ year: data.year, month: data.month, day: data.day });
  }

  ///////////////////////////////////////////////////////////////////////
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    this.setState({ year: data.year, month: data.month, day: data.day });
  }

  ///////////////////////////////////////////////////////////////////////
  onSetBirthday = () => {
    const { selectedDayInd, selectedMonthInd, selectedYearInd } = this.state;
    const { data } = this.props;
    data.year = selectedYearInd + 1950;
    data.month = this.Months[selectedMonthInd];
    data.day = selectedDayInd + 1;
    this.setState({ openModal: false });
  }

  ///////////////////////////////////////////////////////////////////////
  onHideModal = () => {
    this.setState({ openModal: false });
  }

  ///////////////////////////////////////////////////////////////////////
  onShowModal = () => {
    const { data } = this.props;
    const yearIndex = this.Years.findIndex((item) => item === data.year);

    if (yearIndex !== -1) {
      const monthIndex = this.Months.findIndex((item) => item === data.month);
      const dayIndex = this.Days.findIndex((item) => item === data.day);

      if (monthIndex !== -1 && dayIndex !== -1) {
        this.setState({ selectedYearInd: yearIndex, selectedMonthInd: monthIndex, selectedDayInd: dayIndex });
      }
    }
    this.setState({ openModal: true });
  }

  ///////////////////////////////////////////////////////////////////////
  onChangeDaysScroll = ({ nativeEvent }) => {
    const index = Math.round(nativeEvent.contentOffset.y / 50);
    this.setState({ selectedDayInd: index });
  }

  ///////////////////////////////////////////////////////////////////////
  onChangeMonthScroll = ({ nativeEvent }) => {
    const index = Math.round(nativeEvent.contentOffset.y / 50);
    this.setState({ selectedMonthInd: index });
  }

  ///////////////////////////////////////////////////////////////////////
  onChangeYearScroll = ({ nativeEvent }) => {
    const index = Math.round(nativeEvent.contentOffset.y / 50);
    this.setState({ selectedYearInd: index });
  }

  ///////////////////////////////////////////////////////////////////////
  dayScrollToInitialPosition = () => {
    const { selectedDayInd } = this.state;
    if (this.daysScrollRef) {
      this.daysScrollRef.scrollTo({ y: 50 * selectedDayInd });
    }
  };

  ///////////////////////////////////////////////////////////////////////
  monthScrollToInitialPosition = () => {
    const { selectedMonthInd } = this.state;
    if (this.monthScrollRef) {
      this.monthScrollRef.scrollTo({ y: 50 * selectedMonthInd });
    }
  };


  ///////////////////////////////////////////////////////////////////////
  yearScrollToInitialPosition = () => {
    const { selectedYearInd } = this.state;
    if (this.yearScrollRef) {
      this.yearScrollRef.scrollTo({ y: 50 * selectedYearInd });
    }
  };

  ///////////////////////////////////////////////////////////////////////
  render() {
    const { openModal } = this.state;
    const { data } = this.props;
    let birthday = "", isEmpty = false;
    if (data) birthday = data.day.toString() + " " + data.month + " " + data.year.toString();
    if (data.day.toString() === '' || data.year.toString() === '') isEmpty = true;

    return (
      <View>
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={0.5}
          onPress={() => this.onShowModal()}
        >
          <View style={styles.panel}>
            {
              !isEmpty > 0 &&
              <Text style={[S.ft10B_G500, { textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }]}>{'Date of Birth'}</Text>
            }
            <Text  
              numberOfLines={1}
              ellipsizeMode="tail" 
              style={[S.ft16_G900, { color: isEmpty ? MS.Gray500 : MS.Gray900 }]}
            >
              {isEmpty ? "Date of Birth" : birthday}
            </Text>
          </View>
        </TouchableOpacity>

        <Modal
          statusBarTranslucent
          useNativeDriverForBackdrop
          isVisible={openModal}
          animationInTiming={400}
          animationOutTiming={400}
          backdropTransitionInTiming={400}
          backdropTransitionOutTiming={400}
          onBackdropPress={() => this.setState({ openModal: false })}
          style={{ margin: 24 }}
          backdropOpacity={0.6}
        >
          <View style={styles.modalContent}>
            <View style={{ ...S.rowFlex, width: "100%" }}>
              <TouchableOpacity
                style={{ padding: 5, marginLeft: -5, marginTop: -5 }}
                activeOpacity={0.3}
                onPress={() => this.onHideModal()}
              >
                <ArrowLeft_svg width={16} height={16} fill={MS.Gray600} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ padding: 5, marginLeft: -5, marginTop: -5 }}
                activeOpacity={0.3}
                onPress={() => this.onSetBirthday()}
              >
                <Text style={[S.ft12B_G400, { color: MS.Blue500 }]}>{"Add"}</Text>
              </TouchableOpacity>
            </View>

            <View style={[S.rowFlex_start, { height: ITEM_HEIGHT * 3, margin: 8 }]}>
              <View style={[S.bottomBorder, { position: 'absolute', top: ITEM_HEIGHT, width: '100%' }]} />
              <View style={[S.bottomBorder, { position: 'absolute', top: ITEM_HEIGHT * 2, width: '100%' }]} />

              <Animated.ScrollView
                nestedScrollEnabled
                bounces={false}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={50}
                style={{ flex: 0.5 }}
                ref={(ref) => { this.daysScrollRef = ref }}
                onLayout={this.dayScrollToInitialPosition}
                snapToInterval={ITEM_HEIGHT}
                onScroll={
                  Animated.event(
                    [{ nativeEvent: { contentOffset: { y: this.daysScroll } } }],
                    { useNativeDriver: false },
                  )
                }
                onMomentumScrollEnd={this.onChangeDaysScroll}
                decelerationRate={0.8}
              >
                {
                  this.Days.map((item, index) => {
                    var color = this.daysScroll.interpolate({
                      inputRange: [(index - 1) * ITEM_HEIGHT, index * ITEM_HEIGHT, (index + 1) * ITEM_HEIGHT],
                      outputRange: [MS.Gray500, MS.Blue500, MS.Gray500],
                      extrapolate: 'clamp',
                    });
                    var size = this.daysScroll.interpolate({
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
                              fontSize: size,
                              color: color,
                              textAlign: 'center',
                              lineHeight: ITEM_HEIGHT,
                              height: ITEM_HEIGHT,
                              marginBottom: (index === this.Days.length - 1) ? ITEM_HEIGHT : 0, marginTop: (index === 0) ? ITEM_HEIGHT : 0,
                            }
                          ]}
                        >
                          {(1 + index).toString()}
                        </Animated.Text>
                      </View>
                    )
                  })
                }
              </Animated.ScrollView>
              <View style={{ flex: 1.5 }}>
                <Animated.ScrollView
                  nestedScrollEnabled
                  bounces={false}
                  showsVerticalScrollIndicator={false}
                  scrollEventThrottle={50}
                  style={{ flex: 1 }}
                  ref={(ref) => { this.monthScrollRef = ref }}
                  onLayout={this.monthScrollToInitialPosition}
                  snapToInterval={50}
                  onScroll={
                    Animated.event(
                      [{ nativeEvent: { contentOffset: { y: this.monthScroll } } }],
                      { useNativeDriver: false },
                    )
                  }
                  onMomentumScrollEnd={this.onChangeMonthScroll}
                  decelerationRate={0.8}
                >
                  {
                    this.Months.map((item, index) => {
                      var color = this.monthScroll.interpolate({
                        inputRange: [(index - 1) * ITEM_HEIGHT, index * ITEM_HEIGHT, (index + 1) * ITEM_HEIGHT],
                        outputRange: [MS.Gray500, MS.Blue500, MS.Gray500],
                        extrapolate: 'clamp',
                      });
                      var size = this.monthScroll.interpolate({
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
                                fontSize: size,
                                color: color,
                                textAlign: 'center',
                                lineHeight: ITEM_HEIGHT,
                                height: ITEM_HEIGHT,
                                marginBottom: (index === this.Months.length - 1) ? ITEM_HEIGHT : 0, marginTop: (index === 0) ? ITEM_HEIGHT : 0,
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

              <Animated.ScrollView
                nestedScrollEnabled
                bounces={true}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={50}
                style={{ flex: 0.5 }}
                ref={(ref) => { this.yearScrollRef = ref }}
                onLayout={this.yearScrollToInitialPosition}
                snapToInterval={50}
                onScroll={
                  Animated.event(
                    [{ nativeEvent: { contentOffset: { y: this.yearScroll } } }],
                    { useNativeDriver: false },
                  )
                }
                onMomentumScrollEnd={this.onChangeYearScroll}
                decelerationRate={0.8}
              >
                {
                  this.Years.map((item, index) => {
                    var color = this.yearScroll.interpolate({
                      inputRange: [(index - 1) * ITEM_HEIGHT, index * ITEM_HEIGHT, (index + 1) * ITEM_HEIGHT],
                      outputRange: [MS.Gray500, MS.Blue500, MS.Gray500],
                      extrapolate: 'clamp',
                    });
                    var size = this.yearScroll.interpolate({
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
                              fontSize: size,
                              color: color,
                              textAlign: 'center',
                              lineHeight: ITEM_HEIGHT,
                              height: ITEM_HEIGHT,
                              marginBottom: (index === this.Years.length - 1) ? ITEM_HEIGHT : 0, marginTop: (index === 0) ? ITEM_HEIGHT : 0,
                            }
                          ]}
                        >
                          {(1950 + index).toString()}
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

////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    backgroundColor: MS.Gray100,
  },
  modalContainer: {
    backgroundColor: MS.Gray100,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  modalContent: {
    backgroundColor: MS.Gray100,
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: 8,
    padding: 16,
    paddingBottom: 32,
  },
  panel: {
    height: 50,
    width: '100%',
    borderRadius: 8,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderColor: MS.Gray200,
    borderWidth: 1,
  },
  items: {
    padding: 16,
    paddingVertical: 8,
  }
});
