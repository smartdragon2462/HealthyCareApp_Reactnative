
import { Dimensions } from 'react-native'
import * as MS from '../mainStyle';

const { width, height } = Dimensions.get('window');
export const SCREEN_HEIGHT = height;
export const SCREEN_WIDTH = width;
export const GRADIENT_TEXTURE = `repeating-linear-gradient(-60deg, #f2f3f4, #f2f3f4 22px, #fafafb 22px, #fafafb 36px)`;
export const RangeDateStartStyle = { startingDay: true, color: MS.Blue500, textColor: 'white', dotColor: 'transparent' };
export const RangeDateEndStyle = { endingDay: true, color: MS.Blue500, textColor: 'white', dotColor: 'transparent' };
export const RangeDefaultDateStyle = { color: MS.Blue100, textColor: MS.Blue500, dotColor: 'transparent' };
export const BlockedStartDateStyle = { startingDay: true, color: MS.Green500, textColor: 'white', dotColor: 'transparent' };
export const BlockedEndDateStyle = { endingDay: true, color: MS.Green500, textColor: 'white', dotColor: 'transparent' };
export const BlockedDefaultDateStyle = { color: MS.Green100, textColor: MS.Green500, dotColor: 'transparent' };
export const SpecificDateStyle = { startingDay: true, endingDay: true, color: MS.Blue500, textColor: 'white', dotColor: 'transparent' };
export const SpecificDateChangeStyle = { dotColor: MS.Orange500, marked: true };
export const BlockStartDateStyle = { rangeStart: true, dotColor: MS.Green500, marked: true };
export const BlockEndDateStyle = { rangeEnd: true, dotColor: MS.Green500, marked: true };
export const BlockDateStyle = { dotColor: MS.Green500, marked: true };

