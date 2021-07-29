import React from 'react';
import { StyleSheet, View, Image, TouchableHighlight, ScrollView, StatusBar } from 'react-native';
import { Container, Content, Text, Icon} from 'native-base';
import Toast from 'react-native-simple-toast';
import {HeaderComp, SearchComp} from '../../components';
import { User_img1, User_img2, User_img3, User_img4, User_img5, User_img6, User_img7 } from '../../assets/images';
import { S } from '../../mainStyle';
import * as MS from '../../mainStyle';

let patientList = [
  { photo: User_img1, name: 'Sarah Bryans', id: '124784657', email: 'aaa@gmail.com', phoneNum: "+65916147854", role: 'cvm' },
  { photo: User_img2, name: 'Johana Smith', id: '134384657', email: 'bbb@gmail.com', phoneNum: "+65742334533", role: 'cts' },
  { photo: User_img3, name: 'Rebecca Bryans', id: '76884657', email: 'ccc@gmail.com', phoneNum: "+65756484453", role: 'nem' },
  { photo: User_img4, name: 'Sarah Jones', id: '98567657', email: 'ddd@gmail.com', phoneNum: "+65123345363", role: 'cvm' },
  { photo: User_img5, name: 'Roger Barkley', id: '95673545', email: 'eee@gmail.com', phoneNum: "+6534657976", role: 'cts' },
  { photo: User_img6, name: 'Edwards McCakine', id: '33224', email: 'fff@gmail.com', phoneNum: "+65673455667", role: 'nem' },
  { photo: User_img7, name: 'Samanta Bosh', id: '336784567', email: 'ggg@gmail.com', phoneNum: "+65756855645", role: 'cvm' },
  { photo: User_img6, name: 'Edwards McCakine', id: '63864336', email: 'fff@gmail.com', phoneNum: "+65673455667", role: 'nem' },
  { photo: User_img7, name: 'Samanta Bosh', id: '343453', email: 'ggg@gmail.com', phoneNum: "+65756855645", role: 'cvm' },
]


export default class ChooseColleagues extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isContinue: false,
      searchTxt: '',
      filteredList: patientList,
      selectedColleagues: null,
    };

  }
  ///////////////////////////////////////////////////////////////////////
  componentDidMount () {
    const { navigation } = this.props;
    const colleagues = navigation.getParam('colleagues'); 
    this.setState({ selectedColleagues: colleagues, isContinue: colleagues? true: false }) ;
  }
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onBackpage = () => {
    const { navigate } = this.props.navigation;
    navigate('AddEvents');
  }

  ///////////////////////////////////////////////////////////////////////
  onClick_FilterList = (i) => {
    const { selectedColleagues, filteredList } = this.state;

    if (selectedColleagues){
      let dataList = selectedColleagues;
      let filtereddata = dataList.filter((elem) => elem.id.toLowerCase().includes(filteredList[i].id.toLowerCase()));
      if(filtereddata.length > 0) {
        Toast.show('You selected this colleage already.');
        return;
      }
    }

    if (!selectedColleagues)  this.setState({ selectedColleagues: [filteredList[i]], isContinue: true });
    else this.setState({ selectedColleagues: [...selectedColleagues, filteredList[i]], isContinue: true });
  }

  ///////////////////////////////////////////////////////////////////////
  onHandleRemove =(index)=> {
    let selectedColleagues = this.state.selectedColleagues;
    selectedColleagues.splice(index, 1);
    this.setState({selectedColleagues: selectedColleagues });
    if(selectedColleagues.length === 0) this.setState({ isContinue: false });
  }
  
  ///////////////////////////////////////////////////////////////////////
  onChangeText = (val) => {
    this.setState({ searchTxt: val });
    let filteredList = this.handleFilterList(patientList, val);
    this.setState({ filteredList: filteredList });
  }
 
  ///////////////////////////////////////////////////////////////////////
  handleFilterList = (_dataList, _searchStr) => {
    let filteredList = _dataList.filter((elem) => elem.name.toLowerCase().includes(_searchStr.toLowerCase()) || elem.id.includes(_searchStr.toLowerCase()));
    return filteredList;
  }

  ///////////////////////////////////////////////////////////////////////
  handleDataSave =() => {
    const { navigate } = this.props.navigation;    
    const { navigation } = this.props;
    
    const { selectedColleagues } = this.state
    const onGetData = navigation.getParam('onGetData'); 
    const SelDateTime = navigation.getParam('SelDateTime');       
    let mtNewData = { dateTime: SelDateTime, colleagues: selectedColleagues} 
    onGetData(mtNewData);
    navigate('AddEvents');
  }


  ///////////////////////////////////////////////////////////////////////
  render() {
    const { filteredList, selectedColleagues, searchTxt, isContinue } = this.state;
    
    return (
      <Container style={styles.container}>
        <View style={{paddingTop: 20}}>
          <HeaderComp 
            leftText={"Invite colleagues"} 
            rightText={"Save"} 
            onBackpage = {this.onBackpage}  
            onSave = { this.handleDataSave}
            active = {isContinue}
          />
        </View>

        <StatusBar backgroundColor='transparent' barStyle = "dark-content"/>
        <Content style={styles.contents} >
          <View style={{ marginTop: 12, marginBottom: 8 }}>
            <SearchComp 
              onChangeText={this.onChangeText} 
              searchTxt={searchTxt} 
              placeholder={"Search by name or ID"}
            />
          </View>

          <ScrollView horizontal>
            {
              selectedColleagues &&
              selectedColleagues.map((colleague, i) => (
                <View key={i} style={{marginVertical: 8}}>
                  <View style={{margin: 7}}>
                    <View style={{ padding: 3 }}>
                        <Image source={colleague.photo} style={ S.avatar32} resizeMode="contain" />
                        <TouchableHighlight style={styles.itemClose}
                          activeOpacity={0.6} underlayColor="transparent" 
                          onPress={() => this.onHandleRemove(i)}
                        >
                          <Icon active name="close" type="AntDesign" style={styles.closeIcon} />
                        </TouchableHighlight>  
                    </View>
                  </View>                
                  <Text style={[ S.ft14_G900, {fontSize: 10, lineHeight: 16, marginTop: -10}]}>{colleague.name.replace(/(.{8})..+/, "$1...")}  </Text>   
                </View>
              ))
            }
          </ScrollView>

          <View style={[S.mt16, S.mt32]}>
          {
            filteredList &&
            filteredList.map((user, i) => {
              return (
                <TouchableHighlight key={i} activeOpacity={0.8} underlayColor="transparent" onPress={ () => this.onClick_FilterList(i) }>
                  <View style={styles.listItem}>
                    <View style={{ padding: 3 }}>
                      <View style={ S.avatarFrame }>
                        <Image source={user.photo} style={ S.avatar32 } resizeMode="contain" />
                      </View>
                    </View>
                    <View style={styles.userInfo_panel}>
                      <View style={{...S.rowFlex_start, justifyContent: 'center' }}>
                        <Text style={ S.ft14_G900 }>{user.name}  </Text>
                        <Text style={ S.specialist }>{ user.role }</Text>
                      </View>
                      <Text style={[S.ft10B_G500, { marginTop: 5 }]}>ID: {user.id}</Text>
                    </View>
                  </View>
                </TouchableHighlight>
              );
            })
          }
          </View>
        </Content>
      </Container>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: { backgroundColor: MS.Gray100 },
  contents: {
    padding: 20,
    paddingTop: 0, 
    width: '100%'
  },

  closeIcon: {
    fontSize: 13,
    backgroundColor: 'white',
    color: MS.Gray800,
    borderRadius: 50,
    padding: 2,

    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,  
    elevation: 5,
  },

  itemClose: {
    position: 'absolute',
    top: -7 ,
    right: -10,
    padding: 5,
    zIndex: 99, 
    backgroundColor: 'transparent'
  },

  listItem: {
    height: 50,
    width: '100%',
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  userInfo_panel: {
    marginLeft: 10,
  },
});

