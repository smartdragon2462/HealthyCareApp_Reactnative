// ***************************************************************************
//  @Created Date:    12/20/2020 
//  @Update:  2/4/2021
//  @author:  ClerkedApp team
//  @description:   A component to choose a patient
// ***************************************************************************

import React from 'react';
import { StyleSheet, View, Text, StatusBar, Modal, TouchableHighlight } from 'react-native';
import { Container, Content} from 'native-base';
import { hideNavigationBar, showNavigationBar } from 'react-native-navigation-bar-color';
import {MyPatientComp, NewPatientsComp, SegmentButton, HeaderComp} from '../../components';
import validateEmail from '../../utils/helper';
import { User_img1, User_img2, User_img3, User_img4, User_img5, User_img6, User_img7, Doc_img1, Doc_img2,Doc_img3,Doc_img4,Doc_img5,Doc_img6 } from '../../assets/images';
import { S } from '../../mainStyle';
import * as MS from '../../mainStyle';

let patientList = [
  { photo: User_img1, name: 'Sarah Bryans', id: '234235', email:'aaa@gmail.com', phoneNum:"+65916147854", gender:"Male", birthday:"17 Jan, 2002", role:'caregiver'},
  { photo: User_img2, name: 'Johana Smith', id: '3423423',  email:'bbb@gmail.com',phoneNum:"+65742334533", gender:"Female", birthday:"17 Jan, 1999", role:'doctor',
    caregiver: [
      { photo: User_img1, name: 'Sarah Bryans', id: '3453463', email:'aaa@gmail.com', phoneNum:"+65916147854", gender:"Female", birthday:"17 Jan, 1998", role:'caregiver'},
    ],
    careTeam:[
      { photo: Doc_img1, name: 'Sarah Bryans', id: '56756', email: 'aaa@gmail.com', phoneNum: "+65916147854", gender:"Male", birthday:"17 Jan, 1988", role: 'cvm'},
      { photo: Doc_img2, name: 'Johana Smith', id: '2346456', email: 'bbb@gmail.com', phoneNum: "+65742334533", gender:"Female", birthday:"17 Jan, 1978", role: 'cts' },
      { photo: Doc_img3, name: 'Rebecca Bryans', id: '237456894', email: 'ccc@gmail.com', phoneNum: "+65756484453", gender:"Male", birthday:"17 Jan, 1972", role: 'nem' },
    ]
  },
  { photo: User_img3, name: 'Rebecca Bryans', id: '12386749', email:'ccc@gmail.com', phoneNum:"+65756484453", gender:"Male", birthday:"17 Jan, 1985", role:'caregiver'},
  { photo: User_img4, name: 'Sarah Jones', id: '3265347', email:'ddd@gmail.com', phoneNum:"+65123345363", gender:"Female", birthday:"17 Jan, 1990", role:''},
  { photo: User_img5, name: 'Roger Barkley', id: '2626845', email:'eee@gmail.com', phoneNum:"+6534657976", gender:"Male", birthday:"17 Jan, 1983", role:''},
  { photo: User_img6, name: 'Edwards McCakine', id: '2221213', email:'fff@gmail.com', phoneNum:"+65673455667", gender:"Female", birthday:"17 Jan, 1992", role:'doctor',
    caregiver: [
      { photo: User_img3, name: 'Rebecca Bryans', id: '3735894', email:'ccc@gmail.com', phoneNum:"+65756484453", gender:"Male", birthday:"17 Jan, 1981", role:'caregiver'},
    ],
    careTeam:[
      { photo: Doc_img2, name: 'Roger Barkley', id: '2346637', email: 'eee@gmail.com', phoneNum: "+6534657976", gender:"Female", birthday:"17 Jan, 1989", role: 'cts' },
      { photo: Doc_img4, name: 'Edwards McCakine', id: '455343', email: 'fff@gmail.com', phoneNum: "+65673455667", gender:"Male", birthday:"17 Jan, 1985", role: 'nem' },
      { photo: Doc_img6, name: 'Samanta Bosh', id: '4538723', email: 'ggg@gmail.com', phoneNum: "+65756855645", gender:"Female", birthday:"17 Jan, 1973", role: 'cvm' },
    ]
  },
  { photo: User_img7, name: 'Samanta Bosh', id: '6444744', email:'ggg@gmail.com', phoneNum:"+65756855645", gender:"Female", birthday:"17 Jan, 1979", role:'caregiver'},
  { photo: User_img5, name: 'Roger Barkley', id: '884443', email:'eee@gmail.com', phoneNum:"+6534657976", gender:"Male", birthday:"17 Jan, 1970", role:''},
  { photo: User_img6, name: 'Edwards McCakine', id: '234425667', email:'fff@gmail.com', phoneNum:"+65673455667", gender:"Male", birthday:"17 Jan, 1980", role:'doctor',
    caregiver: [
      { photo: User_img7, name: 'Samanta Bosh', id: '445437', email:'ggg@gmail.com', phoneNum:"+65756855645", gender:"Male", birthday:"17 Jan, 1984", role:'caregiver'},
    ],
    careTeam:[
      { photo: Doc_img5, name: 'Rebecca Bryans', id: '8956734', email: 'ccc@gmail.com', phoneNum: "+65756484453", gender:"Female", birthday:"17, Jan, 1987", role: 'nem' },
      { photo: Doc_img1, name: 'Sarah Jones', id: '784544', email: 'ddd@gmail.com', phoneNum: "+65123345363", gender:"Female", birthday:"17, Jan, 1990", role: 'cvm' },
      { photo: Doc_img3, name: 'Roger Barkley', id: '3346874', email: 'eee@gmail.com', phoneNum: "+6534657976", gender:"Male", birthday:"17, Jan, 1998", role: 'cts' },
    ]
  },
]


export default class ChoosePatient extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      patientType: 1,
      isContinue: false,
      tmp_eventData: null,
      eventData: null,
      searchTxt: '',
      newPatientTxts: {id: "", name:'', email:'', phoneNum:""},
      newPatientData: { photo: null, name:'', id:'', email:'', phoneNum:"", role:'patient'},
      filteredList: patientList,
      chosenPatient: null,
      helper: { name:null, id:null, email:null, phoneNum:null},

      modalVisible: false,
    };
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onBackpage = () => {
    const { navigate } = this.props.navigation;
    navigate('AddEvents');
  }

  ///////////////////////////////////////////////////////////////////////
  onGetEventData =(data)=> {
    this.setState({ tmp_eventData: data});
  }
  
  ///////////////////////////////////////////////////////////////////////
  handleDataSave =() => {
    const { navigate } = this.props.navigation;    
    const { navigation } = this.props;
    const { patientType, tmp_eventData, isContinue } = this.state

    const handleEventData = navigation.getParam('handleEventData'); 
    const selDateTime = navigation.getParam('selDateTime');    
    // const durationType = navigation.getParam('durationType');      
 
    this.setState({ eventData: tmp_eventData });

    let eventData = tmp_eventData;
    if (patientType===1) eventData = tmp_eventData;
    else if(patientType===2 && isContinue) {
      this.setState({ modalVisible: true }); return;
    }

    // let tmp_Data = { duration:durationType, dateTime: selDateTime, patient: eventData} 
    let tmp_Data = {dateTime: selDateTime, patient: eventData} 

    handleEventData(tmp_Data);
    navigate('AddEvents');
  }

  ///////////////////////////////////////////////////////////////////////
  handleNewPatientSave =(type) => {
    const { navigate } = this.props.navigation;    
    const { navigation } = this.props;
    const { newPatientData } = this.state;

    const handleEventData = navigation.getParam('handleEventData'); 
    const selDateTime = navigation.getParam('selDateTime');       
 
    if(type==="yes"){
      let  eventData = {patient: newPatientData, caregiver: null, careteam: null };
      let tmp_Data = { dateTime: selDateTime, patient: eventData} 
  
      handleEventData(tmp_Data);
      navigate('AddEvents');
    }else{
      this.setState({modalVisible:false})
    }
  }

  ///////////////////////////////////////////////////////////////////////
  onCancelPatient =()=>{
    this.setState({chosenPatient: null, tmp_eventData:null, newPatientData:null , isContinue: false});
  }

  ///////////////////////////////////////////////////////////////////////
  onSelectList =( i )=> {
    let tmp_eventData = {patient: this.state.filteredList[i], caregiver: null, careteam: null };
    if( !this.state.filteredList[i].careTeam && !this.state.filteredList[i].caregiver){
      this.setState({tmp_eventData: tmp_eventData},()=> this.handleDataSave());
    }
    else
    {
      this.setState({chosenPatient: this.state.filteredList[i], isContinue: true});
      this.setState({tmp_eventData: tmp_eventData, eventData: tmp_eventData});
    }
  }

  ///////////////////////////////////////////////////////////////////////
  onChangeText =( val )=>{
    this.setState({ searchTxt: val });
    let filteredList = this.handleFilterList( patientList, val );
    this.setState({ filteredList: filteredList });
  }

  ///////////////////////////////////////////////////////////////////////
  onInputBoxChange =( name, val )=>{
    let tmp_newPatientData = this.state.newPatientData;
    let newPatientTxts = this.state.newPatientTxts;

    if(name === "id") {
      tmp_newPatientData.id = val;
      newPatientTxts.id = val;
    }
    else if (name === "phoneNum") {
      tmp_newPatientData.phoneNum = val;
      newPatientTxts.phoneNum = val;
    }
    else if (name === "name") {
      tmp_newPatientData.name = val;
      newPatientTxts.name = val;
    }

    this.setState({ newPatientData: tmp_newPatientData, newPatientTxts: newPatientTxts });

    if( tmp_newPatientData.id && tmp_newPatientData.phoneNum && tmp_newPatientData.name) 
      this.setState({isContinue: true});
    else this.setState({isContinue: false});
  }

    
  ///////////////////////////////////////////////////////////////////////
  onClickPatientButton =(type) =>{
    this.setState({
      isContinue: false,
      filteredList: patientList,
      chosenPatient: null,
      helper: { name:null, id:null, email:null, phoneNum:null},
      searchTxt: "" ,
      newPatientTxts: { name:'', id:'', email:'', phoneNum:""},
    })
  
    this.setState({ patientType: type });
  }

  ///////////////////////////////////////////////////////////////////////
  handleFilterList =( _dataList, _searchStr )=>{
    let filteredList = _dataList.filter( (elem) => elem.name.toLowerCase().includes(_searchStr.toLowerCase()) || elem.id.includes(_searchStr.toLowerCase()) );
    return filteredList;
  }

  ///////////////////////////////////////////////////////////////////////
  EmailValidate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false)   return false;
    else return true;
  }

  ///////////////////////////////////////////////////////////////////////
  Validation =()=> {
    let newPatientData = this.state.newPatientData;
    let  helper = this.state.helper;
    let isValidate = true;


    if(newPatientData.id.length > 0) helper.id = null;
    else {
      helper.id = 'Please input ID number.';    
      isValidate = false;
    }
    if(validateEmail(newPatientData.email)) helper.email = null;
    else {helper.email = 'Invalid email.';  isValidate = false;   }
    
    if( newPatientData.phoneNum.length>=5 ) helper.phoneNum = null;
    else {helper.phoneNum = 'Please input correct phone number.';   isValidate = false;  }
    
    if(newPatientData.name.length>0) helper.name = null;
    else {helper.name = 'Please input name.'; isValidate = false;}

    this.setState({helper: helper});

    return isValidate;
  }

  ///////////////////////////////////////////////////////////////////////
  onCancelmodal =()=> {

  }

  ///////////////////////////////////////////////////////////////////////
  componentDidMount(){
    // hideNavigationBar();

    const { navigation } = this.props;
    const eventData = navigation.getParam('newEventData'); 

    if( eventData ) this.setState({ tmp_eventData: eventData, eventData: eventData, chosenPatient: eventData.patient, isContinue: true });

  }

  ///////////////////////////////////////////////////////////////////////
  render() {
    const { filteredList, chosenPatient, eventData, helper, searchTxt, newPatientTxts, patientType, isContinue, modalVisible } = this.state;
    
    return (
      <Container style={styles.container}>
        <View style={{paddingTop: 20}}>
          <HeaderComp 
            leftText={isContinue? "Add another":"Choose patient"} 
            rightText={ patientType === 1? ( isContinue? "Confirm":" "):"Confirm" } 
            onBackpage={this.onBackpage}
            onSave = { this.handleDataSave}
            active = { isContinue }
          />
        </View>
        
        <Content style={styles.contents} > 
          <StatusBar backgroundColor='transparent' barStyle = "dark-content"/>
          <SegmentButton 
            btnTextList={["My patients", "New patient"]} 
            selButton={ patientType - 1 } 
            onclick_Button={ this.onClickPatientButton }
          />
          {
            patientType === 1 ?
            <MyPatientComp 
              onSelectList={ this.onSelectList } 
              onChangeText={ this.onChangeText } 
              patientList={filteredList} 
              searchTxt={searchTxt} 
              eventData = { eventData }
              chosenPatient={ chosenPatient } 
              onGetEventData = { this.onGetEventData }
              onCancelPatient = { this.onCancelPatient }
            />
            :
            <View style={{ marginTop: 16 }}>
              <NewPatientsComp 
                onInputBoxChange={this.onInputBoxChange} 
                newPatientTxts={ newPatientTxts } 
                helper = {helper} 
              />
            </View>
          }
        </Content>

          <Modal animationType="fade" transparent={true} visible={modalVisible} statusBarTranslucent onRequestClose={() => { console.log(" ")}}>
            <View style={styles.centeredView}>
              <Text style={styles.overlay} onPress={this.onCancelmodal} />
              <View style={{ backgroundColor: 'transparent', width: 285, height: 224, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.modalView}>
                  <Text style={{ ...S.ft14_G900, color: "#33435C", textAlign: "center" }}>
                    John Bryans have a caregiver linked to his profile. You want to invite the caregiver?
                  </Text>

                  <TouchableHighlight  style={{ marginTop: 24, width: "100%" }} 
                    activeOpacity={0.8} underlayColor='transparent' 
                    onPress={() => { this.handleNewPatientSave("yes")}} 
                  >
                    <View style={S.BlueButton}>
                      <Text style={[S.ft16B_G100, {lineHeight:19}]}>Yes, please</Text>
                    </View>
                  </TouchableHighlight>

                  <TouchableHighlight
                    style={{ marginTop: 8, width: "100%" }}
                    activeOpacity={0.8}
                    underlayColor='transparent'
                    onPress={() => { this.handleNewPatientSave("no")}} 
                  >
                    <View style={S.LBlueButton}>
                      <Text style={[S.ft16B_B500, {lineHeight:19}]}>No, thanks!</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
      </Container>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: { backgroundColor: '#FAFAFB'},
  contents: {
    padding: 24,
    paddingTop: 8,
    width: '100%',
    backgroundColor: '#FAFAFB',
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(8, 30, 64, 0.6)',
  },
  modalView: {
    width: 328,
    height: 186,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 24,
    alignItems: "center",
  },
  modalClose: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  BlueButton: {
    backgroundColor: MS.Blue500,
    borderRadius: 8,
    padding: 8,
    alignItems:"center"
  },
});

