import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, ScrollView, StatusBar } from 'react-native';
import { Container, Content } from 'native-base';
import { User_img1, User_img2, User_img3, User_img4, User_img5, User_img6, User_img7, Doc_img1, Doc_img2, Doc_img3, Doc_img4, Doc_img5, Doc_img6 } from '../../assets/images';
import { ContactItem, CareTeamItem, HeaderComp, SegmentButton, SearchComp} from '../../components';
import { S } from '../../mainStyle';

let patientList = [
  { photo: User_img1, name: 'Sarah Bryans', id: '124784657', email: 'aaa@gmail.com', phoneNum: "+65916147854", role: 'patient' },
  { photo: User_img2, name: 'Johana Smith', id: '134384657', email: 'bbb@gmail.com', phoneNum: "+65742334533", role: 'doctor' },
  { photo: User_img3, name: 'Rebecca Bryans', id: '76884657', email: 'ccc@gmail.com', phoneNum: "+65756484453", role: 'patient' },
  { photo: User_img4, name: 'Sarah Jones', id: '98567657', email: 'ddd@gmail.com', phoneNum: "+65123345363", role: '' },
  { photo: User_img5, name: 'Roger Barkley', id: '95673545', email: 'eee@gmail.com', phoneNum: "+6534657976", role: '' },
  { photo: User_img6, name: 'Edwards McCakine', id: '63864336', email: 'fff@gmail.com', phoneNum: "+65673455667", role: 'doctor' },
  { photo: User_img7, name: 'Samanta Bosh', id: '336784567', email: 'ggg@gmail.com', phoneNum: "+65756855645", role: 'patient' },
  { photo: User_img1, name: 'Sarah Bryans', id: '124784657', email: 'aaa@gmail.com', phoneNum: "+65916147854", role: 'patient' },
  { photo: User_img2, name: 'Johana Smith', id: '134384657', email: 'bbb@gmail.com', phoneNum: "+65742334533", role: 'doctor' },
  { photo: User_img3, name: 'Rebecca Bryans', id: '76884657', email: 'ccc@gmail.com', phoneNum: "+65756484453", role: 'patient' },
  { photo: User_img4, name: 'Sarah Jones', id: '98567657', email: 'ddd@gmail.com', phoneNum: "+65123345363", role: '' },
  { photo: User_img5, name: 'Roger Barkley', id: '95673545', email: 'eee@gmail.com', phoneNum: "+6534657976", role: '' },
  { photo: User_img6, name: 'Edwards McCakine', id: '63864336', email: 'fff@gmail.com', phoneNum: "+65673455667", role: 'doctor' },
  { photo: User_img7, name: 'Samanta Bosh', id: '336784567', email: 'ggg@gmail.com', phoneNum: "+65756855645", role: 'patient' },
]

let careTeamList1 = [
  { photo: Doc_img1, name: 'Sarah Bryans', id: '123456', email: 'aaa@gmail.com', phoneNum: "+65916147854", role: 'cvm' },
  { photo: Doc_img2, name: 'Johana Smith', id: '123457', email: 'bbb@gmail.com', phoneNum: "+65742334533", role: 'cts' },
  { photo: Doc_img3, name: 'Rebecca Bryans', id: '123458', email: 'ccc@gmail.com', phoneNum: "+65756484453", role: 'nem' },
  { photo: Doc_img4, name: 'Sarah Jones', id: '123459', email: 'ddd@gmail.com', phoneNum: "+65123345363", role: 'cvm' },
]


let colleagueList1 = [
  { photo: Doc_img5, name: 'Monica Madison', id: '1234560', email: 'eee@gmail.com', phoneNum: "+6534657976", role: 'cvm' },
  { photo: Doc_img6, name: 'William Defoe', id: '123461', email: 'fff@gmail.com', phoneNum: "+65673455667", role: 'cts' },
  { photo: Doc_img1, name: 'Edwards McCakine', id: '123462', email: 'ggg@gmail.com', phoneNum: "+65756855645", role: 'cts' },
  { photo: Doc_img2, name: 'Robert Owen', id: '123463', email: 'aaa@gmail.com', phoneNum: "+65916147854", role: 'cts' },
  { photo: Doc_img3, name: 'Johana Smith', id: '123464', email: 'bbb@gmail.com', phoneNum: "+65742334533", role: 'cts' },
  { photo: Doc_img4, name: 'Rebecca Bryans', id: '123465', email: 'ccc@gmail.com', phoneNum: "+65756484453", role: 'nem' },
  { photo: Doc_img1, name: 'Sarah Jones', id: '123466', email: 'ddd@gmail.com', phoneNum: "+65123345363", role: 'cvm' },
]


export default class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageIndex: 1,
      tabButtonType: 1,
      isContinue: false,
      isHeaderBorder: false,

      searchTxt: '',
      newPatientTxts: { id: "", name: '', email: '', phoneNum: "" },
      filteredList: patientList,
      seletedPatient: null,
      newPatientData: { photo: null, name: '', id: '', email: '', phoneNum: "", role: 'patient' },
      helper: { name: null, id: null, email: null, phoneNum: null },
      selectedPatient: null,
      selectedCareteam: null,
      selectedColleague: null,
      careteamList: careTeamList1,
      colleagueList: colleagueList1,
    };
  }


  ///////////////////////////////////////////////////////////////////////
  onClickPatientButton = (type) => {
    this.setState({ tabButtonType: type });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onBackpage = () => {
    const { navigate } = this.props.navigation;
    navigate('connect');
  }

  ///////////////////////////////////////////////////////////////////////
  onNextpage = () => {
    const { navigate } = this.props.navigation;
    const { selectedCareteam, selectedPatient } = this.state
    navigate('CreateGroup', { selectedPatient: selectedPatient, selectedCareteam: selectedCareteam });
  }

  ///////////////////////////////////////////////////////////////////////
  onClick_FilterList = (i) => {
    this.setState({ seletedPatient: this.state.filteredList[i], isContinue: true });
  }

  ///////////////////////////////////////////////////////////////////////
  onClick_Patient = (index) => {
    this.setState({ selectedPatient: [this.state.filteredList[index]] });
  }

  ///////////////////////////////////////////////////////////////////////
  onClick_CareTeam = (userData, index, type) => {
    const { selectedCareteam, careteamList, colleagueList } = this.state;
    let tmp = selectedCareteam ? selectedCareteam : [];
    if (!this.onCheckID(tmp, userData.id)) {
      if (type === 1) tmp.push(careteamList[index]);
      else tmp.push(colleagueList[index]);
    }
    else tmp.splice(tmp.findIndex(x => x.id === userData.id), 1);

    this.setState({ selectedCareteam: tmp })

    if (tmp.length > 0) this.setState({ isContinue: true })
  }

  ///////////////////////////////////////////////////////////////////////
  onClick_Colleague = (userData, index) => {
    const { selectedColleague, colleagueList } = this.state;
    let tmp = selectedColleague ? selectedColleague : [];
    if (!this.onCheckID(tmp, userData.id)) tmp.push(colleagueList[index]);
    else tmp.splice(tmp.findIndex(x => x.id === userData.id), 1);
    this.setState({ selectedColleague: tmp })
  }

  ///////////////////////////////////////////////////////////////////////
  onChangeText = (val) => {
    this.setState({ searchTxt: val });
    let filteredList = this.handleFilterList(patientList, val);
    this.setState({ filteredList: filteredList });
  }

  ///////////////////////////////////////////////////////////////////////
  handleFilterList = (_dataList, _searchStr) => {
    let filteredList = _dataList.filter((elem) => elem.name.toLowerCase().includes(_searchStr.toLowerCase()) || elem.id.includes(_searchStr.toLowerCase()));
    return filteredList;
  }

  ///////////////////////////////////////////////////////////////////////
  onCheckID = (dataList, id) => {
    if (dataList === null) return false;
    let filteredList = dataList.filter((elem) => elem.id === id);
    return filteredList.length > 0 ? true : false;
  }

  ///////////////////////////////////////////////////////////////////////
  onScroll = (ev) => {
    const { isHeaderBorder } = this.state;
    if (!isHeaderBorder && ev.contentOffset.y > 8) this.setState({ isHeaderBorder: true });
    else if (isHeaderBorder && ev.contentOffset.y < 8) this.setState({ isHeaderBorder: false });
  }
  ///////////////////////////////////////////////////////////////////////
  render() {
    const { selectedPatient, selectedCareteam, careteamList, colleagueList, filteredList, tabButtonType, isContinue, searchTxt, isHeaderBorder } = this.state;

    return (
      <Container style={styles.container}>
        <View style={{ paddingTop: 16 }}>
          <HeaderComp
            leftText={""}
            rightText={tabButtonType === 1 ? "" : "Continue"}
            onBackpage={this.onBackpage}
            onSave={this.onNextpage}
            active={isContinue}
            isBorder={isHeaderBorder}
            background="#FAFAFB"
          />
        </View>

        <Content style={styles.contents} showsVerticalScrollIndicator={false} onScroll={({ nativeEvent }) => this.onScroll(nativeEvent)} >
          <SegmentButton
            btnTextList={["Contact's list", "Create group"]}
            selButton={tabButtonType - 1}
            onclick_Button={this.onClickPatientButton}
          />
          <View style={{ marginVertical: 16 }}>
            <SearchComp onChangeText={this.onChangeText} searchTxt={searchTxt} placeholder={"Search by name or ID"}/>
          </View>

          <StatusBar backgroundColor='#FAFAFB' barStyle="dark-content" translucent={true} />

          {
            !selectedPatient ?
              (
                <View>
                  {
                    tabButtonType === 2 &&
                    <Text style={[S.ft16_G900, { marginVertical: 8 }]}>Choose a patient to select available doctors</Text>
                  }
                  <View style={{ marginBottom: 30 }}>
                    {
                      filteredList &&
                      filteredList.map((userData, i) => (
                        <TouchableHighlight key={i} activeOpacity={0.8} underlayColor="transparent" onPress={() => this.onClick_Patient(i)}>
                          <ContactItem userData={userData} />
                        </TouchableHighlight>
                      ))
                    }
                  </View>
                </View>
              )
              :
              <View>
                {/* display a selected user =============================== */}
                <ScrollView horizontal>
                  {
                    selectedCareteam &&
                    selectedCareteam.map((data, i) => (
                      <View style={{ paddingVertical: 10, width: 55, alignItems: 'center' }} key={i}>
                        <Image source={data.photo} style={{ ...S.avatar32, marginLeft: -10, marginBottom: 4 }} resizeMode="contain" />
                        <Text style={S.ft10_G900}>{data.name.replace(/(.{8})..+/, "$1...")}  </Text>
                      </View>
                    ))
                  }
                  {
                    selectedPatient &&
                    selectedPatient.map((data, i) => (
                      <View style={{ paddingVertical: 10, width: 55, justifyContent: 'center', alignItems: 'center' }} key={i}>
                        <Image source={data.photo} style={{ ...S.avatar32, marginLeft: -10, marginBottom: 4 }} resizeMode="contain" />
                        <Text style={S.ft10_G900}>{data.name.replace(/(.{8})..+/, "$1...")}  </Text>
                      </View>
                    ))
                  }
                </ScrollView>

                {/* care team and colleagues section=============================== */}
                <View>
                  <Text style={[S.ft16_G900, { marginTop: 15 }]}>Care team</Text>
                  {
                    careteamList &&
                    careteamList.map((userData, i) => (
                      <TouchableHighlight key={i} activeOpacity={0.8} underlayColor="transparent" onPress={() => this.onClick_CareTeam(userData, i, 1)}>
                        <CareTeamItem
                          item={userData}
                          isChecked={this.onCheckID(selectedCareteam, userData.id)}
                        />
                      </TouchableHighlight>
                    ))
                  }
                  <Text style={[S.ft16_G900, { marginTop: 15 }]}>Colleagues</Text>
                  {
                    colleagueList &&
                    colleagueList.map((userData, i) => (
                      <TouchableHighlight key={i} activeOpacity={0.8} underlayColor="transparent" onPress={() => this.onClick_CareTeam(userData, i, 2)}>
                        <CareTeamItem
                          item={userData}
                          isChecked={this.onCheckID(selectedCareteam, userData.id)}
                        />
                      </TouchableHighlight>
                    ))
                  }
                </View>
              </View>
          }
        </Content>
      </Container>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: { backgroundColor: '#FAFAFB', },
  contents: {
    padding: 24,
    paddingTop: 8,
    width: '100%'
  },
  patientTabs: {
    backgroundColor: '#E6E8EB',
    borderRadius: 8,
    padding: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  header: {
    height: 50,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  photo: {
    width: 50,
    height: 50
  }
});

