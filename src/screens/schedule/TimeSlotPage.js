// ***************************************************************************
//  @Created Date:    12/25/2020 
//  @Update:  03/04/2021
//  @author:  ClerkedApp team
//  @description:   A screen to display time slots
// ***************************************************************************

import React from 'react';
import { StyleSheet, Text, View,TouchableHighlight,StatusBar } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import moment from 'moment';
import { CalendarDays, ScheduleProgressbar, CalendarModal, OptionModal } from '../../components';
import { convertHourDigit } from '../../utils/helper';
import { Calendar_svg } from '../../assets/icons';
import {S} from '../../mainStyle';
import * as MS from '../../mainStyle';

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


export default class TimeSlotPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      progressBarIndex: -1,
      selectedSlotIndex: null,
      optionIndex: null,
      
      headerDate: "",
      selectedDate: null,
      dateObj: null,
      scheduleDict: null,
      scheduleList: null,
      options: null,
      
      isShrink: false,
      optionModalOpen: false,
      calendarModalOpen: false,
    };
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    const { navigation } = this.props;
    const selectedDate = navigation.getParam('selectedDate');    

    if( selectedDate ) this.setState({selectedDate: moment(selectedDate, 'DD MMMM YYYY').format('YYYY-MM-DD')});
    else this.setState({selectedDate: moment().format("YYYY-MM-DD")});

    this.setState({ 
      headerDate: moment().format("DD MMM YYYY"),
      dateObj: {
        today: moment().format("YYYY-MM-DD"),
        startOfMonth: moment().startOf('month').format('YYYY-MM-DD'),
        endOfMonth: moment().endOf('month').format('YYYY-MM-DD'),
        days: moment().daysInMonth(),
      }});  

    this.handleArrangeData(scheduleData);
    this.handleScheduleList();
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  handlePress = (index) => {
    this.onBackOptionModal();
    setTimeout(() => {
      this.setState({ optionIndex: index }, ()=>this.handleConfirm());
    },600);
  };
  
  ////////////////////////////////////////////////////////////////////////////////
  onClickProgressBarItem= (index, selectedSlotIndex) =>{
    const { scheduleDict} = this.state;
    const components=[];
    for(let i = 0; i < scheduleDict[index].availSlots.length; i++) 
      components.push(scheduleDict[index].availSlots[i]);

    const options = { title: "Please select an appointment type", component:components}
    this.setState({options:options, progressBarIndex: index, selectedSlotIndex:selectedSlotIndex, optionModalOpen: true });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onChangeDate = date => {
    this.setState({ 
      selectedDate: date, 
      headerDate: moment(date).format("DD MMM YYYY") 
    });
  };

  ///////////////////////////////////////////////////////////////////////
  handleConfirm =()=>{
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;
    const { selectedDate, scheduleDict, optionIndex, progressBarIndex } = this.state;
    const handleDatetime = navigation.getParam('handleDatetime');    
   
    handleDatetime( moment(selectedDate).format('DD MMMM YYYY'), scheduleDict[progressBarIndex].availSlots[optionIndex] );
    navigate(navigation.getParam('prevPage'));
  }
    
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onUpdateSelectDate = ( date ) =>{
    let dateString = date.dateString;
    this.setState({ 
      headerDate: moment(dateString).format("DD MMM YYYY"),
      selectedDate: dateString,
      calendarModalOpen: false,
      dateObj: {
        today: moment().format("YYYY-MM-DD"),
        startOfMonth: moment(dateString).startOf('month').format('YYYY-MM-DD'),
        endOfMonth: moment(dateString).endOf('month').format('YYYY-MM-DD'),
        days: moment(dateString, "YYYY-MM").daysInMonth(),
      }});
  }
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  handleScroll =(ev)=> {
    const { isShrink } = this.state;
    if( !isShrink && ev.nativeEvent.contentOffset.y > 8) this.setState({isShrink: true});
    else if ( isShrink && ev.nativeEvent.contentOffset.y <= 8) this.setState({isShrink: false})
  }

  ///////////////////////////////////////////////////////////////////////
  onGotoPrevPage =()=> {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    navigate(navigation.getParam('prevPage'));
  }

  ///////////////////////////////////////////////////////////////////////
  onBackOptionModal =()=> {
    this.setState({optionModalOpen: false});
  }

  //////////////////////////////////////////////////////////////////////////////
  getOrderListInHour =(hour, scheduleData)=>{
    let n = 0, orderList = [], isPending = false;

    while( true ) {      
      if( n >= scheduleData.length) break;
      let start_hour = parseInt(scheduleData[n].startTime.substring(0,2));

      if( hour === start_hour) 
      {
        if( scheduleData[n].status === "pending" ) isPending = true;
        orderList.push( scheduleData[n] );
      } 
      n += 1;
    }

    return {orderList: orderList, isPending: isPending }
  }

  ////////////////////////////////////////////////////////////////////////////////
  handleArrangeData =(scheduleData)=>{
    const { navigation } = this.props;
    const duration = navigation.getParam('duration');  

    if (scheduleData === null) return;

    let scheduleDict = [];
    //--------------------------------------------------
    for(let i = 0; i <= 24; i ++ ){ 
      let filteredData = this.getOrderListInHour(i, scheduleData)   
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
    const { navigation } = this.props;
    const timeRange = navigation.getParam('timeRange');  

    let scheduleList = [];
    const scheduleDict = this.state.scheduleDict? this.state.scheduleDict: [];
    
    if( timeRange !== null && timeRange !== undefined ) {
      for(let i = 0; i< scheduleDict.length; i++){
        let elementList = scheduleDict[i].availSlots;
        let index = elementList.indexOf(timeRange);

        if( index !== null && index !== undefined && index !==-1 ){
          scheduleList.push(
            <View style={[styles.scheduleItem]} key={i}>
              <Text style={ styles.scheduleHour }>{convertHourDigit(i)+ ":00"}</Text>
              <ScheduleProgressbar 
                status={elementList[index]} 
                percent={ 100} 
                onClickItem={this.onClickProgressBarItem} 
                index = {i}
                selOptionIndex={index}
              />
            </View>
          );
        }else{
          scheduleList.push(
            <View style={[styles.scheduleItem]} key={i}>
              <Text style={ styles.scheduleHour }>{convertHourDigit(i)+ ":00"}</Text>
              <ScheduleProgressbar 
                status={ scheduleDict[i].status } 
                percent={ scheduleDict[i].percent } 
                onClickItem ={ this.onClickProgressBarItem } 
                index={i}
              />
            </View>
          )
        }
      }    
    }else{
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
    }      
    this.setState({scheduleList:  scheduleList});
  }

  ///////////////////////////////////////////////////////////////////////
  render(){
    const { 
      selectedSlotIndex, options, dateObj, scheduleList,  headerDate, selectedDate, 
      calendarModalOpen, optionModalOpen,  isShrink } = this.state;

    return (
      <Container style={styles.container}>
        <StatusBar backgroundColor= {MS.Gray100} barStyle="dark-content" translucent = {true}/>  
        
        <View style={[ isShrink && S.bottomBorder ]}>          
          <View style={[S.rowFlex, S.pt32, {paddingHorizontal: 24}]}>
            <TouchableHighlight style={{flex:1}} 
              activeOpacity={0.8} underlayColor={'transparent'} 
              onPress={() => this.onGotoPrevPage()}
            >
              <Icon name='chevron-back-outline' style={{fontSize: 26, color:MS.Gray900}} />
            </TouchableHighlight>
            <View style={{ flex:1, alignItems:'center' }}>
              <Text style={ S.ft14B_G800 }>{"Schedule"}</Text>
            </View>
            <TouchableHighlight style={{flex:1, alignItems:'flex-end'}} 
              activeOpacity={0.6} underlayColor = 'transparent' 
              onPress={()=> this.setState({calendarModalOpen: true})}
            >
              <View style={ S.rowFlex_start }>
                <Text style={ S.ft12S_G800 }>{headerDate}  </Text>
                <Calendar_svg width={16} height={16} fill={MS.Blue500}/>
              </View>
            </TouchableHighlight>            
          </View>
        
            <View>
              {dateObj !== null &&
                <CalendarDays
                  firstDate={dateObj.startOfMonth}
                  lastDate={dateObj.endOfMonth}
                  numberOfDays={dateObj.days}
                  selectedDate={selectedDate}
                  todayDate={dateObj.today}
                  daysInView={6}
                  onDateSelect={date => this.onChangeDate(date)}
                />
              }
            </View>
        </View>

        <Content style={styles.contents} onScroll={(ev) =>this.handleScroll(ev) }>
          <View style={{marginBottom:24}}> 
            { 
              scheduleList
            } 
          </View>
          {
            options &&
              <OptionModal 
                option={options} 
                selectedIndex={selectedSlotIndex} 
                visible={optionModalOpen} 
                onSelectItem={this.handlePress} 
                onBack = {this.onBackOptionModal}
                visibleH = {165}
              />
          }
        </Content>
        <CalendarModal 
          selectedDate={selectedDate} 
          visible={calendarModalOpen} 
          onDayLongPress={this.onUpdateSelectDate} 
        />
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
    padding: 20,
    paddingTop: 10
  }
});
