// ***************************************************************************
//  @Created Date:  03/25/2021
//  @Update:  03/25/2021
//  @author:  ClerkedApp team
//  @description:   A component for problem list tool
// ***************************************************************************

import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions, Image, TextInput, ScrollView } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import Modal from 'react-native-modal';
import { Procedures_svg } from '../assets/icons';
import { User_img4, User_img5 } from '../assets/images';
import ProcedureListItem from './ListItems/ProcedureListItem';
import { S } from '../mainStyle';
import * as MS from '../mainStyle';

const { width, height } = Dimensions.get('screen');

const data = [
  {
    title: "Upper partial denture, cast metal base without resin saddles, including any conventional clasps, rests and teeth",
    isFlagged: true,
    createdDate: "Dec 17, 2020",
    estimatedDate: "7 Oct 2020",
    procedureBy:
      [
        { photo: User_img4, name: "Dr. Lisa Sidnay" },
        { photo: User_img5, name: "Dr. Mina Barkley" }
      ],
    reason: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin",
    report: "sdfsdfsdf",
    complications: "sdfsdfs"
  },
  {
    title: "Procedure on Meckel diverticulum",
    isFlagged: false,
    createdDate: "Dec 17, 2020",
    estimatedDate: "7 Oct 2020",
    procedureBy:
      [
        { photo: User_img4, name: "Dr. Lisa Sidnay" }
      ],
    reason: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin",
    report: null,
    complications: "sdfsdfs"
  },
  {
    title: "Anti-human globulin test, enzyme technique, titer",
    isFlagged: true,
    createdDate: "Dec 17, 2020",
    estimatedDate: "7 Oct 2020",
    procedureBy: null,
    reason: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin",
    report: "sdfsdfsdf",
    complications: null
  },
  {
    title: "Procedure on Meckel diverticulum",
    isFlagged: false,
    createdDate: "Dec 17, 2020",
    estimatedDate: "7 Oct 2020",
    procedureBy:
      [
        { photo: User_img5, name: "Dr. Mina Barkley" }
      ],
    reason: null,
    report: "sdfsdfsdf",
    complications: "sdfsdfs"
  }
]

export default class ProcedureListComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      procedureList: null,
      openActionsheet: false,
      openDetailModal: false,
      selectedData: null
    };
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    const { navigate } = this.props.navigation;
    this.setState({ procedureList: this.props.data })

    if (!this.props.data) {
      navigate('Procedures', { onGetNewProcedure: this.onGetNewProcedure });
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onGetNewProcedure = (data) => {
    this.setState({ procedureList: [data] });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onAddNewProcedure = () => {
    const { procedureList } = this.state;
    let tmpData = procedureList;
    tmpData.push({
      title: "AAAA",
      isFlagged: false,
      createdDate: "Dec 17, 2020",
      estimatedDate: "7 Oct 2020",
      procedureBy:
        [
          { photo: User_img5, name: "Dr. Mina Barkley" }
        ],
      reason: null,
      report: "sdfsdfsdf",
      complications: "sdfsdfs"
    });
    this.setState({ procedureList: tmpData });

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
    const { procedureList, selectedData, openDetailModal } = this.state;

    return (
      <Container style={styles.container}>
        <View style={[S.rowFlex, { paddingVertical: 8 }]}>
          <View style={S.rowFlex_start}>
            <Procedures_svg width={16} height={16} fill={MS.Gray800} />
            <Text style={[S.ft16S_G800, S.ml16]}>{"Procedures"}</Text>
          </View>
          <TouchableHighlight
            activeOpacity={0.7}
            underlayColor="transparent"
            onPress={() => this.onAddNewProcedure()}
          >
            <Icon name="plus" type="Feather" style={{ fontSize: 25, color: MS.Gray600 }} />
          </TouchableHighlight>
        </View>
        <View>
          {
            procedureList &&
            procedureList.map((item, index) => (
              <TouchableHighlight
                key={index}
                activeOpacity={0.7}
                underlayColor="transparent"
                onPress={() => this.onClickItem(item)}
              >
                <ProcedureListItem itemData={item} />
              </TouchableHighlight>
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
      openActionsheet: false,
      actionSheetTitle: "",
    };
    this.actionSheet = null;
  }

  ///////////////////////////////////////////////////////////////////////
  componentDidMount() {
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  UNSAFE_componentWillReceiveProps(nextProps) {
  }

  ///////////////////////////////////////////////////////////////////////
  render() {
    const { data, visible, onBack } = this.props;
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
          <View style={[styles.modalContainer, { maxHeight: height - 60 }]}>
            <View style={{ height: 32, paddingTop: 8 }}>
              <View style={styles.modalIndicator} />
            </View>

            <ScrollView style={{ width: "100%", paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
              <View style={[S.rowFlex_start, S.mt8, { alignItems: "flex-start" }]}>
                <Procedures_svg width={24} height={24} fill={MS.Blue500} />
                <Text style={[S.ft20S_G800, S.ml16, { marginTop: 5 }]}>{data ? data.title : ""}</Text>
              </View>

              <View style={[S.bottomBorder, { paddingVertical: 16 }]}>
                <View style={[S.bottomBorder, S.pt16, S.pb8]}>
                  <View style={[S.rowFlex_start, { paddingVertical: 8 }]}>
                    <Text style={[S.ft14S_G600, { flex: 1 }]}>{"Entry date"}</Text>
                    <Text style={[S.ft14S_G900, { flex: 1 }]}>{data ? data.createdDate : ""}</Text>
                  </View>
                  <View style={[S.rowFlex_start, { paddingVertical: 8 }]}>
                    <Text style={[S.ft14S_G600, { flex: 1 }]}>{"Estimated date"}</Text>
                    <TouchableHighlight style={{ flex: 1 }} activeOpacity={0.7} underlayColor="transparent" onPress={() => this.setState({ openCalendarModal: true })}>
                      <Text style={S.ft14S_G900}>{data ? data.estimatedDate : ""}</Text>
                    </TouchableHighlight>
                  </View>
                  {
                    data.procedureBy &&
                    <View style={[S.rowFlex_start, { paddingVertical: 8, alignItems: "flex-start" }]}>
                      <Text style={[S.ft14S_G600, { flex: 1 }]}>{"Procedure by"}</Text>
                      <View style={{ flex: 1 }}>
                        {
                          data.procedureBy.map((item, index) => (
                            <View style={[S.rowFlex_start, S.mb8]} key={index}>
                              <Image source={item.photo} style={{ width: 16, height: 16 }} resizeMode="contain" />
                              <Text style={[S.ft14S_G900, S.ml8]}>{item.name}</Text>
                            </View>
                          ))
                        }
                      </View>
                    </View>
                  }
                </View>
                {
                  data.reason &&
                  <View style={{ marginTop: 24 }}>
                    <Text style={S.ft16S_G800}>{"Reason"}</Text>
                    <Text style={[S.ft16_G700, { lineHeight: 26, padding: 0 }]}>{data.reason}</Text>
                  </View>
                }
                {
                  data.report &&
                  <View style={{ marginTop: 24 }}>
                    <Text style={S.ft16S_G800}>{"Procedure report"}</Text>
                    <Text style={[S.ft16_G700, { lineHeight: 26, padding: 0 }]}>{data.report}</Text>
                  </View>
                }
                {
                  data.complications &&
                  <View style={{ marginTop: 24 }}>
                    <Text style={S.ft16S_G800}>{"Complications"}</Text>
                    <Text style={[S.ft16_G700, { lineHeight: 26, padding: 0 }]}>{data.complications}</Text>
                  </View>
                }
              </View>

              <View style={{ paddingVertical: 16 }}>
                <Text style={[S.ft16S_G800, { lineHeight: 26 }]}>{"Remarks"}</Text>
                <View style={S.rowFlex_start}>
                  <Image source={User_img5} style={styles.picture} resizeMode="contain" />
                  <Text style={[S.ft14S_G900, S.ml8, { lineHeight: null }]}>{"Dr. Peter Smith"}</Text>
                </View>
                <TextInput placeholder={"Write a remark..."} placeholderTextColor={MS.Gray600} multiline style={[S.ft16_G700, { lineHeight: 26 }]} />
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
    padding: 24,
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
