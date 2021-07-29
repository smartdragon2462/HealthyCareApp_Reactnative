import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Modal from 'react-native-modal';
import { Calendar } from './Calendars';
import moment from 'moment';
import * as MS from '../mainStyle';

export default function CalendarModal(props) {
  const { visible, onDayLongPress, selectedDate } = props

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleMarkedDates = (date) => {
    var temp = {};
    temp[date] = {
      customStyles: {
        container: { backgroundColor: MS.Blue500, borderRadius: 50 },
        text: { color: 'white' }
      }
    }
    return temp;
  }

  const [today, setToday] = useState(moment().format("YYYY-MM-DD"));
  const [markedDates, setMarkedDates] = useState(handleMarkedDates(moment().format("YYYY-MM-DD")));

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    setMarkedDates(handleMarkedDates(selectedDate));
  }, [selectedDate])

  return (
    <Modal
      statusBarTranslucent
      useNativeDriverForBackdrop
      isVisible={visible}
      backdropOpacity={0.6}
      animationInTiming={600}
      animationOutTiming={400}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={400}
      style={{ justifyContent: 'flex-end', margin: 0 }}
      onBackdropPress={() => { console.log("close") }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalframe}>
          <View style={styles.modalView}>
            <View style={styles.modalIndicator} />
            <View style={{ marginTop: 16, width: "100%" }}>
              <Calendar
                theme={{
                  calendarBackground: 'transparent',
                  selectedDayTextColor: '#ffffff',
                  selectedDayFillColor: MS.Blue100,
                  todayTextColor: MS.Blue500,
                  dayTextColor: MS.Gray800,
                  textDisabledColor: MS.Gray600,
                  dotColor: MS.Blue500,
                  selectedDotColor: '#ffffff',
                  arrowColor: 'transparent',
                  disabledArrowColor: 'transparent',
                  monthTextColor: MS.Gray800,
                  textDayFontFamily: 'Proxima-Nova-Semibold',
                  textMonthFontFamily: 'Proxima-Nova-Semibold',
                  textDayHeaderFontFamily: 'Proxima-Nova-Semibold',
                }}
                style={{ marginBottom: 10 }}
                markingType={'custom'}
                onDayPress={onDayLongPress}
                hideExtraDays
                current={today}
                minDate={today}
                enableSwipeMonths={true}
                disableArrowRight={true}
                disableArrowLeft={true}
                markedDates={markedDates}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
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
    width: "100%",
    height: 392,
    backgroundColor: "white",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 24,
    alignItems: "center",
  },
  modalframe: {
    width: "100%",
    height: 395,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalIndicator: {
    backgroundColor: '#80B3FF',
    width: 40,
    height: 3,
    borderRadius: 10,
    marginTop: -16
  }
});


