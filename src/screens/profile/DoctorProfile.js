// ***************************************************************************
//  @Date:    2/20/2021: 
//  @Update:  2/20/2021
//  @author:  ClerkedApp team: 
//  @description:   A page to show a doctor's profile information. 
// ***************************************************************************

import React from 'react';
import { StyleSheet, ScrollView, View, Text, Image, StatusBar, TouchableHighlight, Dimensions, Animated } from 'react-native';
import { Container, Content, Card, CardItem, Icon, Right } from 'native-base';
import { hideNavigationBar, showNavigationBar } from 'react-native-navigation-bar-color';
import Modal from 'react-native-modal';
import { HeaderComp } from '../../components';
import { Doc_img1 } from '../../assets/images';
import {
  ArrowUp_svg, ArrowDown_svg, Calendar_svg, Phone_svg, CameraOn_svg, Message_svg,
  Group_svg, Media_svg, Pin_svg, Bookmark_svg, Share_svg, Archive_svg, Delete_svg
} from '../../assets/icons';
import { S } from '../../mainStyle';
import * as MS from '../../mainStyle';

const { width, height } = Dimensions.get('screen');

//Start Doctor Profile Class <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
export default class DoctorProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: null,
      isHeaderBorder: false,
      openActionSheetModal: false,
      openDetailModal: false,
      pinExpand: false,
    };
  }

  ///////////////////////////////////////////////////////////////////////
  componentDidMount() {
    // hideNavigationBar();
    const { navigation } = this.props;
    let userData = navigation.getParam('userData');
    this.setState({ userData: userData });
  }

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
  onBackOpenDetailModal = () => {
    this.setState({ openDetailModal: false });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onPinExpand = () => {
    const { pinExpand } = this.state;
    this.setState({ pinExpand: !pinExpand });

  }
  ///////////////////////////////////////////////////////////////////////
  render() {
    const { isHeaderBorder, openDetailModal, pinExpand } = this.state;

    return (
      <Container style={styles.container}>
        <View style={{ backgroundColor: 'transparent', paddingTop: 20 }}>
          <HeaderComp
            active={true}
            isBorder={isHeaderBorder}
            leftText={isHeaderBorder ? "Dr. Lisa Brooks" : ""} rightText={""}
            onSave={() => this.setState({ openActionSheetModal: true })}
            onBackpage={this.onBackpage}
          >
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
              <Image source={Doc_img1} style={{ ...S.avatar70 }} resizeMode="contain" />
            </View>
            <View style={{ ...S.rowFlex_start, marginTop: 8, marginRight: -24 }}>
              <Text style={{ ...S.ft18B, color: MS.Gray800 }}>{"Dr. Lisa Brooks"}</Text>
              <TouchableHighlight style={{ marginLeft: 8, marginTop: -3 }}
                activeOpacity={0.6} underlayColor="transparent"
                onPress={() => this.setState({ openDetailModal: true })}
              >
                <Icon type="Foundation" name='info' style={{ fontSize: 22, color: MS.Blue500 }} />
              </TouchableHighlight>
            </View>
            <Text style={{ ...S.ft12, color: MS.Gray600, marginTop: 8 }}>{"Ophtalmologist"}</Text>
          </View>

          <Card style={[styles.card, S.mt32]}>
            <CardItem>
              <View style={[S.mr32, S.pv8]}>
                <Phone_svg width={16} height={16} fill={MS.Blue500} />
              </View>
              <Text style={{ ...S.ft16B, color: MS.Gray800 }}>{"Start a call"}</Text>
            </CardItem>
            <CardItem style={{ padding: 0 }}>
              <View style={[S.mr32, S.pv8]}>
                <CameraOn_svg width={16} height={16} fill={MS.Blue500} />
              </View>
              <Text style={{ ...S.ft16B, color: MS.Gray800 }}>{"Start a video call"}</Text>
            </CardItem>
            <CardItem style={{ padding: 0 }}>
              <View style={[S.mr32, S.pv8]}>
                <Message_svg width={16} height={16} fill={MS.Blue500} />
              </View>
              <Text style={{ ...S.ft16B, color: MS.Gray800 }}>{"Send a message"}</Text>
            </CardItem>
            <CardItem style={{ padding: 0 }}>
              <View style={[S.mr32, S.pv8]}>
                <Calendar_svg width={16} height={16} fill={MS.Blue500} />
              </View>
              <Text style={{ ...S.ft16B, color: MS.Gray800 }}>{"Create new appointment"}</Text>
            </CardItem>
            <CardItem >
              <View style={S.mr32}>
                <Group_svg width={16} height={16} fill={MS.Blue500} />
              </View>
              <Text style={{ ...S.ft16B, color: MS.Gray800 }}>{"Create group"}</Text>
            </CardItem>
            <CardItem >
              <View style={[S.mr32, S.pv8]}>
                <Media_svg width={16} height={16} fill={MS.Blue500} />
              </View>
              <Text style={{ ...S.ft16B, color: MS.Gray800 }}>{"Media, links and docs"}</Text>
            </CardItem>
          </Card>

          <Card style={styles.card}>
            <CardItem style={{ padding: 0 }}>
              <View style={[S.mr24, S.pv8]}>
                <Pin_svg width={16} height={16} fill="#34C759" />
              </View>
              <Text style={{ ...S.ft16B, color: MS.Gray800 }}>{"Pinned items"}</Text>
              <Right style={{ flex: 1 }}>
                <TouchableHighlight style={{ padding: 5 }}
                  activeOpacity={0.6}
                  underlayColor="transparent"
                  onPress={() => this.onPinExpand()}
                >
                  {
                    pinExpand ?
                      <ArrowUp_svg width={16} height={16} fill={MS.Blue500} />
                      :
                      <ArrowDown_svg width={16} height={16} fill={MS.Gray600} />
                  }
                </TouchableHighlight>
              </Right>
            </CardItem>
            {
              pinExpand &&
              <View style={{ paddingLeft: 56, paddingRight: 16 }}>
                <View style={{ paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: MS.Gray300 }}>
                  <View style={[S.rowFlex]}>
                    <Text style={{ ...S.ft14B, color: MS.Gray900 }}>{"Britnay Sanders"}</Text>
                    <Text style={{ ...S.ft10B, color: MS.Gray700 }}>{"21/11/20"}</Text>
                  </View>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{ ...S.ft12, color: MS.Gray700, marginTop: 8, lineHeight: 16 }}
                  >
                    {"Here you have a pic of my pulse. It looks better? What you think?"}
                  </Text>
                </View>
                <View style={{ paddingVertical: 16 }}>
                  <View style={[S.rowFlex]}>
                    <Text style={{ ...S.ft14B, color: MS.Gray900 }}>{"Dr. Lisa"}</Text>
                    <Text style={{ ...S.ft10B, color: MS.Gray700 }}>{"20/11/20"}</Text>
                  </View>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{ ...S.ft12, color: MS.Gray700, marginTop: 8, lineHeight: 16 }}
                  >
                    {"you can see how it looks the x-ray: “BritnaySanders_xray.pdf”. You can downloa..."}
                  </Text>
                </View>
              </View>
            }
          </Card>

          <Card style={styles.card}>
            <CardItem style={{ padding: 0 }}>
              <View style={[S.mr32, S.pv8]}>
                <Bookmark_svg width={16} height={16} fill={MS.Red500} />
              </View>
              <Text style={{ ...S.ft16B, color: MS.Gray800 }}>{"Flagged items"}</Text>
            </CardItem>
          </Card>

          <Card style={[styles.card, S.mb24]}>
            <CardItem>
              <View style={[S.mr32, S.pv8]}>
                <Share_svg width={16} height={16} fill={MS.Blue500} />
              </View>
              <Text style={{ ...S.ft16B, color: MS.Gray800 }}>{"Share contact"}</Text>
            </CardItem>
            <CardItem>
              <View style={[S.mr32, S.pv8]}>
                <Archive_svg width={16} height={16} fill={MS.Blue500} />
              </View>
              <Text style={{ ...S.ft16B, color: MS.Gray800 }}>{"Archive conversation"}</Text>
            </CardItem>
            <CardItem>
              <View style={[S.mr32, S.pv8]}>
                <Delete_svg width={16} height={16} fill={MS.Red500} />
              </View>
              <Text style={{ ...S.ft16B, color: MS.Red500 }}>{"Delete conversation"}</Text>
            </CardItem>
          </Card>
        </Content>
        <DetailModal visible={openDetailModal} onBack={this.onBackOpenDetailModal} />
      </Container>
    );
  }
}

//Start visitor Detail Modal Class <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
class DetailModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpand: false,
      detailData: null
    };
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    let detailData = {
      title: "Head of Ophthalmology",
      subtitle: "@ New Orleans East Hospital",
      sections: [{ title: "About Dr. Lisa Brooks", content: "Voted one of NYC's best ophthalmologists (NY Magazine and Castle Connolly Guide). \n\nResponsible physician with 9 years of experience maximizing patient wellness and facility profitability. Seeking to deliver healthcare excellence at Mercy Hospital. At CRMC, maintained 5-star healthgrades score for 112 reviews and 85% patient success." },
      { title: "Specialist Certification", content: "American Board of Ophthalmology" }]
    }
    this.setState({ detailData: detailData });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onScroll = (nativeEvent) => {
    const { isExpand } = this.state;
    if (!isExpand && nativeEvent.contentOffset.y > 5) this.setState({ isExpand: true });
    else if (isExpand && nativeEvent.contentOffset.y <= 5) this.setState({ isExpand: false });
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    const { data, visible, onBack } = this.props
    const { detailData, isExpand } = this.state;


    return (
      <Modal
        statusBarTranslucent
        useNativeDriverForBackdrop
        backdropOpacity={0.6}
        isVisible={visible}
        animationInTiming={500}
        animationOutTiming={500}
        backdropTransitionInTiming={500}
        backdropTransitionOutTiming={500}
        style={{ justifyContent: 'flex-end', margin: 0 }}
        onBackdropPress={() => onBack()}
      >
        <View style={{ backgroundColor: MS.Gray100, borderRadius: 8, height: height - 214 }}>
          <View style={{ ...styles.indicatorPanel, borderBottomColor: isExpand ? MS.Gray300 : "transparent" }}>
            <View style={styles.modalIndicator} />
          </View>
          {
            detailData &&
            <ScrollView style={{ padding: 24, paddingTop: 8 }} onScroll={({ nativeEvent }) => this.onScroll(nativeEvent)}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ ...S.ft18B, color: MS.Gray800 }}>{detailData.title}</Text>
                <Text>{detailData.subtitle}</Text>
              </View>
              <View style={{ marginTop: 40 }}>
                {
                  detailData.sections.map((item, i) => (
                    <View style={S.mb32}>
                      <Text style={{ ...S.ft14B, lineHeight: 24, color: MS.Gray800 }}>{item.title}</Text>
                      <Text style={{ ...S.ft14, lineHeight: 24, color: MS.Gray700, marginTop: 4 }}>{item.content}</Text>
                    </View>
                  ))
                }
              </View>
            </ScrollView>
          }
        </View>
      </Modal>
    )
  }
}
//End visitor Detail modal Class >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//




////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    backgroundColor: MS.Gray100,
  },
  contents: {
    padding: 24,
    paddingTop: 8,
    width: '100%',
    backgroundColor: MS.Gray100,
  },
  card: {
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 0,
    borderBottomWidth: 1,
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: 'rgba(0, 71, 179, 0.03)'
  },
  indicatorPanel: {
    width: "100%",
    height: 32,
    alignItems: "center",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: MS.Gray100,
    borderBottomColor: MS.Gray300,
    borderBottomWidth: 1,
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
  modalIndicator: {
    width: 40,
    height: 3,
    marginTop: 8,
    borderRadius: 10,
    backgroundColor: MS.Blue300,
  },
})
