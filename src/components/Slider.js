// ***************************************************************************
//  @Created Date:  02/15/2021
//  @Update:  02/15/2021
//  @author:  ClerkedApp team
//  @description:   A component to create a slider
// ***************************************************************************

import React from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import CircleIcon from '../components/CircleIcon';
import { S } from '../mainStyle';
import * as MS from '../mainStyle';

const { width, height } = Dimensions.get('window');

export default class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewCount: 1,
            activeIndex: 0,
        };
    }

    ///////////////////////////////////////////////////////////////////////
    componentDidMount() {
    }

    ///////////////////////////////////////////////////////////////////////
    onChange = ({ nativeEvent }) => {
        const index = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (index !== this.state.activeIndex) this.setState({ activeIndex: index });
    }

    ///////////////////////////////////////////////////////////////////////
    render() {
        const { activeIndex } = this.state;
        const { dataList, viewCount } = this.props;
        let scrollItem = [], tmp = [], count = 0;

        for (let i = 0; i < dataList.length; i++) {
            count += 1;
            tmp.push(
                <CircleIcon SVGIcon={dataList[i].icon} bottomTxt={dataList[i].title} key={i} textStyle={S.ft12S_B500} />
            );
            if (count === viewCount) {
                scrollItem.push(tmp); count = 0; tmp = [];
            }
        }

        return (
            <View style={{ height: 90, width: width }}>
                <ScrollView
                    pagingEnabled
                    horizontal
                    onScroll={this.onChange}
                    showsHorizontalScrollIndicator={false}
                    style={styles.scroll}
                >
                    {
                        dataList &&
                        scrollItem.map((item, index) => (
                            <View key={index} style={[styles.control_panel, S.rowFlex, { alignItems: "flex-start" }]}>
                                {
                                    item.map((item1, index1) => (item1))
                                }
                            </View>
                        ))
                    }
                </ScrollView>
                <View style={styles.pagination}>
                    {
                        dataList &&
                        scrollItem.map((item, index) => (
                            <Text key={index} style={index === activeIndex ? styles.pagingActiveText : styles.pagingText}>⬤</Text>
                        ))
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scroll: {
        // flex:1
    },
    control_panel: {
        paddingHorizontal: 24,
        // width:"100%",
        width: width
        // flex:1
    },
    pagination: {
        flexDirection: "row",
        position: "absolute",
        bottom: 0,
        alignSelf: "center"
    },
    pagingText: {
        color: MS.Blue300,
        fontSize: 10,
        margin: 3
    },
    pagingActiveText: {
        color: MS.Blue500,
        fontSize: 10,
        margin: 3
    }
});


