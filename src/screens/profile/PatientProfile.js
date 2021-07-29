// ***************************************************************************
//  @Date:    1/19/2021: 
//  @Update:  2/19/2021
//  @author:  ClerkedApp team: 
//  @description:   A page to show a patient's profile information. 
// ***************************************************************************

import React from 'react';
import { StyleSheet, View, Text, Image, StatusBar, TouchableHighlight, Dimensions, Animated } from 'react-native';
import { Container, Content, Card, CardItem, Icon, Right } from 'native-base';
import { hideNavigationBar, showNavigationBar } from 'react-native-navigation-bar-color';
import Modal from 'react-native-modal';
import { ActionSheet, HeaderComp, DetailPropertyItem, Card1 } from '../../components';
import { User_img1 } from '../../assets/images';
import {
  ArrowUp_svg, ArrowDown_svg, Note_svg, Workup_svg, Calendar_svg, Phone_svg, ArrowRight_svg, Syringe_svg, Head_svg,
  Device_svg, CameraOn_svg, Medication_svg, Plask_svg, Cross_svg, Message_svg,
  Group_svg, Media_svg, Pin_svg, Bookmark_svg, Share_svg, Archive_svg, Delete_svg
} from '../../assets/icons';
import { S } from '../../mainStyle';
import * as MS from '../../mainStyle';
import { RECORD_SLIDER_DATA } from '../../config/data';

const { width, height } = Dimensions.get('screen');

const actionSheetStyles = StyleSheet.create({
  Item: {
    fontFamily: 'Proxima-Nova-Bold',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24,
    color: MS.Gray800,
  },
});

const options = [
  { component: <Text style={actionSheetStyles.Item}>Share contact</Text>, height: 50, },
  { component: <Text style={actionSheetStyles.Item}>Archive conversation</Text>, height: 50, },
  { component: <Text style={actionSheetStyles.Item}>Delete conversation</Text>, height: 50, }
];

const VISIBLE_HEIGHT = 80;

//Start ActionSheet Modal Class <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
class ActionSheetModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpand: false,
      flag: false,
      pinExpand:false,
    };
  }

  scroll = new Animated.Value(0);

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onDragEnd = (nativeEvent) => {
    const { isExpand } = this.state;
    if (!isExpand && nativeEvent.contentOffset.y > 40) this.setState({ isExpand: true });
    else if (isExpand && nativeEvent.contentOffset.y <= 40) this.setState({ isExpand: false });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onClickCollaspe = () => {
    const { flag } = this.state;
    this.setState({ flag: !flag, isExpand: false });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onPinExpand =() => {
    const { pinExpand } = this.state;
    this.setState({ pinExpand: !pinExpand });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onTouchFlaggedItem =()=> {
    const { onBack } = this.props
    const { navigate } = this.props.navigation;
    navigate("SessionNotes");
    onBack();
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    const { visible, onBack } = this.props
    const { isExpand, flag, pinExpand } = this.state;

    return (
      <Modal
        statusBarTranslucent
        animationInTiming={500}
        animationOutTiming={500}
        backdropTransitionInTiming={500}
        backdropTransitionOutTiming={500}
        isVisible={visible}
        onBackdropPress={() => onBack()}
        style={{ justifyContent: 'flex-end', margin: 0 }}
        useNativeDriverForBackdrop
        backdropOpacity={0.6}
      >
        <Animated.View
          style={{
            top: 40,
            transform: [{ translateY: Animated.multiply(Animated.diffClamp(this.scroll, 0, VISIBLE_HEIGHT), -0.5) }]
          }}>
          <View style={{ ...styles.modalView, height: height - 20 }}>
            <View style={[styles.indicatorPanel, isExpand && S.bottomBorder]}>
              {
                isExpand ?
                  <TouchableHighlight style={{ padding: 5 }}
                    activeOpacity={0.8}
                    underlayColor="transparent"
                    onPress={() => this.onClickCollaspe()}
                  >
                    <ArrowDown_svg width={16} height={16} fill={MS.Blue300} />
                  </TouchableHighlight>
                  :
                  <View style={styles.modalIndicator} />
              }
            </View>

            <Animated.ScrollView style={styles.modalContents}
              onScrollEndDrag={({ nativeEvent }) => this.onDragEnd(nativeEvent)}
              contentOffset={{ x: 0, y: flag ? 1 : 0 }}
              onScroll={
                Animated.event(
                  [{ nativeEvent: { contentOffset: { y: this.scroll } } }],
                  { useNativeDriver: true }
                )
              }>
              <Card style={styles.card}>
                <CardItem>
                  <View style={[S.mr24, S.pv8]}>
                    <Phone_svg width={16} height={16} fill={MS.Blue500} />
                  </View>
                  <Text style={{ ...S.ft16B, color: MS.Gray800 }}>Start a call</Text>
                </CardItem>
                <CardItem style={{ padding: 0 }}>
                  <View style={[S.mr32, S.pv8]}>
                    <CameraOn_svg width={16} height={16} fill={MS.Blue500} />
                  </View>
                  <Text style={{ ...S.ft16B, color: MS.Gray800 }}>Start a video call</Text>
                </CardItem>
                <CardItem style={{ padding: 0 }}>
                  <View style={[S.mr24, S.pv8]}>
                    <Message_svg width={16} height={16} fill={MS.Blue500} />
                  </View>
                  <Text style={{ ...S.ft16B, color: MS.Gray800 }}>Send a message</Text>
                </CardItem>
                <CardItem style={{ padding: 0 }}>
                  <View style={[S.mr24, S.pv8]}>
                    <Calendar_svg width={16} height={16} fill={MS.Blue500} />
                  </View>
                  <Text style={{ ...S.ft16B, color: MS.Gray800 }}>Create new appointment</Text>
                </CardItem>
                <CardItem >
                  <View style={S.mr24}>
                    <Group_svg width={16} height={16} fill={MS.Blue500} />
                  </View>
                  <Text style={{ ...S.ft16B, color: MS.Gray800 }}>Create group</Text>
                </CardItem>
                <CardItem >
                  <View style={[S.mr24, S.pv8]}>
                    <Media_svg width={16} height={16} fill={MS.Blue500} />
                  </View>
                  <Text style={{ ...S.ft16B, color: MS.Gray800 }}>Media, links and docs</Text>
                </CardItem>
              </Card>

              <Card style={styles.card}>
                <CardItem style={{ padding: 0 }}>
                  <View style={[S.mr24, S.pv8]}>
                    <Pin_svg width={16} height={16} fill={MS.Green500} />
                  </View>
                  <Text style={{ ...S.ft16B, color: MS.Gray800 }}>Pinned items</Text>
                  <Right style={{ flex: 1 }}>
                    <TouchableHighlight style={{ padding: 5 }} activeOpacity={0.6}  underlayColor="transparent" onPress={() => this.onPinExpand()}>
                      {
                        pinExpand?
                        <ArrowUp_svg width={16} height={16} fill={MS.Blue500} />
                        :
                        <ArrowDown_svg width={16} height={16} fill={MS.Gray600} />
                      }
                    </TouchableHighlight>
                  </Right>
                </CardItem>
                {
                  pinExpand &&
                  <View style={{paddingLeft:56, paddingRight:16 }}>
                    <View style={{ paddingVertical: 16, borderBottomWidth:1, borderBottomColor:MS.Gray300 }}>
                      <View style={[S.rowFlex]}>
                        <Text style={{ ...S.ft14B, color: MS.Gray900 }}>Britnay Sanders</Text>
                        <Text style={{ ...S.ft10B, color: MS.Gray700 }}>21/11/20</Text>
                      </View>
                      <Text 
                        numberOfLines={2} 
                        ellipsizeMode="tail" 
                        style={{ ...S.ft12, color: MS.Gray700, marginTop:8,lineHeight:16 }}
                      >
                        Here you have a pic of my pulse. It looks better? What you think?
                      </Text>
                    </View>
                    <View style={{ paddingVertical: 16 }}>
                      <View style={[S.rowFlex]}>
                        <Text style={{ ...S.ft14B, color: MS.Gray900 }}>Dr. Lisa</Text>
                        <Text style={{ ...S.ft10B, color: MS.Gray700 }}>20/11/20</Text>
                      </View>
                      <Text 
                        numberOfLines={2} 
                        ellipsizeMode="tail" 
                        style={{ ...S.ft12, color: MS.Gray700, marginTop:8,lineHeight:16 }}
                      >
                        you can see how it looks the x-ray: “BritnaySanders_xray.pdf”. You can downloa...
                      </Text>
                    </View>
                  </View>
                }
              </Card>

              <Card style={styles.card}>
                <CardItem style={{ padding: 0 }}>
                  <TouchableHighlight style={{width:"100%"}} activeOpacity={0.6} underlayColor="transparent" onPress={() => this.onTouchFlaggedItem()}>
                    <View style={S.rowFlex_start}>
                      <View style={[S.mr24, S.pv8]}>
                        <Bookmark_svg width={16} height={16} fill={MS.Orange500} />
                      </View>
                      <Text style={{ ...S.ft16B, color: MS.Gray800 }}>Flagged items</Text>
                    </View>
                  </TouchableHighlight>                
                </CardItem>
              </Card>

              <Card style={[styles.card, S.mb24]}>
                <CardItem>
                  <View style={[S.mr24, S.pv8]}>
                    <Share_svg width={16} height={16} fill={MS.Blue500} />
                  </View>
                  <Text style={{ ...S.ft16B, color: MS.Gray800 }}>Share contact</Text>
                </CardItem>
                <CardItem>
                  <View style={[S.mr24, S.pv8]}>
                    <Archive_svg width={16} height={16} fill={MS.Blue500} />
                  </View>
                  <Text style={{ ...S.ft16B, color: MS.Gray800 }}>Archive conversation</Text>
                </CardItem>
                <CardItem>
                  <View style={[S.mr24, S.pv8]}>
                    <Delete_svg width={16} height={16} fill={MS.Red500} />
                  </View>
                  <Text style={{ ...S.ft16B, color: MS.Red500 }}>Delete conversation</Text>
                </CardItem>
              </Card>
            </Animated.ScrollView>
          </View>
        </Animated.View>
      </Modal>
    )
  }
}
//End ActionSheet Modal Class >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//




//Start visitor Detail Modal Class <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
class DetailModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    const { data, visible, onBack } = this.props

    return (
      <Modal
        statusBarTranslucent
        animationInTiming={500}
        animationOutTiming={500}
        backdropTransitionInTiming={500}
        backdropTransitionOutTiming={500}
        isVisible={visible}
        onBackdropPress={() => onBack()}
        style={{ justifyContent: 'flex-end', margin: 0 }}
        useNativeDriverForBackdrop
        backdropOpacity={0.6}
      >
        <View>
          <View style={styles.indicatorPanel}>
            <View style={styles.modalIndicator}/>
          </View>
          <View style={styles.modalContents}>
            <View style={[S.rowFlex_start, S.pv8]}>
              <Text style={{...S.ft14B, color:MS.Gray600,flex:0.4}}>Location</Text>
              <Text style={{...S.ft14B, color:MS.Gray900,flex:0.6}}>California, USA</Text>
            </View>
            <View style={[S.rowFlex_start, S.pv8]}>
              <Text style={{...S.ft14B, color:MS.Gray600,flex:0.4}}>Gender</Text>
              <Text style={{...S.ft14B, color:MS.Gray900,flex:0.6}}>Female</Text>
            </View>
            <View style={[S.rowFlex_start, S.pv8]}>
              <Text style={{...S.ft14B, color:MS.Gray600,flex:0.4}}>Birthdate</Text>
              <Text style={{...S.ft14B, color:MS.Gray900,flex:0.6}}>17 Jan, 1991</Text>
            </View>
            <View style={[S.rowFlex_start, S.pv8]}>
              <Text style={{...S.ft14B, color:MS.Gray600,flex:0.4}}>HP number</Text>
              <Text style={{...S.ft14B, color:MS.Gray900,flex:0.6}}>+351 917486547</Text>
            </View>
            <View style={[S.rowFlex_start, S.pv8]}>
              <Text style={{...S.ft14B, color:MS.Gray600,flex:0.4}}>Language</Text>
              <Text style={{...S.ft14B, color:MS.Gray900,flex:0.6}}>Spanish</Text>
            </View>
            <View style={[S.rowFlex_start, S.pv8]}>
              <Text style={{...S.ft14B, color:MS.Gray600,flex:0.4}}>Caregiver</Text>
              <View style={{...S.rowFlex_start,flex:0.6}}>
                <Image source={User_img1} style={[S.avatar16,S.mr8,{marginTop:-4}]} resizeMode="contain" />    
                <Text style={{...S.ft14B, color:MS.Gray900}}>Sarah Bryans</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}
//End visitor Detail modal Class >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//



//Start PatientProfile Class <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
export default class PatientProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: null,
      isHeaderBorder: false,
      openActionSheetModal: false,
      openDetailModal: false,
    };
    this.actionSheet = null;
  }

  ///////////////////////////////////////////////////////////////////////
  componentDidMount() {
    // hideNavigationBar();
    const { navigation } = this.props;
    let userData = navigation.getParam('userData');
    this.setState({ userData: userData });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  showActionSheet = () => {
    this.actionSheet.show();
    // showNavigationBar();
  }
  // getActionSheetRef = ref => (this.actionSheet = ref);
  // handlePress = (index) => {
  //   this.setState({ actionsheetIndex: index });
  //   // hideNavigationBar();
  // };

  ///////////////////////////////////////////////////////////////////////
  onBackpage = () => {
    const { navigate } = this.props.navigation;
    navigate("Chat");
  }

  ///////////////////////////////////////////////////////////////////////
  onScroll = (ev) => {
    const { isHeaderBorder } = this.state;
    if (!isHeaderBorder && ev.contentOffset.y > 8) this.setState({ isHeaderBorder: true });
    else if (isHeaderBorder && ev.contentOffset.y < 8) this.setState({ isHeaderBorder: false });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onBackActionSheetModal = () => {
    this.setState({ openActionSheetModal: false });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onBackOpenDetailModal = () => {
    this.setState({ openDetailModal: false });
  }
  
  ///////////////////////////////////////////////////////////////////////
  render() {
    const { navigate } = this.props.navigation;
    const { isHeaderBorder, openActionSheetModal, openDetailModal } = this.state;
    return (
      <Container style={styles.container}>
        <View style={{ backgroundColor: 'transparent', paddingTop: 20 }}>
          <HeaderComp
            active={true} isBorder={isHeaderBorder}
            leftText={isHeaderBorder?"Britnay Sanders":""} rightText={""}
            onSave={() => {this.setState({ openActionSheetModal: true })}}
            onBackpage={this.onBackpage}
          >
            <Icon type="Entypo" name='dots-three-horizontal' style={{ fontSize: 20, color: MS.Gray900 }} />
          </HeaderComp>
        </View>

        <Content
          style={styles.contents}
          showsVerticalScrollIndicator={false}
          onScroll={({ nativeEvent }) => this.onScroll(nativeEvent)}
        >
          <StatusBar backgroundColor={MS.Gray100} barStyle="dark-content" />
          <View style={styles.profilePanel}>
            <View style={styles.profilePhoto}>
              <Image source={User_img1} style={{ ...S.avatar70 }} resizeMode="contain" />              
            </View>
            <View style={{...S.rowFlex_start, marginTop:4, marginRight:-32}}>
              <Text style={{ ...S.ft18B, color: MS.Gray800 }}>{"Britnay Sanders"}</Text>
              <TouchableHighlight style={{marginTop:-3, padding:8}} 
                activeOpacity={0.6} underlayColor="transparent" 
                onPress={() => this.setState({openDetailModal:true})}
              >
                <Icon type="Foundation" name='info' style={{ fontSize:22, color: MS.Blue500 }} />
              </TouchableHighlight>
            </View>
            <Text style = { S.ft12S_G500 }>{"458741369"}</Text>

            <View style = {{ width: "100%", marginVertical: 16 }}>
              <View style = { S.rowFlex }>
                <View style = {[ styles.card, styles.featureCard ]}>
                  <Text style = { S.ft12S_G500 }>Temperature</Text>
                  <Text style = { [S.ft18S_G800, S.mt16]}>37</Text>
                  <View style = {[ S.mt8, S.rowFlex ]}>
                    <Text style = { S.ft12S_G500 }>Celsius</Text>
                    <Text style = { S.ft12S_G500 }>&minus;</Text>
                  </View>
                </View>
                <View style={[ styles.card, styles.featureCard ]}>
                  <Text style={ S.ft12S_G500 }>Heart rate</Text>
                  <Text style = { [S.ft18S_G800, S.mt16]}>82</Text>
                  <View style={[S.mt8,S.rowFlex]}>
                    <Text style={ S.ft12S_G500 }>bpm</Text>
                    <Text style={{ ...S.ft12B, color: MS.Green500 }}>&#9660;14</Text>
                  </View>
                </View>
                <View style={{...styles.card, ...styles.featureCard, marginRight:0}}>
                  <Text style={S.ft12S_G500 }>Blood pressure</Text>
                  <Text style = { [S.ft18S_G800, S.mt16]}>120/80</Text>
                  <View style={[S.mt8,S.rowFlex]}>
                    <Text style={S.ft12S_G500 }>mmHg</Text>
                    <Text style={{ ...S.ft12B, color: MS.Red500 }}>&#9650;100</Text>
                  </View>
                </View>
              </View>
              <View style = {[S.rowFlex, S.mt8]}>
                <View style = {[ styles.card, styles.featureCard ]}>
                  <Text style={S.ft12S_G500 }>Blood sugar</Text>
                  <Text style = { [S.ft18S_G800, S.mt16]}>57</Text>
                  <View style={[S.mt8,S.rowFlex]}>
                    <Text style={S.ft12S_G500 }>mmol/L</Text>
                    <Text style={{ ...S.ft12B, color: MS.Red500 }}>&#9650;41</Text>
                  </View>
                </View>
                <View style = {[ styles.card, styles.featureCard ]}>
                  <Text style = {S.ft12S_G500 }>Breathe rate</Text>
                  <Text style = { [S.ft18S_G800, S.mt16]}>14</Text>
                  <View style = {[S.mt8, S.rowFlex]}>
                    <Text style = {S.ft12S_G500 }>bpm</Text>
                    <Text style = {{ ...S.ft12B, color: MS.Green500 }}>&#9660;4</Text>
                  </View>
                </View>
                <View style={{...styles.card, ...styles.featureCard, marginRight:0}}>
                  <Text style={S.ft12S_G500 }>Oxygenation</Text>
                  <Text style = { [S.ft18S_G800, S.mt16]}>91</Text>
                  <View style={[S.mt8,S.rowFlex]}>
                    <Text style={S.ft12S_G500 }>percent</Text>
                    <Text style={{ ...S.ft12B, color: MS.Red500 }}>&#9660;4</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <Card style={[styles.card, S.mb32, S.mt8]}>
            <CardItem>
              <TouchableHighlight style={{width:"100%"}} activeOpacity={0.8} underlayColor="transparent" onPress={() => navigate("RecordsManagementPage", {item:RECORD_SLIDER_DATA[0]})}>
                <DetailPropertyItem IconComp={Note_svg} title={"Session Notes"} subtitle={"Daily appointment notes."} count={"4"}/>
              </TouchableHighlight>                
            </CardItem>

            <CardItem >
              <DetailPropertyItem IconComp={Workup_svg} title={"Problem list"} subtitle={"List of diagnoses and problems."} count={"2"}>
              </DetailPropertyItem>
            </CardItem>
            <CardItem>
              <DetailPropertyItem IconComp={Medication_svg} title={"Medications"} subtitle={"History of patient’s medication"} count={"8"} />
            </CardItem>
            <CardItem>
              <DetailPropertyItem IconComp={Plask_svg} title={"Investigation"} subtitle={"Radiology, Laboratory tests and Blood test."} count={"2"} />
            </CardItem>
            <CardItem>
              <DetailPropertyItem IconComp={Cross_svg} title={"Procedures"} subtitle={"Whene, duration, complications and findings."} count={"0"} />
            </CardItem>
            <CardItem>
              <DetailPropertyItem IconComp={Syringe_svg} title={"Imunizations"} subtitle={"Whene, duration, complications and findings."} count={"0"} />
            </CardItem>  
            <CardItem>
              <DetailPropertyItem IconComp={Head_svg} title={"Allergies"} subtitle={"Whene, duration, complications and findings."} count={"0"} />
            </CardItem>
            <CardItem>
              <DetailPropertyItem IconComp={Device_svg} title={"Devices"} subtitle={"Whene, duration, complications and findings."} count={"0"} />
            </CardItem>
          </Card>
        </Content>

        <ActionSheetModal visible={openActionSheetModal} onBack={this.onBackActionSheetModal} {...this.props} />
        <DetailModal visible={openDetailModal} onBack={this.onBackOpenDetailModal} />
      </Container>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFB',
  },
  contents: {
    padding: 24,
    paddingTop: 8,
    width: '100%',
    backgroundColor: '#FAFAFB',
  },
  card: {
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 0,
    // borderWidth:1,
    borderBottomWidth: 1,
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: 'rgba(0, 71, 179, 0.03)'
  },
  featureItem: {
    marginRight: -16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F2F3F4',
  },
  community: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginHorizontal: -16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  profilePanel: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  profilePhoto: {
    ...S.shadow,
    elevation: 5,
    backgroundColor: 'white',
    padding: 1
  },
  title: {
    ...S.ft12_G700,
    color: "#B3B9C2",
    textAlign: "center"
  },
  contentText: {
    ...S.ft14B,
    color: MS.Gray800,
    textAlign: "center"
  },
  textFrame: {
    fontFamily: 'Proxima-Nova-Bold',
    fontSize: 10,
    color: "#0066FF",
    backgroundColor: "#E6F0FF",
    textTransform: "capitalize",
    borderRadius: 16,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  dropdown: {
    ...S.ph8,
    position: "absolute",
    right: 9,
    top: 4,
    padding: 5,
  },

  modalView: {
    backgroundColor: "#FAFAFB",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    // padding: 24,
    alignItems: "center",
  },
  indicatorPanel: {
    width: "100%",
    height: 32,
    alignItems: "center",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "#FAFAFB",
  },
  modalIndicator: {
    width: 40,
    height: 3,
    marginTop: 8,
    borderRadius: 10,
    backgroundColor: '#80B3FF',
  },
  modalContents: {
    width: "100%",
    padding: 24,
    paddingTop: 8,
    backgroundColor: '#FAFAFB',
  },
  featureCard:{
    flex:1,
    // height:82, 
    borderRadius:8, 
    padding:8,
    marginRight:8,
    backgroundColor:"#FFFFFF",     
  }
})


