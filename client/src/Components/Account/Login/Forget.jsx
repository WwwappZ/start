import React, { Component } from "react";
import { connect } from "react-redux";
import { loginforget, authError } from "../../../Reducers/auth/actions";
import {message} from "../../../Reducers/loading/actions"
import { Link } from "react-router-dom";
class ForgetPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      errorMessage: ""
    };
    this.onChange = this.onChange.bind(this);
  }
  userForget(e) {
    e.preventDefault();
    if (this.state.password === this.state.passwordcheck) {
      this.props.loginforget({ email: this.state.email }).then(whatever => {
        if (whatever === true) {
          setTimeout(() => {
            this.props.history.push("/login");
          }, 3000);
        }
      });
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
        <p className="login-box-msg">Wachtwoord vergeten</p>

        <form method="post">
          <div className="row-fluid">
            <div className="form-group has-feedback col-xs-12">
              <input
                value={this.state.email}
                onChange={this.onChange}
                name="email"
                type="email"
                className="form-control"
                placeholder="Email"
              />
              <span className="glyphicon glyphicon-envelope form-control-feedback" />
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
                  Wachtwoord opvragen
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

export default connect(mapStateToProps, { loginforget, authError, message })(ForgetPage);
