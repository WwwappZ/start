import React, { Component } from "react";
import InputMask from "react-input-mask";
class timeSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value: '',
        mask: '9999-9999-9999-9999'
    };
  }

  componentDidMount() {
    if (this.props.input.value) {
      this.setState({value: this.props.input.value});
    }
  }

  onChange = (event) => {
    var value = event.target.value;
    var newState = {
      mask: this.props.mask,
      value: value
    };
    if (/^3[47]/.test(value)) {
      newState.mask = this.props.mask;
    }
    this.setState(newState);
    this.props.input.onChange(value);
  }
  render() {
    const { label, error, touched, warning, mask } = this.props;
    return (
      <div>
        <label>{label}</label>
        <div>
        <InputMask mask={mask} onChange={this.onChange} value={this.state.value}  className='form-control'/>
          {touched &&
            ((error && <span className="text-danger">{error}</span>) ||
              (warning && <span>{warning}</span>))}
        </div>
      </div>
    );
  }
}

export default timeSelect;
