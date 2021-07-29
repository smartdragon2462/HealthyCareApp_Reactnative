// ***************************************************************************
//  @Created Date: 04/06/2021.
//  @Update:  04/06/2021.
//  @author:  ClerkedApp team.
//  @description:   A screen for procedures.
// ***************************************************************************

import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight, Dimensions, Animated, ScrollView, StatusBar } from 'react-native';
import { hideNavigationBar, showNavigationBar } from 'react-native-navigation-bar-color';
import { ActionSheet, MedicationListItem, SearchComp, HeaderComp, RoundButtonWithLeftIcon, Toast } from '../../../components';
import { Filter_icon, Medication_svg } from '../../../assets/icons';
import { medicationData, allergyData } from '../../../Data/Medications.json';
import medicineData from '../../../Data/medicineData1.json';
import { S } from '../../../mainStyle';
import * as MS from '../../../mainStyle';
import { User_img5, Doc_img1 } from '../../../assets/images';

// let medicationData = null;
const { width, height } = Dimensions.get('window');
const NAVBAR_HEIGHT = 46;
const options = [
  { component: <Text style={S.ft20S_G800}>{"Possible"}</Text>, height: 50, },
  { component: <Text style={S.ft20S_G800}>{"Confirmed"}</Text>, height: 50, },
  { component: <Text style={S.ft20S_G800}>{"Refuted"}</Text>, height: 50, },
  { component: <Text style={S.ft20S_G800}>{"Entered in error"}</Text>, height: 50, }
];

///////////////////////////////////////////////////////////////////////
export default class Medications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openToast: false,
      openDetailModal: false,
      isHeaderBorder: false,
      openConfirmModal: false,
      newData: allergyData,
      existData: medicationData,
    };
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onBackDetailModal = () => {
    this.setState({ openDetailModal: false })
  }

  ///////////////////////////////////////////////////////////////////////
  onCloseToast = () => {
    this.setState({ openToast: false });
  }

  ///////////////////////////////////////////////////////////////////////
  onVerifyNewDrug = (index) => {
    const { newData } = this.state;
    let tmp = newData.slice();
    tmp.splice(index, 1);
    this.setState({ newData: tmp });

    if (tmp.length === 0) {
      setTimeout(() => { this.setState({ openToast: true }) }, 200);
      setTimeout(() => { this.setState({ openToast: false }) }, 3000);
    }
  }

  ///////////////////////////////////////////////////////////////////////
  render() {
    const { newData, existData, isHeaderBorder, openToast } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ paddingTop: 22 }}>
          <HeaderComp
            isBorder={isHeaderBorder}
            leftText={"Medications"}
            rightText={""} onSave={() => console.log("")}
            onBackpage={this.onBackpage}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={({ nativeEvent }) => this.onScroll(nativeEvent)}
          decelerationRate={0.95}
        >
          <StatusBar backgroundColor={MS.Gray100} barStyle="dark-content" translucent={true} />
          <Toast messageText={"Your changes as been saved"} type={2} isVisible={openToast} onClose={this.onCloseToast} />
          {
            newData && newData.length > 0 ?
              (<NewDrug newData={newData} existData={existData} onVerifyNewDrug={this.onVerifyNewDrug} />)
              :
              (<ExistMedicine {...this.props} />)
          }
        </ScrollView>
      </SafeAreaView >
    );
  }
}









//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function NewDrug(props) {
  let actionSheet = null;
  const { newData, existData } = props;
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  const showActionSheet = (index) => {
    actionSheet.show();
    setSelectedIndex(index);
  }
  const getActionSheetRef = (ref) => { actionSheet = ref; }
  const handlePress = (index) => {
    const { onVerifyNewDrug } = props;
    onVerifyNewDrug(selectedIndex);
  };

  ///////////////////////////////////////////////////////////////////////
  return (
    <SafeAreaView style={styles.container}>
      <View style={[S.pd24, S.pb16, { backgroundColor: MS.Orange100 }]}>
        <Text style={[S.ft14_G600, S.mb8, { color: MS.Orange500 }]}>{"Please verify the new drug allergy entered by Sandra Barkley"}</Text>
        {
          newData &&
          newData.map((item, index) =>
            <View key={index} style={[S.rowFlex, S.pd16, S.card, { borderColor: MS.Orange300 }]}>
              <View style={S.rowFlex_start}>
                <Image source={User_img5} style={[S.avatar16, S.mr8]} resizeMode="contain" />
                <Text style={S.ft16S_G800}>{item.title}</Text>
              </View>
              <RoundButtonWithLeftIcon caption={"Possible"} onClick={showActionSheet} index={index} />
            </View>
          )
        }
      </View>
      <View style={S.pd24}>
        <Text style={S.ft14_G600}>{"Active"}</Text>
        {
          existData.map((item, index) => (
            <View key={index}>
              <MedicationListItem itemData={item} active={true} />
            </View>
          ))
        }
      </View>
      <ActionSheet ref={getActionSheetRef} options={options} onPress={handlePress} title={"Verification status"} />
    </SafeAreaView >
  );
}


///////////////////////////////////////////////////////////////////////
class ExistMedicine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDetailModal: false,
      isSearch: false,
      isPatient: true,
      searchTxt: "",
      sortType: -1,
      openConfirmModal: false,
      filteredMedicineList: medicineData,
      filteredProcedureList: medicationData,
    };
  }

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
      this.setState({ filteredMedicineList: medicineData, searchTxt: val, isSearch: false });
    } else {
      let filteredMedicineList = this.handleFilterMedicineList(medicineData, val);
      let filteredProcedureList = medicationData ? this.handleFilterProblemList(medicationData, val) : null;
      this.setState({ filteredMedicineList: filteredMedicineList, filteredProcedureList: filteredProcedureList, searchTxt: val, isSearch: true });
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
  onSelectMedicineListItem = (title) => {
    const { navigate } = this.props.navigation;
    navigate('MedicationDetail', { onGetNewMedication: this.onGetNewMedication, title: title });
  }

  ///////////////////////////////////////////////////////////////////////
  onGetNewMedication = (data) => {
    const { navigation } = this.props;
    const onGetNewMedication = navigation.getParam('onGetNewMedication');
    onGetNewMedication(data);
    navigation.goBack();
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onBackDetailModal = () => {
    this.setState({ openDetailModal: false })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onGetFocusOfSearchComp = () => {
  }

  ///////////////////////////////////////////////////////////////////////
  render() {
    const { filteredProcedureList, filteredMedicineList, searchTxt, isSearch } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={[S.rowFlex_start, { paddingHorizontal: 24 }]}>
          <View style={styles.searchComp}>
            <SearchComp searchTxt={searchTxt} placeholder={"Search to add new medication"} onChangeText={this.onChangeSearchComp} />
          </View>
          {
            medicationData && !isSearch &&
            <TouchableOpacity
              style={styles.filterButton}
              activeOpacity={0.5}
              onPress={() => this.showActionSheet()}
            >
              <Image source={Filter_icon} style={styles.filterIcon} resizeMode="contain" />
            </TouchableOpacity>
          }
        </View>

        <View style={S.pd24}>
          {
            isSearch ?
              (
                <View>
                  {
                    filteredProcedureList && filteredProcedureList.length > 0 &&
                    <View>
                      <Text style={S.ft14_G600}>{"Active"}</Text>
                      {
                        filteredProcedureList.map((item, index) => {
                          if (index < 100) return (
                            <View key={index}>
                              <MedicationListItem itemData={item} active={true} />
                            </View>
                          )
                        })
                      }
                      <Text style={[S.ft14_G600, S.mt24, { marginBottom: 11 }]}>{"Or choose a new medication"}</Text>
                    </View>
                  }
                  <View style={S.pl16}>
                    {
                      filteredMedicineList &&
                      filteredMedicineList.map((item, index) => {
                        if (index < 100) return (
                          <TouchableOpacity
                            key={item.name}
                            style={[S.mb16, { flex: 1 }]}
                            activeOpacity={0.5}
                            onPress={() => this.onSelectMedicineListItem(item.name)}
                          >
                            <Text style={[S.ft16_G800, { fontWeight: 'bold', lineHeight: 26 }]}>
                              {item.name.substring(0, searchTxt.length)}
                              <Text style={S.ft16_G800}>{item.name.substring(searchTxt.length)}</Text>
                            </Text>
                          </TouchableOpacity>
                        )
                      })
                    }
                  </View>
                </View>
              )
              :
              (
                <View style={{ justifyContent: "center", height: medicationData ? null : height - 135 }}>
                  {
                    medicationData ?
                      (
                        <View>
                          <Text style={S.ft14_G600}>{"Or directly add from the existing medication list"}</Text>
                          {
                            medicationData.map((item, index) => (
                              <View key={index}>
                                <MedicationListItem itemData={item} active={true} />
                              </View>
                            ))
                          }
                        </View>
                      ) :
                      (
                        <View style={{ justifyContent: "center", alignItems: "center", marginTop: -128 }}>
                          <View style={[{ padding: 16, backgroundColor: MS.Blue100, borderRadius: 50 }]}>
                            <Medication_svg width={16} height={16} fill={MS.Blue500} />
                          </View>
                          <Text style={[S.ft20S_G800, S.mt24]}>{"Medication list is empty"}</Text>
                          <Text style={[S.ft14_G600, S.mt8]}>{"Record all medications taken by Sandra Bullock"}</Text>
                        </View>
                      )
                  }
                </View>
              )
          }
        </View>
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
    paddingTop: 8
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
});

