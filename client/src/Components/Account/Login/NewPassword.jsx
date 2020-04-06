import React, { Component } from "react";
import { connect } from "react-redux";
import { NewPassword, authError } from "../../../Reducers/auth/actions";
import {message} from "../../../Reducers/loading/actions"
import { Link } from "react-router-dom";
class NewPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      passwordcheck:"",
      errorMessage: ""
    };
    this.onChange = this.onChange.bind(this);
  }
  userForget(e) {
    e.preventDefault();
    if (this.state.password === this.state.passwordcheck) {
      this.props
        .NewPassword({
          code: this.props.match.params.code,
          password: this.state.password
        })
        .then(whatever => {
          if (whatever === true) {
            setTimeout(() => {
              this.props.history.push("/login");
            }, 3000);
          }
        });
    } else {
      this.props.authError("De wachtwoorden zijn niet gelijk aan elkaar");
    }
  }
  componentWillMount() {
    this.props.authError(null);
  }
  onChange(event) {
    this.props.authError(null);
    const field = event.target.name;
    const credentials = this.state;
    credentials[field] = event.target.value;
    return this.setState({ credentials: credentials });
  }
  componentDidUpdate() {
    if (this.props.errorMessage) {
      this.props.message(5000, "danger" ,this.props.errorMessage)
    }
    if (this.props.signupmsg) {
      this.props.message(5000, "success" ,this.props.signupmsg)
    } 
  }


  render() {
    return (
      <div className="login-box-body">
        <p className="login-box-msg">Kies een nieuw Wachtwoord</p>
        <form method="post">
          <div className="row-fluid">
            <div className="form-group has-feedback col-xs-6">
              <input
                value={this.state.password}
                onChange={this.onChange}
                name="password"
                type="password"
                className="form-control"
                placeholder="Wachtwoord"
              />
              <span className="glyphicon glyphicon-lock form-control-feedback" />
            </div>
            <div className="form-group has-feedback col-xs-6 ">
              <input
                value={this.state.passwordcheck}
                onChange={this.onChange}
                name="passwordcheck"
                type="password"
                className="form-control"
                placeholder="Herhaal wachtwoord"
              />
              <span className="glyphicon glyphicon-log-in form-control-feedback" />
            </div>
            <div className=" form-group has-feedback row">
              <div className="col-xs-8"></div>
              {/* /.col */}
              <div className="col-xs-4">
                <button
                  onClick={e => this.userForget(e)}
                  type="submit"
                  className="loginbutton btn btn-primary btn-block btn-flat"
                >
                  Verzenden
                </button>
              </div>
            </div>
            <div className="span12">
              <Link to="/login" className="text-center">
                Terug
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { errorMessage: state.auth.error, signupmsg: state.auth.signupmsg };
}

export default connect(mapStateToProps, { NewPassword, authError, message })(
  NewPasswordPage
);
