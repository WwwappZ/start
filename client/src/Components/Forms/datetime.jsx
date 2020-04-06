import React, {Component, PropTypes} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'moment/locale/nl'
import 'react-datepicker/dist/react-datepicker.css';
class Datetime extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: moment(),
      date: moment()
    };
  }
  componentDidMount() {
    moment.locale('Nl')
    if(this.props.input.value) {
      const date = new moment(this.props.input.value);
      this.setState({date})
  }
  }

  handleSelect = (val) => {
      const value = new moment(val).toDate();
    this.setState({value});
      this.setState({date: val});
    this.props.input.onChange(value);
  };

  render() {
    const {label,input, error, warning, touched} = this.props;
    return (<div>
      <label>{label}</label>
      <div>
        <DatePicker
        selected={this.state.date}
        onChange={this.handleSelect}
        showTimeSelect
         minDate={moment()}
        timeFormat="HH:mm"
        className="form-control"
        injectTimes={[
          moment().hours(0).minutes(1),
          moment().hours(12).minutes(5),
          moment().hours(23).minutes(59)
        ]}
        dateFormat="LLL"/> {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  )
}
}

export default Datetime;
