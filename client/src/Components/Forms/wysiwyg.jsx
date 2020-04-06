import React, {Component, PropTypes} from 'react';
import RichTextEditor from 'react-rte';

class RichTextMarkdown extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.input.value === ''
        ? RichTextEditor.createEmptyValue()
        : RichTextEditor.createValueFromString(this.props.input.value, 'html')
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.input.value !== this.state.value.toString('html')) {
      this.setState({
        value: nextProps.input.value
          ? RichTextEditor.createValueFromString(nextProps.input.value, 'html')
          : RichTextEditor.createEmptyValue()
      });
    }
  }

  onChange = (value) => {
    this.setState({value});
    this.props.input.onChange(value);
  };

  render() {
    const {label} = this.props;
    return (<div>
      <label>{label}</label>
      <div>
        <RichTextEditor className="wysiwyg-editor" value={this.state.value} onChange={this.onChange}/>
      </div>
    </div>);
  }
}

export default RichTextMarkdown;
