// ***************************************************************************
//  @Created Date:  02/27/2021 
//  @Update:  03/29/2021
//  @author:  ClerkedApp team
//  @description:   A component to block momal of text editor
// ***************************************************************************

import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Content } from 'native-base';
import Modal from 'react-native-modal';
import { Txt_svg, BulletList_svg, NumberedList_svg, ToDo_svg, Toggle_svg, Divider_svg, Workup_svg, Medication_svg, Plask_svg, Procedures_svg, Heading_svg } from '../assets/icons';
import { S } from '../mainStyle';
import * as MS from '../mainStyle';

const { width, height } = Dimensions.get('screen');

export default function BlockModal(props) {
  const { visible, onBack, onChooseBlock } = props;
  const [isBorder, setBorder] = React.useState(false);

  ///////////////////////////////////////////////////////////////////////
  const onScroll = (ev) => {
    if (!isBorder && ev.contentOffset.y > 8) setBorder(true);
    else if (isBorder && ev.contentOffset.y < 8) setBorder(false);
  }

  return (
    <Modal
      statusBarTranslucent
      useNativeDriverForBackdrop
      isVisible={visible}
      backdropOpacity={0.6}
      style={{ justifyContent: 'flex-end', margin: 0 }}
      animationInTiming={500}
      animationOutTiming={500}
      backdropTransitionInTiming={500}
      backdropTransitionOutTiming={500}
      onBackdropPress={() => onBack()}
    >
      <View style={{ ...styles.modalView, height: height }}>
        <View style={{ paddingBottom: 16, paddingHorizontal: 24, borderBottomWidth: 1, borderBottomColor: isBorder ? MS.Gray300 : "transparent" }}>
          <TouchableOpacity 
            style={{ alignSelf: "flex-end" }} 
            activeOpacity={0.5} 
            onPress={() => onBack()}
          >
            <Text style={S.ft12_B500}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <Content style={{ paddingHorizontal: 24 }} onScroll={({ nativeEvent }) => onScroll(nativeEvent)}>
          <Text style={{ ...S.ft14_G700, marginVertical: 8 }}>{"Basic blocks"}</Text>
          <View style={{ ...S.card, paddingVertical: 8 }}>
            <TouchableOpacity 
              activeOpacity={0.5} 
              onPress={() => onChooseBlock("text")}
            >
              <View style={styles.blockItem} >
                <View style={styles.itemIcon}>
                  <Txt_svg width={16} height={16} fill={MS.Blue500} />
                </View>
                <View>
                  <Text style={styles.blockText}>{"Text"}</Text>
                  <Text style={[S.ft12, { color: MS.Gray600 }]}>{"Just start writing with plain text."}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              activeOpacity={0.5} 
              onPress={() => onChooseBlock("h1")}
            >
              <View style={styles.blockItem} >
                <View style={styles.itemIcon}>
                  <Heading_svg width={16} height={16} fill={MS.Blue500} />
                </View>
                <View>
                  <Text style={styles.blockText}>{"Heading 1"}</Text>
                  <Text style={[S.ft12, { color: MS.Gray600 }]}>{"Big section heading."}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              activeOpacity={0.5} 
              onPress={() => onChooseBlock("h2")}
            >
              <View style={styles.blockItem} >
                <View style={styles.itemIcon}>
                  <Heading_svg width={16} height={16} fill={MS.Blue500} />
                </View>
                <View>
                  <Text style={styles.blockText}>{"Heading 2"}</Text>
                  <Text style={[S.ft12, { color: MS.Gray600 }]}>{"Medium section heading."}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5} 
              onPress={() => onChooseBlock("list")}
            >
              <View style={styles.blockItem} >
                <View style={styles.itemIcon}>
                  <BulletList_svg width={16} height={16} fill={MS.Blue500} />
                </View>
                <View>
                  <Text style={styles.blockText}>{"Bulleted list"}</Text>
                  <Text style={[S.ft12, { color: MS.Gray600 }]}>{"Create a simple bulleted list."}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              activeOpacity={0.5} 
              onPress={() => onChooseBlock("numList")}
            >
              <View style={styles.blockItem} >
                <View style={styles.itemIcon}>
                  <NumberedList_svg width={16} height={16} fill={MS.Blue500} />
                </View>
                <View>
                  <Text style={styles.blockText}>{"Numbered list"}</Text>
                  <Text style={[S.ft12, { color: MS.Gray600 }]}>{"Create a list with numbering."}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              activeOpacity={0.5} 
              onPress={() => onChooseBlock("todoList")}
            >
              <View style={styles.blockItem} >
                <View style={styles.itemIcon}>
                  <ToDo_svg width={16} height={16} fill={MS.Blue500} />
                </View>
                <View>
                  <Text style={styles.blockText}>{"To-do list"}</Text>
                  <Text style={[S.ft12, { color: MS.Gray600 }]}>{"Track tasks with a to-do list."}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              activeOpacity={0.5} 
              onPress={() => onChooseBlock("toggleList")}
            >
              <View style={styles.blockItem} >
                <View style={styles.itemIcon}>
                  <Toggle_svg width={16} height={16} fill={MS.Blue500} />
                </View>
                <View>
                  <Text style={styles.blockText}>{"Toggle list"}</Text>
                  <Text style={[S.ft12, { color: MS.Gray600 }]}>{"Toggle can hide and show content."}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              activeOpacity={0.5} 
              onPress={() => onChooseBlock("divider")}
            >
              <View style={[styles.blockItem, { borderBottomWidth: 0 }]} >
                <View style={styles.itemIcon}>
                  <Divider_svg width={16} height={16} fill={MS.Blue500} />
                </View>
                <View>
                  <Text style={styles.blockText}>{"Divider"}</Text>
                  <Text style={[S.ft12, { color: MS.Gray600 }]}>{"Visually divide blocks."}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <Text style={{ ...S.ft14_G700, marginTop: 24, marginBottom: 8 }}>{"Database blocks"}</Text>
          <View style={{ ...S.card, paddingVertical: 8, marginBottom: 24 }}>
            <TouchableOpacity 
              activeOpacity={0.5} 
              onPress={() => onChooseBlock("problemList")}
            >
              <View style={styles.blockItem}>
                <View style={{ ...styles.itemIcon }}>
                  <Workup_svg width={16} height={16} fill={MS.Blue500} />
                </View>
                <View>
                  <Text style={styles.blockText}>{"Problem list"}</Text>
                  <Text style={[S.ft12, { color: MS.Gray600 }]}>{"List of diagnoses and problems."}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              activeOpacity={0.5} 
              onPress={() => onChooseBlock("medications")}
            >
              <View style={styles.blockItem}>
                <View style={{ ...styles.itemIcon }}>
                  <Medication_svg width={16} height={16} fill={MS.Blue500} />
                </View>
                <View>
                  <Text style={styles.blockText}>{"Medications"}</Text>
                  <Text style={[S.ft12, { color: MS.Gray600 }]}>{"History of patient’s medication"}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              activeOpacity={0.5} 
              onPress={() => onChooseBlock()}
            >
              <View style={styles.blockItem}>
                <View style={{ ...styles.itemIcon }}>
                  <Plask_svg width={16} height={16} fill={MS.Blue500} />
                </View>
                <View>
                  <Text style={styles.blockText}>{"Investigation"}</Text>
                  <Text style={[S.ft12, { color: MS.Gray600 }]}>{"Radiology, Laboratory tests and Blood test."}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              activeOpacity={0.5} 
              onPress={() => onChooseBlock("procedures")}
            >
              <View style={[styles.blockItem, { borderBottomWidth: 0 }]}>
                <View style={{ ...styles.itemIcon }}>
                  <Procedures_svg width={16} height={16} fill={MS.Blue500} />
                </View>
                <View>
                  <Text style={styles.blockText}>{"Procedures"}</Text>
                  <Text style={[S.ft12, { color: MS.Gray600 }]}>{"Whene, duration, complications and findings."}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </Content>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: MS.Gray100,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingTop: 36,
  },
  blockItem: {
    ...S.rowFlex_start,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: MS.Gray300,
    alignItems: "flex-start"
  },
  itemIcon: {
    marginTop: -2,
    marginLeft: 16,
    marginRight: 24,
  },
  blockText: {
    ...S.ft16B,
    color: MS.Gray800,
    marginBottom: 8
  }
});


