import React, {Component} from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
class myItem extends Component {

  render() {
    const {idx, value, onRemove} = this.props
    return (<div className="box box-solid">
      <div className="box-body">
        <button type="button" key={`input-${value}`} onClick={() => onRemove(idx)}>
          Verwijderen
        </button>
        <div className="media">
          <div className="media-left">
            <img src={value.thumbnail.small} alt="Material Dashboard Pro" className="media-object" style={{
                flex: 1,
                'objectFit' : 'cover',
                width: 200,
                height: 150,
                borderRadius: 4,
                boxShadow: '0 1px 3px rgba(0,0,0,.15)'
              }}/>
          </div>
          <div className="media-body">
            <div className="clearfix">
              <h4 style={{
                  marginTop: 0
                }}>{value.titel}</h4>

            </div>
          </div>
        </div>
      </div>
    </div>)
  }
}
const SortableMyItem = SortableElement(myItem)

export default SortableMyItem
