// ***************************************************************************
//  @Created Date:    12/20/2020 
//  @Update:  2/16/2021
//  @author:  ClerkedApp team
//  @description:   A screen to connect users
// ***************************************************************************

import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Dimensions, Animated, StatusBar } from 'react-native';
import { Container, Content } from 'native-base';;
import { hideNavigationBar, showNavigationBar } from 'react-native-navigation-bar-color';
import { ActionSheet, MsgItemComp, SearchComp, SegmentButton } from '../../components';
import { Filter_icon, AddPluse_icon, Share_icon, Conversation_icon, Delete_icon } from '../../assets/icons';
import { User_img1, User_img2, User_img3, User_img4, User_img5, User_img6, User_img7, Doc_img1, Doc_img2, Doc_img3, Doc_img4, Doc_img5, Doc_img6 } from '../../assets/images';
import { S } from '../../mainStyle';
import * as MS from '../../mainStyle';

const { width, height } = Dimensions.get('window');

const actionSheetStyles = StyleSheet.create({
  Item: {
    fontFamily: 'Proxima-Nova-Regular',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24,
    color: '#33435C',
  },
});

const options = [
  { component: <Text style={actionSheetStyles.Item}>Patient name</Text>, height: 50, },
  { component: <Text style={actionSheetStyles.Item}>Last seen</Text>, height: 50, },
  { component: <Text style={actionSheetStyles.Item}>Fully registered</Text>, height: 50, },
  { component: <Text style={actionSheetStyles.Item}>Partially registered</Text>, height: 50, }
];


let patientList = [
  { user: { photo: User_img1, name: 'Sarah Bryans', id: '124784657', email: 'aaa@gmail.com', phoneNum: "+65916147854", role: 'cvm' }, Msg: { time: "10:07", txt: "Ok. See you there!", unReadCount: 0, isLastMsg: true }, groupType: null, isOnline: true, isCareteam: false },
  { user: { photo: User_img2, name: 'Johana Smith', id: '134384657', email: 'bbb@gmail.com', phoneNum: "+65742334533", role: 'cts' }, Msg: { time: "10:30", txt: "Yes, doctor. I’m starting to feel bet...", unReadCount: 0, isLastMsg: false }, groupType: null, isOnline: false, isCareteam: true },
  { user: { photo: User_img3, name: 'Rebecca Bryans', id: '76884657', email: 'ccc@gmail.com', phoneNum: "+65756484453", role: 'nem' }, Msg: { time: "11:36", txt: "What about 5:30pm? I’m free!", unReadCount: 2, isLastMsg: false }, groupType: null, isOnline: true, isCareteam: false },
  { user: { photo: User_img4, name: 'Sarah Jones', id: '98567657', email: 'ddd@gmail.com', phoneNum: "+65123345363", role: 'cvm' }, Msg: { time: "Yesterday", txt: "No problem, i can manage a way to b...", unReadCount: 0, isLastMsg: false }, groupType: null, isOnline: false, isCareteam: true },
  { user: { photo: User_img5, name: 'Roger Barkley', id: '95673545', email: 'eee@gmail.com', phoneNum: "+6534657976", role: 'cts' }, Msg: { time: "21/07/20", txt: "Thanks! See you!", unReadCount: 0, isLastMsg: false }, groupType: null, isOnline: false, isCareteam: false },
  { user: { photo: User_img6, name: 'Edwards McCakine', id: '63864336', email: 'fff@gmail.com', phoneNum: "+65673455667", role: 'nem' }, Msg: { time: "21/06/20", txt: "Ok. See you there!", unReadCount: 0, isLastMsg: false }, groupType: null, isOnline: false, isCareteam: false },
  { user: { photo: User_img7, name: 'Samanta Bosh', id: '336784567', email: 'ggg@gmail.com', phoneNum: "+65756855645", role: 'cvm' }, Msg: { time: "21/04/20", txt: "O I’m free!", unReadCount: 0, isLastMsg: true }, groupType: null, isOnline: false, isCareteam: false },
  { user: { photo: User_img5, name: 'Roger Barkley', id: '95673545', email: 'eee@gmail.com', phoneNum: "+6534657976", role: 'cts' }, Msg: { time: "21/07/20", txt: "Thanks! See you!", unReadCount: 0, isLastMsg: false }, groupType: null, isOnline: false, isCareteam: false },
  { user: { photo: User_img6, name: 'Edwards McCakine', id: '63864336', email: 'fff@gmail.com', phoneNum: "+65673455667", role: 'nem' }, Msg: { time: "21/06/20", txt: "Ok. See you there!", unReadCount: 0, isLastMsg: false }, groupType: null, isOnline: false, isCareteam: false },
  { user: { photo: User_img7, name: 'Samanta Bosh', id: '336784567', email: 'ggg@gmail.com', phoneNum: "+65756855645", role: 'cvm' }, Msg: { time: "21/04/20", txt: "O I’m free!", unReadCount: 0, isLastMsg: true }, groupType: null, isOnline: false, isCareteam: false },

]


let doctorList = [
  { user: { photo: Doc_img1, name: 'Monica Lindsay', id: '124784657', email: 'aaa@gmail.com', phoneNum: "+65916147854", role: 'patient' }, Msg: { time: "10:07", txt: "Ok. See you there!", unReadCount: 0, isLastMsg: false }, groupType: null, isOnline: false, isCareteam: false },
  { user: { photo: Doc_img2, name: 'Rebecca Smith', id: '134384657', email: 'bbb@gmail.com', phoneNum: "+65742334533", role: '' }, Msg: { time: "10:30", txt: "Yes, doctor. I’m starting to feel bet...", unReadCount: 0, isLastMsg: false }, groupType: null, isOnline: false, isCareteam: false },
  { user: { photo: Doc_img3, name: 'Bryan Phillips', id: '76884657', email: 'ccc@gmail.com', phoneNum: "+65756484453", role: 'doctor' }, Msg: { time: "11:36", txt: "What about 5:30pm? I’m free!", unReadCount: 2, isLastMsg: false }, groupType: null, isOnline: true, isCareteam: true },
  { user: { photo: Doc_img4, name: 'Ben Chillwel', id: '98567657', email: 'ddd@gmail.com', phoneNum: "+65123345363", role: '' }, Msg: { time: "Yesterday", txt: "No problem, i can manage a way to b...", unReadCount: 0, isLastMsg: false }, groupType: null, isOnline: false, isCareteam: false },
  { user: { photo: Doc_img5, name: 'Mina Barkley', id: '95673545', email: 'eee@gmail.com', phoneNum: "+6534657976", role: 'doctor' }, Msg: { time: "21/07/20", txt: "Thanks! See you!", unReadCount: 0, isLastMsg: false }, groupType: null, isOnline: true, isCareteam: true },
  { user: { photo: Doc_img6, name: 'Susan Morgan', id: '63864336', email: 'fff@gmail.com', phoneNum: "+65673455667", role: '' }, Msg: { time: "21/06/20", txt: "Ok. See you there!", unReadCount: 0, isLastMsg: false }, groupType: null, isOnline: false, isCareteam: false },
  { user: { photo: Doc_img4, name: 'Ben Chillwel', id: '98567657', email: 'ddd@gmail.com', phoneNum: "+65123345363", role: '' }, Msg: { time: "Yesterday", txt: "No problem, i can manage a way to b...", unReadCount: 0, isLastMsg: false }, groupType: null, isOnline: false, isCareteam: false },
  { user: { photo: Doc_img5, name: 'Mina Barkley', id: '95673545', email: 'eee@gmail.com', phoneNum: "+6534657976", role: 'doctor' }, Msg: { time: "21/07/20", txt: "Thanks! See you!", unReadCount: 0, isLastMsg: false }, groupType: null, isOnline: true, isCareteam: true },
  { user: { photo: Doc_img6, name: 'Susan Morgan', id: '63864336', email: 'fff@gmail.com', phoneNum: "+65673455667", role: '' }, Msg: { time: "21/06/20", txt: "Ok. See you there!", unReadCount: 0, isLastMsg: false }, groupType: null, isOnline: false, isCareteam: false },
]


const NAVBAR_HEIGHT = 65;
const COLOR = "#FAFAFB";

///////////////////////////////////////////////////////////////////////
export default class Connect extends React.Component {
  scroll = new Animated.Value(0);

  constructor(props) {
    super(props);

    this.state = {
      filteredList: patientList,

      isShrink: false,
      isPatient: true,
      searchTxt: "",
      selIndex: -1,
      sortType: -1,
      currentPos: 0,
      tabButtonType: 1,
      y: 0

    };

    this.actionSheet = null;
    this.headerY = Animated.multiply(Animated.diffClamp(this.scroll, 0, NAVBAR_HEIGHT), -1);
  }

  ///////////////////////////////////////////////////////////////////////
  onclickSwipButton = () => {
    const { isPatient } = this.state;
    this.setState({ isPatient: !isPatient, selIndex: -1 });

    if (!isPatient) this.setState({ filteredList: patientList });
    else this.setState({ filteredList: doctorList });
  }

  ///////////////////////////////////////////////////////////////////////
  onChangeSearchComp = (val) => {
    this.setState({ searchTxt: val });
  }

  ///////////////////////////////////////////////////////////////////////
  onclick_ListItem = (index) => {
    if (this.state.selIndex === index) this.setState({ selIndex: -1 });
    else this.setState({ selIndex: index });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onclickCareteam = (index) => {
    const { navigate } = this.props.navigation;
    navigate('viewCareteam');
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  showActionSheet = () => this.actionSheet.show();
  getActionSheetRef = ref => (this.actionSheet = ref);
  handlePress = (index) => {
    this.setState({ sortType: index });
  };


  ///////////////////////////////////////////////////////////////////////
  onclickTabButton = (type) => {
    this.setState({ tabButtonType: type, selIndex: -1 });
    if (type === 1) this.setState({ filteredList: patientList });
    else this.setState({ filteredList: doctorList });
  }

  ///////////////////////////////////////////////////////////////////////
  onscrollEnd = (ev) => {
    const { isShrink } = this.state;
    if (!isShrink && ev.contentOffset.y > 8) this.setState({ isShrink: true });
    else if (isShrink && ev.contentOffset.y < 8) this.setState({ isShrink: false });
  }

  ///////////////////////////////////////////////////////////////////////
  componentDidMount() {
    // hideNavigationBar();
  }

  ///////////////////////////////////////////////////////////////////////
  render() {
    const { navigate } = this.props.navigation;
    const { filteredList, searchTxt, selIndex, sortType, tabButtonType, isShrink } = this.state;

    return (
      <Container style={styles.container}>
        <Animated.View style={{
          width: "100%",
          position: "absolute",
          transform: [{ translateY: this.headerY }],
          elevation: 0, flex: 1, zIndex: 1,
          backgroundColor: COLOR,
          borderBottomWidth: isShrink ? 1 : 0,
          borderBottomColor: MS.Gray100
        }}>
          <View style={[S.pb8, {padding:24}]}>
            <SegmentButton
              btnTextList={["Colleagues", "Patients"]}
              selButton={tabButtonType - 1}
              onclick_Button={this.onclickTabButton}
            />
          </View>

          {/* Search component ====================================== */}
          <View style={[S.rowFlex_start, S.mb8, S.ph24]}>
            <View style={styles.searchComp}>
              <SearchComp
                onChangeText={this.onChangeSearchComp}
                searchTxt={searchTxt}
                placeholder={"Search by name or ID"}
              />
            </View>
            <TouchableHighlight style={styles.filterButtonn} activeOpacity={0.9} underlayColor="transparent" onPress={() => this.showActionSheet()}>
              <Image source={Filter_icon} style={styles.filterIcon} resizeMode="contain" />
            </TouchableHighlight>
          </View>
        </Animated.View>
        
        <Animated.ScrollView
          scrollEventThrottle={1}
          bounces={false}
          showsVerticalScrollIndicator={false}
          decelerationRate={0.95}
          style={{ zIndex: 0, elevation: -1 }}
          contentContainerStyle={{ paddingTop: NAVBAR_HEIGHT }}
          onScroll={
            Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.scroll } } }],
              { useNativeDriver: true },
            )
          }
          onMomentumScrollEnd={({ nativeEvent }) => this.onscrollEnd(nativeEvent)}
          overScrollMode="never"
        >
          {/*********************** Content part *************************************/}
          <View style={styles.contents}>
            <StatusBar backgroundColor={MS.Gray100} barStyle="dark-content" translucent/>
            {
              filteredList &&
              filteredList.map((data, i) => (
                <View key={i} style={styles.items}>
                  {
                    selIndex === i &&
                    <View style={{ width: 176 }}>
                      <View style={[S.rowFlex, { backgroundColor: '#0066FF', height: 80, paddingHorizontal: 20 }]}>
                        <TouchableHighlight activeOpacity={0.9} underlayColor='transparent' onPress={() => navigate('Chat')}>
                          <Image source={Share_icon} style={styles.featureIcon} resizeMode="contain" />
                        </TouchableHighlight>
                        <TouchableHighlight activeOpacity={0.9} underlayColor='transparent' onPress={() => navigate('VideoChatView')}>
                          <Image source={Conversation_icon} style={styles.featureIcon} resizeMode="contain" />
                        </TouchableHighlight>
                        <Image source={Delete_icon} style={styles.featureIcon} resizeMode="contain" />
                      </View>
                    </View>
                  }
                  <View style={{ paddingHorizontal: 24, width: '100%' }}>
                    <TouchableHighlight
                      style={{ width: '100%' }}
                      activeOpacity={0.9}
                      underlayColor='transparent'
                      onPress={() => data.isCareteam ? this.onclickCareteam(i) : this.onclick_ListItem(i)}
                    >
                      <MsgItemComp data={data} isBorder={i === filteredList.length - 1 ? false : true} />
                    </TouchableHighlight>
                  </View>
                </View>
              ))
            }
            
          </View>
        </Animated.ScrollView>
        <View style={styles.addEvent_panel} >
          <TouchableHighlight style={{ borderRadius: 100 }} activeOpacity={0.6} underlayColor='transparent' onPress={() => navigate('Contact')}>
            <Image source={AddPluse_icon} style={styles.addPatient_btn} resizeMode="contain" />
          </TouchableHighlight>
        </View>
        <ActionSheet ref={this.getActionSheetRef} options={options} onPress={this.handlePress} title={"Sort by"} checkInd={sortType} />
      </Container>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFB',
    marginTop: 22
  },
  contents: {
    marginTop: 46
  },
  filterIcon: {
    width: 18,
    height: 18,
  },
  filterButtonn: {
    borderRadius: 8,
    backgroundColor: '#F2F3F4',
    width: 60,
    padding: 10,
    alignItems: 'center',
    marginLeft: 10
  },
  searchComp: {
    width: '100%',
    flex: 1,

  },
  addEvent_panel: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 90,
    height: 90,
    zIndex: 999,
    borderRadius: 50,
    backgroundColor: 'transparent'
  },
  featureIcon: {
    width: 32,
    height: 32,
  },
  items: {
    display: 'flex',
    flexDirection: 'row',
    // paddingHorizontal:24
  },
  addPatient_btn: {
    width: 90,
    height: 90,
    zIndex: 999,
    borderRadius: 50,
  }
});

