import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { S } from '../mainStyle';
import * as MS from '../mainStyle';

export default function ScheduleProgressbar(props) {
    const { status, percent, index, selOptionIndex, onClickItem } = props;

    let statusStyle, progressStyle, itemType, cardStyle;

    if (status === "Available") itemType = 1;
    else if (status === "Booked") itemType = 2;
    else if (status === "Pending confirmation") itemType = 4;
    else itemType = 3;

    if (itemType === 1) {
        cardStyle = styles.card;
        statusStyle = styles.availableStatus;
        progressStyle = { width: String(percent) + '%', BGcolor:"white", progressbarBGcolor: MS.Blue500 }
    }
    else if (itemType === 2) {
        cardStyle = styles.noShadow_card;
        statusStyle = styles.bookedStatus;
        progressStyle = { width: '100%', BGcolor:MS.Red100, progressbarBGcolor: MS.Red500 }
    }else if (itemType === 4) {
        cardStyle = styles.noShadow_card;
        statusStyle = styles.pendingStatus;
        progressStyle = { width: '100%', BGcolor:MS.Orange100, progressbarBGcolor: MS.Orange500 }
    }
    else {
        cardStyle = styles.card;
        statusStyle = styles.confirmStatus;
        progressStyle = { BGcolor:MS.Blue500}
    }

    ///////////////////////////////////////////////////////////////////////////
    const onClickProgressBar =(type, index )=> {
        if( type === 1 )  onClickItem(index, null);
        else if(type === 3 ) onClickItem(index, selOptionIndex);
    }

    ///////////////////////////////////////////////////////////////////////////
    return (
        <TouchableHighlight style={cardStyle} 
            activeOpacity={0.8} underlayColor="transparent" 
            onPress={() => onClickProgressBar( itemType, index)}
        >
            <View style={[ S.rowFlex_start, styles.content, {backgroundColor:progressStyle.BGcolor}]}>
            {
                itemType === 3 ?
                (
                    <View style={[{ ...S.rowFlex, width:"100%"}]}>
                        <Text style={statusStyle}>{status}</Text>
                        <Text style={[styles.selected]}>selected</Text>
                    </View>
                )
                :
                (
                    <View style={{width:"100%"}}>
                        <Text style={statusStyle}>{status}</Text>
                        <View style={{backgroundColor:MS.Blue100, borderRadius:32, height:6, marginTop:8}}>
                            <View style={{width:progressStyle.width, backgroundColor:progressStyle.progressbarBGcolor, borderRadius:32, height:6}}/>
                        </View>
                    </View>
                )
            }
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    card: {
        height: 48,
        flex: 1,
        alignItems: 'center',
        borderRadius: 8,
        marginVertical: 5,        
        borderWidth: 2, 
        borderColor: 'rgba(0, 71, 179, 0.02)'
    },
    noShadow_card: {
        height: 46,
        flex: 1,
        alignItems: 'center',
        borderRadius: 8,
        marginVertical: 5,
        borderWidth: 2, 
        borderColor: 'rgba(0, 71, 179, 0.00)'  
    },
    content: {
        width: '100%',
        height: 46,
        backgroundColor: 'white',
        paddingHorizontal:16,
        paddingVertical:8,
        borderRadius: 8,
    },
    selected: {
        fontFamily: 'Proxima-Nova-Regular',
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '600',
        color: MS.Blue300,
    }, 
    availableStatus: {
        fontFamily: 'Proxima-Nova-Regular',
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 16,
        color:  MS.Blue500,
    },
    confirmStatus: {
        fontFamily: 'Proxima-Nova-Regular',
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 16,
        color: 'white',
    },
    bookedStatus: {
        fontFamily: 'Proxima-Nova-Regular',
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 16,
        color: MS.Red500,
    },
    pendingStatus: {
        fontFamily: 'Proxima-Nova-Regular',
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 16,
        color: MS.Orange500,
    }    
});

