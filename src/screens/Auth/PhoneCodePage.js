import React from 'react';
import { FlatList, StyleSheet, View, TouchableHighlight, Text, StatusBar } from 'react-native';
import { Container, Content, Spinner } from 'native-base';
import SearchComp1 from '../../components/SearchComp1';
import { Header } from 'native-base';
import PhoneCode from '../../Data/PhoneCode.json'
import LinearGradient from 'react-native-linear-gradient'
import { S } from '../../mainStyle';
import * as MS from '../../mainStyle';

export default class PhoneCodePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTxt: '',
            filteredList: null,
        };
    }

    ///////////////////////////////////////////////////////////////////////
    componentDidMount() {
        setTimeout(() => {
            this.setState({ filteredList: require('../../Data/PhoneCode.json') });
        }, 0);
    }

    ///////////////////////////////////////////////////////////////////////
    handleFilterList = (_dataList, _searchStr) => {
        let filteredList = _dataList.filter((elem) => elem.name.toLowerCase().includes(_searchStr.toLowerCase()));
        return filteredList;
    }

    ///////////////////////////////////////////////////////////////////////
    onChangeText = (val) => {
        if (val === "") {
            this.setState({ filteredList: PhoneCode });
        } else {
            this.setState({ searchTxt: val });
            let filteredList = this.handleFilterList(PhoneCode, val);
            this.setState({ filteredList: filteredList });
        }
    }

    ///////////////////////////////////////////////////////////////////////
    onCancelSearch = () => {
        this.setState({ searchTxt: "", filteredList: PhoneCode });
    }

    ///////////////////////////////////////////////////////////////////////
    onChoosePhoneCode = (item) => {
        const { navigation } = this.props;
        const { navigate } = this.props.navigation;

        const onhandlePhoneCode = navigation.getParam('onhandlePhoneCode');
        const backPage = navigation.getParam('backPage');

        onhandlePhoneCode(item.code, "phonecode");
        navigate(backPage);
    }

    ///////////////////////////////////////////////////////////////////////
    render() {
        const { searchTxt, filteredList } = this.state;

        const renderItem = ({ item }) => (
            <TouchableHighlight key={item.name} activeOpacity={0.8} underlayColor="transparent" onPress={() => this.onChoosePhoneCode(item)}>
                <View style={styles.items}>
                    <Text style={S.ft16_W}> {item.name} </Text>
                    <Text style={S.ft16_W}> {item.code} </Text>
                </View>
            </TouchableHighlight>
        );

        return (
            <Container>
                <LinearGradient style={styles.container} colors={[MS.Blue500, '#0250c7']}>
                    <Header noShadow style={styles.header}>
                        <View style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
                            <View style={{ flex: 1 }}>
                                <SearchComp1
                                    onChangeText={this.onChangeText}
                                    searchTxt={searchTxt}
                                    placeholder={"Search by country"}
                                />
                            </View>
                            <TouchableHighlight
                                style={[styles.cancelBtn]}
                                activeOpacity={0.6}
                                underlayColor="transparent"
                                onPress={() => this.onCancelSearch()}
                            >
                                <Text style={S.ft12B_W}> Cancel </Text>
                            </TouchableHighlight>
                        </View>
                    </Header>
                    <View>
                        <StatusBar backgroundColor='transparent' />
                        {
                            filteredList ?
                            <FlatList
                                data={filteredList}
                                showsVerticalScrollIndicator={false}
                                initialNumToRender={30}
                                renderItem={renderItem}
                                keyExtractor={(item, index) => index.toString()}
                            />
                            :
                            <View style={{ marginTop: 100 }}>
                                <Spinner size={50} />
                            </View>
                        }
                    </View>
                </LinearGradient>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        backgroundColor: 'transparent',
        marginVertical: 5
    },
    container: {
        flex: 1,
        paddingTop: 17
    },
    cancelBtn: {
        color: 'white',
        paddingLeft: 17,
        paddingVertical: 8,
        paddingRight: 0
    },
    items: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        paddingVertical: 15,
        borderBottomColor: MS.Blue500,
        borderBottomWidth: 1
    }
});
