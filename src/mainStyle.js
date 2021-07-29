// ***************************************************************************
//  @Created Date:    12/20/2020 
//  @Update:  03/04/2021
//  @author:  ClerkedApp team
//  @description:   Colors and Styles
// ***************************************************************************

import { StyleSheet } from 'react-native';

//------------- Gray ---------------------------------
export const White = '#FFFFFF';
export const Gray100 = '#FAFAFB';
export const Gray200 = '#F2F3F4';
export const Gray300 = '#E6E8EB';
export const Gray400 = '#CCD0D6';
export const Gray500 = '#B3B9C2';
export const Gray600 = '#99A1AD';
export const Gray700 = '#667285';
export const Gray800 = '#33435C';
export const Gray900 = '#1A2C47';
//------------- Blue---------------------------------
export const Blue100 = '#E6F0FF';
export const Blue300 = '#80B3FF';
export const Blue500 = '#0066FF';
export const Blue700 = '#0047B3';
export const Blue900 = '#002966';
//------------- Cyan---------------------------------
export const Cyan100 = '#ECF8FF';
export const Cyan300 = '#C6EAFE';
export const Cyan500 = '#54C1FB';
export const Cyan700 = '#059BEA';
export const Cyan900 = '#035D8C';
//------------- Pink---------------------------------
export const Pink100 = '#FFE6F0';
export const Pink300 = '#FFB3D2';
export const Pink500 = '#FF68A4';
export const Pink700 = '#FF0166';
export const Pink900 = '#CD0052';
//------------- Purple ---------------------------------
export const Purple100 = '#E7DCFC';
export const Purple300 = '#B895F7';
export const Purple500 = '#702BEF';
export const Purple700 = '#460DAF';
export const Purple900 = '#350A83';
//------------- Orange ---------------------------------
export const Orange100 = '#FFEBD5';
export const Orange300 = '#FFC280';
export const Orange500 = '#FF8500';
export const Orange700 = '#EE7C00';
export const Orange900 = '#CC6A00';
//------------- Red ---------------------------------
export const Red100 = '#FFE2DF';
export const Red300 = '#FFA99F';
export const Red500 = '#FF1900';
//------------- Green ---------------------------------
export const Green100 = '#D4FCE0';
export const Green300 = '#7CF1B7';
export const Green500 = '#29D19E';

export const S = StyleSheet.create({
    modalIndicator: { 
        backgroundColor: Blue300, 
        width: 40, 
        height: 3, 
        borderRadius: 10,
        marginTop:-16,
        marginBottom:21
    },
    active_button: {
        height: 32,
        fontFamily: 'Proxima-Nova-Semibold',
        fontSize: 12,
        color: White,
        lineHeight: 15,
        backgroundColor: Blue500,
        alignItems: 'center',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        borderRadius: 6,       
    },
    deactive_button: {
        height: 32,
        fontFamily: 'Proxima-Nova-Semibold',
        fontSize: 12,
        color: Gray700,
        lineHeight: 15,
        backgroundColor: Gray200,
        alignItems: 'center',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        borderRadius: 8,
    },
    GreenButton: {
        height: 50,
        width: '100%', 
        backgroundColor:Green500, 
        justifyContent:"center", 
        alignItems:'center',
        borderColor:Green500, 
        borderRadius:8, 
        elevation:0
      },
    BlueButton: {
        height: 50,
        width: '100%', 
        backgroundColor:Blue500, 
        justifyContent:"center", 
        alignItems:'center',
        borderColor:Blue500, 
        borderRadius:8, 
        elevation:0
      },
      LBlueButton: {
        height: 50,
        width: "100%",
        backgroundColor:Blue100, 
        justifyContent: "center",
        alignItems:'center',
        borderColor:Blue100, 
        borderRadius: 8,
        elevation:0
      },
    
    focus_outline:{
        borderWidth: 3, 
        borderRadius: 11, 
        borderColor: Blue100,
      },
    focus_inline:{
        borderWidth: 1, 
        borderRadius: 8, 
        borderColor: Blue300
      },
    focus_noOutline:{
        borderWidth: 3, 
        borderRadius: 12, 
        borderColor: Gray100,
      },
    focus_noInline:{
        borderWidth: 1, 
        borderRadius: 8, 
        borderColor: Gray100,
    },
    avatarFrame: {
        borderRadius: 50,  
        borderWidth:1,  
        borderColor: 'transparent',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowColor: "#000",
        shadowOffset: { height: 5, width: 5 }, 
        elevation: 1,
    },
    avatar48: {
        width: 48,
        height: 48,
        borderRadius: 48,
    },
    avatar32: {
        width: 32,
        height: 32,
        borderRadius: 32
    },

    avatar24: {
        width: 24,
        height: 24,
        borderRadius: 24,
    },
    avatar16: {
        width: 16,
        height: 16,
        borderRadius: 16,
    },
    avatar70: {
        width: 70,
        height: 70,
        borderRadius: 50
    },
    mark_caregiver: {
        height: 16,
        width: 16,
    },
    specialist: {
        fontFamily: 'Proxima-Nova-Bold',
        color: Blue500,
        fontSize: 10,
        backgroundColor: Blue100,
        textTransform: "uppercase",
        borderRadius: 16,
        paddingVertical: 2,
        paddingHorizontal: 6,
      },
    patientType: {
        fontFamily: 'Proxima-Nova-Bold',
        color: Blue500,
        fontSize: 10,
        backgroundColor: Blue100,
        textTransform: "capitalize",
        borderRadius: 16,
        paddingVertical: 2,
        paddingHorizontal: 6,
      },
    card: {
        backgroundColor: 'white', 
        borderRadius: 8, 
        marginBottom: 8,
        borderWidth: 1,
        borderColor: 'rgba(0, 71, 179, 0.03)'
      },  

    //--------- Font 35 ------------------------------------       
    ft35S_G500: {
        fontFamily: 'Proxima-Nova-Semibold', 
        fontSize: 35, 
        fontWeight:'600',
        color: Gray500, 
        lineHeight: 35, 
    },  
    ft35_G800: {
        fontFamily: 'Proxima-Nova-Regular', 
        fontSize: 35, 
        fontWeight:'600',
        color: Gray800, 
        lineHeight: 35, 
    },   
    ft35S_G800: {
        fontFamily: 'Proxima-Nova-Semibold', 
        fontSize: 35, 
        fontWeight:'600',
        color: Gray800, 
        lineHeight: 35, 
    },  
    ft35S_B500: {
        fontFamily: 'Proxima-Nova-Semibold', 
        fontSize: 35, 
        fontWeight:'600',
        color: Blue500, 
        lineHeight: 35, 
    }, 

    //--------- Font 30 ------------------------------------  
    ft30_G800: {
        fontFamily: 'Proxima-Nova-Regular', 
        fontSize: 30, 
        fontWeight:'600',
        color: Gray800, 
        lineHeight: 30, 
    },       
    ft30_G700: {
        fontFamily: 'Proxima-Nova-Regular', 
        fontSize: 30, 
        fontWeight:'600',
        color: Gray700, 
        lineHeight: 30, 
    },   
    //--------- Font 30 ------------------------------------       
    ft30_G500: {
        fontFamily: 'Proxima-Nova-Regular', 
        fontSize: 30, 
        fontWeight:'600',
        color: Gray500, 
        lineHeight: 30, 
    },  
    //--------- Font 22 ------------------------------------
    ft22_G800: {
        fontFamily: 'Proxima-Nova-Regular', 
        fontSize: 22, 
        fontWeight:'600',
        color: Gray800, 
        lineHeight: 27, 
    },
    ft22_G500: {
        fontFamily: 'Proxima-Nova-Regular', 
        fontSize: 22, 
        fontWeight:'600',
        color: Gray500, 
        lineHeight: 27, 
    },
    ft22_W:{
        fontFamily: 'Proxima-Nova-Bold', 
        color: White, 
        fontSize: 22, 
        lineHeight: 27, 
    },

    //--------- Font 20 ------------------------------------
    ft20: {
        fontFamily: 'Proxima-Nova-Regular', 
        fontWeight: "normal",
        color: 'black',  
        fontSize: 20, 
        lineHeight: 20, 
    },
    ft20_G800: {
        fontFamily: 'Proxima-Nova-Regular', 
        fontSize: 20, 
        fontWeight:'600',
        color: Gray800, 
        lineHeight: 20, 
    },
    ft20_G600: {
        fontFamily: 'Proxima-Nova-Regular', 
        fontSize: 20, 
        fontWeight:'600',
        color: Gray600, 
        lineHeight: 20, 
    },
    ft20_B500: {
        fontFamily: 'Proxima-Nova-Regular', 
        color: Blue500, 
        fontWeight:'600',
        fontSize: 20, 
        lineHeight: 20, 
    },
    ft20S_G800: {
        fontFamily: 'Proxima-Nova-Semibold', 
        fontSize: 20, 
        fontWeight:'600',
        color: Gray800, 
        lineHeight: 20, 
    },
    ft20B: {
        fontFamily: 'Proxima-Nova-Bold', 
        fontWeight:"bold",
        color: 'black',  
        fontSize: 20, 
        lineHeight: 20, 
    },

    //--------- Font 18 ------------------------------------
    ft18: {
        fontFamily: 'Proxima-Nova-Regular', 
        fontWeight: "normal",
        color: 'black',  
        fontSize: 18, 
        lineHeight: 18, 
    },
    ft18_W: {
        fontFamily: 'Proxima-Nova-Regular', 
        fontWeight: "normal",
        color: White,  
        fontSize: 18, 
        lineHeight: 18, 
    },
    ft18S_G800: {
        fontFamily: 'Proxima-Nova-Semibold', 
        fontWeight: "600",
        color: Gray800,  
        fontSize: 18, 
        lineHeight: 18, 
    },
    ft18S_B500: {
        fontFamily: 'Proxima-Nova-Semibold', 
        fontWeight: "600",
        color: Blue500,  
        fontSize: 18, 
        lineHeight: 18, 
    },
    ft18B: {
        fontFamily: 'Proxima-Nova-Bold', 
        fontWeight:"600",
        color: 'black',  
        fontSize: 18, 
        lineHeight: 18, 
    },
    ft18B_W: {
        fontFamily: 'Proxima-Nova-Bold', 
        fontWeight:"600",
        color: 'white',  
        fontSize: 18, 
    },
    ft18B_G700: {
        fontFamily: 'Proxima-Nova-Bold', 
        fontSize: 18, 
        color: Gray700, 
        fontWeight:'600',
        lineHeight: 18, 
    },

    //--------- Font 16 ------------------------------------
    ft16: {
        fontFamily: 'Proxima-Nova-Regular', 
        fontWeight: "normal",
        color: 'black',  
        fontSize: 16, 
        lineHeight: 16, 
    },
    ft16_W: {
        fontFamily: 'Proxima-Nova-Regular', 
        fontWeight:'600',
        fontSize: 16, 
        color: White,  
        lineHeight: 16, 
    },
    ft16_G900: {
        fontFamily: 'Proxima-Nova-Regular', 
        fontSize: 16, 
        fontWeight:'600',
        color: Gray900,  
        lineHeight: 19, 
    },
    ft16_G800: {
        fontFamily: 'Proxima-Nova-Regular', 
        fontSize: 16, 
        fontWeight:'600',
        color: Gray800,  
        lineHeight: 19, 
    },
    ft16_G700: {
        fontFamily: 'Proxima-Nova-Regular', 
        fontWeight:'600',
        fontSize: 16, 
        color: Gray700,  
        lineHeight: 19, 
    },    
    ft16_G600: {
        fontFamily: 'Proxima-Nova-Regular', 
        fontWeight:'600',
        fontSize: 16, 
        color: Gray600,  
        lineHeight: 16, 
    },
    ft16_G500: {
        fontFamily: 'Proxima-Nova-Regular', 
        fontWeight:'100',
        fontSize: 16, 
        color: Gray500,  
        lineHeight: 16, 
    },
    ft16_B500: {
        fontFamily: 'Proxima-Nova-Regular', 
        fontWeight:'600',
        fontSize: 16, 
        color: Blue500,  
        lineHeight: 16, 
    },
    ft16_B300: {
        fontFamily: 'Proxima-Nova-Regular', 
        fontWeight:'600',
        fontSize: 16, 
        color: Blue300,  
        lineHeight: 16, 
    },
    ft16B: {
        fontFamily: 'Proxima-Nova-Bold', 
        fontWeight:'100',
        fontSize: 16, 
        color: Gray100,  
        lineHeight: 16, 
    },
    ft16B_G800: {
        fontFamily: 'Proxima-Nova-Bold', 
        fontWeight:'100',
        fontSize: 16, 
        color: Gray800,  
        lineHeight: 16, 
    },
    ft16B_G100: {
        fontFamily: 'Proxima-Nova-Bold', 
        fontWeight:'100',
        fontSize: 16, 
        color: Gray100,  
        lineHeight: 16, 
    },
    ft16B_B500:{
        fontFamily: 'Proxima-Nova-Bold', 
        fontWeight:'100',
        fontSize: 16, 
        color: Blue500,  
        lineHeight: 16,
    },
    ft16B_R500: {
        fontFamily: 'Proxima-Nova-Bold', 
        fontWeight:'100',
        fontSize: 16, 
        color: Red500,  
        lineHeight: 16, 
    },
    ft16S_W: {
        fontFamily: 'Proxima-Nova-Semibold', 
        fontWeight:"100",
        fontSize: 16, 
        color: White,  
        lineHeight: 19, 
    },
    ft16S_G900: {
        fontFamily: 'Proxima-Nova-Semibold', 
        fontWeight:"100",
        fontSize: 16, 
        color: Gray900,  
        lineHeight: 19, 
    },
    ft16S_G800: {
        fontFamily: 'Proxima-Nova-Semibold', 
        fontWeight:"100",
        fontSize: 16, 
        color: Gray800,  
        lineHeight: 19, 
    },
    ft16S_G100: {
        fontFamily: 'Proxima-Nova-Semibold', 
        fontWeight:"100",
        fontSize: 16, 
        color: Gray100,  
        lineHeight: 16, 
    },
    ft16S_B500: {
        fontFamily: 'Proxima-Nova-Semibold', 
        fontWeight:"100",
        fontSize: 16, 
        color: Blue500,  
        lineHeight: 16, 
    },
    ft16S_B300: {
        fontFamily: 'Proxima-Nova-Semibold', 
        fontWeight:"100",
        fontSize: 16, 
        color: Blue300, 
        lineHeight: 19,  
    },
    ft16B_G900: {
        fontFamily: 'Proxima-Nova-Bold', 
        fontSize: 16, 
        color: Gray900,  
        lineHeight: 19, 
    },
    ft16B_W: {
        fontFamily: 'Proxima-Nova-Bold', 
        fontWeight:"normal",
        color: 'white',  
        fontSize: 16, 
        lineHeight: 19, 
    },
    //--------- Font 14 ------------------------------------
    ft14: {
        fontFamily: 'Proxima-Nova-Regular', 
        fontWeight: "normal",
        color: 'black',  
        fontSize: 14, 
        lineHeight: 14, 
    },
    ft14_W:{
        fontFamily: 'Proxima-Nova-Regular',
        fontWeight:'600',
        color: White,
        fontSize: 14,
        lineHeight: 17,
        fontWeight:'normal',
    },
    ft14_G900: {
        fontFamily: 'Proxima-Nova-Regular',
        fontWeight:'normal',
        color: Gray900,
        fontSize: 14,
        lineHeight: 17,
    },
    ft14_G800:{
        fontFamily: 'Proxima-Nova-Regular',
        fontSize: 14,
        color: Gray800,
        fontWeight:'100',
        lineHeight: 16,
    },
    ft14_G700:{
        fontFamily: 'Proxima-Nova-Regular',
        fontSize: 14,
        color: Gray700,
        fontWeight:'100',
        lineHeight: 16,
    },
    ft14_G600:{
        fontFamily: 'Proxima-Nova-Regular',
        color: Gray600,
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 16,
        fontWeight:'normal',
    },    
    ft14_G500:{
        fontFamily: 'Proxima-Nova-Regular',
        color: Gray500,
        fontWeight: '100',
        fontSize: 14,
        lineHeight: 16,
        fontWeight:'normal',
    }, 
    ft14_G100:{
        fontFamily: 'Proxima-Nova-Regular',
        color: Gray100,
        fontWeight: '100',
        fontSize: 14,
        lineHeight: 16,
        fontWeight:'normal',
    }, 
    ft14_B500:{
        fontFamily: 'Proxima-Nova-Regular',
        fontWeight:'normal',
        color: Blue500,
        fontSize: 14,
        lineHeight: 17,
    },  
    ft14_B300:{
        fontFamily: 'Proxima-Nova-Regular',
        fontWeight:'normal',
        color: Blue300,
        fontSize: 14,
        lineHeight: 17,
    }, 
    ft14_B100:{
        fontFamily: 'Proxima-Nova-Regular',
        fontWeight:'normal',
        color: Blue100,
        fontSize: 14,
        lineHeight: 17,
    },   
    ft14S_W: {
        fontFamily: 'Proxima-Nova-Semibold',
        color: 'white',
        fontSize: 14,
        lineHeight: 16,
    }, 
    ft14S_G900: {
        fontFamily: 'Proxima-Nova-Semibold',
        color: Gray900,
        fontSize: 14,
        lineHeight: 16,
    }, 
    ft14S_G800: {
        fontFamily: 'Proxima-Nova-Semibold',
        color: Gray800,
        fontSize: 14,
        lineHeight: 16,
    }, 
    ft14S_G600: {
        fontFamily: 'Proxima-Nova-Semibold',
        color: Gray600,
        fontSize: 14,
        lineHeight: 16,
    },  
    ft14S_G500: {
        fontFamily: 'Proxima-Nova-Semibold',
        color: Gray500,
        fontSize: 14,
        lineHeight: 16,
    }, 
    ft14S_G100: {
        fontFamily: 'Proxima-Nova-Semibold',
        color: Gray100,
        fontSize: 14,
        lineHeight: 16,
    }, 
    ft14S_B500: {
        fontFamily: 'Proxima-Nova-Semibold',
        color: Blue500,
        fontSize: 14,
        lineHeight: 16,
    }, 
    ft14B: {
        fontFamily: 'Proxima-Nova-Bold', 
        fontWeight:"600",
        color: 'black',  
        fontSize: 14, 
        lineHeight: 14, 
    }, 
    ft14B_W: {
        fontFamily: 'Proxima-Nova-Bold', 
        fontWeight:"600",
        color: White,  
        fontSize: 14, 
        lineHeight: 14, 
    }, 
    ft14B_G900: {
        fontFamily: 'Proxima-Nova-Bold',
        color: Gray900,
        fontSize: 14,
        lineHeight: 17,
    },
    ft14B_G800: {
        fontFamily: 'Proxima-Nova-Bold',
        color: Gray800,
        fontSize: 14,
        lineHeight: 16,
    },
    //--------- Font 12 ------------------------------------
    ft12: {
        fontFamily: 'Proxima-Nova-Regular', 
        fontWeight: "normal",
        color: 'black',  
        fontSize: 12, 
        lineHeight: 12, 
    },
    ft12_W: {
        fontFamily: 'Proxima-Nova-Regular',
        fontWeight: '600',
        color: White,
        fontSize: 12,
        lineHeight: 16,
    },
    ft12_G800: {
        fontFamily: 'Proxima-Nova-Regular',
        fontWeight: '600',
        color: Gray800,
        fontSize: 12,
        lineHeight: 16,
    },
    ft12_G700: {
        fontFamily: 'Proxima-Nova-Regular',
        fontWeight: '600',
        color: Gray700,
        fontSize: 12,
        lineHeight: 16,
    },
    ft12_G600: {
        fontFamily: 'Proxima-Nova-Regular',
        fontWeight: '600',
        color: Gray600,
        fontSize: 12,
        lineHeight: 16,
    },
    ft12_B500: {
        fontFamily: 'Proxima-Nova-Regular',
        fontSize: 12,
        color: Blue500,
        lineHeight: 15,
    },
    ft12_B300: {
        fontFamily: 'Proxima-Nova-Regular',
        fontSize: 12,
        color: Blue300,
        lineHeight: 16,
    },
    ft12S_W: {
        fontFamily: 'Proxima-Nova-Semibold',
        fontSize: 12,
        color: White,
        fontWeight: '100',
        lineHeight: 16,
    },
    ft12S_G800: {
        fontFamily: 'Proxima-Nova-Semibold',
        fontSize: 12,
        color: Gray800,
        fontWeight: '100',
        lineHeight: 16,
    },  
    ft12S_G700: {
        fontFamily: 'Proxima-Nova-Semibold',
        fontWeight: '100',
        color: Gray700,
        fontSize: 12,
        lineHeight: 16,
    },
    ft12S_G600: {
        fontFamily: 'Proxima-Nova-Semibold',
        fontWeight: '100',
        color: Gray600,
        fontSize: 12,
        lineHeight: 16,
    },
    ft12S_G500: {
        fontFamily: 'Proxima-Nova-Semibold',
        fontWeight: '100',
        color: Gray500,
        fontSize: 12,
        lineHeight: 16,
    },
    ft12S_B500: {
        fontFamily: 'Proxima-Nova-Semibold',
        fontWeight: '100',
        color: Blue500,
        fontSize: 12,
        lineHeight: 16,
    },
    ft12B: {
        fontFamily: 'Proxima-Nova-Bold', 
        fontWeight:"bold",
        color: 'black',  
        fontSize: 12, 
        lineHeight: 12, 
    },
    ft12B_W:{
        fontFamily: 'Proxima-Nova-Bold', 
        color: White, 
        fontSize: 12, 
        lineHeight: 15, 
    },
    ft12B_G400: {
        fontFamily: 'Proxima-Nova-Bold', 
        fontWeight:"bold",
        color: Gray400,  
        fontSize: 12, 
        lineHeight: 12, 
    },

    //--------- Font 10 ------------------------------------
    ft10: {
        fontFamily: 'Proxima-Nova-Regular', 
        fontWeight: "normal",
        color: 'black',  
        fontSize: 10, 
        lineHeight: 10, 
    },
    ft10_G900: {
        fontFamily: 'Proxima-Nova-Regular',
        color: Gray900,
        fontWeight: '600',
        fontSize: 10,
        lineHeight: 16,
    },
    ft10_B500: {
        fontFamily: 'Proxima-Nova-Regular',
        fontWeight: '600',
        color: Blue500,
        fontSize: 10,
        lineHeight: 10,
    },
    ft10_B300: {
        fontFamily: 'Proxima-Nova-Bold',
        color: Blue300,
        fontSize: 10,
        lineHeight: 12,
        letterSpacing: 1
    },  
    ft10S: {
        fontFamily: 'Proxima-Nova-Semibold', 
        fontWeight:"100",
        color: 'black',  
        fontSize: 10, 
        lineHeight: 10, 
    },  
    ft10S_B500: {
        fontFamily: 'Proxima-Nova-Semibold', 
        fontWeight:"100",
        color: Blue500,  
        fontSize: 10, 
        lineHeight: 10, 
    },  
    ft10B: {
        fontFamily: 'Proxima-Nova-Bold', 
        fontWeight:"bold",
        color: 'black',  
        fontSize: 10, 
        lineHeight: 10, 
    },
    ft10B_G500: {
        fontFamily: 'Proxima-Nova-Bold',
        fontWeight:"100",
        color: Gray500,
        fontSize: 10,
        lineHeight: 12,
    },
    ft10B_B300: {
        fontFamily: 'Proxima-Nova-Bold',
        fontWeight:"100",
        color: Blue300,
        fontSize: 10,
        lineHeight: 12,
    },
    ft10B_B500: {
        fontFamily: 'Proxima-Nova-Bold',
        fontWeight:"100",
        color: Blue500,
        fontSize: 10,
        lineHeight: 12,
    },
    ft10B_B100: {
        fontFamily: 'Proxima-Nova-Bold',
        fontWeight:"100",
        color: Blue100,
        fontSize: 10,
        lineHeight: 12,
    },

    iconFrame: {
        padding:14,
        borderRadius: 48,
        backgroundColor: Gray100,
        alignSelf:"center"
    },

    textFrame: {
        fontFamily: 'Proxima-Nova-Semibold',
        fontSize: 10,
        color: Blue500,
        backgroundColor: Blue100,
        textTransform: "capitalize",
        borderRadius: 16,
        paddingVertical: 2,
        paddingHorizontal: 6,
    },

    textFrame_Red: {
        fontFamily: 'Proxima-Nova-Semibold',
        fontSize: 10,
        color: Red500,
        backgroundColor: Red100,
        textTransform: "capitalize",
        borderRadius: 16,
        paddingVertical: 2,
        paddingHorizontal: 6,
    },
    textFrame_Pink: {
        fontFamily: 'Proxima-Nova-Semibold',
        fontSize: 10,
        color: "white",
        backgroundColor: Red300,
        textTransform: "capitalize",
        borderRadius: 16,
        paddingVertical: 2,
        paddingHorizontal: 6,
    },
    textFrame_Green: {
        fontFamily: 'Proxima-Nova-Semibold',
        fontSize: 10,
        color: Green500,
        backgroundColor: Green100,
        textTransform: "capitalize",
        borderRadius: 16,
        paddingVertical: 2,
        paddingHorizontal: 6,
    },
    textFrame_Brown: {
        fontFamily: 'Proxima-Nova-Semibold',
        fontSize: 10,
        fontWeight:"600",
        color: Orange500,
        backgroundColor: Orange100,
        textTransform: "capitalize",
        borderRadius: 16,
        paddingVertical: 2,
        paddingHorizontal: 6,
    },
    textFrame_Blue: {
        fontFamily: 'Proxima-Nova-Semibold',
        fontWeight:"600",
        fontSize: 10,
        color: Blue500,
        backgroundColor: Blue100,
        textTransform: "capitalize",
        borderRadius: 16,
        paddingVertical: 2,
        paddingHorizontal: 6,
    },
    textFrame_LBlue: {
        fontFamily: 'Proxima-Nova-Semibold',
        fontSize: 10,
        fontWeight:"600",
        color: Cyan500,
        backgroundColor: Cyan100,
        textTransform: "capitalize",
        borderRadius: 16,
        paddingVertical: 2,
        paddingHorizontal: 6,
    },
    bottomBorder:{
        borderBottomWidth:1,
        borderBottomColor:Gray300
    },
    noBottomBorder:{
        borderBottomWidth:1,
        borderBottomColor:"transparent"
    },

    border:{
        borderBottomWidth:1, 
        borderTopWidth:1, 
        borderLeftWidth:1,
        borderRightWidth:1,
        borderColor: 'rgba(0, 71, 179, 0.03)'
    },

    shadow: {
        borderRadius: 50,
        shadowColor: "rgba(0, 71, 179, 1);",
        shadowOffset: {
            width: 1,
            height: 5
        },
        shadowRadius: 15,
        shadowOpacity: 1.0,
        elevation: 2
    },

    shadow1: {
        marginHorizontal:1,
        marginVertical: 3,
        shadowColor: "rgba(0, 71, 179, 0.08)",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 15,
        shadowOpacity: 1.0,
        elevation: 1
    },
    
    footer: {
        backgroundColor: White,
        borderTopWidth: 0,
        borderTopColor: 'rgba(154, 175, 186, 0.12);'
    },

    rowFlex: { 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center', 
    },

    rowFlex_start: { 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'flex-start',
        alignItems: 'center', 
    },

    chatClientBox1: {
        backgroundColor: Gray200,
        color: Gray800, 
        fontFamily: 'Proxima-Nova-Regular',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 22,
        maxWidth: 240,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderTopLeftRadius: 2 ,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        marginTop: 4,
        
    },
    chatClientBox2: {
        backgroundColor: Gray200,
        color: Gray800,
        fontFamily: 'Proxima-Nova-Regular',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 22,
        maxWidth: 240,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8 ,
        marginTop: 4,
    },
    chatClientBox3: {
        backgroundColor: Gray200,
        color: Gray800,
        fontFamily: 'Proxima-Nova-Regular',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 22,
        maxWidth: 240,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderTopLeftRadius: 8 ,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 8,
        marginTop: 4
    },
    chatMeBox1: {
        backgroundColor: Blue500,
        color: White,
        fontFamily: 'Proxima-Nova-Regular',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 22,
        maxWidth: 240,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderTopLeftRadius: 8 ,
        borderTopRightRadius: 2,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        marginTop: 4
    },
    chatMeBox2: {
        backgroundColor: Blue500,
        color: White,
        fontFamily: 'Proxima-Nova-Regular',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 22,
        maxWidth: 240,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8 ,
        marginTop: 4
    },
    chatMeBox3: {
        backgroundColor: Blue500,
        color: White,
        fontFamily: 'Proxima-Nova-Regular',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 22,
        maxWidth: 240,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderTopLeftRadius: 8 ,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 2,
        marginTop: 4
    },

    invitePlus: {
        fontSize: 20, 
        color:Blue500,
        borderRadius: 50,
        backgroundColor: Blue100,
        padding: 8    
    },

    mt8:{marginTop: 8},
    mt16:{marginTop: 16},
    mt24:{marginTop: 24},
    mt32:{marginTop: 32},
    
    mb8:{marginBottom: 8},
    mb16:{marginBottom: 16},
    mb24:{marginBottom: 24},
    mb32:{marginBottom: 32},
        
    ml8:{marginLeft: 8},
    ml16:{marginLeft: 16},
    ml24:{marginLeft: 24},
    ml32:{marginLeft: 32},
            
    mr8:{marginRight: 8},
    mr16:{marginRight: 16},
    mr24:{marginRight: 24},
    mr32:{marginRight: 32},

    pt8:{paddingTop: 8},
    pt16:{paddingTop: 16},
    pt24:{paddingTop: 24},
    pt32:{paddingTop: 32},
    
    pd8:{padding: 8},
    pd16:{padding: 16},
    pd24:{padding: 24},

    pb8:{paddingBottom: 8},
    pb16:{paddingBottom: 16},
    pb24:{paddingBottom: 24},
    pb32:{paddingBottom: 32},
        
    pl8:{paddingLeft: 8},
    pl16:{paddingLeft: 16},
    pl24:{paddingLeft: 24},
    pl32:{paddingLeft: 32},
            
    pr10:{paddingRight: 8},
    pr16:{paddingRight: 16},
    pr24:{paddingRight: 24},
    pr32:{paddingRight: 32},

    ph8:{paddingHorizontal: 8},
    ph16:{paddingHorizontal: 16},
    ph24:{paddingHorizontal: 24},
    ph32:{paddingHorizontal: 32},

    pv8:{paddingVertical: 8},
    pv16:{paddingVertical: 16},
    pv24:{paddingVertical: 24},
    pv32:{paddingVertical: 32},

});
