import React, {Component} from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment'
import {SingleDatePicker} from 'react-dates';
class dateSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: moment(),
      date: null
    };
  }
  componentWillMount() {   
    if(this.props.input.value) {
      const date = new moment(this.props.input.value).utc();
      this.setState({date})
  }
  }

  handleSelect = (val) => {   
      const value = new moment(val, 'DD/MM/YYYY')
    this.setState({value});
    this.props.input.onChange(value);
  };

  render() {
    const {label,  error, touched, warning} = this.props  
    return (<div>
      <label>{label}</label>
      <div>
      <SingleDatePicker isOutsideRange = {() => false}  displayFormat={() => "DD/MM/YYYY"}  date={this.state.date} placeholder="Kies een datum" onDateChange={date => {
        console.log(date);
        
        this.setState({date})
        this.handleSelect(date);
      }} focused={this.state.focused} onFocusChange={({focused}) => this.setState({focused})}/> {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>);

}
}

export default dateSelect;
