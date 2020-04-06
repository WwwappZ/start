import React, {Component} from 'react';
import ndtrccode from '../../lib/ndtrccodes.json'
import './styles/ndtrcinput.css';
const ReactTags = require('react-tag-autocomplete');
class MultiSelectDagen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: [],
      suggestions: ndtrccode
    };
  }
  componentDidMount() {
    const value = this.props.input.value;
    if (value) {
      var items = value.map(function(item) {
        item.name = item.label.value + ' (' + item.catid + ')';
        return item;
      });
    }
    if (items)
      this.setState({value: items})
  }
  onChange = (value) => {

    this.setState({value});
    this.props.input.onChange(value);
  };
  handleDelete(i) {

    const value = this.state.value.slice(0)
    value.splice(i, 1)
    this.setState({value})
  }

  handleAddition(tag) {

    const value = [].concat(this.state.value, tag)
    this.props.input.onChange(value);
    this.setState({value})
  }
  render() {
    const {
      label,
      meta: {
        touched,
        error,
        warning
      }} = this.props;
    return (<div>
      <label>{label}</label>
      <div>
        <ReactTags onChange={this.onChange.bind(this)} tags={this.state.value} value={this.state.value} suggestions={this.state.suggestions} handleDelete={this.handleDelete.bind(this)} handleAddition={this.handleAddition.bind(this)}/>
{touched && ((error && <span class="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>);
  }
}

export default MultiSelectDagen;
