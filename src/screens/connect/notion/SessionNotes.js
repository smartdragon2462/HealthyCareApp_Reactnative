// ***************************************************************************
//  @Date:    2/20/2021: 
//  @Update:  2/20/2021
//  @author:  ClerkedApp team: 
//  @description:   A page to show a detailed Session notes . 
// ***************************************************************************

import React from 'react';
import { StyleSheet, View, Text, StatusBar, TouchableHighlight, Dimensions, Animated } from 'react-native';
import { Container, Content,Icon } from 'native-base';
import { hideNavigationBar, showNavigationBar } from 'react-native-navigation-bar-color';
import { HeaderComp, SearchComp, ProblemListItem } from '../../../components';
import { Doc_img1, Doc_img2, Doc_img3, Doc_img4, Doc_img5 } from '../../../assets/images';
import { S } from '../../../mainStyle';
   
const sessionData =[
  {user_type:"caregive", title:"Dr. Sandra Barkley", type:"Ophtalmology", picture:Doc_img1, createdDate:"17 Dec 2020", isFlagged:true },
  {user_type:"caregive", title:"Dr. John Doe", type:"Cardiology", picture:Doc_img2, createdDate:"17 Dec 2020 9:15", isFlagged:true },
  {user_type:"caregive", title:"Dr. Roger Barkley", type:"Dermatology", picture:Doc_img3, createdDate:"17 Dec 2020 18:45", isFlagged:false },
  {user_type:"caregive", title:"Dr. Sandra Barkley", type:"Ophtalmology", picture:Doc_img4, createdDate:"17 Dec 2020 18:45", isFlagged:false },
  {user_type:"caregive", title:"Dr. Sandra Barkley", type:"Ophtalmology", picture:Doc_img5, createdDate:"17 Dec 2020 15:15", isFlagged:false },
]
 
export default class SessionNotes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isHeaderBorder:false,
      searchTxt: '',
    };
  }

  ///////////////////////////////////////////////////////////////////////
  componentDidMount() {
    // hideNavigationBar();
  }

  ///////////////////////////////////////////////////////////////////////
  onBackpage =()=> {
    const { navigate } = this.props.navigation;
    navigate('PatientProfile');
  }

  ///////////////////////////////////////////////////////////////////////
   onChangeText =( val )=>{
    this.setState({ searchTxt: val });
  }

  ///////////////////////////////////////////////////////////////////////
  onScroll = (ev) => {
    const { isHeaderBorder } = this.state;
    if (!isHeaderBorder && ev.contentOffset.y > 8) this.setState({ isHeaderBorder: true });
    else if (isHeaderBorder && ev.contentOffset.y < 8) this.setState({ isHeaderBorder: false });
  }

  ///////////////////////////////////////////////////////////////////////
  onClickSessionItem = (ev) => {
    const { navigate } = this.props.navigation;
    navigate('SessionNotesDetail');
  }
  

  ///////////////////////////////////////////////////////////////////////
  render() {
    const { searchTxt, isHeaderBorder } = this.state;

    return (
      <Container style={styles.container}>
        <View style={{ backgroundColor: 'transparent', paddingTop: 20 }}>
          <HeaderComp
            active={true} 
            isBorder={isHeaderBorder}
            leftText={"Session notes"} rightText={""}
            onSave={() => console.log("")}
            onBackpage={this.onBackpage}
          >
            <Icon type="Entypo" name='dots-three-horizontal' style={{ fontSize: 20, color: '#1A2C47' }} />
          </HeaderComp>
        </View>

        <Content
          style={styles.contents}
          showsVerticalScrollIndicator={false}
          onScroll={({ nativeEvent }) => this.onScroll(nativeEvent)}
        >
          <StatusBar backgroundColor='#FAFAFB' barStyle="dark-content" />
          <View style={{marginVertical:8}}>
            <SearchComp
              onChangeText = {(ev)=>this.onChangeText(ev)}
              searchTxt = {searchTxt}
              placeholder = {"Type to search..."}
              type = {2}
            />
          </View>

          <View style={{ marginTop: 8, marginBottom: 24 }}>
          {
            sessionData &&
            sessionData.map((item, i)=>(
              <TouchableHighlight 
                key={i}
                activeOpacity={0.6}
                underlayColor="transparent"
                onPress={() => this.onClickSessionItem()}
              >
                <ProblemListItem itemData = {item} />
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
  container: {
    backgroundColor: '#FAFAFB',
  },
  contents: {
    padding: 24,
    paddingTop: 8,
    width: '100%',
    backgroundColor: '#FAFAFB',
  }
})
