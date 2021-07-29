// ***************************************************************************
//  @Created Date:  04/10/2021
//  @Update:  04/10/2021
//  @author:  ClerkedApp team
//  @description:   A component for medication tool
// ***************************************************************************

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Dimensions, Image, TextInput, ScrollView } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import Modal from 'react-native-modal';
import moment from 'moment';
import { Medication_svg } from '../assets/icons';
import { User_img5 } from '../assets/images';
import MedicationListItem from './ListItems/MedicationListItem';
import { S } from '../mainStyle';
import * as MS from '../mainStyle';

const { width, height } = Dimensions.get('screen');

export default class MedicationComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      medicationList: null,
      openActionsheet: false,
      openDetailModal: false,
      selectedData: null
    };
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    const { navigate } = this.props.navigation;
    this.setState({ medicationList: this.props.data })

    if (!this.props.data) {
      navigate('Medications', { onGetNewMedication: this.onGetNewMedication });
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onGetNewMedication = (data) => {
    this.setState({ medicationList: [data] });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onAddNewMedication = () => {
    const { medicationList } = this.state;
    let tmpData = medicationList;
    tmpData.push({
      route: "Oral use",
      asneedObj: { flag: false, content: '' },
      medicineRemarks: "",
      remarks: { picture: true, name: "", content: "" },
      // asNeeded: "",
      form: { form: "", concentration: "", reason: "" },
      entryDate: moment().format("DD MMM YYYY mm:ss"),
      dosageAndtimeList: [{ dosage: "", usage_time: "", usage_duration: "" }],
    });
    this.setState({ medicationList: tmpData });

    let { data } = this.props;
    data = tmpData;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onClickItem = (data) => {
    this.setState({ selectedData: data, openDetailModal: true });
    setTimeout(() => {
      this.setState({ openDetailModal: true });
    }, 100);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onBackDetailModal = () => {
    this.setState({ openDetailModal: false })
  }

  ///////////////////////////////////////////////////////////////////////
  render() {
    const { medicationList, selectedData, openDetailModal } = this.state;

    return (
      <Container style={styles.container}>
        <View style={[S.rowFlex, { paddingVertical: 8 }]}>
          <View style={S.rowFlex_start}>
            <Medication_svg width={16} height={16} fill={MS.Gray800} />
            <Text style={[S.ft16S_G800, S.ml16]}>{"Medication"}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.5} onPress={() => this.onAddNewMedication()}>
            <Icon name="plus" type="Feather" style={{ fontSize: 25, color: MS.Gray600 }} />
          </TouchableOpacity>
        </View>
        <View>
          {
            medicationList &&
            medicationList.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.5}
                onPress={() => this.onClickItem(item)}
              >
                <MedicationListItem itemData={item} />
              </TouchableOpacity>
            ))
          }
        </View>
        {
          selectedData &&
          <DetailModal visible={openDetailModal} onBack={this.onBackDetailModal} data={selectedData} />
        }
      </Container>
    );
  }
}


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
class DetailModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
      openActionsheet: false,
      actionSheetTitle: "",
    };
  }

  ///////////////////////////////////////////////////////////////////////
  componentDidMount() {
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  UNSAFE_componentWillReceiveProps(nextProps) {
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onChangeText = (ev) => {
    let tmp = this.state.data;
    tmp.remarks.content = ev;
    this.setState({data:tmp});
  }

  ///////////////////////////////////////////////////////////////////////
  render() {
    const { data, visible, onBack } = this.props;

    console.log("data==========>", data);

    return (
      <View>
        <Modal
          statusBarTranslucent
          useNativeDriverForBackdrop
          isVisible={visible}
          animationInTiming={400}
          animationOutTiming={300}
          backdropTransitionInTiming={400}
          backdropTransitionOutTiming={300}
          onBackdropPress={() => onBack()} //()=>this.setState({ openDetailModal: false }
          style={{ justifyContent: 'flex-end', margin: 0 }}
          backdropOpacity={0.6}
        >
          <View style={[styles.modalContainer, { maxHeight: height - 98 }]}>
            <View style={{ height: 32, paddingTop: 8 }}>
              <View style={styles.modalIndicator} />
            </View>

            <ScrollView 
              style={{ width: "100%", paddingBottom: 24 }} 
              showsVerticalScrollIndicator={false}
              bounces={false}
              decelerationRate={0}
              scrollEventThrottle={20}
            >
              <View style={[S.rowFlex_start, { alignItems: "flex-start" }]}>
                <View style={S.mr16}>
                  <Medication_svg width={24} height={24} fill={MS.Blue500} />
                </View>
                <View>
                  {
                    data &&
                    <Text style={[S.ft16S_G800, { lineHeight: null }]}>{data.title}, {data.form.concentration}</Text>
                  }
                  <View>
                    {
                      data && data.dosageAndtimeList &&
                      data.dosageAndtimeList.map((item, index) => {
                        let timeText = item.usage_time + " " + item.usage_duration;
                        if (item.usage_duration.toLowerCase() === "time of day") {
                          timeText = "at " + item.usage_time;
                        } else if (item.usage_duration.toLowerCase() === "hourly") {
                          let time = parseInt(item.usage_time.replace('h', ''));
                          if (time <= 1) timeText = "every " + time + " hour";
                          else timeText = "every " + + time + " hours";
                        }
                        return (
                          <View key={index} style={[S.rowFlex_start, { marginTop: 4 }]}>
                            <Text style={[S.ft14_G600, { marginRight: 4 }]}>
                              {item.dosage}, {timeText}
                            </Text>
                            {
                              data && data.asneedObj.flag &&
                              <Text style={[S.textFrame_Blue, { alignSelf: "flex-start" }]}>{"As needed"}</Text>
                            }
                          </View>
                        )
                      })
                    }
                  </View>
                </View>
              </View>

              {
                data &&
                <View style={[S.bottomBorder, { paddingVertical: 16 }]}>
                  <View style={[S.bottomBorder, S.pt16, S.pb8]}>
                    <View style={[S.rowFlex_start, { paddingVertical: 8 }]}>
                      <Text style={[S.ft14S_G600, { flex: 1 }]}>{"Prescribed in"}</Text>
                      <Text style={[S.ft14S_G900, { flex: 1 }]}>{moment(data.createdDate).format("DD MMM YYYY hh:mm A")}</Text>
                    </View>
                    <View style={[S.rowFlex_start, { paddingVertical: 8 }]}>
                      <Text style={[S.ft14S_G600, { flex: 1 }]}>{"Expire at"}</Text>
                      <Text style={[S.ft14S_G900, { flex: 1 }]}>{moment(data.expireDate).format("DD MMM YYYY")}</Text>
                    </View>
                    {
                      data.form.form.length>0 &&
                      <View style={[S.rowFlex_start, { paddingVertical: 8 }]}>
                        <Text style={[S.ft14S_G600, { flex: 1 }]}>{"Form"}</Text>
                        <Text style={[S.ft14S_G900, { flex: 1 }]}>{data.form.form}</Text>
                      </View>
                    }
                    <View style={[S.rowFlex_start, { paddingVertical: 8 }]}>
                      <Text style={[S.ft14S_G600, { flex: 1 }]}>{"Route"}</Text>
                      <Text style={[S.ft14S_G900, { flex: 1 }]}>{data.route}</Text>
                    </View>
                    {
                       data.form.concentration.length>0 &&
                      <View style={[S.rowFlex_start, { paddingVertical: 8 }]}>
                        <Text style={[S.ft14S_G600, { flex: 1 }]}>{"Concentration"}</Text>
                        <Text style={[S.ft14S_G900, { flex: 1 }]}>{data.form.concentration}</Text>
                      </View>
                    }
                    <View style={[S.rowFlex_start, { paddingVertical: 8 }]}>
                      <Text style={[S.ft14S_G600, { flex: 1 }]}>{"Prescribed by"}</Text>
                      <View style={[S.rowFlex_start, { flex: 1 }]}>
                        {
                          data.prescribed.picture &&
                          <Image source={User_img5} style={{ width: 16, height: 16 }} resizeMode="contain" />
                        }
                        <Text style={[S.ft14S_G900, S.ml8]}>{data.prescribed.name}</Text>
                      </View>
                    </View>
                  </View>

                  {
                    data.form.reason.length>0 &&
                    <View style={{ marginTop: 24 }}>
                      <Text style={S.ft16S_G800}>{"Reason for medication"}</Text>
                      <Text style={[S.ft16_G700, { lineHeight: 26, padding: 0 }]}>{data.form.reason}</Text>
                    </View>
                  }
                  {
                    data.medicineRemarks.length>0 &&
                    <View style={{ marginTop: 24 }}>
                      <Text style={S.ft16S_G800}>{"Reason for medication"}</Text>
                      <Text style={[S.ft16_G700, { lineHeight: 26, padding: 0 }]}>{data.medicineRemarks}</Text>
                    </View>
                  }
                  {
                    data.asneedObj.flag &&
                    <View style={{ marginTop: 24 }}>
                      <Text style={S.ft16S_G800}>{"Take as needed for"}</Text>
                      <Text style={[S.ft16_G700, { lineHeight: 26, padding: 0 }]}>{data.asneedObj.content}</Text>
                    </View>
                  }
                </View>
              }

              <View style={{ paddingVertical: 16 }}>
                <Text style={[S.ft16S_G800, { lineHeight: 26 }]}>{"Remarks"}</Text>
                <View style={S.rowFlex_start}>
                  <Image source={User_img5} style={styles.picture} resizeMode="contain" />
                  <Text style={[S.ft14S_G900, S.ml8, { lineHeight: null }]}>{"Dr. Peter Smith"}</Text>
                </View>
                <TextInput
                  multiline
                  placeholder={"Write a remark..."}
                  placeholderTextColor={MS.Gray600}
                  style={[S.ft16_G700, { lineHeight: 26 }]}
                  value={data ? data.remarks.content : ""}
                  onChangeText={(ev) => this.onChangeText(ev)}
                />
              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    height: "100%"
  },
  modalContainer: {
    backgroundColor: MS.Gray100,
    alignItems: "center",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingHorizontal: 24,
    paddingTop: 0,
  },
  modalIndicator: {
    backgroundColor: MS.Blue300,
    width: 40,
    height: 3,
    borderRadius: 10,
    marginTop: 0
  },
  picture: {
    width: 16,
    height: 16,
    borderRadius: 20
  },
});
