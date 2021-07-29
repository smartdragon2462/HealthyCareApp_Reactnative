import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { User_img1, Doc_img1 } from '../../assets/images';
import { Bookmark_svg } from '../../assets/icons';
import { S } from '../../mainStyle';
import * as MS from '../../mainStyle';

export default function ProblemListItem(props) {
    const { itemData, active } = props;
    let userPicture = Doc_img1, avatarStyle = styles.avatar_Grey;
    if (itemData.user_type === "caregive") { userPicture = Doc_img1; avatarStyle = styles.avatar_Grey }
    else if (itemData.user_type === "patient") { userPicture = User_img1; avatarStyle = styles.avatar_Blue }
    else if (itemData.user_type === "doctor") { userPicture = null; avatarStyle = styles.null }

    let typeStyle = S.textFrame_Blue;
    if (itemData.type.toLowerCase() === "confirmed") typeStyle = S.textFrame_Blue;
    else if (itemData.type.toLowerCase() === "possible") typeStyle = S.textFrame_Brown;
    else if (itemData.type.toLowerCase() === "inactive") typeStyle = S.textFrame_Red;

    return (
        <View style={[styles.card, itemData.type.toLowerCase() === "inactive" && { backgroundColor: MS.Gray200 }]}>
            <View style={S.rowFlex}>
                <Text style={typeStyle}>{itemData.type}</Text>
                <Bookmark_svg width={16} height={16} fill={itemData.isFlagged ? MS.Orange500 : MS.Gray600} />
            </View>
            <Text style={[S.ft16S_G800, { marginTop: 4, lineHeight: 22 }]}>{itemData.title}</Text>
            <View style={[S.rowFlex_start, { marginTop: 4 }]}>
                {
                    userPicture &&
                    <View style={avatarStyle}>
                        <Image source={userPicture} style={S.avatar16} resizeMode="contain" />
                    </View>
                }
                <Text style={S.ft12_G600}>{itemData.createdDate}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        ...S.border,
        padding: 16,
        backgroundColor: "white",
        marginTop: 8,
        borderRadius: 8
    },
    avatar_Grey: {
        marginRight: 4,
        borderRadius: 20,
        borderColor: MS.Gray400,
        borderWidth: 1,
        padding: 2
    },
    avatar_Blue: {
        marginRight: 4,
        borderRadius: 20,
        borderColor: MS.Blue500,
        borderWidth: 1,
        padding: 2
    }
});
