// ***************************************************************************
//  @Created Date: 03/22/2021.
//  @Update:  03/24/2021.
//  @author:  ClerkedApp team.
//  @description:   A screen for problem list.
// ***************************************************************************

import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableHighlight, Dimensions, Animated, StatusBar } from 'react-native';
import { Button } from 'native-base';
import { hideNavigationBar, showNavigationBar } from 'react-native-navigation-bar-color';
import Modal from 'react-native-modal';
import moment from 'moment';
import { ActionSheet, ProblemListItem, SearchComp, HeaderComp } from '../../../components';
import { Filter_icon, Close_svg, Workup_svg } from '../../../assets/icons';
import { S } from '../../../mainStyle';
import * as MS from '../../../mainStyle';
import { problemData } from '../../../Data/ProblemList.json';
import medicineData from '../../../Data/medicineData.json';

// let problemData = null;
const { width, height } = Dimensions.get('window');

const actionSheetStyles = StyleSheet.create({
  Item: {
    fontFamily: 'Proxima-Nova-Semibold',
    fontWeight: '100',
    fontSize: 20,
    lineHeight: 24,
    color: MS.Gray800,
  },
});

const options = [
  { component: <Text style={actionSheetStyles.Item}>All</Text>, height: 50, },
  { component: <Text style={actionSheetStyles.Item}>Self Reported</Text>, height: 50, },
  { component: <Text style={actionSheetStyles.Item}>Dr. Robert Owen</Text>, height: 50, },
  { component: <Text style={actionSheetStyles.Item}>Dr. Lisa Brooks</Text>, height: 50, }
];

const NAVBAR_HEIGHT = 46;
const COLOR = MS.Gray100;

///////////////////////////////////////////////////////////////////////
export default class ProblemList extends React.Component {
  scroll = new Animated.Value(0);

  constructor(props) {
    super(props);
    this.state = {
      isHeaderBorder: false,
      isSearch: false,
      searchTxt: "",
      sortType: -1,
      selectedData: null,
      openConfirmModal: false,
      filteredMedicineList: medicineData,
      filteredProblemList: problemData,
      y: 0
    };
    this.actionSheet = null;
    this.headerY = Animated.multiply(Animated.diffClamp(this.scroll, 0, NAVBAR_HEIGHT), -1);
  }

  ///////////////////////////////////////////////////////////////////////
  componentDidMount() {
    // hideNavigationBar();
  }

  ///////////////////////////////////////////////////////////////////////
  onScroll = (ev) => {
    const { isHeaderBorder } = this.state;
    if (!isHeaderBorder && ev.contentOffset.y > 8) this.setState({ isHeaderBorder: true });
    else if (isHeaderBorder && ev.contentOffset.y < 8) this.setState({ isHeaderBorder: false });
  }

  ///////////////////////////////////////////////////////////////////////
  onscrollEnd = (ev) => {
    const { isHeaderBorder } = this.state;
    if (!isHeaderBorder && ev.contentOffset.y > 8) this.setState({ isHeaderBorder: true });
    else if (isHeaderBorder && ev.contentOffset.y < 8) this.setState({ isHeaderBorder: false });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  showActionSheet = () => this.actionSheet.show();
  getActionSheetRef = ref => (this.actionSheet = ref);
  handlePress = (index) => {
    this.setState({ sortType: index });
  };

  ///////////////////////////////////////////////////////////////////////
  handleFilterMedicineList = (_dataList, _searchStr) => {
    let data = _dataList.filter((elem) => elem.name.length >= _searchStr.length && elem.name.substring(0, _searchStr.length).toLowerCase() === _searchStr.toLowerCase());
    return data;
  }

  ///////////////////////////////////////////////////////////////////////
  handleFilterProblemList = (_dataList, _searchStr) => {
    let data = _dataList.filter((elem) => elem.title.length >= _searchStr.length && elem.title.substring(0, _searchStr.length).toLowerCase() === _searchStr.toLowerCase());
    return data;
  }

  ///////////////////////////////////////////////////////////////////////
  onChangeSearchComp = (val) => {
    if (val === "") {
      this.setState({ searchTxt: val, isSearch: false });
      this.setState({ filteredMedicineList: medicineData });
    } else {
      let filteredMedicineList = this.handleFilterMedicineList(medicineData, val);
      let filteredProblemList = problemData ? this.handleFilterProblemList(problemData, val) : null;
      this.setState({ searchTxt: val, isSearch: true });
      this.setState({ filteredMedicineList: filteredMedicineList, filteredProblemList: filteredProblemList });
    }
  }

  ///////////////////////////////////////////////////////////////////////
  onClickSearchItem = () => {
  }

  ///////////////////////////////////////////////////////////////////////
  onSelectMedicineListItem = (data) => {
    this.setState({ selectedData: data, openConfirmModal: true });
  }

  ///////////////////////////////////////////////////////////////////////
  onClickConfirmButton = () => {
    const { navigation } = this.props;
    const { selectedData } = this.state;
    const onGetNewProblem = navigation.getParam('onGetNewProblem');
    let new_data = { "user_type": "doctor", "title": selectedData.name, "type": " Confirmed", "picture": null, "isFlagged": true, "createdDate": moment().format("DD MMM YYYY") };
    onGetNewProblem(new_data);
    this.setState({ openConfirmModal: false });

    const { navigate } = this.props.navigation;
    navigate('SessionNotesDetail');
  }

  ///////////////////////////////////////////////////////////////////////
  onClickPossibleButton = () => {
    const { navigation } = this.props;
    const { selectedData } = this.state;
    const onGetNewProblem = navigation.getParam('onGetNewProblem');
    let new_data = {
      "user_type": "doctor",
      "title": selectedData.name,
      "type": " Possible",
      "picture": null,
      "isFlagged": false,
      "createdDate": moment().format("DD MMM YYYY")
    };
    onGetNewProblem(new_data);
    this.setState({ openConfirmModal: false });
    const { navigate } = this.props.navigation;
    navigate('SessionNotesDetail');
  }


  ///////////////////////////////////////////////////////////////////////
  render() {
    const { filteredProblemList, filteredMedicineList, searchTxt, sortType, isHeaderBorder, isSearch, openConfirmModal } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <Animated.View style={{
          width: "100%",
          position: "absolute",
          transform: [{ translateY: this.headerY }],
          elevation: 0, flex: 1, zIndex: 1,
          backgroundColor: COLOR,
          borderBottomWidth: isHeaderBorder ? 1 : 0,
          borderBottomColor: MS.Gray300
        }}>
          <View style={{ paddingTop: 22 }}>
            <HeaderComp active={true} leftText={"Problem list"} rightText={""} onSave={() => console.log("")} onBackpage={this.onBackpage} />
          </View>
          <View style={[S.rowFlex_start, { paddingHorizontal: 24, paddingVertical: 8 }]}>
            <View style={styles.searchComp}>
              <SearchComp searchTxt={searchTxt} placeholder={"Search to add new diagnosis"} onChangeText={this.onChangeSearchComp} />
            </View>
            <TouchableHighlight style={styles.filterButton} activeOpacity={0.9} underlayColor="transparent" onPress={() => this.showActionSheet()}>
              <Image source={Filter_icon} style={styles.filterIcon} resizeMode="contain" />
            </TouchableHighlight>
          </View>
        </Animated.View>

        <Animated.ScrollView
          scrollEventThrottle={1}
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={{ zIndex: 0, elevation: -1 }}
          contentContainerStyle={{ paddingTop: NAVBAR_HEIGHT * 2 + 22 }}
          onScroll={
            Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.scroll } } }],
              { useNativeDriver: true },
            )
          }
          onMomentumScrollEnd={({ nativeEvent }) => this.onscrollEnd(nativeEvent)}
          overScrollMode="never"
        >
          <View style={styles.contents}>
            <StatusBar backgroundColor={MS.Gray100} barStyle="dark-content" translucent={true} />
            <View style={{ paddingVertical: 24 }}>
              {
                isSearch ?
                  (
                    <View>
                      {
                        filteredProblemList && filteredProblemList.length > 0 &&
                        <View>
                          <Text style={S.ft14_G600}>{"Add from the existing problem list"}</Text>
                          {
                            filteredProblemList.map((item, index) => {
                              if (index < 100) return (
                                <ProblemListItem itemData={item} key={index} active={true} />
                              )
                            })
                          }
                          <Text style={[S.ft14_G600, S.mt24, { marginBottom: 11 }]}>{"Or choose a new diagnosis"}</Text>
                        </View>
                      }
                      <View style={S.pl16}>
                        {
                          filteredMedicineList &&
                          filteredMedicineList.map((item, index) => {
                            if (index < 100) return (
                              <TouchableHighlight key={item.name} style={[S.mb16, { flex: 1 }]} activeOpacity={0.8} underlayColor="transparent" onPress={() => this.onSelectMedicineListItem(item)}>
                                <Text style={[S.ft16_G800, { fontWeight: 'bold', lineHeight: 26 }]}>
                                  {item.name.substring(0, searchTxt.length)}
                                  <Text style={S.ft16_G800}>{item.name.substring(searchTxt.length)}</Text>
                                </Text>
                              </TouchableHighlight>
                            )
                          })
                        }
                      </View>
                    </View>
                  )
                  :
                  (
                    <View style={{ justifyContent: "center", height: problemData ? null : height - 128 }}>
                      {
                        problemData ?
                          (
                            <View>
                              <Text style={S.ft14_G600}>{"Or directly add from the existing Problem list"}</Text>
                              {
                                problemData.map((item, index) => (
                                  <ProblemListItem itemData={item} key={index} />
                                ))
                              }
                            </View>
                          )
                          :
                          (
                            <View style={{ justifyContent: "center", alignItems: "center", marginTop: -128 }}>
                              <View style={[{ padding: 16, backgroundColor: MS.Blue100, borderRadius: 50 }]}>
                                <Workup_svg width={16} height={16} fill={MS.Blue500} />
                              </View>
                              <Text style={[S.ft20S_G800, S.mt24]}>{"Problem list is empty"}</Text>
                              <Text style={[S.ft14_G600, S.mt8]}>{"Enter a diagnosis for Sandra Bullock"}</Text>
                            </View>
                          )
                      }
                    </View>
                  )
              }
            </View>
          </View>
        </Animated.ScrollView>
        <ActionSheet ref={this.getActionSheetRef} options={options} onPress={this.handlePress} title={"Sort by"} checkInd={sortType} />

        <Modal
          animationInTiming={400}
          animationOutTiming={300}
          backdropTransitionInTiming={400}
          backdropTransitionOutTiming={300}
          style={{ justifyContent: 'center' }}
          isVisible={openConfirmModal}
          backdropOpacity={0.6}
          useNativeDriverForBackdrop
          statusBarTranslucent
        >
          <View style={styles.modalView}>
            <TouchableHighlight style={styles.modalClose} activeOpacity={0.6} underlayColor='transparent'
              onPress={() => { this.setState({ openConfirmModal: false }) }}
            >
              <Close_svg width={16} height={16} fill={MS.Gray400} />
            </TouchableHighlight>
            <View style={{ marginTop: 16, width: "100%" }} >
              <Text style={{ ...S.ft16_G800, lineHeight: 26, textAlign: "center" }}>{"Asthma is a possible or confirmed problem?"}</Text>
              <View style={S.mt24}>
                <Button style={[S.BlueButton, { height: 35 }]} onPress={() => this.onClickConfirmButton()}>
                  <Text style={S.ft16S_W}>{"Confirmed"}</Text>
                </Button>
                <Button style={[S.LBlueButton, S.mt8, { height: 35 }]} onPress={() => this.onClickPossibleButton()}>
                  <Text style={S.ft16S_B500}>{"Possible"}</Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView >
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    backgroundColor: MS.Gray100,
    height: "100%"
  },
  contents: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  filterIcon: {
    width: 18,
    height: 18,
  },
  filterButton: {
    borderRadius: 8,
    backgroundColor: '#F2F3F4',
    padding: 10,
    alignItems: 'center',
    marginLeft: 10
  },
  searchComp: {
    width: '100%',
    flex: 1,
  },
  modalClose: {
    position: "absolute",
    top: 11,
    right: 11,
    padding: 5
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 24,
    alignItems: "center",
  },
});

