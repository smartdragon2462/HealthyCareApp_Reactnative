import { Platform, StyleSheet } from 'react-native';
import constants from './constants';

export default StyleSheet.create({
  singleContainer: {
    // height: constants.DAY_SIZE,
    width: constants.DAY_SIZE,
    padding: 10,
    // height: 100
  },
  singleDateBox: {
    marginTop:6,
    // padding:5,
    // borderRadius: 50 ,//constants.BORDER_RADIUS,
    overflow: 'hidden',
    // height: 75,
    // width: 50,
    zIndex: 3,
  },
  currentDateDot: {
    color: '#0066FF',
    textAlign: 'center',
    fontSize: 30,
    marginTop: -19, 
    marginLeft:-5
  },
  singleContainerSelected: {
    backgroundColor: '#0066FF',
  },
  closed: {
    color: constants.MONTH_BACKGROUND_COLOR_DISABLED,
  },
  
  dateContainer: {
    height: 30,
    marginTop: 7
  },
  dateText: {
    // marginTop: Platform.OS === 'ios' ? 4 : 0,
    fontSize: 14,
    lineHeight: 16,
    textAlign: 'center',
    alignItems: 'center',
    color: '#33435C',
    fontFamily: 'Proxima-Nova-Semibold',
    letterSpacing:1,
  },

  dayContainer: {
    height: 25,
  },

  dayText: {
    fontFamily: 'Proxima-Nova-Semibold',
    fontSize: Platform.OS === 'ios' ? 15 : 14,
    textAlign: 'center',
    color: '#B3B9C2',
    fontWeight: '100',
    letterSpacing:1,
  },
  dayTextSelected: {
    fontFamily: 'Proxima-Nova-Bold',
    fontSize: Platform.OS === 'ios' ? 15 : 14,
    color: '#FFFFFF',
  },
});
