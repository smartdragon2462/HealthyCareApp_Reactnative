// ***************************************************************************
//  @Created Date: 03/09/2021 
//  @Update:  03/09/2021 
//  @author:  ClerkedApp team
//  @description:   A screen for Settings
// ***************************************************************************

import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, StatusBar, Dimensions, ScrollView } from 'react-native';
import { Container, Content, Button, ListItem, Icon, Left, Body, Right, Switch } from 'native-base';
import { hideNavigationBar, showNavigationBar } from 'react-native-navigation-bar-color';
import { Calendar_svg, ArrowRight_svg, User_svg, Padlock_svg } from '../../assets/icons';
import { HeaderComp } from '../../components';
import { S } from '../../mainStyle';
import * as MS from '../../mainStyle';

export default class Preferences extends React.Component {  
  constructor(props) {
    super(props);    
    this.state = {     
    };
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onGotoPrevPage =()=> {
    const { navigate } = this.props.navigation;
    navigate('Settings');
  }   

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onClickItem =(index)=> {
    const { navigate } = this.props.navigation;
    if(index===0) navigate('MySchedule');
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    return (
      <Container style={styles.container}>
        <View style={[{marginTop:20}, S.bottomBorder]}>
          <HeaderComp leftText={"Preferences"} rightText={""} onBackpage={this.onGotoPrevPage} />
        </View>
        <StatusBar backgroundColor={MS.Gray100} barStyle="dark-content" translucent = {true}/>
        
        <Content style={[S.pd24, {paddingTop:0}]}>
          <View style={styles.item}>
            <View style={S.rowFlex_start}>
              <Calendar_svg width={16} height={16} fill={MS.Blue500}/>
              <Text style={[S.ft16S_G800, {marginLeft:24}]}>My schedule</Text>
            </View>
            <TouchableHighlight style={{ padding:3}} activeOpacity = {0.6} underlayColor = "transparent" onPress={()=>this.onClickItem(0)}>
              <ArrowRight_svg width={16} height={16} fill={MS.Gray600}/>
            </TouchableHighlight>
          </View>
          <View style={styles.item}>
            <View style={S.rowFlex_start}>
              <User_svg width={16} height={16} fill={MS.Blue500}/>
              <Text style={[S.ft16S_G800, {marginLeft:24}]}>Account</Text>
            </View>
            <TouchableHighlight style={{ padding:3}} activeOpacity = {0.6} underlayColor = "transparent" onPress={()=>this.onClickItem(1)}>
              <ArrowRight_svg width={16} height={16} fill={MS.Gray600}/>
            </TouchableHighlight>
          </View>
          <View style={styles.item}>
            <View style={S.rowFlex_start}>
              <Padlock_svg width={16} height={16} fill={MS.Blue500}/>
              <Text style={[S.ft16S_G800, {marginLeft:24}]}>{"Security & privacy"}</Text>
            </View>
            <TouchableHighlight style={{ padding:3}} activeOpacity = {0.6} underlayColor = "transparent" onPress={()=>this.onClickItem(2)}>
              <ArrowRight_svg width={16} height={16} fill={MS.Gray600}/>
            </TouchableHighlight>
          </View>
        </Content>        
      </Container>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    backgroundColor: MS.Gray100,
  },
  item:{
    ...S.rowFlex, 
    paddingVertical:16, 
    borderBottomWidth:1, 
    borderBottomColor:MS.Gray300
  }
});
