import React from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'native-base';
import moment from 'moment';
import style from './style';
import constants from './constants';

export default class CalendarDays extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDayIndex: 0,
      scrollPosition: 0,
    };
  }

  componentDidMount() {
    const { firstDate, selectedDate } = this.props;
    const first = firstDate ? moment(firstDate) : moment(new Date());
    const selected = selectedDate ? moment(selectedDate) : first;
    const selectedDayIndex = moment.duration(selected.diff(first)).asDays();

    this.setState({ selectedDayIndex, });
    setTimeout(() => { this.setScrollOffset(selectedDayIndex); }, 100);
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedDate !== this.props.selectedDate) {
      const { firstDate, selectedDate } = this.props;
      const first = firstDate ? moment(firstDate) : moment(new Date());
      const selected = selectedDate ? moment(selectedDate) : first;
      const selectedDayIndex = moment.duration(selected.diff(first)).asDays();

      this.setState({ selectedDayIndex, });
      setTimeout(() => { this.setScrollOffset(selectedDayIndex); }, 100);
    }
  }
  setScrollOffset = (index) => {
    if (this.scrollView) {
      const { width, daysInView } = this.props;

      let scrollViewWidth = constants.DAY_SIZE;
      if (width || daysInView) {
        scrollViewWidth = width || daysInView * constants.DAY_SIZE;
      }
      const xOffset = constants.DAY_SIZE * index + (constants.DAY_SIZE - scrollViewWidth) / 2 + (scrollViewWidth % constants.DAY_SIZE) / 2;
      const scrollOffset = { x: xOffset, animated: true };
      this.scrollView.scrollTo(scrollOffset);
    }
  };

  scroll = (direction) => {
    if (this.scrollView) {
      const { scrollPosition } = this.state;
      let newPosition = 0;
      if (direction === 'left') {
        newPosition = Math.max(scrollPosition - constants.DAY_SIZE, 0);
      } else {
        newPosition = scrollPosition + constants.DAY_SIZE;
      }

      this.setState({ scrollPosition: newPosition, });
      this.scrollView.scrollTo({ x: newPosition, animated: true });
    }
  };

  dateSelect = (props) => {
    const { onDateSelect } = this.props;
    this.setState({ selectedDayIndex: props.key }, this.setScrollOffset(props.key),);

    if (typeof onDateSelect === 'function') {
      onDateSelect(props.date);
    }
  };

  generateDates = (props) => {
    const date = moment(props.firstDate);
    const todayDate = props.todayDate ? props.todayDate : [];
    const first = props.firstDate ? moment(props.firstDate) : moment(new Date());
    const last = props.lastDate ? moment(props.lastDate):null;
    const numberOfDays = last ? moment.duration(last.diff(first)).asDays()+1:props.numberOfDays;

    const dates = [];
    for (let i = 0; i < numberOfDays; i += 1) {
      const isToday = todayDate.includes(date.format('YYYY-MM-DD'));
      dates.push({
        date: date.format('YYYY-MM-DD'),
        day: date.format('D'),
        day_of_week: date.format('dd').substring(0,1),
        isToday: isToday
      });
      date.add(1, 'days');
    }
    return dates;
  };

  render() {
    let days;
    const { selectedDayIndex } = this.state;
    const { firstDate, lastDate, todayDate, numberOfDays, width } = this.props;
    let scrollWidth = null;

    if (width) {
      scrollWidth = width;
    }

    const daysProps = { firstDate, lastDate, todayDate, numberOfDays: numberOfDays || 30, };
    const availableDates = this.generateDates(daysProps);

    if (availableDates) {
      days = availableDates.map((val, key) => {
        const selectesItemStyle = selectedDayIndex === key ? style.singleContainerSelected : null;
        const selectesItemDayStyle = selectedDayIndex === key ? style.dayTextSelected : null;

        return (
          <TouchableOpacity
            key={key}
            onPress={() => this.dateSelect({ key, date: availableDates[key].date })}
            style={{ backgroundColor: 'transparent'}}
          >
            <View style={[style.singleContainer]}>
              <Text style={[style.dayText, {marginLeft:-5}]}>{val.day_of_week}</Text>
              <View style={[style.singleDateBox]}>
                <View style={[{backgroundColor:"transparent",borderRadius:50, width:32, height:32,justifyContent:"center"},selectesItemStyle]}>
                  {
                    <Text style={[style.dateText, val.isToday && {fontFamily:"Proxima-Nova-Bold", color:"#0066FF"}, selectesItemDayStyle ]}>{val.day}</Text>
                    // <Icon name="dot-single" type="Entypo" style={[style.currentDateDot, val.isToday && {}]} />
                  }
                  {/* <Text style={[style.dateText, selectesItemDayStyle]}>{val.day}</Text> */}
                </View>
                {/* {
                  val.isToday &&
                  <Icon name="dot-single" type="Entypo" style={style.currentDateDot} />
                } */}
              </View>
            </View>
          </TouchableOpacity>
        );
      });
    }

    return (
      <View style={{ height: 70, width: scrollWidth, flexDirection: 'row' }}>
        <ScrollView
          ref={(scrollView) => { this.scrollView = scrollView; }}
          scrollEnabled={true}
          horizontal
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
        >
          {days || null}
        </ScrollView>
      </View>
    );
  }
}
