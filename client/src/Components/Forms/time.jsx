import React, { Component } from "react";
import TimeInput from "react-time-input";
import moment from "moment";
class timeSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  componentDidMount() {
    if (this.props.input.value) {
      const value = new moment(this.props.input.value, "HH:mm:ss").format(
        "HH:mm"
      );
      this.setState({ value });
    }
  }

  handleSelect = value => {
    this.setState({ value });
    this.props.input.onChange(new moment(value, "HH:mm").format("HH:mm"));
  };
  render() {
    const { label, error, touched, warning } = this.props;
    return (
      <div>
        <label>{label}</label>
        <div>
          <TimeInput
          className='form-control'
            initTime={this.state.value}
            onTimeChange={this.handleSelect}
          />
          {touched &&
            ((error && <span className="text-danger">{error}</span>) ||
              (warning && <span>{warning}</span>))}
        </div>
      </div>
    );
  }
}

export default timeSelect;
