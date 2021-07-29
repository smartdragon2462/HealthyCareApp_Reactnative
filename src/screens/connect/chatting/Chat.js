import React from 'react';
import { StyleSheet, Text, View, TextInput, StatusBar } from 'react-native';
import { Container, Footer, Icon } from 'native-base';
import AnimatedScreen from 'react-native-animated-screen';
import { ActionSheet, ChatFace, ChatHeader, Slider } from '../../../components';
import { User_img1, User_img2, User_img3, User_img4, User_img5, User_img6, User_img7, Doc_img1, Doc_img2, Doc_img3, Doc_img4, Doc_img5, Doc_img6 } from '../../../assets/images';
import { Note_svg, Workup_svg, Medication_svg, Plask_svg, Syringe_svg, Head_svg, Settings_svg, Cross_svg, Attach_svg, Photography_svg, MicOn_svg, Emoji_Smile_svg } from '../../../assets/icons';
import { S } from '../../../mainStyle';


let patientList = [
  { user: { photo: User_img1, name: 'Sarah Bryans', id: '124784657', email: 'aaa@gmail.com', phoneNum: "+65916147854", role: 'cvm' }, Msg: { time: "10:07", txt: "Ok. See you there!", unReadCount: 0, isLastMsg: true }, groupType: null, isOnline: true },
  { user: { photo: User_img2, name: 'Johana Smith', id: '134384657', email: 'bbb@gmail.com', phoneNum: "+65742334533", role: 'cts' }, Msg: { time: "10:30", txt: "Yes, doctor. I’m starting to feel bet...", unReadCount: 0, isLastMsg: false }, groupType: null, isOnline: false },
  { user: { photo: User_img3, name: 'Rebecca Bryans', id: '76884657', email: 'ccc@gmail.com', phoneNum: "+65756484453", role: 'nem' }, Msg: { time: "11:36", txt: "What about 5:30pm? I’m free!", unReadCount: 2, isLastMsg: false }, groupType: null, isOnline: true },
  { user: { photo: User_img4, name: 'Sarah Jones', id: '98567657', email: 'ddd@gmail.com', phoneNum: "+65123345363", role: 'cvm' }, Msg: { time: "Yesterday", txt: "No problem, i can manage a way to b...", unReadCount: 0, isLastMsg: false }, groupType: null, isOnline: false },
  { user: { photo: User_img5, name: 'Roger Barkley', id: '95673545', email: 'eee@gmail.com', phoneNum: "+6534657976", role: 'cts' }, Msg: { time: "21/07/20", txt: "Thanks! See you!", unReadCount: 0, isLastMsg: false }, groupType: null, isOnline: false },
  { user: { photo: User_img6, name: 'Edwards McCakine', id: '63864336', email: 'fff@gmail.com', phoneNum: "+65673455667", role: 'nem' }, Msg: { time: "21/06/20", txt: "Ok. See you there!", unReadCount: 0, isLastMsg: false }, groupType: null, isOnline: false },
  { user: { photo: User_img7, name: 'Samanta Bosh', id: '336784567', email: 'ggg@gmail.com', phoneNum: "+65756855645", role: 'cvm' }, Msg: { time: "21/04/20", txt: "O I’m free!", unReadCount: 0, isLastMsg: true }, groupType: null, isOnline: false },
]

let doctorList = [
  { user: { photo: Doc_img1, name: 'Monica Lindsay', id: '124784657', email: 'aaa@gmail.com', phoneNum: "+65916147854", role: 'patient' }, Msg: { time: "10:07", txt: "Ok. See you there!", unReadCount: 0, isLastMsg: false }, groupType: null, isOnline: false },
  { user: { photo: Doc_img2, name: 'Rebecca Smith', id: '134384657', email: 'bbb@gmail.com', phoneNum: "+65742334533", role: '' }, Msg: { time: "10:30", txt: "Yes, doctor. I’m starting to feel bet...", unReadCount: 0, isLastMsg: false }, groupType: null, isOnline: false },
  { user: { photo: Doc_img3, name: 'Bryan Phillips', id: '76884657', email: 'ccc@gmail.com', phoneNum: "+65756484453", role: 'doctor' }, Msg: { time: "11:36", txt: "What about 5:30pm? I’m free!", unReadCount: 2, isLastMsg: false }, groupType: null, isOnline: true },
  { user: { photo: Doc_img4, name: 'Ben Chillwel', id: '98567657', email: 'ddd@gmail.com', phoneNum: "+65123345363", role: '' }, Msg: { time: "Yesterday", txt: "No problem, i can manage a way to b...", unReadCount: 0, isLastMsg: false }, groupType: null, isOnline: false },
  { user: { photo: Doc_img5, name: 'Mina Barkley', id: '95673545', email: 'eee@gmail.com', phoneNum: "+6534657976", role: 'doctor' }, Msg: { time: "21/07/20", txt: "Thanks! See you!", unReadCount: 0, isLastMsg: false }, groupType: null, isOnline: true },
  { user: { photo: Doc_img6, name: 'Susan Morgan', id: '63864336', email: 'fff@gmail.com', phoneNum: "+65673455667", role: '' }, Msg: { time: "21/06/20", txt: "Ok. See you there!", unReadCount: 0, isLastMsg: false }, groupType: null, isOnline: false },
]

const options = [
  { component: <Text style={S.ft20S_G800}>View profile</Text>, height: 50, },
  { component: <Text style={S.ft20S_G800}>Share contact</Text>, height: 50, },
  { component: <Text style={S.ft20S_G800}>Archive conversation</Text>, height: 50, },
  { component: <Text style={[S.ft20S_G800, { color: "red" }]}>Delete conversation</Text>, height: 50, }
];

const controlData = [
  { icon: Note_svg, title: "Sessions notes" },
  { icon: Workup_svg, title: "Problem list" },
  { icon: Medication_svg, title: "Medication" },
  { icon: Plask_svg, title: "Investigation" },
  { icon: Cross_svg, title: "Procedures" },
  { icon: Syringe_svg, title: "Imunizations" },
  { icon: Head_svg, title: "Allergies" },
  { icon: Settings_svg, title: "Devices" }
];

export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedUser: patientList[2],
      isShrink: false,
      actionsheetIndex: null,
    };
    this.actionSheet = null;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  showActionSheet = () => {
    this.actionSheet.show();
    // showNavigationBar();
  }
  getActionSheetRef = ref => (this.actionSheet = ref);

  handlePress = (index) => {
    const { navigate } = this.props.navigation;

    this.setState({ actionsheetIndex: index });
    if (index === 0) navigate('PatientProfile');
    else if (index === 1) navigate('DoctorProfile');
  };

  ///////////////////////////////////////////////////////////////////////
  onclickVideoChat = () => {
    const { navigate } = this.props.navigation;
    navigate('VideoChatView');
  }

  ///////////////////////////////////////////////////////////////////////
  onclickMoreinfo = () => {
    this.showActionSheet();
  }

  ///////////////////////////////////////////////////////////////////////
  onBack = () => {
    this.props.navigation.goBack();
  }

  ///////////////////////////////////////////////////////////////////////
  handleScroll = (ev) => {

  }

  ///////////////////////////////////////////////////////////////////////
  render() {
    const { selectedUser, isShrink } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <Container style={styles.container}>
        <AnimatedScreen.Wrapper headerMaxHeight={175} headerMinHeight={100} onScroll={(ev) => this.handleScroll(ev)}>
          <AnimatedScreen.Header>
            <View style={{ height: "100%" }}>
              <ChatHeader
                selectedUser={selectedUser}
                onclickVideoChat={this.onclickVideoChat}
                onclickMoreinfo={this.onclickMoreinfo}
                onBack={this.onBack}
              >
                {
                  <AnimatedScreen.CollapsibleElement
                    animatedStyle={scrollY => ({ opacity: scrollY.interpolate({ inputRange: [0, 20, 30, 100], outputRange: [1, 1, 0.2, 0] }) })}
                    style={{ paddingBottom: 50 }}
                  >
                    <Slider dataList={controlData} activeIndex={0} viewCount={4} />
                  </AnimatedScreen.CollapsibleElement>
                }
              </ChatHeader>
            </View>
          </AnimatedScreen.Header>

          {/* <Content style={styles.Content, {height: '100%'}} onScroll={(ev)=> this.handleScroll(ev)}>        */}
          <AnimatedScreen.ScrollView style={[styles.Content]} >
            <StatusBar backgroundColor='white' barStyle="dark-content" translucent={true} />

            <View style={{ marginTop: 16 }}>
              <ChatFace data={selectedUser} />
            </View>
            <View style={{ marginLeft: 40 }}>
              <View style={{ alignSelf: 'flex-start' }}>
                <Text style={S.chatClientBox1}>{"Hi Dr. Lisa ! Already create an Clerked account"}</Text>
              </View>
              <View style={{ alignSelf: 'flex-start' }}>
                <Text style={S.chatClientBox2}>{"How are you?"}</Text>
              </View>
              <View style={{ alignSelf: 'flex-start' }}>
                <Text style={S.chatClientBox3}>{"How are you?"}</Text>
              </View>
            </View>

            <View style={{ marginBottom: 70 }}>
              <View style={{ alignSelf: 'flex-end' }}>
                <Text style={S.ft12_G700}>10:23</Text>
              </View>
              <View style={{ alignSelf: 'flex-end' }}>
                <Text style={S.chatMeBox1}>{"Hi Dr. Lisa ! Already create an Clerked account"}</Text>
              </View>
              <View style={{ alignSelf: 'flex-end' }}>
                <Text style={S.chatMeBox2}>{"How are you?"}</Text>
              </View>
              <View style={{ alignSelf: 'flex-end', display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                <Icon style={{ fontSize: 20, color: '#54C1FB', marginRight: 5 }} name="checkmark-done-sharp" type="Ionicons" />
                <Text style={[S.chatMeBox3]}>How are you?</Text>
              </View>
              <View style={{ alignSelf: 'flex-end', display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                <Icon style={{ fontSize: 20, color: '#54C1FB', marginRight: 5 }} name="checkmark-done-sharp" type="Ionicons" />
                <Text style={[S.chatMeBox3]}>How are you?</Text>
              </View>
              <View style={{ alignSelf: 'flex-end', display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                <Icon style={{ fontSize: 20, color: '#54C1FB', marginRight: 5 }} name="checkmark-done-sharp" type="Ionicons" />
                <Text style={[S.chatMeBox3]}>How are you?</Text>
              </View>
              <View style={{ alignSelf: 'flex-end', display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                <Icon style={{ fontSize: 20, color: '#54C1FB', marginRight: 5 }} name="checkmark-done-sharp" type="Ionicons" />
                <Text style={[S.chatMeBox3]}>How are you?</Text>
              </View>
              <View style={{ alignSelf: 'flex-end', display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                <Icon style={{ fontSize: 20, color: '#54C1FB', marginRight: 5 }} name="checkmark-done-sharp" type="Ionicons" />
                <Text style={[S.chatMeBox3]}>How are you?</Text>
              </View>
              <View style={{ alignSelf: 'flex-end', display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                <Icon style={{ fontSize: 20, color: '#54C1FB', marginRight: 5 }} name="checkmark-done-sharp" type="Ionicons" />
                <Text style={[S.chatMeBox3]}>How are you?</Text>
              </View>
              <View style={{ alignSelf: 'flex-end', display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                <Icon style={{ fontSize: 20, color: '#54C1FB', marginRight: 5 }} name="checkmark-done-sharp" type="Ionicons" />
                <Text style={[S.chatMeBox3]}>How are you?</Text>
              </View>
              <View style={{ alignSelf: 'flex-end', display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                <Icon style={{ fontSize: 20, color: '#54C1FB', marginRight: 5 }} name="checkmark-done-sharp" type="Ionicons" />
                <Text style={[S.chatMeBox3]}>How are you?</Text>
              </View>
              <View style={{ alignSelf: 'flex-end', display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                <Icon style={{ fontSize: 20, color: '#54C1FB', marginRight: 5 }} name="checkmark-done-sharp" type="Ionicons" />
                <Text style={[S.chatMeBox3]}>How are you?</Text>
              </View>
              <View style={{ alignSelf: 'flex-end', display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                <Icon style={{ fontSize: 20, color: '#54C1FB', marginRight: 5 }} name="checkmark-done-sharp" type="Ionicons" />
                <Text style={[S.chatMeBox3]}>How are you?</Text>
              </View>
            </View>
          </AnimatedScreen.ScrollView>
        </AnimatedScreen.Wrapper>

        <ActionSheet ref={this.getActionSheetRef} options={options} onPress={this.handlePress} />

        <Footer style={{ backgroundColor: 'white' }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ padding: 10 }}>
                <Attach_svg width={16} height={16} fill={"#667285"} />
              </View>
              <View style={{ padding: 10 }}>
                <Photography_svg width={16} height={16} fill={"#667285"} />
              </View>
              <View style={{ padding: 10 }}>
                <MicOn_svg width={16} height={16} fill={"#667285"} />
              </View>
              {/* <Icon style={{fontSize: 25, color: '#54C1FB', marginRight:5, color:'#667285', padding: 5}} name="attach" type="Ionicons" />
              <Icon style={{fontSize: 25, color: '#54C1FB', marginRight:5, color:'#667285', padding: 5}} name="md-camera" type="Ionicons" />
              <Icon style={{fontSize: 20, color: '#54C1FB', marginRight:5, color:'#667285', padding: 5}} name="microphone" type="FontAwesome" /> */}
              <View style={{ backgroundColor: '#F2F3F4', borderRadius: 32, paddingHorizontal: 16, height: 35, margin: 8, flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <TextInput placeholder="Write a reply..." style={[S.ft16_G800, { flex: 1, }]}></TextInput>
                {/* <Icon style={{fontSize: 20, color: '#99A1AD'}} name="emotsmile" type="SimpleLineIcons" /> */}
                <Emoji_Smile_svg width={16} height={16} fill={"#99A1AD"} />
              </View>
            </View>
          </View>
        </Footer>
      </Container>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  Content: {
    padding: 20,
  },
  control_panel: {
    paddingHorizontal: 24,
  },
  control: {
    padding: 12,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 41, 102, 0.3)'
  },

});

