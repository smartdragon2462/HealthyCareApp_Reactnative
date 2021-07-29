// ***************************************************************************
//  @created Date: 02/24/2021 
//  @Update:  02/24/2021 
//  @author:  ClerkedApp team
//  @description:   A component for toast message
// ***************************************************************************

import React from 'react';
import { StyleSheet, View, TouchableHighlight,Text } from 'react-native';
import { Icon } from 'native-base';
import Modal from 'react-native-modal';
import { Close_svg } from '../assets/icons';

export default function Toast( props ) {
    const {messageText, type, isVisible, onClose} =  props;
    let backgroundColor="", borderColor="";

    if(type===1) {backgroundColor="#E6F0FF"; borderColor="#0066FF"}
    else {backgroundColor="#D4FCE0"; borderColor="#29D19E"}

    return (
        <Modal 
          isVisible={isVisible} 
          statusBarTranslucent 
          backdropOpacity={0.0}
          animationIn="slideInDown"
          animationOut="slideOutUp"
          useNativeDriverForBackdrop
        >   
            <View style={[styles.card, {backgroundColor, borderColor}]}>
                <View style={styles.messagePanel}>
                    {
                        type===1?
                        <Icon name="checkmark-circle" type="Ionicons" style={{fontSize:40, color:borderColor}}/>
                        :
                        <Icon name="info" type="Foundation" style={{fontSize:40, color:borderColor}}/>
                    }
                    <Text style={{ ...styles.message, paddingHorizontal:16}} >{messageText}</Text>
                </View> 
                <TouchableHighlight style={{marginLeft:8, flex:0.1, alignItems:"flex-end"}} activeOpacity={0.8} underlayColor='transparent' onPress={()=>onClose()}>
                    <Close_svg width={16} height={16} fill="#99A1AD" />
                </TouchableHighlight>
            </View>   
        </Modal>            
    );
}

const styles = StyleSheet.create({    
    card: {       
        position:"absolute",
        top:0,
        width:"100%",
        padding: 16,
        borderRadius: 8,
        display: "flex",
        flexDirection: "row",
        alignItems:"center",
        justifyContent:"space-between",
        backgroundColor:"#E6F0FF",
        borderWidth:1,
        borderColor:"#0066FF"
    },
    messagePanel: {      
        flex:1,  
        display:"flex",
        flexDirection:"row",
        alignItems:"center",        
    },
    message: {
        fontFamily: 'Proxima-Nova-Regular',
        fontSize: 16,
        lineHeight: 22,
        color: '#33435C',
    }

});
