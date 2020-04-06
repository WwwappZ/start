import React from 'react';
import {connect} from 'react-redux';
import {message} from "../../../Reducers/loading/actions"
import {upload_profile_image} from '../Reducers/actions';

class ProfileFotoPage extends React.Component {
  state = {
    errors: {}
  }

  handleClick(e) {
    var inputField = this.refs.fileUploader;

    inputField.click();
  }
  handleUpload = (e) => {
    this.props.message(500000, "info", "Foto wordt geupload");
    e.preventDefault();
    let errors = {};
    const file = e.target.files[0];
    this.props.upload_profile_image({file}).then((data) => {
      if (data.errors) {
        errors.mes = "foutje";
        this.setState({errors});
        return true
      }
      this.props.message(2000, "success", "Foto is succesvol geupload");
    });
  }

  render() {
    const {username, profile} = this.props
    const profileimage = (profile) => {
      if (profile && profile.portimage) {
        return <img className="profile-user-img img-responsive img-circle" src={profile.portimage} alt="User"/>
      } else {
        return <img src="/img/nofoto.jpg" className="profile-user-img img-responsive img-circle" alt="User"/>
      }
    }
    return (
        <div className="box box-primary">
          <div className="box-body box-profile">
            <span onClick={this.handleClick.bind(this)}>
              {profileimage(profile)}
              <input type="file" name="files" accept=".jpg,.jpeg" onChange={this.handleUpload.bind(this)} ref="fileUploader" style={{
                  display: "none"
                }}/>
            </span>
            <h3 className="profile-username text-center">
              {username.name}
            </h3>
            <input type="file" name="files" accept=".jpg,.jpeg" onChange={this.handleUpload.bind(this)} ref="fileUploader" style={{
                display: "none"
              }}/>
          </div>
        </div>);
  }
};
function mapStateToProps(state) {
  return {username: state.auth.user,  profile: state.profile};
}

export default connect(mapStateToProps, {upload_profile_image, message})(ProfileFotoPage);
