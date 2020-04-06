import React from 'react';
import {connect} from 'react-redux';
import ProfileFotoPage from './Components/ProfielFoto'
import {UpdateProfile, fetchprofile} from './Reducers/actions';
import ProfielForm from './Components/ProfielForm'
import NewPasswordPage from './Components/NewPassword'
import {message} from "../../Reducers/loading/actions"
import 'react-widgets/dist/css/react-widgets.css'
class ProfilePage extends React.Component {
  state = {
    errors: {},
    success: false,
    error: false,
    loadingprofile: false
  }
  componentWillMount() {
    this.props.fetchprofile().then((data) => {
      this.setState({loadingprofile: true})
    })
  }

  submit = vals => {
      this.props.UpdateProfile(vals).then((data) => {
        if (data.type ==="PROFILE_ERROR") {
          this.props.message(3000, "danger" ,"Er is iets fout gegaan bij het opslaan")
        } else {
          this.props.message(3000, "success" ,"Je profiel is goed opgeslagen")
        }
      });
  }


  submitpush = vals => {
    if (this.props.push) {
      this.props.UpdatePush(vals).then((data) => {
        if (data.type ==="PROFILE_ERROR") {
          this.props.message(3000, "danger" ,data.payload.message)
        } else {
          this.props.message(3000, "success" ,"Je profiel is goed opgeslagen")
        }
      });
    } else {
      this.props.message(5000, "danger" ,"Er is iets fout gegaan bij het opslaan")
    }
  }



  render() {
    const {username} = this.props

    return (
      <div className="box box-default">
        <div className="box-header with-border">
          <h3 className="box-title">  {username.voornaam}     {username.achternaam}</h3>
        </div>
      <div className="row">
      <div className="col-md-4">
        <ProfileFotoPage/>
    
          <div className="box-header with-border">
            <h3 className="box-title"> Wachtwoord wijzigen</h3>
            <NewPasswordPage setsucces={this.setsucces} seterror={this.seterror}/>
            </div>
      </div>
      <div className="col-md-8 no-float">
        <div className="box box-primary">
          <div className="box-body box-profile">
            {this.state.loadingprofile &&
            <ProfielForm onSubmit={this.submit}/>
          }
            </div>
        </div>
      </div>
    </div>
  </div>);
  }
};
function mapStateToProps(state) {
  return {username: state.auth.user, profile: state.profile, push: state.push};
}

export default connect(mapStateToProps, { fetchprofile, UpdateProfile, message})(ProfilePage);
