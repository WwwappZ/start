import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signupUser,authError} from '../../../Reducers/auth/actions';
import { message } from "../../../Reducers/loading/actions";
import {fetchbedrijven} from '../../../Pages/Administrator/Bedrijven/Reducers/actions'
class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      passwordcheck: '',
      voornaam: '',
      errorMessage: '',
      telefoonnummer:'',
      achternaam:'',
      bedrijf: '',
      role: ''
    }
    this.onChange = this.onChange.bind(this);
  }
  userSignup(e) {
    e.preventDefault();
    if (this.state.password === this.state.passwordcheck) {
      this.props.signupUser({"email": this.state.email, "password": this.state.password, "name": this.state.name, "voornaam": this.state.voornaam,"achternaam": this.state.achternaam, "telefoonnummer": this.state.telefoonnummer,  "bedrijf": this.state.bedrijf,"role": this.state.role}).then((whatever) => {
        if (whatever === true) {
          this.props.message(3000, "success", "Het account is met succes aangemaakt").then((whatever) => {
            this.props.history.push('/');
          })
        }
      });
    } else {
      this.props.message(5000, "danger", "De wachtwoorden zijn aan elkaar gelijk..");
    }
  }
  componentWillMount() {
    this.props.authError(null);
    this.props.fetchbedrijven()
  }
  onChange(event) {
    this.props.authError(null);
    const field = event.target.name;
    const credentials = this.state;
    credentials[field] = event.target.value;
    return this.setState({credentials: credentials});
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (<div className="alert alert-danger">
        <strong>Oops!
        </strong>
        {this.props.errorMessage}
      </div>);
    }
  }

  renderOKAlert() {
    if (this.props.signupmsg) {
      return (<div className="alert alert-success">
        <strong>Super!
        </strong>
        {this.props.signupmsg}
      </div>);
    }
  }
  render() {
    const {bedrijven} = this.props
    return (
          <div className="login-box-body">
            <p className="login-box-msg">Maak een nieuw account</p>
            {this.renderAlert()}
            {this.renderOKAlert()}
            <form method="post">
              <div className="row-fluid">
                <div className="form-group has-feedback col-xs-6">
                  <input value={this.state.vorrnaam} onChange={this.onChange} name="voornaam" type="text" className="form-control" placeholder="Voornaam"/>
                  <span className="glyphicon glyphicon-user form-control-feedback"/>
                </div>

                <div className="form-group has-feedback col-xs-6">
                  <input value={this.state.achternaam} onChange={this.onChange} name="achternaam" type="text" className="form-control" placeholder="Achternaam"/>
                  <span className="glyphicon glyphicon-user form-control-feedback"/>
                </div>
                <div className="form-group has-feedback col-xs-12">
                  <input value={this.state.email} onChange={this.onChange} name="email" type="email" className="form-control" placeholder="Email"/>
                  <span className="glyphicon glyphicon-envelope form-control-feedback"/>
                </div>
                <div className="form-group has-feedback col-xs-12 ">
                  <input value={this.state.telefoonnummer} onChange={this.onChange} name="telefoonnummer" type="text" className="form-control" placeholder="Vul je mobiele nummer in Let op zoals 3161234567"/>
                  <span className="glyphicon glyphicon-log-in form-control-feedback"/>
                </div>
                <div className="form-group has-feedback col-xs-6">
                  <input value={this.state.password} onChange={this.onChange} name="password" type="password" className="form-control" placeholder="Wachtwoord"/>
                  <span className="glyphicon glyphicon-lock form-control-feedback"/>
                </div>
                <div className="form-group has-feedback col-xs-6 ">
                  <input value={this.state.passwordcheck} onChange={this.onChange} name="passwordcheck" type="password" className="form-control" placeholder="Herhaal wachtwoord"/>
                  <span className="glyphicon glyphicon-log-in form-control-feedback"/>
                </div>
                <div className="form-group has-feedback col-xs-6">
                  <select name="bedrijf" onChange={this.onChange}  className="form-control">
                  <option>Kies een bedrijf</option>
                  {
          bedrijven.map((app) => (
                  <option key={app._id} value={app._id}>{app.naam}</option>
                ))
                }
                  </select>
                  <span className="glyphicon glyphicon-user form-control-feedback"/>
                </div>

                <div className="form-group has-feedback col-xs-6">
                  <select name="role" onChange={this.onChange}  className="form-control">
                  <option>Kies een role van de medewerker</option>
                  <option value="user">Medewerker</option>
                  <option value="trainer">Trainer</option>
                  <option value="hoofdtrainer">Hoofd Trainer</option>
                  <option value="admin">Admin</option>
                  </select>
                  <span className="glyphicon glyphicon-user form-control-feedback"/>
                </div>


                <div className="col-xs-4 loginheight">
                  <button onClick={(e) => this.userSignup(e)} type="submit" className="btn btn-primary btn-flat">Registeer</button>
                </div>
              </div>
            </form>
          </div>);
  }
};
function mapStateToProps(state) {
  return {errorMessage: state.auth.error, signupmsg: state.auth.signupmsg, bedrijven: state.bedrijven.items};
}

export default connect(mapStateToProps, {signupUser,authError, fetchbedrijven, message})(SignupPage);
