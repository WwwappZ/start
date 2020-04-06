import React, {Component, PropTypes} from 'react';
import Dropzone from 'react-dropzone'
import {connect} from 'react-redux';
import Rodal from 'rodal';
import {UploadOne} from '../../Reducers/items/actions';
class SkyTour extends Component {

  constructor() {
    super()
    this.state = {
      disabled: true,
      files: [],
      errors: {},
      value: ''
    }
  }
  componentWillMount() {
    this.setState({value: this.props.input.value});
  }

  onDrop(file) {
    const files = this.state.files.concat(file);
    this.setState({files});
  }

  Upload() {
    let errors = {};
    const files = this.state.files;
    files.forEach((file, index) => {
      this.props.UploadOne({
        file
      }, this.props.ItemId).then((data) => {
        if (data.type == "ITEM_ERROR" || data.error) {
          errors.message = data.payload;
          this.setState({errors});
          return true
        } else {

          this.setState({value: data.filename});
          this.props.input.onChange(data.filename);
          this.setState({files: []})
        }
      }).catch((e) => {
        console.log(e);
      });
    });
  }
  OnDelete(index) {
    this.setState({
      files: this.state.files.filter(function(e, i) {
        return i !== index;
      })
    });
  }
  OnRemove() {
    this.setState({value: ''});
  }

  render() {
    const {label, input} = this.props
    const {errors} = this.state
    if (this.state.value) {

      return (<div className="box-body">
        <button type="button" onClick={this.OnRemove.bind(this)} >
          Remove
        </button>
        <div className="media">
          <div className="media-left">
            <img src={this.state.value} alt="Material Dashboard Pro" className="media-object" style={{
                flex: 1,
                'objectFit' : 'cover',
                width: 200,
                height: 150,
                borderRadius: 4,
                boxShadow: '0 1px 3px rgba(0,0,0,.15)'
              }}/>
          </div>
        </div>
      </div>)
    } else {
      return (<div>
        <div>
          <label>Kies een foto</label>
          <Dropzone multiple={false} accept="image/jpeg, image/png" style={{
              "minHeight" : "20px",
              "borderWidth" : "2px",
              "borderColor" : "rgb(102, 102, 102)",
              "borderStyle" : "dashed",
              "borderRadius" : "5px",
              display: "inline-block",
              width: "100%"
            }} onDrop={this.onDrop.bind(this)}>
            <p>Kies een bestand die je wil gebruiken als foto voor je skyfocus tour</p>
          </Dropzone>
          <ul className="users-list clearfix">
            {
              this.state.files.map((f, index) => <li key={f.name}>
                <button aria-label="Close" type="button" className="close" onClick={this.OnDelete.bind(this, index)}>
                  <span aria-hidden="true">×</span>
                </button>
                <img src={f.preview} alt="User Image"/>
                <span className="users-list-date">{f.name}</span>
              </li>)
            }
          </ul>
          {errors && <div className="text-danger">{errors.message}</div>}
          <input type="button" onClick={this.Upload.bind(this)} className="btn btn-next btn-fill btn-success btn-wd btn-sm" value="Uploaden"/>
        </div>
      </div>);
    }
  }
}

function mapStateToProps(state) {
  return {upload: state.upload, item: state.items.item}
}

export default connect(mapStateToProps, {UploadOne})(SkyTour);
