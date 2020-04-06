import React, {Component, PropTypes} from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment'
import {DateRangePicker} from 'react-dates';
class Daterange extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: [],
      startDate: null,
      endDate: null,
      focusedInput: null
    };
  }

  componentWillMount() {
    if (this.props.value) {
      if (this.props.value.startDate) {
        this.setState({
          startDate: this.controleerdatum(this.props.value.startDate)
        });
      }
      if (this.props.value.endDate) {
        this.setState({
          endDate: this.controleerdatum(this.props.value.endDate)
        });
      }
    }
  }


  controleerdatum (datum) {
    if (moment(datum, 'DD/MM/YYYY').isValid()) {
      return moment(datum, 'DD/MM/YYYY');
    }
    if (moment(datum).isValid()) {
      return moment(datum);
    }
  }
  handleSelect = (val) => {
    this.props.onChangeDate(val);

  };

  render() {
    const {label} = this.props;
    return (
        <DateRangePicker enableOutsideDays isOutsideRange={() => false} displayFormat="DD/MM/YYYY"  startDatePlaceholderText={'van'} endDatePlaceholderText={'tot'} startDate={this.state.startDate} startDateId="startDate" endDate={this.state.endDate} endDateId="endDate" onDatesChange={({startDate, endDate}) => {
            this.setState({startDate, endDate})
            if (startDate)
              startDate = startDate.toISOString()
            if (endDate)
              endDate = endDate.toISOString()
            this.handleSelect({"startDate": startDate, "endDate": endDate});
          }} focusedInput={this.state.focusedInput} onFocusChange={(focusedInput) => {
            this.setState({focusedInput})
          }}/>
    );
  }
}

export default Daterange;
