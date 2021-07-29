// ***************************************************************************
//  @Created Date:  03/11/2021 
//  @Update:  03/11/2021
//  @author:  ClerkedApp team
//  @description: component for schedule session
// ***************************************************************************

import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput } from 'react-native';
import { Icon } from 'native-base';
import Modal from 'react-native-modal';
import { ArrowLeft_svg } from '../assets/icons';
import { S } from '../mainStyle';
import * as MS from '../mainStyle';
import _ from 'lodash';


export default function ScheduleSession(props) {
  const { sessionData, sessionIndex, onRemove, onUpdate } = props;
  const [openTimer, setOpenTimer] = React.useState(false);
  const [codeInputRefs, setCodeInputRefs] = React.useState([]);
  const [codeArr, setCodeArr] = React.useState(Array(4).fill(''));
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isAdd, setIsAdd] = React.useState(false);
  const [hours, setHours] = React.useState({ startHour: "", startMin: "", endHour: "", endMin: "" });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  React.useEffect(() => {
    let startTime = sessionData.startTime.split(":");
    let endTime = sessionData.endTime.split(":");
    setHours({ startHour: startTime[0], startMin: startTime[1], endHour: endTime[0], endMin: endTime[1] });
  }, [sessionData])

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  const onAdd = () => {
    if (!isAdd) return;
    let session = { startTime: codeArr[0] + ":" + codeArr[1], endTime: codeArr[2] + ":" + codeArr[3], fill: true, old: false };
    setOpenTimer(false);
    onUpdate(sessionIndex, session);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  const showModal = () => {
    setOpenTimer(true);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  const hideModal = () => {
    setOpenTimer(false);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  const _blur = (index) => {
    codeInputRefs[index].blur();
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  const _setFocus = (index) => {
    codeInputRefs[index].focus();
    if (index < currentIndex) setCurrentIndex(index);
    // setCurrentIndex(index);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  const _onInputCode = (character, index) => {
    let newCodeArr = codeArr.slice();
    if ((index === 0 || index === 2) && parseInt(character) > 24) return;
    if ((index === 1 || index === 3) && parseInt(character) > 59) return;

    newCodeArr[index] = character;

    if (newCodeArr[index].length !== 2) {
      setCodeArr(newCodeArr);
      return;
    }

    if (index === 3) {
      const code = newCodeArr.join('');
      // onFulfill(code);
      setIsAdd(true);
      _blur(currentIndex);
    } else {
      setIsAdd(false);
      _setFocus(currentIndex + 1);
    }

    setCodeArr(newCodeArr);
    setCurrentIndex(currentIndex + 1);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  const _onFocus = (index) => {
    let newCodeArr = _.clone(codeArr);
    const currentEmptyIndex = _.findIndex(newCodeArr, c => !c);
    if (currentEmptyIndex !== -1 && currentEmptyIndex < index) {
      return _setFocus(currentEmptyIndex);
    }
    for (const i in newCodeArr) {
      if (i >= index) {
        newCodeArr[i] = '';
      }
    }
    setIsAdd(false);
    setCodeArr(newCodeArr);
    setCurrentIndex(index);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  const _onKeyPress = (e) => {
    if (e.nativeEvent.key === 'Backspace' && e._targetInst.pendingProps.value.length === 0) {
      const nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;
      _setFocus(nextIndex);
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <View style={{ width: "100%" }}>
      <TouchableHighlight activeOpacity={0.6} underlayColor="transparent" onPress={() => showModal()} >
        <View style={styles.sessionCard}>
          <View style={{ flex: 0.4, alignItems: "flex-end" }}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.title}>start</Text>
              <Text style={[styles.hour, !sessionData.fill && { color: MS.Gray500 }]}>{sessionData.startTime}</Text>
            </View>
          </View>
          <View style={{ flex: 0.2, alignItems: "center" }}>
            <Text style={styles.title}> </Text>
            <Text style={styles.hour}>—</Text>
          </View>
          <View style={{ flex: 0.4, alignItems: "flex-start" }}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.title}>end</Text>
              <Text style={[styles.hour, !sessionData.fill && { color: MS.Gray500 }]}>{sessionData.endTime}</Text>
            </View>
          </View>
          <TouchableHighlight style={styles.removeButton} activeOpacity={0.6} underlayColor="transparent" onPress={() => onRemove(sessionIndex)} >
            <Icon name="close" type="AntDesign" style={styles.closeIcon} />
          </TouchableHighlight>
        </View>
      </TouchableHighlight>

      {/*=================================== Modal to set a session time ==============================================*/}
      <Modal isVisible={openTimer} backdropOpacity={0.5} statusBarTranslucent useNativeDriverForBackdrop>
        <View style={styles.modalContent}>
          <View style={{ ...S.rowFlex, width: "100%" }}>
            <TouchableHighlight style={{ padding: 5, marginLeft: -5, marginTop: -5 }} activeOpacity={0.6} underlayColor='transparent' onPress={() => hideModal()} >
              <ArrowLeft_svg width={16} height={16} fill={MS.Gray600} />
            </TouchableHighlight>
            <TouchableHighlight style={{ padding: 5, marginLeft: -5, marginTop: -5 }} activeOpacity={0.6} underlayColor='transparent' onPress={() => onAdd()} >
              <Text style={[S.ft12B_G400, isAdd && { color: MS.Blue500 }]}>Add</Text>
            </TouchableHighlight>
          </View>

          <View style={[S.mt24, { flexDirection: 'row' }]}>
            <View style={{ alignItems: "center", flex: 0.45 }}>
              <View style={{ alignItems: "center" }}>
                <Text style={styles.title}>start</Text>
                <View style={[S.mt8, { flexDirection: 'row', alignItems: "center" }]}>
                  <View style={{ alignItems: "center" }}>
                    <TextInput
                      ref={ref => (codeInputRefs[0] = ref)}
                      style={[styles.inputStyle, currentIndex === 0 && { ...S.ft35S_B500, borderBottomColor: MS.Blue500, lineHeight: null }, codeArr[0].length == 0 && { fontFamily: 'Proxima-Nova-Regular' }]}
                      placeholder={hours.startHour}
                      placeholderTextColor={MS.Gray500}
                      keyboardType={'numeric'}
                      maxLength={2}
                      autoFocus={true}
                      value={codeArr[0] ? codeArr[0] : ""}
                      onFocus={() => _onFocus(0)}
                      onKeyPress={(e) => _onKeyPress(e)}
                      onChangeText={text => _onInputCode(text, 0)}
                    />
                    <Text style={[S.ft12S_G500, S.mt8, currentIndex === 0 && { color: MS.Gray800 }]}>Hour</Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text style={[{ ...S.ft35S_G500 }, currentIndex > 0 && { color: MS.Gray800 }]}>:</Text>
                    <Text style={S.ft12S_G500}>{" "}</Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <TextInput
                      ref={ref => (codeInputRefs[1] = ref)}
                      style={[styles.inputStyle, currentIndex === 1 && { ...S.ft35S_B500, borderBottomColor: MS.Blue500, lineHeight: null }]}
                      underlineColorAndroid="transparent"
                      placeholder={currentIndex === 1 ? "" : hours.startMin}
                      keyboardType={'numeric'}
                      placeholderTextColor={MS.Gray500}
                      value={codeArr[1] ? codeArr[1] : ""}
                      onFocus={() => _onFocus(1)}
                      onKeyPress={(e) => _onKeyPress(e)}
                      onChangeText={text => _onInputCode(text, 1)}
                      maxLength={2}
                    />
                    <Text style={[S.ft12S_G500, S.mt8, currentIndex === 1 && { color: MS.Gray800 }]}>Minutes</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ flex: 0.1, alignItems: "center" }}>
              <Text style={styles.title}>{" "}</Text>
              <Text style={[S.ft22_G500, S.mt16, { textAlign: "center" }]}>—</Text>
            </View>

            <View style={{ alignItems: "center", flex: 0.45 }}>
              <View style={{ alignItems: "center" }}>
                <Text style={styles.title}>end</Text>
                <View style={[S.mt8, { flexDirection: 'row', alignItems: "center" }]}>
                  <View style={{ alignItems: "center" }}>
                    <TextInput
                      ref={ref => (codeInputRefs[2] = ref)}
                      style={[styles.inputStyle, currentIndex === 2 && { ...S.ft35S_B500, borderBottomColor: MS.Blue500, lineHeight: null }]}
                      placeholder={currentIndex === 2 ? "" : hours.endHour}
                      placeholderTextColor={MS.Gray500}
                      keyboardType={'numeric'}
                      maxLength={2}
                      value={codeArr[2] ? codeArr[2] : ""}
                      onFocus={() => _onFocus(2)}
                      onKeyPress={(e) => _onKeyPress(e)}
                      onChangeText={text => _onInputCode(text, 2)}
                    />
                    <Text style={[S.ft12S_G500, S.mt8, currentIndex === 2 && { color: MS.Gray800 }]}>Hour</Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text style={[{ ...S.ft35S_G500 }, currentIndex > 2 && { color: MS.Gray800 }]}>:</Text>
                    <Text style={S.ft12S_G500}>{" "}</Text>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <TextInput
                      ref={ref => (codeInputRefs[3] = ref)}
                      underlineColorAndroid="transparent"
                      style={[styles.inputStyle, currentIndex === 3 && { ...S.ft35S_B500, borderBottomColor: MS.Blue500, lineHeight: null }]}
                      placeholder={currentIndex === 3 ? "" : hours.endMin}
                      placeholderTextColor={MS.Gray500}
                      keyboardType={'numeric'}
                      maxLength={2}
                      value={codeArr[3] ? codeArr[3] : ""}
                      onFocus={() => _onFocus(3)}
                      onKeyPress={(e) => _onKeyPress(e)}
                      onChangeText={text => _onInputCode(text, 3)}
                    />
                    <Text style={[S.ft12S_G500, S.mt8, currentIndex === 3 && { color: MS.Gray800 }]}>Minutes</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  sessionCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 71, 179, 0.03)',
    paddingVertical: 8
  },
  title: {
    fontFamily: 'Proxima-Nova-Bold',
    color: MS.Blue500,
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 1,
    textTransform: "uppercase"
  },
  hour: {
    fontFamily: 'Proxima-Nova-Regular',
    fontSize: 16,
    fontWeight: '600',
    color: MS.Gray800,
    lineHeight: 19,
    marginTop: 4
  },
  removeButton: {
    position: "absolute",
    right: 16,
    padding: 5,
  },
  closeIcon: {
    fontSize: 13,
    padding: 3,
    color: MS.Gray600,
    backgroundColor: MS.Gray200,
    borderRadius: 50,
  },
  modalContent: {
    backgroundColor: MS.Gray100,
    alignItems: "center",
    borderRadius: 8,
    padding: 16,
    paddingBottom: 56,
  },
  modalClose: {
    position: "absolute",
    top: 11,
    right: 11,
    padding: 5
  },
  addTimeButton: {
    height: 35,
    width: '100%',
    backgroundColor: MS.Green500,
    justifyContent: "center",
    borderRadius: 8,
    elevation: 0
  },
  inputStyle: {
    width: 49,
    padding: 0,
    ...S.ft35_G800,
    lineHeight: null,
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: MS.Gray500
  }
});
