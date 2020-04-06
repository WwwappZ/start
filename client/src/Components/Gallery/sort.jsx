import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import SortableItem from './item'

const SortableList = SortableContainer(({items,onRemove}) => {
  return (<ul>
    {items.map((value, index) => (<SortableItem key={`item-${index}`} idx={index}  onRemove={onRemove} index={index} value={value}/>))}
  </ul>);
});

class SortableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: []
    };
  }
componentWillReceiveProps(nextProps) {
  if (nextProps.input.value) {
  const value = nextProps.input.value;
  this.setState({value})

}
}

  componentDidMount() {
    if (this.props.input.value) {
      const value = this.props.input.value;
      this.setState({value})
    }
  }
  remove(index) {
    const value = this.state.value;
        value.splice(index, 1);
        this.setState({value})
    }


  onSortEnd = ({oldIndex, newIndex}) => {
    const value = arrayMove(this.state.value, oldIndex, newIndex);
    if (newIndex ==0) {
      value[0].main = true;
    }
    this.setState({value});
    this.props.input.onChange(value);
  };
  render() {
    return <SortableList items={this.state.value} onSortEnd={this.onSortEnd}   onRemove={(index) => this.remove(index)} />;
  }
}
export default SortableComponent;
