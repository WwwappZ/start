import React, {Component} from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment'
import {DateRangePicker} from 'react-dates';
class renderDaterange extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: [],
      startDate: null,
      endDate: null,
      focusedInput: null
    };
  }

  componentDidMount() {
    if (this.props.input.value) {
      if (this.props.input.value.startdate) {
        this.setState({
          startDate: this.controleerdatum(this.props.input.value.startdate)
        });
      }
      if (this.props.input.value.enddate) {
        this.setState({
          endDate: this.controleerdatum(this.props.input.value.enddate)
        });
      }
    }
  }

  controleerdatum(datum) {
    if (moment(datum, 'DD/MM/YYYY').isValid()) {
      return moment(datum, 'DD/MM/YYYY');
    }
    if (moment(datum).isValid()) {
      return moment(datum);
    }
  }
  handleSelect = (val) => {
    if (this.props.input.value.days) {
      var value = this.props.input.value;
    } else {
      value = {};
    }
    value.startdate = val.startDate;
    value.enddate = val.endDate;
    this.setState({value});
    this.props.input.onChange(value);
  };

  render() {
    const {label} = this.props;
    return (<div>
      <label>{label}</label>
      <div>
        <DateRangePicker enableOutsideDays isOutsideRange={() => false} displayFormat="DD/MM/YYYY" startDatePlaceholderText={'van'} endDatePlaceholderText={'tot'} startDate={this.state.startDate} startDateId="startDate" endDate={this.state.endDate} endDateId="endDate" onDatesChange={({startDate, endDate}) => {
            this.setState({startDate, endDate})
            if (startDate)
              startDate = startDate.toISOString()
            if (endDate)
              endDate = endDate.toISOString()
            this.handleSelect({"startDate": startDate, "endDate": endDate});
          }} focusedInput={this.state.focusedInput} onFocusChange={(focusedInput) => {
            this.setState({focusedInput})
          }}/>
      </div>
    </div>);
  }
}

export default renderDaterange;
