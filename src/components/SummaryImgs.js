import React from 'react';
import { StyleSheet, View, Text, Image} from 'react-native';
import { Face1_img } from '../assets/images'
import * as MS from '../mainStyle';

export default function SummaryImgs(props) {
    const { dataList, color=MS.Cyan700} = props;
    return (
        <View style={styles.userPhotos}>
        {
            dataList && 
            dataList.map((data, i)=>{
                if ( i < 2 ) 
                return (
                    <Image 
                        source={ data.photo===""? Face1_img: data.photo } 
                        style={styles.avatar} 
                        resizeMode="contain" 
                        key={i}
                    /> 
                )
            })
        }
        {
            dataList && dataList.length > 2 &&
            <View style={styles.emptyPhoto}>
                <Text style={{ ...styles.userCount, color:color }}>+{dataList.length-2}</Text>
            </View>
        }
        </View>
    );
}

const styles = StyleSheet.create({
    userPhotos:{
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        marginLeft: 11,
    },
    emptyPhoto:{
        width:33,
        height: 33,
        borderRadius: 40,
        backgroundColor: MS.Cyan100,
        borderColor: 'white',
        borderWidth: 1,
        marginLeft: -15,
    },
    userCount: {
        fontFamily: 'Proxima-Nova-Bold',
        fontSize: 12,
        lineHeight: 16,
        textAlign: 'center',
        alignItems: 'center',
        marginTop:7
      },

    avatar: {
        marginLeft: -11,
        width: 32,
        height: 32,
        borderRadius: 32
    },
});
