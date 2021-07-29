// ***************************************************************************
//  @Created Date:  2/24/2021 
//  @Update:  2/26/2021
//  @author:  ClerkedApp team
//  @description:   A component to text editor
// ***************************************************************************

import React from 'react';
import { StyleSheet, View, TextInput, Text, Image, Keyboard, TouchableHighlight, ScrollView, FlatList, Platform, KeyboardAvoidingView, Dimensions } from 'react-native';
import { Icon } from 'native-base';
import SelectColorModal from '../components/SelectColorModal';
import BlockModal from '../components/BlockModal';
import ProblemListComp from '../components/ProblemListComp';
import ProcedureListComp from '../components/ProcedureListComp';
import MedicationComp from '../components/MedicationComp';
import { Camera_icon, Attach_svg, TabRight_svg, TabLeft_svg, Underline_svg, Bold_svg, Italic_svg, TextColor_svg } from '../assets/icons';
import { S } from '../mainStyle';


export default class Notion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenColorModal: false,
            isOpenBlockModal: false,

            selectedIndex: 0,
            bottomMargin: 0,
            toolbarWidth: null,
            isNotionEdit: true,
            noteList: [
                {
                    type: "text", 
                    level: 0, 
                    style:
                    {
                        heading: "h1", 
                        color: "#33435C", 
                        backcolor: "#FFF3E3", 
                        fontstyle: { b: false, i: false, u: false }
                    }, 
                    content: "Patient’s feedback"
                },
                { type: "text", level: 0, style: { heading: "h0", color: "#33435C", backcolor: "#FAFAFB", fontstyle: { b: false, i: false, u: false } }, content: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin" },
                { type: "text", level: 0, style: { heading: "h0", color: "#33435C", backcolor: "#FAFAFB", fontstyle: { b: false, i: false, u: false } }, content: "Patient’s feedback" },
                { type: "text", level: 1, style: { heading: "h1", color: "#33435C", backcolor: "#FAFAFB", fontstyle: { b: false, i: false, u: false } }, content: "ddddddd" },
                { type: "text", level: 1, style: { heading: "h2", color: "#33435C", backcolor: "#FAFAFB", fontstyle: { b: false, i: true, u: false } }, content: "bbbbbbbbbbbbb" },
                { type: "list", level: 1, style: { heading: "h1", color: "#33435C", backcolor: "#FAFAFB", fontstyle: { b: false, i: true, u: false } }, content: "bbbbbbbbbbbbb" },
                { type: "numList", level: 0, style: { heading: "h0", color: "#33435C", backcolor: "#FAFAFB", fontstyle: { b: false, i: false, u: false } }, content: "hhhhhh" },
                { type: "numList", level: 0, style: { heading: "h0", color: "#33435C", backcolor: "#FAFAFB", fontstyle: { b: false, i: false, u: false } }, content: "ddddddddddd" },
                { type: "numList", level: 0, style: { heading: "h0", color: "#33435C", backcolor: "#FAFAFB", fontstyle: { b: false, i: false, u: false } }, content: "rrrrrr" },
                // {
                //     type: "problemList",
                //     cardInfo: { title: "Asthma", type: "confirmed" },
                //     detailInfo:
                //     {
                //         created: "17 Dec 2020 10:00 AM", 
                //         cinical_status: "Active", 
                //         verification_status: "Possible", 
                //         created_by: { name: "Dr. Lisa Sidnay", picture: null },
                //         participants: { name: "Rebecca Miller", picture: null },
                //         remarks: [
                //             {
                //                 name: "Dr. Peter Smith",
                //                 picture: null,
                //                 text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC."
                //             }]
                //     }
                // },
                // {
                //     type: "procedures",
                //     cardInfo: { title: "Asthma", type: "confirmed" },
                //     detailInfo: {
                //         created: "17 Dec 2020 10:00 AM",
                //         _cinicalstatus: "Active",
                //         verification_status: "Possible",
                //         created_by: { name: "Dr. Lisa Sidnay", picture: null },
                //         participants: { name: "Rebecca Miller", picture: null },
                //         remarks: [
                //             {
                //                 name: "Dr. Peter Smith",
                //                 picture: null,
                //                 text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC."
                //             }]
                //     }
                // },
            ],
            data: [
                { action: "addBlock" },
                { action: "attach" },
                { action: "indent" },
                { action: "outdent" },
                { action: "txtColor" },
                { action: "bold" },
                { action: "italic" },
                { action: "underline" }
            ]
        };

        this.InputRefs = [];
    }

    ///////////////////////////////////////////////////////////////////////
    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = (e) => {
        this.setState({ bottomMargin: e.endCoordinates.height })
    }

    _keyboardDidHide = () => {
        this.setState({ bottomMargin: 0 })
    }

    ///////////////////////////////////////////////////////////////////////
    _blur(index) {
        this.InputRefs[index].blur();
    }

    ///////////////////////////////////////////////////////////////////////
    _setFocus(index) {
        this.InputRefs[index].focus();
    }

    ///////////////////////////////////////////////////////////////////////
    onChooseBlock = (type) => {
        const { navigate } = this.props.navigation;
        const { noteList, selectedIndex } = this.state;

        let tmp_noteList = noteList;

        if (type === "text") {
            tmp_noteList[selectedIndex].style.heading = "h0";
            tmp_noteList[selectedIndex].type = "text";
        } else if (type === "h1" || type === "h2") {
            tmp_noteList[selectedIndex].style.heading = type;
        } else if (type === "list" || type === "numList") {
            tmp_noteList[selectedIndex].type = type;
        } else if (type === "problemList") {
            let data = {
                type: "problemList",
                data: null
            }
            tmp_noteList.push(data);
        }
        else if (type === "procedures") {
            let data = {
                type: "procedures",
                data: null
            }
            tmp_noteList.push(data);
        }
        else if (type === "medications") {
            let data = {
                type: "medications",
                data: null
            }
            tmp_noteList.push(data);
        };

        this.setState({ noteList: tmp_noteList, isOpenBlockModal: false });
    }

    ///////////////////////////////////////////////////////////////////////
    onCloseModal = () => {
        this.setState({ isOpenColorModal: false, isOpenBlockModal: false });
    }

    ///////////////////////////////////////////////////////////////////////
    onSubmitValue() {
        const { noteList, selectedIndex } = this.state;
        let tmp_noteList = noteList;

        let level = noteList[selectedIndex].level;
        let item = { type: noteList[selectedIndex].type, level: level, style: { heading: "h0", color: "#33435C", backcolor: "#FAFAFB", fontstyle: { b: false, i: false, u: false } }, content: "", child: null };
        tmp_noteList.splice(selectedIndex + 1, 0, item);
        this.setState({ noteList: tmp_noteList });

        setTimeout(() => {
            this._setFocus(selectedIndex + 1)
        }, 100);
    }

    ///////////////////////////////////////////////////////////////////////
    onKeyPressextInput = (ev) => {
        if (ev.nativeEvent.key === 'Enter') {
            ev.preventDefault();
        }
    }

    ///////////////////////////////////////////////////////////////////////
    onTextChange(text) {
        const { noteList, selectedIndex } = this.state;

        let tmp_noteList = noteList;
        tmp_noteList[selectedIndex].content = text;
        this.setState({ noteList: tmp_noteList });

    }

    ///////////////////////////////////////////////////////////////////////
    onFocusTextInput = (data, index) => {
        this.setState({ selectedIndex: index });
    }

    ///////////////////////////////////////////////////////////////////////
    onSetTextColor = (color) => {
        const { noteList, selectedIndex } = this.state;
        let tmp_noteList = noteList;
        tmp_noteList[selectedIndex].style.color = color;
        this.setState({ noteList: tmp_noteList, isOpenColorModal: false });
    }

    ///////////////////////////////////////////////////////////////////////
    onSetHightlightColor = (color) => {
        const { noteList, selectedIndex } = this.state;
        let tmp_noteList = noteList;
        tmp_noteList[selectedIndex].style.backcolor = color;
        this.setState({ noteList: tmp_noteList, isOpenColorModal: false });
    }

    ///////////////////////////////////////////////////////////////////////
    onSetFontStyle(type) {
        const { noteList, selectedIndex } = this.state;

        let tmp_noteList = noteList;
        let bold = false, italic = false, underline = false;

        if (tmp_noteList[selectedIndex].style.fontstyle) {
            bold = tmp_noteList[selectedIndex].style.fontstyle.b;
            italic = tmp_noteList[selectedIndex].style.fontstyle.i;
            underline = tmp_noteList[selectedIndex].style.fontstyle.u;
        }

        if (type === "b") tmp_noteList[selectedIndex].style.fontstyle = { b: !bold, i: italic, u: underline };
        else if (type === "i") tmp_noteList[selectedIndex].style.fontstyle = { b: bold, i: !italic, u: underline };
        else if (type === "u") tmp_noteList[selectedIndex].style.fontstyle = { b: bold, i: italic, u: !underline };

        this.setState({ noteList: tmp_noteList });
    }

    ///////////////////////////////////////////////////////////////////////
    onIndent = () => {
        const { noteList, selectedIndex } = this.state;
        let tmp_noteList = noteList;
        if (selectedIndex > 0) {
            if (tmp_noteList[selectedIndex].level - tmp_noteList[selectedIndex - 1].level <= 0) tmp_noteList[selectedIndex].level += 1;
        } else {
            tmp_noteList[selectedIndex].level = 1;
        }
        this.setState({ noteList: tmp_noteList });
    }

    ///////////////////////////////////////////////////////////////////////
    onOutdent = () => {
        const { noteList, selectedIndex } = this.state;
        let tmp_noteList = noteList;
        if (selectedIndex > 0) {
            if (tmp_noteList[selectedIndex].level - tmp_noteList[selectedIndex - 1].level >= 0) tmp_noteList[selectedIndex].level -= 1;
        } else {
            tmp_noteList[selectedIndex].level = 0;
        }
        this.setState({ noteList: tmp_noteList });
    }

    ///////////////////////////////////////////////////////////////////////
    onRenderEditor = (data, level = 0) => {
        let mt = 8, renderList = [], extendedComponents = ["problemList", 'procedures', 'medications'];

        for (let i = 0; i < data.length; i++) {
            let font = "", fontStyle = "", placeholder = "";

            if (!extendedComponents.includes(data[i].type)) {
                fontStyle = data[i].style.fontstyle;
                if (data[i].style.heading === "h0" || data[i].style.heading === null) font = styles.heading0;
                else if (data[i].style.heading === "h1") { font = styles.heading1; placeholder = "Heading 1" }
                else if (data[i].style.heading === "h2") { font = styles.heading2; placeholder = "Heading 2" }
            }

            let j = 0; let bulletNumber = 0;
            if (data[i].type === "list" || data[i].type === "numList") {
                while (i - j >= 0) {
                    if (data[i - j].level === data[i].level && data[i - j].type === data[i].type) bulletNumber += 1;
                    else if (data[i - j].level < data[i].level || (data[i - j].type !== "list" && data[i - j].type !== "numList")) break;
                    j += 1;
                }
            }

            if (data[i].type === "text") {
                renderList.push(
                    <TextInput
                        key={i}
                        multiline
                        ref={ref => (this.InputRefs[i] = ref)}
                        blurOnSubmit={true}
                        placeholder={placeholder}
                        placeholderTextColor={"#CCD0D6"}
                        style={
                            [font,
                                {
                                    flex: 1,
                                    color: data[i].style.color,
                                    backgroundColor: data[i].style.backcolor,
                                    fontWeight: fontStyle.b ? 'bold' : '100',
                                    fontStyle: fontStyle.i ? 'italic' : "normal",
                                    textDecorationLine: fontStyle.u ? 'underline' : null,
                                    marginLeft: data[i].level * 20
                                }
                            ]
                        }
                        value={data[i].content}
                        onChangeText={text => this.onTextChange(text)}
                        onSubmitEditing={() => this.onSubmitValue()}
                        onFocus={() => this.onFocusTextInput(data[i], i)}
                    />
                )
            }
            else if (data[i].type === "list") {
                placeholder = "List"
                if (data[i].style.heading === "h0" || data[i].style.heading === null) mt = 10;
                else if (data[i].style.heading === "h1") mt = 13
                else if (data[i].style.heading === "h2") mt = 11

                renderList.push(
                    <View style={{ ...S.rowFlex_start, alignItems: "flex-start", marginLeft: data[i].level * 20 }} key={i} >
                        <Text style={{
                            fontSize: 6, marginTop: mt,
                            color: data[i].style.color,
                            backgroundColor: data[i].style.backcolor,
                            fontWeight: fontStyle.b ? 'bold' : '100',
                        }}>&#11044;
                        </Text>
                        <TextInput
                            multiline
                            ref={ref => (this.InputRefs[i] = ref)}
                            blurOnSubmit={true}
                            placeholder={placeholder}
                            placeholderTextColor={"#CCD0D6"}
                            style={
                                [font,
                                    {
                                        flex: 1,
                                        color: data[i].style.color,
                                        backgroundColor: data[i].style.backcolor,
                                        fontWeight: fontStyle.b ? 'bold' : '100',
                                        fontStyle: fontStyle.i ? 'italic' : "normal",
                                        textDecorationLine: fontStyle.u ? 'underline' : null,
                                        marginLeft: 18
                                    }
                                ]
                            }
                            value={data[i].content}
                            onChangeText={text => this.onTextChange(text)}
                            onSubmitEditing={() => this.onSubmitValue()}
                            onFocus={() => this.onFocusTextInput(data[i], i)}
                        />
                    </View>
                )
            }
            else if (data[i].type === "numList") {
                if (data[i].style.heading === "h0" || data[i].style.heading === null) mt = 10;
                else if (data[i].style.heading === "h1") mt = 13
                else if (data[i].style.heading === "h2") mt = 11

                renderList.push(
                    <View style={{ ...S.rowFlex_start, alignItems: "flex-start", marginLeft: data[i].level * 20 }} key={i} >
                        <Text style={
                            [font,
                                {
                                    width: 21,
                                    color: data[i].style.color,
                                    backgroundColor: data[i].style.backcolor,
                                    fontWeight: fontStyle.b ? 'bold' : '100',
                                    fontStyle: fontStyle.i ? 'italic' : "normal",
                                    textDecorationLine: fontStyle.u ? 'underline' : null,
                                }
                            ]
                        }>
                            {
                                bulletNumber !== 0 &&
                                bulletNumber + "."
                            }
                        </Text>
                        <TextInput
                            multiline
                            ref={ref => (this.InputRefs[i] = ref)}
                            blurOnSubmit={true}
                            placeholder={"List"}
                            placeholderTextColor={"#CCD0D6"}
                            style={
                                [font,
                                    {
                                        flex: 1,
                                        color: data[i].style.color,
                                        backgroundColor: data[i].style.backcolor,
                                        fontWeight: fontStyle.b ? 'bold' : '100',
                                        fontStyle: fontStyle.i ? 'italic' : "normal",
                                        textDecorationLine: fontStyle.u ? 'underline' : null,
                                    }
                                ]
                            }
                            value={data[i].content}
                            onChangeText={text => this.onTextChange(text)}
                            onSubmitEditing={() => this.onSubmitValue()}
                            onFocus={() => this.onFocusTextInput(data[i], i)}
                        />
                    </View>
                )
            }
            else if (data[i].type === "problemList") {
                renderList.push(
                    <View key={i + 10000} style={S.mt24}>
                        <ProblemListComp data={data[i].data} {...this.props} />
                    </View>
                    // <ProblemListItem key={i} itemData = {data[i].cardInfo} active={true}/>
                )
            }
            else if (data[i].type === "procedures") {
                renderList.push(
                    <View key={i + 100000} style={S.mt24}>
                        <ProcedureListComp data={data[i].data} {...this.props} />
                    </View>
                )
            }
            else if (data[i].type === "medications") {
                renderList.push(
                    <View key={i + 1000000} style={S.mt24}>
                        <MedicationComp data={null} {...this.props} />
                    </View>
                )
            }
        }

        return renderList;
    }

    ///////////////////////////////////////////////////////////////////////
    onRenderAction = (item) => {
        switch (item.action) {
            case "addBlock":
                return (
                    <TouchableHighlight activeOpacity={0.6} underlayColor="transparent" onPress={() => this.setState({ isOpenBlockModal: true })}>
                        <View style={S.rowFlex_start}>
                            <Icon type="Feather" name="plus" style={{ fontSize: 25, color: "#0066FF" }}></Icon>
                            <Icon type="Feather" name="chevron-down" style={{ fontSize: 20, color: "#80B3FF", marginLeft: -5 }}></Icon>
                        </View>
                    </TouchableHighlight>
                )
            case "attach":
                return (
                    <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="transparent"
                        style={{ padding: 5, marginHorizontal: 8 }}
                        onPress={() => console.log("dddddddddd")}
                    >
                        <Attach_svg width={16} height={16} fill={"#667285"} />
                    </TouchableHighlight>
                )
            case "indent":
                return (
                    <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="transparent"
                        style={{ padding: 5, marginHorizontal: 8 }}
                        onPress={() => this.onIndent()}
                    >
                        <TabRight_svg width={16} height={16} fill={"#667285"} />
                    </TouchableHighlight>
                )
            case "outdent":
                return (
                    <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="transparent"
                        style={{ padding: 5, marginHorizontal: 8 }}
                        onPress={() => this.onOutdent()}
                    >
                        <TabLeft_svg width={16} height={16} fill={"#667285"} />
                    </TouchableHighlight>
                )
            case "txtColor":
                return (
                    <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="transparent"
                        onPress={() => this.setState({ isOpenColorModal: true })}
                    >
                        <View style={[S.rowFlex_start, { padding: 5, marginHorizontal: 8 }]}>
                            <TextColor_svg width={16} height={16} fill={"#667285"} />
                            <Icon type="Feather" name="chevron-down" style={{ fontSize: 20, color: "#CCD0D6", marginLeft: -5 }}></Icon>
                        </View>
                    </TouchableHighlight>
                )
            case "bold":
                return (
                    <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="transparent"
                        style={{ padding: 5, marginHorizontal: 8 }}
                        onPress={() => this.onSetFontStyle("b")}
                    >
                        <Bold_svg width={16} height={16} fill={"#667285"} />
                    </TouchableHighlight>
                )
            case "italic":
                return (
                    <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="transparent"
                        style={{ padding: 5, marginHorizontal: 8 }}
                        onPress={() => this.onSetFontStyle("i")}
                    >
                        <Italic_svg width={16} height={16} fill={"#667285"} />
                    </TouchableHighlight>
                )
            case "underline":
                return (
                    <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="transparent"
                        style={{ padding: 5, marginHorizontal: 8 }}
                        onPress={() => this.onSetFontStyle("u")}
                    >
                        <Underline_svg width={16} height={16} fill={"#667285"} />
                    </TouchableHighlight>
                )
            default:
                return (
                    <Image source={Camera_icon} style={{ height: 32, width: 32, backgroundColor: "green", margin: 5 }} />
                );
        }
    }

    ///////////////////////////////////////////////////////////////////////
    onInputChange = () => {

    }

    ///////////////////////////////////////////////////////////////////////
    render() {
        const { data, noteList, bottomMargin, isOpenColorModal, isOpenBlockModal } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={[styles.scroll]} keyboardShouldPersistTaps="always">
                {
                    this.onRenderEditor(noteList)
                }
                </ScrollView>
                {/* <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> */}
                    <View style={[styles.barContainer, { marginBottom: bottomMargin }]}>
                        <FlatList
                            horizontal
                            keyboardShouldPersistTaps={'always'}
                            keyExtractor={(item, index) => item + '-' + index}
                            data={data}
                            contentContainerStyle={{ alignItems: "center" }}
                            alwaysBounceHorizontal={false}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => this.onRenderAction(item)}
                        />
                    </View>
                {/* </KeyboardAvoidingView> */}
                <SelectColorModal 
                    visible={isOpenColorModal} 
                    onBack={this.onCloseModal} 
                    onSelectColor={this.onSetTextColor} 
                    onSelectHighlight={this.onSetHightlightColor} 
                />
                <BlockModal 
                    visible={isOpenBlockModal} 
                    onBack={this.onCloseModal} 
                    onChooseBlock={this.onChooseBlock} 
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    barContainer: {
        paddingVertical: 8,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        borderColor: '#efefef',
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    scroll: {
        backgroundColor: '#FAFAFB',
        // paddingHorizontal: 24,
    },
    heading0: {
        fontFamily: 'Proxima-Nova-Regular',
        fontSize: 16,
        color: '#33435C',
        fontWeight: 'normal',
        lineHeight: 26,
        padding: 0
    },
    heading1: {
        fontFamily: 'Proxima-Nova-Bold',
        fontSize: 24,
        color: '#33435C',
        fontWeight: '600',
        lineHeight: 32,
        padding: 0
    },
    heading2: {
        fontFamily: 'Proxima-Nova-Bold',
        fontSize: 20,
        color: '#33435C',
        fontWeight: '600',
        lineHeight: 30,
        padding: 0
    },

    regular: { fontWeight: '100' },
    bold: { fontWeight: 'bold' },
    italic: { fontStyle: 'italic' },
    underline: { textDecorationLine: 'underline' },
});


