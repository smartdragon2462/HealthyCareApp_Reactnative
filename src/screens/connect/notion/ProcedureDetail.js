// ***************************************************************************
//  @Created Date: 04/01/2021.
//  @Update:  04/01/2021.
//  @author:  ClerkedApp team.
//  @description:  A screen for the detail procedures.
// ***************************************************************************

import React from 'react';
import { StyleSheet, Text, ScrollView, TextInput, View, Image, TouchableHighlight, StatusBar } from 'react-native';
import { hideNavigationBar, showNavigationBar } from 'react-native-navigation-bar-color';
import DocumentPicker from 'react-native-document-picker';
import Modal from 'react-native-modal';
import moment from 'moment';
import { SearchComp, HeaderComp, CalendarModal, CareTeamItem, FileAttachPanel, UploadPdfProgressBar } from '../../../components';
import { Procedures_svg, Attach_svg } from '../../../assets/icons';
import { Doc_img1, Doc_img2, Doc_img3, Doc_img4, Doc_img5, Doc_img6 } from '../../../assets/images';
import { S } from '../../../mainStyle';
import * as MS from '../../../mainStyle';

let doctorList = [
  { photo: Doc_img5, name: 'Monica Madison', id: '1234560', email: 'eee@gmail.com', phoneNum: "+6534657976", role: 'cvm' },
  { photo: Doc_img6, name: 'William Defoe', id: '123461', email: 'fff@gmail.com', phoneNum: "+65673455667", role: 'cts' },
  { photo: Doc_img1, name: 'Edwards McCakine', id: '123462', email: 'ggg@gmail.com', phoneNum: "+65756855645", role: 'cts' },
  { photo: Doc_img2, name: 'Robert Owen', id: '123463', email: 'aaa@gmail.com', phoneNum: "+65916147854", role: 'cts' },
  { photo: Doc_img3, name: 'Johana Smith', id: '123464', email: 'bbb@gmail.com', phoneNum: "+65742334533", role: 'cts' },
  { photo: Doc_img4, name: 'Rebecca Bryans', id: '123465', email: 'ccc@gmail.com', phoneNum: "+65756484453", role: 'nem' },
  { photo: Doc_img1, name: 'Sarah Jones', id: '123466', email: 'ddd@gmail.com', phoneNum: "+65123345363", role: 'cvm' },
]

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export default class ProcedureDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      entryDate: moment().format("DD MMM YYYY mm:ss"),
      title: "",
      selectedDate: null,
      procedureDate: null,
      procedureBy: null,
      attachFileItem: null,
      reportPicture: null,
      complicationPicture: null,
      reportDocument: '',
      complicationDocument: '',
      reason: "",
      report: "",
      complication: "",
      isHeaderBorder: false,
      openCalendarModal: false,
      openProcedureByModal: false,
      openFileAttachModal: false,
    };
  }

  ///////////////////////////////////////////////////////////////////////
  componentDidMount() {
    const { navigation } = this.props;
    const title = navigation.getParam('title');
    this.setState(
      {
        entryDate: moment().format("DD MMM YYYY mm:ss"),
        title: title
      });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { navigation } = nextProps;
    const title = navigation.getParam('title');
    this.setState(
      {
        entryDate: moment().format("DD MMM YYYY mm:ss"),
        title: title
      });
  }

  ///////////////////////////////////////////////////////////////////////
  onSetProcedureDate = (ev) => {
    let date = moment(ev.dateString).format('DD MMM YYYY');
    let date1 = moment(ev.dateString).format('YYYY-MM-DD');
    this.setState({ procedureDate: date, selectedDate: date1, openCalendarModal: false });
  }

  ///////////////////////////////////////////////////////////////////////
  onSetProcedureBy = (dataList) => {
    this.setState({ procedureBy: dataList, openProcedureByModal: false });
  }

  ///////////////////////////////////////////////////////////////////////
  onClickProcedureBy = () => {
    this.setState({ openProcedureByModal: true });
  }

  ///////////////////////////////////////////////////////////////////////
  onBackProcedureByModal = () => {
    this.setState({ openProcedureByModal: false });
  }

  ///////////////////////////////////////////////////////////////////////
  onUploadFile = (item) => {
    this.setState({ openFileAttachModal: true, attachFileItem: item });
  }

  ///////////////////////////////////////////////////////////////////////
  onGetPicture = (data) => {
    const { attachFileItem } = this.state;
    if (attachFileItem === "report") {
      this.setState({ reportPicture: data });
    } else this.setState({ complicationPicture: data });
  }

  ///////////////////////////////////////////////////////////////////////
  onGetDocument = (data) => {
    const { attachFileItem } = this.state;
    if (attachFileItem === "report") {
      this.setState({ reportDocument: data });
    } else this.setState({ complicationDocument: data });
  }
  ///////////////////////////////////////////////////////////////////////
  onTouchCamera = () => {
    const { navigate } = this.props.navigation;
    this.setState({ openFileAttachModal: false });
    navigate('CameraScreen', { onGetPicture: this.onGetPicture });
  }

  ///////////////////////////////////////////////////////////////////////
  onTouchDocument = () => {
    this.selectOneFile();
    this.setState({ openFileAttachModal: false });
  }

  ///////////////////////////////////////////////////////////////////////
  onBackScreen = () => {
    const { navigate, goBack } = this.props.navigation;
    // navigate('Procedures');
    goBack();
  }

  ///////////////////////////////////////////////////////////////////////
  onScroll = (ev) => {
    const { isHeaderBorder } = this.state;
    if (!isHeaderBorder && ev.contentOffset.y > 8) this.setState({ isHeaderBorder: true });
    else if (isHeaderBorder && ev.contentOffset.y < 8) this.setState({ isHeaderBorder: false });
  }

  ///////////////////////////////////////////////////////////////////////
  onClickSave = () => {
    const { navigation } = this.props;
    const {
      title, entryDate, procedureDate, procedureBy, reportPicture, complicationPicture,
      reportDocument, complicationDocument, reason, report, complication
    } = this.state;

    const onGetNewProcedure = navigation.getParam('onGetNewProcedure');

    let tmp_report = "", tmp_complication = "";

    if (report.length > 0) tmp_report = report;
    else if (!reportDocument) tmp_report = reportDocument;
    else if (!reportPicture) tmp_report = reportPicture;

    if (complication.length > 0) tmp_complication = complication;
    else if (!complicationDocument) tmp_complication = complicationDocument;
    else if (!complicationPicture) tmp_complication = complicationPicture;

    let new_data = {
      title: title,
      isFlagged: false,
      createdDate: entryDate,
      estimatedDate: procedureDate,
      procedureBy: procedureBy,
      reason: reason,
      report: tmp_report,
      complications: tmp_complication,
    };

    onGetNewProcedure(new_data);
    navigation.goBack();

  }

  ///////////////////////////////////////////////////////////////////////
  onChangeText = (txt, type) => {
    if (type === 'reason') this.setState({ reason: txt });
    else if (type === 'report') this.setState({ report: txt });
    else if (type === 'complication') this.setState({ complication: txt });
  }

  ///////////////////////////////////////////////////////////////////////
  selectOneFile = async () => {
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      //Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res.uri);
      console.log('Type : ' + res.type);
      console.log('File Name : ' + res.name);
      console.log('File Size : ' + res.size);
      //Setting the state to show single file attributes
      this.onGetDocument(res);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  ///////////////////////////////////////////////////////////////////////
  render() {
    const {
      title,
      entryDate,
      selectedDate,
      procedureDate,
      procedureBy,
      reportPicture,
      complicationPicture,
      reportDocument,
      complicationDocument,
      reason,
      report,
      complication,
      openCalendarModal,
      openProcedureByModal,
      openFileAttachModal,
      isHeaderBorder } = this.state;

    return (
      <View style={styles.container}>
        <View style={[{ width: "100%", backgroundColor: MS.Gray100 }]}>
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

          <ScrollView style={styles.content} decelerationRate={0.95} onScroll={({ nativeEvent }) => this.onScroll(nativeEvent)}>
            <View style={{ width: "100%", padding: 24, paddingTop: 0 }} >
              <StatusBar backgroundColor={MS.Gray100} barStyle="dark-content" translucent={true} />

              <View style={S.rowFlex_start}>
                <Procedures_svg width={24} height={24} fill={MS.Blue500} />
                <Text style={[S.ft20S_G800, S.ml16, { lineHeight: null, textTransform: 'capitalize' }]}>{title}</Text>
              </View>

              <View style={[S.bottomBorder, S.pt16, S.pb8]}>
                <View style={[S.rowFlex_start, { paddingVertical: 8 }]}>
                  <Text style={[S.ft14S_G600, { flex: 1 }]}>{"Entry date"}</Text>
                  <Text style={[S.ft14S_G900, { flex: 1 }]}>{entryDate}</Text>
                </View>
                <View style={[S.rowFlex_start, { paddingVertical: 8 }]}>
                  <Text style={[S.ft14S_G600, { flex: 1 }]}>{"Procedure date"}</Text>
                  <TouchableHighlight style={{ flex: 1 }} activeOpacity={0.8} underlayColor="transparent" onPress={() => this.setState({ openCalendarModal: true })}>
                    <Text style={procedureDate ? S.ft14S_G900 : S.ft14S_G500}>{procedureDate ? procedureDate : "Empty"}</Text>
                  </TouchableHighlight>
                </View>
                <View style={[S.rowFlex_start, { paddingVertical: 8, alignItems: "flex-start" }]}>
                  <Text style={[S.ft14S_G600, { flex: 1 }]}>{"Procedure by"}</Text>
                  {
                    procedureBy ?
                      (
                        <View style={{ flex: 1 }}>
                          {
                            procedureBy.map((item, index) => (
                              <View style={[S.rowFlex_start, S.mb8]} key={index}>
                                <Image source={item.photo} style={{ width: 16, height: 16 }} resizeMode="contain" />
                                <Text style={[S.ft14S_G900, S.ml8]}>{item.name}</Text>
                              </View>
                            ))
                          }
                        </View>
                      )
                      :
                      (
                        <TouchableHighlight style={{ flex: 1 }} activeOpacity={0.8} underlayColor="transparent" onPress={() => this.onClickProcedureBy()}>
                          <Text style={S.ft14S_G600}>{"Empty (optional)"}</Text>
                        </TouchableHighlight>
                      )
                  }
                </View>
              </View>

              <View>
                <View style={{ marginTop: 24 }}>
                  <Text style={S.ft16S_G800}>{"Reason"}<Text style={S.ft14_G600}>{" (optional)"}</Text></Text>
                  <TextInput
                    multiline
                    style={[S.ft16_G700, { lineHeight: 26, padding: 0 }]}
                    placeholder={"Describe the reason for the procedure..."}
                    placeholderTextColor={MS.Gray600}
                    value={reason}
                    onChangeText={(ev) => this.onChangeText(ev, 'reason')}
                  />
                </View>
                <View style={S.mt24}>
                  <Text style={S.ft16S_G800}>{"Procedure report"}<Text style={S.ft14_G600}>{" (optional)"}</Text></Text>
                  {
                    reportPicture ?
                      (
                        <View style={{ marginTop: 12, borderWidth: 4, borderColor: MS.Gray300, borderRadius: 8, alignSelf: "flex-start" }}>
                          <Image source={{ uri: reportPicture }} style={{ height: 272, width: 152, borderRadius: 4 }} resizeMode="cover" />
                        </View>
                      )
                      : reportDocument.type ?
                        (
                          <UploadPdfProgressBar name={reportDocument.name} percent={100} isError={true} />
                        )
                        :
                        (
                          <View>
                            <TextInput
                              multiline
                              style={[S.ft16_G700, { lineHeight: 26, padding: 0 }]}
                              placeholder={"Write or attach a report.."}
                              placeholderTextColor={MS.Gray600}
                              value={report}
                              onChangeText={(ev) => this.onChangeText(ev, 'report')}
                            />
                            <TouchableHighlight activeOpacity={0.9} underlayColor="transparent" onPress={() => this.onUploadFile("report")}>
                              <View style={[S.rowFlex_start, S.mt8]}>
                                <Attach_svg width={16} height={16} fill={MS.Blue500} />
                                <Text style={[S.ft16_B500, { lineHeight: null }]}>{"Upload a file"}<Text style={[S.ft16_B300, { lineHeight: null }]} >{" (Max: 20MB)"}</Text></Text>
                              </View>
                            </TouchableHighlight>
                          </View>
                        )
                  }
                </View>
                <View style={S.mt24}>
                  <Text style={S.ft16S_G800}>{"Complications"}<Text style={S.ft14_G600}>{" (optional)"}</Text></Text>
                  {
                    complicationPicture ?
                      (
                        <View style={{ marginTop: 12, borderWidth: 4, borderColor: MS.Gray300, borderRadius: 8, alignSelf: "flex-start" }}>
                          <Image source={{ uri: complicationPicture }} style={{ height: 272, width: 152, borderRadius: 4 }} resizeMode="cover" />
                        </View>
                      )
                      : complicationDocument.type ?
                        (
                          <UploadPdfProgressBar name={complicationDocument.name} percent={100} isError={false} />
                        )
                        :
                        (
                          <View>
                            <TextInput
                              multiline
                              style={[S.ft16_G700, { lineHeight: 26, padding: 0 }]}
                              placeholder={"Write or attach a report.."}
                              placeholderTextColor={MS.Gray600}
                              value={complication}
                              onChangeText={(ev) => this.onChangeText(ev, 'complication')}
                            />
                            <TouchableHighlight activeOpacity={0.9} underlayColor="transparent" onPress={() => this.onUploadFile("complications")}>
                              <View style={[S.rowFlex_start, S.mt8]}>
                                <Attach_svg width={16} height={16} fill={MS.Blue500} />
                                <Text style={[S.ft16_B500, { lineHeight: null }]}>{"Upload a file"}<Text style={[S.ft16_B300, { lineHeight: null }]} >{" (Max: 20MB)"}</Text></Text>
                              </View>
                            </TouchableHighlight>
                          </View>
                        )
                  }
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        <Modal
          statusBarTranslucent
          useNativeDriverForBackdrop
          isVisible={openFileAttachModal}
          animationInTiming={400}
          animationOutTiming={400}
          backdropTransitionInTiming={400}
          backdropTransitionOutTiming={400}
          onBackdropPress={() => this.setState({ openFileAttachModal: false })}
          style={{ justifyContent: 'flex-end', margin: 0 }}
          backdropOpacity={0}
        >
          <FileAttachPanel onCamera={this.onTouchCamera} onDocument={this.onTouchDocument} />
        </Modal>
        <ProcedureBy visible={openProcedureByModal} onBack={this.onBackProcedureByModal} onSetProcedureBy={this.onSetProcedureBy} />
        <CalendarModal selectedDate={selectedDate} visible={openCalendarModal} onDayLongPress={this.onSetProcedureDate} isMarkToday={false} />
      </View>
    );
  }
}





//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
class ProcedureBy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTxt: "",
      isHeaderBorder: false,
      filteredList: doctorList,
      selectedDoctors: null,
      isContinue: false
    };
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

  ///////////////////////////////////////////////////////////////////////
  onChangeText = (val) => {
    const { selectedDoctors } = this.state;
    let tmpData = selectedDoctors;
    if (tmpData && tmpData.length > 0) {
      this.setState({ selectedDoctors: null });
    }
    let filteredList = this.handleFilterList(doctorList, val);
    this.setState({ filteredList: filteredList, searchTxt: val });
  }

  ///////////////////////////////////////////////////////////////////////
  handleFilterList = (_dataList, _searchStr) => {
    let filteredList = _dataList.filter((elem) => elem.name.toLowerCase().includes(_searchStr.toLowerCase()) || elem.id.includes(_searchStr.toLowerCase()));
    return filteredList;
  }

  ///////////////////////////////////////////////////////////////////////
  onSelectDoctorItem = (userData, index) => {
    const { selectedDoctors, filteredList } = this.state;
    let tmp = selectedDoctors ? selectedDoctors : [];

    if (!this.onCheckID(tmp, userData.id)) {
      tmp.push(filteredList[index]);
    }
    else tmp.splice(tmp.findIndex(x => x.id === userData.id), 1);

    this.setState({ selectedDoctors: tmp });
    if (tmp.length > 0) this.setState({ isContinue: true });
  }

  ///////////////////////////////////////////////////////////////////////
  onGetData = () => {
    const { onSetProcedureBy } = this.props;
    const { selectedDoctors } = this.state;
    onSetProcedureBy(selectedDoctors);
  }

  ///////////////////////////////////////////////////////////////////////
  onCheckID = (dataList, id) => {
    if (dataList === null) return false;
    let filteredList = dataList.filter((elem) => elem.id === id);
    return filteredList.length > 0 ? true : false;
  }

  ///////////////////////////////////////////////////////////////////////
  render() {
    const { visible, onBack } = this.props;
    const { selectedDoctors, filteredList, isContinue, searchTxt, isHeaderBorder } = this.state;

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
          style={{ justifyContent: 'flex-end', margin: 0 }}
          backdropOpacity={0.6}
        >
          <View style={[{ height: "100%", width: "100%", backgroundColor: MS.Gray100 }]}>
            <View style={{ width: "100%", paddingTop: 22 }}>
              <HeaderComp active={true} leftText={""} rightText={"Confirm"} onSave={() => this.onGetData()} onBackpage={onBack} active={isContinue} />
            </View>
            <ScrollView style={[styles.modalContainer, { paddingHorizontal: 24 }]}>
              <StatusBar backgroundColor={MS.Gray100} barStyle="dark-content" translucent={true} />
              <View style={[S.mt8, S.mb16]}>
                <SearchComp onChangeText={this.onChangeText} searchTxt={searchTxt} placeholder={"Search by name or ID"} />
              </View>
              <View>
                {
                  filteredList &&
                  filteredList.map((userData, i) => (
                    <TouchableHighlight key={i} activeOpacity={0.8} underlayColor="transparent" onPress={() => this.onSelectDoctorItem(userData, i)}>
                      <CareTeamItem
                        item={userData}
                        isChecked={this.onCheckID(selectedDoctors, userData.id)}
                      />
                    </TouchableHighlight>
                  ))
                }
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
    backgroundColor: MS.Gray100,
    height: "100%"
  },
  content: {
    backgroundColor: MS.Gray100,
    paddingTop: 8
  },
});


