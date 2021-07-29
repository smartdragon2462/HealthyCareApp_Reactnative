import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import CircleIcon from '../components/CircleIcon';
import { Note_svg, Media_svg, Photography_svg } from '../assets/icons';
import { S } from '../mainStyle';
import * as MS from '../mainStyle';

export default function FileAttachPanel(props) {
    const { onCamera, onGallery, onDocument} = props;
    return (
        <View style={styles.panel}>
            <TouchableOpacity onPress={() => onDocument()}>
                <CircleIcon SVGIcon={Note_svg} bottomTxt={"Document"} fillcolor={MS.Pink500} frameBGcolor={MS.Pink100}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onGallery()}>
                <CircleIcon SVGIcon={Media_svg} bottomTxt={"Gallery"} fillcolor={MS.Purple500} frameBGcolor={MS.Purple100}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onCamera()}>
                <CircleIcon SVGIcon={Photography_svg} bottomTxt={"Camera"} fillcolor={MS.Cyan500} frameBGcolor={MS.Cyan100}/>
            </TouchableOpacity >
        </View>
    );
}

const styles = StyleSheet.create({
    panel :{
        ...S.rowFlex,
        backgroundColor:'white',
        padding:24,
        elevation:2
    }
});
