import React, {Component, PropTypes} from 'react';
import Dropzone from 'react-dropzone'
import {connect} from 'react-redux';
import Rodal from 'rodal';
import {Upload} from '../../Reducers/items/actions';
class UploadForm extends Component {

  constructor() {
    super()
    this.state = {
      disabled: true,
      files: [],
      errors: {}
    }
  }


  onDrop(file) {
    const files = this.state.files.concat(file);
    this.setState({files});
  }

  Upload() {
      let errors = {};
      const files = this.state.files;
      files.forEach((file, index) => {
        this.props.Upload({file}, this.props.ItemId).then((data) => {
          if (data.type == "ITEM_ERROR") {
            errors.message = data.payload;
            this.setState({errors});
            return true
          } else {
            this.setState({files: []})
            this.props.input.onChange(data.results.images);
            this.props.onClose();
          }
        }).catch((e) => {
        console.log(e);
        });
      });
  }
  OnDelete (index) {
    this.setState({
           files: this.state.files.filter(function (e, i) {
           return i !== index;
         })
       });
  }

  render() {
    const {label} = this.props;
    const {errors} = this.state;
    return (<div>
      <label>{label}</label>
      <div>
        <Dropzone style={{
            "minHeight" : "100px",
            "borderWidth" : "2px",
            "borderColor" : "rgb(102, 102, 102)",
            "borderStyle" : "dashed",
            "borderRadius" : "5px",
            display: "inline-block",
            width: "100%"
          }} onDrop={this.onDrop.bind(this)}>
          <p>Drop hier je bestanden</p>
        </Dropzone>
        <ul className="users-list clearfix">
          {
            this.state.files.map((f, index) => <li key={f.name}>
              <button type="button" className="close" onClick={ this.OnDelete.bind(this, index) }aria-label="Close">
                <span aria-hidden="true">×</span></button>
              <img src={f.preview} alt="User Image"/>
              <span className="users-list-date">{f.name}</span>
            </li>)
          }
        </ul>
    { errors && <div className="text-danger">{errors.message}</div>}
          <input type="button" onClick={this.Upload.bind(this)} className="btn btn-next btn-fill btn-success btn-wd btn-sm" value="Uploaden"/>
      </div>
    </div>);

  }
}

function mapStateToProps(state) {
  return {upload: state.upload,  item: state.items.item}
}

export default connect(mapStateToProps, {Upload})(UploadForm);
