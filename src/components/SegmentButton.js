import React from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';
import { S } from '../mainStyle';
import * as MS from '../mainStyle';

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
export default function SegmentButton(props) {
    const { btnTextList, selButton,  onclick_Button } = props;

    /////////////////////////////////////////////////////////////////////////////
    return (
        <View style={ styles.buttonPanel }>
        {
            btnTextList &&
            btnTextList.map((btnText, i)=>(
                <TouchableHighlight   
                    key={i} style={[{ flex: 1 }]} activeOpacity = {0.8} 
                    underlayColor = "transparent" onPress={() => onclick_Button(i+1)}
                >
                    <View style={[selButton === i? S.active_button : S.deactive_button]} >
                        <Text style={[ S.ft12S_G700, selButton===i&& {color:"white"}]}>{ btnText }</Text>
                    </View>
                </TouchableHighlight>
            ))
        }
        </View>
    );
}

const styles = StyleSheet.create({
    buttonPanel: {
        backgroundColor: MS.Gray200,
        borderRadius: 8,
        padding: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      },
});
