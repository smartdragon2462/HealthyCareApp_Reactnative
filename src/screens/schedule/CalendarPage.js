import React from 'react';
import { StyleSheet, StatusBar, View, Text } from 'react-native';
import { Container, Content } from 'native-base';
import { Calendar } from '../../components/Calendars';
import BlueHeader from '../../components/BlueHeader';
import moment from 'moment';
import { S } from '../../mainStyle';

export default class CalendarPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      selectedDate: null,
      startOfMonth: null,
      endOfMonth: null,
      selectedString: "",
      eventDate: null,
      days: 0,
      today: moment().format("YYYY-MM-DD"),
      markedDates: {}
    };
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  setMarkedDates=(date)=>{
    var temp = {};
    temp[date] = {
      customStyles: {
        container: { backgroundColor:'#0066FF', borderRadius:8, elevation:2 },
        text: { color: 'white' }
      }
    }
    return temp;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onDayLongPress = (ev) => {    
    this.setState({ eventDate: ev.dateString, markedDates: this.setMarkedDates(ev.dateString) });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onclickConfirm = () =>{
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;
    const onUpdateDate = navigation.getParam('onUpdateDate');   
    const prevPage = navigation.getParam('prevPage');  

    if(!this.state.eventDate) 
    {navigate(prevPage); return;}
    
    onUpdateDate (true, this.state.eventDate);
    navigate(prevPage);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onclickCancel = () =>{
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;
    const prevPage = navigation.getParam('prevPage');  
    navigate(prevPage);
  }
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  componentDidMount() {
    const { navigation } = this.props;
    const selectedDate = navigation.getParam('selectedDate');    
    const today = moment().format("YYYY-MM-DD");

    this.setState({ today: today , eventDate:today, markedDates: this.setMarkedDates(selectedDate) });
  }


  ///////////////////////////////////////////////////////////////////////
  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container style={styles.container}>        
        <BlueHeader headerTitle={"Calendar"} onclickConfirm = {this.onclickConfirm} onclickCancel = {this.onclickCancel}>
          <Text style={S.ft12B_W}>{"Continue"}</Text>
        </BlueHeader>

        <View>
          <StatusBar backgroundColor='transparent'  />
        </View>

        <Content style={styles.contents}>
          {
            <Calendar
              style={styles.calendar}
              onDayPress={this.onDayLongPress}
              hideExtraDays
              current={this.state.today}
              minDate={this.state.today}
              markingType={'custom'}
              enableSwipeMonths={true}
              markedDates={ this.state.markedDates }
            />
          }
        </Content>
      </Container>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  calendar: {
    marginBottom: 10
  },

  contents: {
    padding: 20,
    width: '100%',
  },
});
