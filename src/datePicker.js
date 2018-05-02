import 'react-dates/initialize';
import { DateRangePicker} from 'react-dates';
import moment from 'moment';
import React, { Component } from 'react';
import 'react-dates/lib/css/_datepicker.css';



export default class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment().subtract(7, 'days'),
      endDate: moment()
    };
  };

  render() {
    return (
        <DateRangePicker
          startDate={this.state.startDate} 
          startDateId="your_unique_start_date_id" 
          endDate={this.state.endDate} 
          endDateId="your_unique_end_date_id" 
          onDatesChange={({ startDate, endDate }) => { 
            if(startDate && endDate) {
              this.props.dateChanged(startDate, endDate);
              this.setState({ startDate, endDate })}
            }
          }
          focusedInput={this.state.focusedInput} 
          onFocusChange={focusedInput => this.setState({ focusedInput })} 
          isOutsideRange={(d) => d.isAfter(moment())}
          noBorder={true}
          showDefaultInputIcon={true}
        />
    );
  };
};
