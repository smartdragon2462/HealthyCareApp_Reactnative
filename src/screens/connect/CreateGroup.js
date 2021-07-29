import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight,ScrollView, StatusBar } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import HeaderComp from '../../components/HeaderComp';
import InputBox from '../../components/InputBox';
import { S } from '../../mainStyle';

export default class CreateGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,

      searchTxt: '',
      selectedPatient: null,
      selectedCareteam: null,
      groupnameTxt: "",
      groupnameError: "",
    };
  }

  ///////////////////////////////////////////////////////////////////////
  componentDidMount =()=> {
    const { navigation } = this.props;
    const selectedCareteam = navigation.getParam('selectedCareteam');    
    const selectedPatient = navigation.getParam('selectedPatient');    
    this.setState({selectedPatient: selectedPatient, selectedCareteam: selectedCareteam });
  }

  ///////////////////////////////////////////////////////////////////////
  onGroupNameChange =(name, val)=> {
    this.setState({groupnameTxt: val})
  }

  ///////////////////////////////////////////////////////////////////////
  onBackpage =()=> {
    const { navigate } = this.props.navigation;
    navigate('Contact');
  }

  
  ///////////////////////////////////////////////////////////////////////
  render() {
    const {  selectedPatient, selectedCareteam, groupnameTxt, groupnameError } = this.state;
    
    return (
      <Container style={styles.container}>
        <View style={{paddingTop: 16}}>
          <HeaderComp 
            leftText={""} 
            rightText={ "" } 
            onBackpage={this.onBackpage}
            background = "#FAFAFB"
          />
        </View>

        <Content style={styles.contents}>        
          <Text style={[S.ft16_G900, {marginTop: 0}]}>Give your group a name</Text>
          
          <View style={{marginTop: 24}}>
            <InputBox 
              name = "groupName"
              labelText = {"Group name"}
              placeholder = {"Group name"}
              helperText =  { groupnameError }
              value = { groupnameTxt }
              KeyboardType = {null}
              onChange = {(name, val)=>this.onGroupNameChange(name, val)}
            />
          </View>

          <View>
            {/* display a selected user =============================== */}
            <StatusBar backgroundColor='transparent' barStyle = {"dark-content"}/>
            <ScrollView horizontal>
              {              
                selectedCareteam &&
                selectedCareteam.map((data, i) => (
                  <View style={{ paddingVertical: 10, width: 60, alignItems:'center' }} key={i}>
                    <Image source={data.photo} style={{ ...S.avatar32, marginLeft:-10, marginBottom:4 }} resizeMode="contain" />
                    <Text style={ S.ft10_G900 }>{data.name.replace(/(.{8})..+/, "$1...")}  </Text> 
                  </View>
                ))
              }              
              {
                selectedPatient &&
                selectedPatient.map((data, i) => (
                  <View style={{ paddingVertical: 10, width: 60, alignItems:'center' }} key={i}>
                    <Image source={data.photo} style={{ ...S.avatar32, marginLeft: -10, marginBottom:4 }} resizeMode="contain" />
                    <Text style={ S.ft10_G900 }>{data.name.replace(/(.{8})..+/, "$1...")}  </Text> 
                  </View>
                ))
              }
            </ScrollView>          
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
    padding: 20,
    paddingTop: 0,
    width: '100%'
  },
  header: {
    height: 50,
    padding: 20, 
    paddingTop: 10, 
    paddingBottom: 5 , 
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent:'space-between'
  },
  photo: {
    width: 50,
    height: 50
  }
});

