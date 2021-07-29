// ***************************************************************************
//  @Created Date:  03/08/2021
//  @Update:  03/08/2021
//  @author:  ClerkedApp team
//  @description:   A screen to display reschedule
// ***************************************************************************

import React from 'react';
import { StyleSheet, Text, View, StatusBar,TouchableHighlight } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import moment from 'moment';
import ScheduleProgressbar from '../components/ScheduleProgressbar';
import OptionModal from '../components/OptionModal';
import CalendarModal from '../components/CalendarModal';
import DurationComp from '../components/DurationComp';
import { convertHourDigit } from '../utils/helper';
import { Calendar_svg } from '../assets/icons';
import {S} from '../mainStyle';
import * as MS from '../mainStyle';

let scheduleData = [
  { startTime: '10:15', endTime: '10:30', status: 'confirmed'},
  { startTime: '11:00', endTime: '11:15', status: 'pending'},
  { startTime: '13:00', endTime: '13:15', status: 'confirmed'},
  { startTime: '13:15', endTime: '13:30', status: 'confirmed'},
  { startTime: '14:00', endTime: '14:15', status: 'confirmed'},
  { startTime: '14:15', endTime: '14:30', status: 'confirmed'},
  { startTime: '14:30', endTime: '14:45', status: 'confirmed'},
  { startTime: '14:45', endTime: '15:00', status: 'confirmed'},
]

const durations = [5, 10, 15, 30, 45, 60];

export default class Reschedule extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      progressBarIndex: -1,
      optionIndex: null,
      durationIndex: 0,
      
      headerDate: "",
      selectedDate: null,
      scheduleDict: null,
      scheduleList: null,
      options: null,

      optionModalOpen: false,
      calendarModalOpen: false,
    };
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    const { selectedDate } = this.props;
    let headerDate = moment().format("DD MMM YYYY");

    if( selectedDate ) {
      this.setState({selectedDate: moment(selectedDate, 'DD MMMM YYYY').format('YYYY-MM-DD')});
      headerDate = moment(selectedDate, 'DD MMMM YYYY').format('DD MMM YYYY');
    }
    else this.setState({selectedDate: moment().format("YYYY-MM-DD")});
    
    this.setState({ duration: durations[0], headerDate: headerDate}, ()=> this.handleArrangeData(scheduleData));  
    this.handleScheduleList();
  }

  ///////////////////////////////////////////////////////////////////////
  onGotoPrevPage =()=> {
    this.props.onHide();
  }
  
  ///////////////////////////////////////////////////////////////////////
  onBackOptionModal =()=> {
    this.setState({optionModalOpen: false});
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  handlePress = (index) => {
    this.onBackOptionModal();
    setTimeout(() => {
      this.setState({ optionIndex: index }, ()=>this.handleConfirm());
   },600);
  };
  
  ////////////////////////////////////////////////////////////////////////////////
  onClickProgressBarItem = (index, selOptionIndex) =>{
    const { scheduleDict} = this.state;
    const components=[];
    for(let i = 0; i < scheduleDict[index].availSlots.length; i++) 
      components.push(scheduleDict[index].availSlots[i]);

    const options = { title: "Please select an appointment type", component:components}
    this.setState({options:options, progressBarIndex: index, optionModalOpen: true });
  }
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onUpdateSelectDate = ( date ) =>{
    let dateStr = date.dateString;
    this.setState({ 
      headerDate: moment(dateStr).format("DD MMM YYYY"),
      selectedDate: dateStr,
      calendarModalOpen: false
    });
  }
  
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onSelectDuration =(index)=> {
    this.setState({durationIndex: index, duration:durations[index]}, ()=>this.handleArrangeData(scheduleData));
  }
  
  ///////////////////////////////////////////////////////////////////////
  handleConfirm =()=>{
    const { selectedDate, scheduleDict, optionIndex, progressBarIndex } = this.state;
    this.props.handleDatetime( moment(selectedDate).format('DD MMMM YYYY'), scheduleDict[progressBarIndex].availSlots[optionIndex] );
    this.props.onHide();
  }

  //////////////////////////////////////////////////////////////////////////////
  getOrderlistInHour =(hour, scheduleData)=>{
    let n = 0, orderList = [], isPending = false;

    while( true ) {      
      if( n >= scheduleData.length) break;
      let start_hour = parseInt(scheduleData[n].startTime.substring(0,2));

      if( hour === start_hour){
        if( scheduleData[n].status === "pending" ) isPending = true;
        orderList.push( scheduleData[n] );
      } 
      n += 1;
    }

    return {orderList: orderList, isPending: isPending }
  }

  ////////////////////////////////////////////////////////////////////////////////
  handleArrangeData =(scheduleData)=>{
    const { duration } =this.state;

    if (scheduleData === null) return;
    let scheduleDict = [];
    
    //--------------------------------------------------
    for(let i = 0; i <= 24; i ++ ){ 
      let filteredData = this.getOrderlistInHour(i, scheduleData)   
      let orderList = filteredData.orderList;

      let availSlots = [];  
      if( orderList.length > 0){                      
        let minuteArray = new Array(61).fill(0);

        //=================================================================================
        for(let n = 0; n < orderList.length; n++) {
          let s_minutes = parseInt(orderList[n].startTime.substring(3));   
          let l_minutes = parseInt(orderList[n].endTime.substring(3));   

          if (l_minutes === 0) l_minutes = 60;
          for(let m = s_minutes; m < l_minutes; m++) minuteArray[m] = 1;
        }

        //=================================================================================
        let k = 0;
        while(k <= 60){
          const k2 = k + duration;          
          if (minuteArray[k] === 0 && k2 <= 60){    
            let count = 0;
            for(let m = k; m < k2; m++) {
              if(minuteArray[k] === 0) count += 1;
            }

            if(count > 2) {
              if( k2 === 60 ) availSlots.push(convertHourDigit(i)+":" + convertHourDigit(k) + " - " +  convertHourDigit(i+1) +":"+ convertHourDigit(0));
              else availSlots.push(convertHourDigit(i)+":" + convertHourDigit(k) + " - " +  convertHourDigit(i) +":"+ convertHourDigit(k2));
              k += duration;
            }
          }else  k += 1;
        }

        if(filteredData.isPending) scheduleDict.push({status: "Pending confirmation", orderList:orderList, percent:100, availSlots:[] });
        else scheduleDict.push({status: availSlots.length>0? "Available": "Booked", orderList:orderList, percent: Math.floor(100-availSlots.length * duration*100/ 60) , availSlots:availSlots});
      }
      else
      {
        let n = Math.floor(60/duration);
        for(let k = 0; k < n; k++){
          const k1 = k*duration, k2 = (k+1)*duration;
          if (k2 === 60 ) availSlots.push( convertHourDigit(i)+":"+convertHourDigit(k1)+ " - " +convertHourDigit(i+1)+":"+convertHourDigit(0) );
          else availSlots.push( convertHourDigit(i)+":"+convertHourDigit(k1)+ " - " + convertHourDigit(i)+":"+convertHourDigit(k2) );
        }
        scheduleDict.push({status:"Available", orderList:[], percent: 0, availSlots:availSlots});
      }
    }
    this.setState({scheduleDict: scheduleDict}, () =>{ this.handleScheduleList(); });
  }

  ////////////////////////////////////////////////////////////////////////////////
  handleScheduleList =()=> {
    let scheduleList = [];
    const scheduleDict = this.state.scheduleDict? this.state.scheduleDict: [];
    
    for(let i = 0; i< scheduleDict.length; i++){
      scheduleList.push(
        <View style={ styles.scheduleItem } key={i}>
          <Text style={ styles.scheduleHour }>{convertHourDigit(i)+ ":00"}</Text>
          <ScheduleProgressbar 
            status={ scheduleDict[i].status } 
            percent={ scheduleDict[i].percent } 
            onClickItem ={ this.onClickProgressBarItem } 
            index = {i}
          />
        </View>
      )
    }
    this.setState({scheduleList:  scheduleList});
  }

  ///////////////////////////////////////////////////////////////////////
  render(){
    const { options, headerDate, scheduleList, selectedDate, durationIndex, optionModalOpen, calendarModalOpen } = this.state;

    return (
      <Container style={styles.container}>        
        <View style={{backgroundColor:MS.Gray100}}>
          <View style={{...S.rowFlex, paddingHorizontal: 24, paddingTop:36 }}>
            
            <TouchableHighlight 
              style={{flex:1}} 
              activeOpacity={0.8} underlayColor={'transparent'} 
              onPress={() => this.props.onHide()}
            >
              <Icon name='chevron-back-outline' style={{fontSize: 26, color:MS.Gray900}} />
            </TouchableHighlight>
            
            <View style={{flex:1, alignItems:'center'}}>
              <Text style={{...S.ft14B_G800}}>Reschedule</Text>
            </View>

            <TouchableHighlight 
              style={{flex:1, alignItems:'flex-end', paddingVertical:5}} 
              activeOpacity={0.6} underlayColor = 'transparent' 
              onPress={()=> this.setState({calendarModalOpen: true})}
            >
              <View style={S.rowFlex_start}>
                <Text style={S.ft12S_G800}>{headerDate}  </Text>
                <Calendar_svg width={16} height={16} fill={MS.Blue500}/>
              </View>
            </TouchableHighlight>

          </View>
        </View>

        {/* <StatusBar backgroundColor='transparent' barStyle="dark-content" translucent = {true}/>   */}
        <View style={styles.durationPanel}>
          <Text style = { S.ft14_G700 } >{ "Appointment duration" }</Text>
          <DurationComp onSelectDuration = { this.onSelectDuration } index = {durationIndex}/>
        </View>
        
        <Content style={styles.contents} >
          <View style={{marginBottom:24}}>
            { scheduleList}
          </View>
          {
            options &&
              <OptionModal 
                option={options} 
                visible={optionModalOpen} 
                onSelectItem={this.handlePress} 
                onBack = {this.onBackOptionModal}
              />
            }
        </Content>
        <CalendarModal selectedDate={selectedDate} visible={calendarModalOpen} onDayLongPress={this.onUpdateSelectDate} />
      </Container>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    backgroundColor: MS.Gray100
  },

  scheduleItem: {
    paddingRight: 5,
    display: 'flex',
    flexDirection: 'row',
  },

  scheduleHour: {
    ...S.ft14_G800,
    width: 60,
    paddingTop: 24,
  },

  contents: {
    padding: 24,
    paddingTop: 12,
  },

  durationPanel:{ 
    ...S.bottomBorder, 
    marginTop:16, 
    paddingBottom:8, 
    marginHorizontal:24 
  }
});
