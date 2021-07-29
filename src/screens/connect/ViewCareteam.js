import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, TouchableHighlight} from 'react-native';
import { Container, Content, Icon } from 'native-base';
import SearchComp from '../../components/SearchComp';
import MsgItemComp from '../../components/MsgItemComp';
import HeaderComp from '../../components/HeaderComp';
import { User_img1, User_img2, User_img3, User_img4, User_img5, User_img6, User_img7, Doc_img1,Doc_img2,Doc_img3,Doc_img4,Doc_img5,Doc_img6} from '../../assets/images';
import { CareTeamGroup_icon, ArrowLeft_svg } from '../../assets/icons';
import { S } from '../../mainStyle';

let doctorList = [
  {user: { photo: User_img1, name: 'Sarah Bryans', id: '124784657', email: 'aaa@gmail.com', phoneNum: "+65916147854", role: 'cvm' },  Msg:{time: "10:07", txt:"Ok. See you there!", unReadCount:0, isLastMsg:true}, groupType: null, isOnline: true },
  {user: { photo: User_img2, name: 'Johana Smith', id: '134384657', email: 'bbb@gmail.com', phoneNum: "+65742334533", role: 'cts' }, Msg:{time: "10:30", txt:"Yes, doctor. I’m starting to feel bet...", unReadCount:0, isLastMsg:false}, groupType: null, isOnline: false },
  {user: { photo: User_img3, name: 'Rebecca Bryans', id: '76884657', email: 'ccc@gmail.com', phoneNum: "+65756484453", role: 'nem' }, Msg:{time: "11:36", txt:"What about 5:30pm? I’m free!", unReadCount:2, isLastMsg:false}, groupType: null, isOnline: true },
  {user: { photo: User_img4, name: 'Sarah Jones', id: '98567657', email: 'ddd@gmail.com', phoneNum: "+65123345363", role: 'cvm' }, Msg:{time: "Yesterday", txt:"No problem, i can manage a way to b...", unReadCount:0, isLastMsg:false}, groupType: null , isOnline: false},
  {user: { photo: User_img5, name: 'Roger Barkley', id: '95673545', email: 'eee@gmail.com', phoneNum: "+6534657976", role: 'cts' }, Msg:{time: "21/07/20", txt:"Thanks! See you!", unReadCount:0, isLastMsg:false}, groupType: null, isOnline: false },
  {user: { photo: User_img6, name: 'Edwards McCakine', id: '63864336', email: 'fff@gmail.com', phoneNum: "+65673455667", role: 'nem' }, Msg:{time: "21/06/20", txt:"Ok. See you there!", unReadCount:0, isLastMsg:false}, groupType: null, isOnline: false },
  {user: { photo: User_img7, name: 'Samanta Bosh', id: '336784567', email: 'ggg@gmail.com', phoneNum: "+65756855645", role: 'cvm' }, Msg:{time: "21/04/20", txt:"O I’m free!", unReadCount:0, isLastMsg:true}, groupType: null, isOnline: false },
]

let patientList = [
  {user: { photo: Doc_img1, name: 'Monica Lindsay', id: '124784657', email: 'aaa@gmail.com', phoneNum: "+65916147854", role: 'patient' },  Msg:{time: "10:07", txt:"Ok. See you there!", unReadCount:0, isLastMsg:false}, groupType: null, isOnline: false },
  {user: { photo: Doc_img2, name: 'Rebecca Smith', id: '134384657', email: 'bbb@gmail.com', phoneNum: "+65742334533", role: '' }, Msg:{time: "10:30", txt:"Yes, doctor. I’m starting to feel bet...", unReadCount:0, isLastMsg:false}, groupType: null, isOnline: false },
  {user: { photo: Doc_img3, name: 'Bryan Phillips', id: '76884657', email: 'ccc@gmail.com', phoneNum: "+65756484453", role: 'doctor' }, Msg:{time: "11:36", txt:"What about 5:30pm? I’m free!", unReadCount:2, isLastMsg:false}, groupType: null, isOnline: true },
  {user: { photo: Doc_img4, name: 'Ben Chillwel', id: '98567657', email: 'ddd@gmail.com', phoneNum: "+65123345363", role: '' }, Msg:{time: "Yesterday", txt:"No problem, i can manage a way to b...", unReadCount:0, isLastMsg:false}, groupType: null, isOnline: false },
  {user: { photo: Doc_img5, name: 'Mina Barkley', id: '95673545', email: 'eee@gmail.com', phoneNum: "+6534657976", role: 'doctor' }, Msg:{time: "21/07/20", txt:"Thanks! See you!", unReadCount:0, isLastMsg:false}, groupType: null, isOnline: true },
  {user: { photo: Doc_img6, name: 'Susan Morgan', id: '63864336', email: 'fff@gmail.com', phoneNum: "+65673455667", role: '' }, Msg:{time: "21/06/20", txt:"Ok. See you there!", unReadCount:0, isLastMsg:false}, groupType: null, isOnline: false },
]


export default class ViewCareteam extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTxt: '',
      patient: patientList[0],
      careteam: doctorList,
    };
  }


  ///////////////////////////////////////////////////////////////////////
  onChangeText = (val) => {
    this.setState({ searchTxt: val });
    // let filteredList = this.handleFilterList(patientList, val);
    // this.setState({ filteredList: filteredList });
  }
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onBackpage = () => {
    const { navigate } = this.props.navigation;
    navigate('connect');
  }

  
  ///////////////////////////////////////////////////////////////////////
  render() {
    const { patient, careteam, searchTxt } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <Container style={styles.container}>
        <View style={{marginTop:16}}>
          <HeaderComp leftText={""} rightText={""} onBackpage={this.onBackpage} background={"#FFFFFF"}/>
        </View>
        
        <Content style={styles.content}>        
          <StatusBar backgroundColor='transparent' barStyle="dark-content" translucent = {true}/> 

          <View>
            <Text style={S.ft14_G700}>Patient</Text>
            <View style={ styles.patientContent }>            
              <MsgItemComp data = { patient } isBorder={false} />
            </View>
          </View>

          <View style={styles.careTeamSection}>
            <Text style={S.ft14_G700}>Care team</Text>
            {
              careteam &&
              careteam.map((data, i) => (
                <View style={ styles.careteamItem } key={i}>            
                  <MsgItemComp data = { data } isBorder={i=== careteam.length-1? false: true}/>
                </View>
              ))
            }
          </View>

          <View style={{marginTop:8,marginBottom: 30}}>
            <Text style={S.ft14_G700}>Care team group</Text>
            <View style={ styles.groupContent }>            
              <Image source={ CareTeamGroup_icon } style={styles.groupPhoto} resizeMode="contain" />
              <View style={{marginLeft: 10, flex: 1}} >
                <View style={S.rowFlex}>
                  <Text style={S.ft16_G800}>Care team group</Text>
                  <Text  style={S.ft10}>{"Yesterday"}</Text>
                </View>
                <Text style={[S.ft14_G600, {marginTop: 5}]}>{"No problem, i can manage a way to b..."}</Text>
              </View>
            </View>
          </View>                
        </Content>
      </Container>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    padding: 24,
    paddingTop:8
  },
  searchComp: {
    marginHorizontal: 10
  },
  groupContent: {
    width: '100%',
    display: 'flex', 
    flexDirection:'row', 
    alignItems:'center',
  },
  groupPhoto: {
    marginLeft: -5,
    width: 60,
    height: 60
  }
});

