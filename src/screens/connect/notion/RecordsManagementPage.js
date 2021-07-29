// ***************************************************************************
//  @Date:    04/05/2021: 
//  @Update:  04/05/2021
//  @author:  ClerkedApp team: 
//  @description:   A page to manage the recorded data. 
// ***************************************************************************

import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, Image, StatusBar, TouchableHighlight, TouchableOpacity, ScrollView, Dimensions, TextInput, Keyboard, Animated } from 'react-native';
import { Container, Button, Content, Icon } from 'native-base';
import { hideNavigationBar, showNavigationBar } from 'react-native-navigation-bar-color';
import Modal from 'react-native-modal';
import moment from 'moment';
import { ActionSheet, HeaderComp, SearchComp, ProblemListItem } from '../../../components';
import { Doc_img1, Doc_img2, Doc_img3, Doc_img4, Doc_img5 } from '../../../assets/images';
import { Filter_icon, Close_svg, Workup_svg } from '../../../assets/icons';
import { RECORD_SLIDER_DATA } from '../../../config/data';
import { problemData } from '../../../Data/ProblemList.json';
import medicineData from '../../../Data/medicineData.json';
// let problemData = null;
import { S } from '../../../mainStyle';
import * as MS from '../../../mainStyle';

const { width, height } = Dimensions.get('window');
const options = [
  { component: <Text style={S.ft20S_G800}>All</Text>, height: 50, },
  { component: <Text style={S.ft20S_G800}>Self Reported</Text>, height: 50, },
  { component: <Text style={S.ft20S_G800}>Dr. Robert Owen</Text>, height: 50, },
  { component: <Text style={S.ft20S_G800}>Dr. Lisa Brooks</Text>, height: 50, }
];

const sessionData = [
  { user_type: "caregive", title: "Dr. Sandra Barkley", type: "Ophtalmology", picture: Doc_img1, createdDate: "17 Dec 2020", isFlagged: true },
  { user_type: "caregive", title: "Dr. John Doe", type: "Cardiology", picture: Doc_img2, createdDate: "17 Dec 2020 9:15", isFlagged: true },
  { user_type: "caregive", title: "Dr. Roger Barkley", type: "Dermatology", picture: Doc_img3, createdDate: "17 Dec 2020 18:45", isFlagged: false },
  { user_type: "caregive", title: "Dr. Sandra Barkley", type: "Ophtalmology", picture: Doc_img4, createdDate: "17 Dec 2020 18:45", isFlagged: false },
  { user_type: "caregive", title: "Dr. Sandra Barkley", type: "Ophtalmology", picture: Doc_img5, createdDate: "17 Dec 2020 15:15", isFlagged: false },
]

export default class RecordsManagementPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isHeaderBorder: false,
      data: null,
      selectedItemIndex: 0
    };
  }

  ///////////////////////////////////////////////////////////////////////
  componentDidMount() {
    const { navigation } = this.props;
    // hideNavigationBar();

    let item = navigation.getParam('item');
    let selectedIndex = RECORD_SLIDER_DATA.findIndex((i) => i.id === item.id);
    this.setState({ selectedItemIndex: selectedIndex });
  }

  ///////////////////////////////////////////////////////////////////////
  onBackpage = () => {
  }

  ///////////////////////////////////////////////////////////////////////
  onScroll = (ev) => {
    const { isHeaderBorder } = this.state;
    if (!isHeaderBorder && ev.contentOffset.y > 8) this.setState({ isHeaderBorder: true });
    else if (isHeaderBorder && ev.contentOffset.y < 8) this.setState({ isHeaderBorder: false });
  }

  ///////////////////////////////////////////////////////////////////////
  render() {
    const { isHeaderBorder, selectedItemIndex } = this.state;
    const { navigate } = this.props.navigation;
    let Contents = SessionNotes;

    switch (selectedItemIndex) {
      case 0:
        Contents = SessionNotes;
        break;
      case 1:
        Contents = ProblemList;
        break;
      case 3:
        Contents = ProblemList;
        break;
      case 4:
        Contents = ProblemList;
        break;
      case 5:
        Contents = ProblemList;
        break;
      case 6:
        Contents = ProblemList;
        break;
      case 7:
        Contents = ProblemList;
        break;
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={{ backgroundColor: 'transparent', paddingTop: 20 }}>
          <HeaderComp
            active={true}
            isBorder={isHeaderBorder}
            leftText={"Britnay Sanders"} rightText={""}
            onSave={() => console.log("")}
            onBackpage={this.onBackpage}
          >
            <Icon type="Entypo" name='dots-three-horizontal' style={{ fontSize: 20, color: MS.Gray900 }} />
          </HeaderComp>
        </View>

        <View style={styles.contents}>
          <StatusBar backgroundColor={MS.Gray100} barStyle="dark-content" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={S.pb16}>
            <View style={styles.recordTools}>
              {
                RECORD_SLIDER_DATA.map((item, index) => {
                  let BGcolor = "transparent", textStyle = S.ft12S_G600;
                  if (index === selectedItemIndex) { BGcolor = MS.Blue500; textStyle = S.ft12S_W; }
                  return (
                    <TouchableOpacity
                      style={[styles.buttonStyle, { backgroundColor: BGcolor }]}
                      key={item.id}
                      onPress={() => {
                        this.setState({ selectedItemIndex: index });
                      }}
                    >
                      <Text style={textStyle}>{item.title}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </ScrollView>

          <ScrollView>
            <Contents {...this.props} />
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
class SessionNotes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isHeaderBorder: false,
      searchTxt: '',
    };
  }

  ///////////////////////////////////////////////////////////////////////
  componentDidMount() {
    // hideNavigationBar();
  }

  ///////////////////////////////////////////////////////////////////////
  onBackpage = () => {
    const { navigate } = this.props.navigation;
    navigate('PatientProfile');
  }

  ///////////////////////////////////////////////////////////////////////
  onChangeText = (val) => {
    this.setState({ searchTxt: val });
  }

  ///////////////////////////////////////////////////////////////////////
  onScroll = (ev) => {
    const { isHeaderBorder } = this.state;
    if (!isHeaderBorder && ev.contentOffset.y > 8) this.setState({ isHeaderBorder: true });
    else if (isHeaderBorder && ev.contentOffset.y < 8) this.setState({ isHeaderBorder: false });
  }

  ///////////////////////////////////////////////////////////////////////
  onClickSessionItem = (ev) => {
    const { navigate } = this.props.navigation;
    navigate('SessionNotesDetail');
  }


  ///////////////////////////////////////////////////////////////////////
  render() {
    const { searchTxt, isHeaderBorder } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <Container style={styles.container}>
        <Content
          style={styles.contents}
          showsVerticalScrollIndicator={false}
          onScroll={({ nativeEvent }) => this.onScroll(nativeEvent)}
        >
          <View style={{ marginVertical: 8 }}>
            <SearchComp
              onChangeText={(ev) => this.onChangeText(ev)}
              searchTxt={searchTxt}
              placeholder={"Type to search..."}
              type={2}
            />
          </View>

          <View style={{ marginTop: 8, marginBottom: 24 }}>
            {
              sessionData &&
              sessionData.map((item, i) => (
                <TouchableHighlight key={i}
                  activeOpacity={0.8}
                  underlayColor="transparent"
                  onPress={() => this.onClickSessionItem()}
                >
                  <ProblemListItem itemData={item} />
                </TouchableHighlight>
              ))
            }
          </View>
        </Content>
      </Container>
    );
  }
}



//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
class ProblemList extends React.Component {
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
    };
    this.actionSheet = null;
  }

  ///////////////////////////////////////////////////////////////////////
  handleFilterMedicineList = (_dataList, _searchStr) => {
    // let filteredMedicineList = _dataList.filter((elem) => elem.name.toLowerCase().includes(_searchStr.toLowerCase()));
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  showActionSheet = () => this.actionSheet.show();
  getActionSheetRef = ref => (this.actionSheet = ref);
  handlePress = (index) => {
    this.setState({ sortType: index });
  };

  ///////////////////////////////////////////////////////////////////////
  onClickSearchItem = () => {
  }

  ///////////////////////////////////////////////////////////////////////
  componentDidMount() {
    // hideNavigationBar();
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
    let new_data = { "user_type": "doctor", "title": selectedData.name, "type": " Possible", "picture": null, "isFlagged": true, "createdDate": moment().format("DD MMM YYYY") };
    onGetNewProblem(new_data);
    this.setState({ openConfirmModal: false });
    const { navigate } = this.props.navigation;
    navigate('SessionNotesDetail');
  }


  ///////////////////////////////////////////////////////////////////////
  render() {
    const { filteredProblemList, filteredMedicineList, searchTxt, sortType, isSearch, openConfirmModal } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
          <View style={[styles.contents]}>
            {
              problemData &&
              <View style={[S.rowFlex_start, S.mt8]}>
                <View style={styles.searchComp}>
                  <SearchComp searchTxt={searchTxt} placeholder={"Search to add new diagnosis"} onChangeText={this.onChangeSearchComp} />
                </View>
                <TouchableHighlight style={styles.filterButton} activeOpacity={0.9} underlayColor="transparent" onPress={() => this.showActionSheet()}>
                  <Image source={Filter_icon} style={styles.filterIcon} resizeMode="contain" />
                </TouchableHighlight>
              </View>
            }

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
        </ScrollView>
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
    flex: 1
  },
  contents: {
    paddingTop: 8,
    backgroundColor: MS.Gray100,
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 8,
    marginRight: 8,
    borderRadius: 8,
  },
  recordTools: {
    flexDirection: "row",
    flexWrap: 'nowrap',
    // marginTop: 16,
    paddingHorizontal: 24,
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
})
