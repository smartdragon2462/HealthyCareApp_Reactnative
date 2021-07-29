// ***************************************************************************
//  @Created Date:  03/25/2021
//  @Update:  03/25/2021
//  @author:  ClerkedApp team
//  @description:   A component for problem list tool
// ***************************************************************************

import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions, Image, TextInput } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import Modal from 'react-native-modal';
import ActionSheet from '../components/ActionCustomSheet';
import ProblemListItem from './ListItems/ProblemListItem'
import RoundButtonWithLeftIcon from './RoundButtonWithLeftIcon'
import { Workup_svg } from '../assets/icons';
import { User_img4, User_img5 } from '../assets/images';
import { S } from '../mainStyle';
import * as MS from '../mainStyle';

const { width, height } = Dimensions.get('screen');
// const data = [
//   { type: "confirmed", picture: null, isFlagged: true, createdDate: "Dec 17, 2020 ", title: "Asthma" },
//   { type: "possible", picture: null, isFlagged: false, createdDate: "Dec 17, 2020 ", title: "Diabetes" },
//   { type: "inactive", picture: null, isFlagged: true, createdDate: "Dec 17, 2020 ", title: "Depressive disorder" }
// ]

const clinicalList = ["active", "inactive"];
const verificationList = { active: ["possible", "confirmed"], inactive: ["possible", "confirmed", "refuted", "entered in error"] };

const actionSheetStyles = StyleSheet.create({
  Item: {
    fontFamily: 'Proxima-Nova-Semibold',
    fontWeight: '100',
    fontSize: 20,
    lineHeight: 24,
    textTransform: "capitalize",
    color: MS.Gray800,
  },
});

export default class ProblemListComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      problemList: null,
      openActionsheet: false,
      openDetailModal: false,
    };
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    const { navigate } = this.props.navigation;
    this.setState({ problemList: this.props.data })
    if (!this.props.data) {
      navigate('ProblemList', { onGetNewProblem: this.onGetNewProblem });
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  UNSAFE_componentWillReceiveProps(nextProps) {
    // const { navigate } = nextProps.navigation;
    // this.setState({problemList: nextProps.data })
    // if(!nextProps.data) {
    //   console.log("uuurrrr===========>")
    //   navigate('ProblemList', { onGetNewProblem: this.onGetNewProblem });
    // }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onGetNewProblem = (data) => {
    this.setState({ problemList: [data] });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onAddNewProblem = () => {
    const { problemList } = this.state;
    let tmpData = problemList;
    tmpData.push({ title: "wwwwwww", type: "confirmed", picture: null, active: true });
    this.setState({ problemList: tmpData });

    let { data } = this.props;
    data = tmpData;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onClickItem = () => {
    this.setState({ openDetailModal: true });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onBackDetailModal = () => {
    this.setState({ openDetailModal: false })
  }

  ///////////////////////////////////////////////////////////////////////
  render() {
    const { problemList, openDetailModal } = this.state;

    return (
      <Container style={styles.container}>
        <View style={[S.rowFlex, { paddingVertical: 8 }]}>
          <View style={S.rowFlex_start}>
            <Workup_svg width={16} height={16} fill={MS.Gray800} />
            <Text style={[S.ft16S_G800, S.ml16]}>{"Problem list"}</Text>
          </View>
          <TouchableHighlight activeOpacity={0.6} underlayColor="transparent" onPress={() => this.onAddNewProblem()}>
            <Icon name="plus" type="Feather" style={{ fontSize: 25, color: MS.Gray600 }} />
          </TouchableHighlight>
        </View>
        <View>
          {
            problemList &&
            problemList.map((item, index) => (
              <TouchableHighlight activeOpacity={0.8} underlayColor="transparent" onPress={() => this.onClickItem()} key={index} >
                <View>
                  <ProblemListItem itemData={item} />
                </View>
              </TouchableHighlight>
            ))
          }
        </View>
        <DetailModal visible={openDetailModal} onBack={this.onBackDetailModal} />
      </Container>
    );
  }
}


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
class DetailModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: null,
      openActionsheet: false,
      actionSheetTitle: "",
      isClinical: false,
      clinicalIndex: 0,
      verificationIndex: 0
    };
    this.actionSheet = null;
  }

  ///////////////////////////////////////////////////////////////////////
  componentDidMount() {
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  UNSAFE_componentWillReceiveProps(nextProps) {
    // const { elemEvent } = nextProps;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  showActionSheet = () => this.actionSheet.show();
  getActionSheetRef = ref => (this.actionSheet = ref);
  handlePress = (index) => {
    const { isClinical } = this.state;
    if (isClinical) {
      this.setState({ clinicalIndex: index, verificationIndex: 0 });
    } else {
      this.setState({ verificationIndex: index });
    }
  };


  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onClickClinicalButton = () => {
    let options = [];
    for (let i = 0; i < clinicalList.length; i++) {
      options.push({ component: <Text style={actionSheetStyles.Item}>{clinicalList[i]}</Text>, height: 50 })
    }
    this.setState({ options: options, openActionsheet: true, actionSheetTitle: "Clinical status", isClinical: true });
    setTimeout(() => { this.showActionSheet() }, 100);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onClickVerificationButton = () => {
    const { clinicalIndex } = this.state;
    let tmpList = verificationList[clinicalList[clinicalIndex]];
    let options = [];
    for (let i = 0; i < tmpList.length; i++) {
      options.push({ component: <Text style={actionSheetStyles.Item}>{tmpList[i]}</Text>, height: 50 })
    }
    this.setState({ options: options, openActionsheet: true, actionSheetTitle: "Verification status", isClinical: false });
    setTimeout(() => { this.showActionSheet() }, 100);
  }

  ///////////////////////////////////////////////////////////////////////
  render() {
    const { visible, onBack } = this.props;
    const { options, clinicalIndex, verificationIndex, actionSheetTitle, isClinical } = this.state;

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
          <View style={[styles.modalContainer, { maxHeight: height }]}>
            <View style={styles.modalIndicator} />

            <View style={{ width: "100%", paddingBottom: 24 }}>
              <View style={[S.rowFlex_start, S.mt24]}>
                <Workup_svg width={24} height={24} fill={MS.Blue500} />
                <Text style={[S.ft20S_G800, S.ml16, { marginTop: 5 }]}>{"Respiratory problems"}</Text>
              </View>

              <View style={[S.bottomBorder, { paddingVertical: 16 }]}>
                <View style={[S.rowFlex_start, { paddingVertical: 8 }]}>
                  <Text style={[S.ft14S_G600, { flex: 1 }]}>{"Created"}</Text>
                  <Text style={[S.ft14S_G900, { flex: 1 }]}>{"17 Dec 2020 10:00"}</Text>
                </View>
                <View style={[S.rowFlex_start, { paddingVertical: 8 }]}>
                  <Text style={[S.ft14S_G600, { flex: 1 }]}>{"Cinical status"}</Text>
                  <View style={{ flex: 1 }}>
                    <RoundButtonWithLeftIcon caption={clinicalList[clinicalIndex]} onClick={this.onClickClinicalButton} />
                  </View>
                </View>
                <View style={[S.rowFlex_start, { paddingVertical: 8 }]}>
                  <Text style={[S.ft14S_G600, { flex: 1 }]}>{"Verification status"}</Text>
                  <View style={{ flex: 1 }}>
                    <RoundButtonWithLeftIcon caption={verificationList[clinicalList[clinicalIndex]][verificationIndex]} onClick={this.onClickVerificationButton} />
                  </View>
                </View>
                <View style={[S.rowFlex_start, { paddingVertical: 8 }]}>
                  <Text style={[S.ft14S_G600, { flex: 1 }]}>{"Created by"}</Text>
                  <View style={[S.rowFlex_start, { flex: 1 }]}>
                    <Image source={User_img4} style={styles.picture} resizeMode="contain" />
                    <Text style={[S.ft14S_G900, S.ml8, { lineHeight: null }]}>{"Dr. Lisa Sidnay"}</Text>
                  </View>
                </View>
              </View>

              <View style={{ paddingVertical: 16 }}>
                <Text style={[S.ft16S_G800, { lineHeight: 26 }]}>{"Remarks"}</Text>
                <View style={S.rowFlex_start}>
                  <Image source={User_img5} style={styles.picture} resizeMode="contain" />
                  <Text style={[S.ft14S_G900, S.ml8, { lineHeight: null }]}>{"Dr. Peter Smith"}</Text>
                </View>
                <TextInput placeholder={"Write a remark..."} placeholderTextColor={MS.Gray600} multiline style={[S.ft16_G700, { lineHeight: 26 }]} />
              </View>

            </View>
          </View>
        </Modal>
        {
          options &&
          <ActionSheet
            checkInd={isClinical ? clinicalIndex : verificationIndex}
            title={actionSheetTitle}
            options={options}
            ref={this.getActionSheetRef}
            onPress={this.handlePress}
          />
        }
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
    padding: 24,
  },
  modalIndicator: {
    backgroundColor: MS.Blue300,
    width: 40,
    height: 3,
    borderRadius: 10,
    marginTop: -16
  },
  picture: {
    width: 16,
    height: 16,
    borderRadius: 20
  },
});
