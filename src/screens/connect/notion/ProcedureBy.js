// ***************************************************************************
//  @Created Date: 03/30/2021.
//  @Update:  03/30/2021.
//  @author:  ClerkedApp team.
//  @description:   A screen for procedure by.
// ***************************************************************************

import React from 'react';
import { SafeAreaView, StyleSheet, Text, ScrollView, TextInput, View, Image, TouchableHighlight, Dimensions, Animated, StatusBar } from 'react-native';
import { Container, Content, Button } from 'native-base';
import { hideNavigationBar, showNavigationBar } from 'react-native-navigation-bar-color';
import { SearchComp, HeaderComp, CareTeamItem} from '../../../components';
import { Doc_img1, Doc_img2, Doc_img3, Doc_img4, Doc_img5, Doc_img6 } from '../../../assets/images';
import { S } from '../../../mainStyle';
import  * as MS from '../../../mainStyle';

let doctorList = [
  { photo: Doc_img5, name: 'Monica Madison', id: '1234560', email: 'eee@gmail.com', phoneNum: "+6534657976", role: 'cvm' },
  { photo: Doc_img6, name: 'William Defoe', id: '123461', email: 'fff@gmail.com', phoneNum: "+65673455667", role: 'cts' },
  { photo: Doc_img1, name: 'Edwards McCakine', id: '123462', email: 'ggg@gmail.com', phoneNum: "+65756855645", role: 'cts' },
  { photo: Doc_img2, name: 'Robert Owen', id: '123463', email: 'aaa@gmail.com', phoneNum: "+65916147854", role: 'cts' },
  { photo: Doc_img3, name: 'Johana Smith', id: '123464', email: 'bbb@gmail.com', phoneNum: "+65742334533", role: 'cts' },
  { photo: Doc_img4, name: 'Rebecca Bryans', id: '123465', email: 'ccc@gmail.com', phoneNum: "+65756484453", role: 'nem' },
  { photo: Doc_img1, name: 'Sarah Jones', id: '123466', email: 'ddd@gmail.com', phoneNum: "+65123345363", role: 'cvm' },
]


const { width, height } = Dimensions.get('window');
const NAVBAR_HEIGHT = 46;

///////////////////////////////////////////////////////////////////////
export default class ProcedureBy extends React.Component {
  scroll = new Animated.Value(0);

  constructor(props) {
    super(props);
    this.state = {
      filteredList: doctorList,
      selectedDoctors: null,
      y:0
    };
    this.headerY = Animated.multiply(Animated.diffClamp(this.scroll, 0, NAVBAR_HEIGHT), -1);
  }
  
  ///////////////////////////////////////////////////////////////////////
  onScroll = (ev) => {
    const { isHeaderBorder } = this.state;
    if (!isHeaderBorder && ev.contentOffset.y > 8) this.setState({ isHeaderBorder: true });
    else if (isHeaderBorder && ev.contentOffset.y < 8) this.setState({ isHeaderBorder: false });
  }

  ///////////////////////////////////////////////////////////////////////
  onscrollEnd =(ev)=> {
    const { isHeaderBorder } = this.state;
    if(!isHeaderBorder && ev.contentOffset.y>8) this.setState({isHeaderBorder: true});
    else if(isHeaderBorder && ev.contentOffset.y<8) this.setState({isHeaderBorder: false});
  }

  ///////////////////////////////////////////////////////////////////////
  onCheckID = (dataList, id) => {
    if (dataList === null) return false;
    let filteredList = dataList.filter((elem) => elem.id === id);
    return filteredList.length > 0 ? true : false;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onBackpage = () => {
    const { navigate } = this.props.navigation;
    navigate('Procedures');
  }

  ///////////////////////////////////////////////////////////////////////
  onNextpage = () => {
    // const { navigate } = this.props.navigation;
    // const { selectedCareteam, selectedPatient } = this.state
    // navigate('CreateGroup', { selectedPatient: selectedPatient, selectedCareteam: selectedCareteam });
  }

  
  ///////////////////////////////////////////////////////////////////////
  render() {   
    const { selectedDoctors, filteredList, tabButtonType, searchTxt, isContinue, isHeaderBorder } = this.state;

    return (
      <Container style={styles.container}>
        <View style={S.pt16}>
          <HeaderComp
            leftText={""}
            rightText={tabButtonType === 1 ? "" : "Confirm"}
            onBackpage={this.onBackpage}
            onSave={this.onNextpage}
            active={isContinue}
            isBorder={isHeaderBorder}
            background={MS.Gray100}
          />
        </View>

        <Content 
          style={styles.contents} 
          showsVerticalScrollIndicator={false} 
          onScroll={({ nativeEvent }) => this.onScroll(nativeEvent)} 
        >
          <View style={{ marginVertical: 16 }}>
            <SearchComp onChangeText={this.onChangeText} searchTxt={searchTxt} placeholder={"Search by name or ID"}/>
          </View>
          <StatusBar backgroundColor={MS.Gray100} barStyle="dark-content" translucent={true} />
          <View>
            {
              filteredList &&
              filteredList.map((userData, i) => (
                <TouchableHighlight key={i} activeOpacity={0.8} underlayColor="transparent" onPress={() => this.onClick_CareTeam(userData, i, 2)}>
                  <CareTeamItem
                    item={userData}
                    isChecked={this.onCheckID(selectedDoctors, userData.id)}
                  />
                </TouchableHighlight>
              ))
            }
            </View>
        </Content>
      </Container>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: { backgroundColor: '#FAFAFB', },
  contents: {
    padding: 24,
    paddingTop: 8,
    width: '100%'
  },
  patientTabs: {
    backgroundColor: '#E6E8EB',
    borderRadius: 8,
    padding: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  header: {
    height: 50,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  photo: {
    width: 50,
    height: 50
  }
});

