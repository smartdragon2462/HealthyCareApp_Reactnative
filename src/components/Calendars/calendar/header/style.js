import {StyleSheet, Platform} from 'react-native';
import * as defaultStyle from '../../style';

const STYLESHEET_ID = 'stylesheet.calendar.header';

export default function (theme = {}) {
  const appStyle = {...defaultStyle, ...theme};
  return StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 10,
      paddingRight: 10,
      marginTop: 6,
      alignItems: 'center'
    },
    headerContainer: {
      flexDirection: 'row'
    },
    monthText: {
      fontSize: appStyle.textMonthFontSize, //18,//
      lineHeight: 24, 
      fontFamily: appStyle.textMonthFontFamily, //'Proxima-Nova-Bold', //
      fontWeight: appStyle.textMonthFontWeight, //'600', //
      color: appStyle.monthTextColor, //'#1A2C47', //
      margin: 10,
      letterSpacing: 0.38
    },
    arrow: {
      padding: 10,
      ...appStyle.arrowStyle
    },
    arrowImage: {
      tintColor: appStyle.arrowColor, //'#99A1AD']
      ...Platform.select({
        web: {
          width: appStyle.arrowWidth,
          height: appStyle.arrowHeight
        }
      })
    },
    disabledArrowImage: {
      tintColor: appStyle.disabledArrowColor
    },
    week: {
      marginTop: 7,
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    dayHeader: {
      marginTop: 2,
      marginBottom: 7,
      width: 32,
      textAlign: 'center',
      fontSize: 12,
      fontFamily: 'Proxima Nova',
      fontWeight: '600',
      lineHeight: 18,
      color: appStyle.textSectionTitleColor,
      textTransform: 'uppercase'
    },
    disabledDayHeader: {
      color: appStyle.textSectionTitleDisabledColor
    },
    ...(theme[STYLESHEET_ID] || {})
  });
}
