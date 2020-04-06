import React, { Component } from "react";
import Multiselect from "react-widgets/lib/Multiselect";
class MultiSelectDagen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: []
    };
  }

  componentDidMount() {    
    if (this.props.input.value) {
      this.setState({ value: this.props.input.value});
    }
  }

  handleSelect = value => {
    this.setState({ value });
    this.props.input.onChange(value);
  };
  render() {
    const { label, error, touched, warning, options, mvalue, mtextfield } = this.props;
    return (
      <div>
        <label>{label}</label>
        <div>
          <Multiselect
            data={options}
            valueField={mvalue}
            textField={mtextfield}
            onChange={this.handleSelect}
            value={this.state.value}
          />
          {touched &&
            ((error && <span className="text-danger">{error}</span>) ||
              (warning && <span>{warning}</span>))}
        </div>
      </div>
    );
  }
}

export default MultiSelectDagen;
