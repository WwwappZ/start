import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { message } from "../../../Reducers/loading/actions";
import { Sendmail, Login, authError } from "../../../Reducers/auth/actions";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      sendmail: false,
      sendmailluck: false
    };
    this.onChange = this.onChange.bind(this);
  }
  userLogin(e) {
    e.preventDefault();
    this.props
      .Login({
        email: this.state.email,
        password: this.state.password,
        strategy: "local"
      })
      .then(whatever => {
        if (whatever) {
          if (!whatever.check) {
            localStorage.setItem("token", whatever.token);
            this.props.message(1000, "success", "Het inloggen is gelukt");
            setTimeout(function() {
              window.location.replace("/");
            }, 500); // How long do you want the delay to be (in milliseconds)?
          }
          if (whatever.check === "blocked") {
            this.props.message(3000, "danger", "Je account je geblokkeerd");
          }
          if (whatever.check === "sms") {
            this.props.history.push("/login/sms/" + whatever.token);
          }
          if (whatever.check === "email") {
            this.setState({ sendmail: true });
          }
        }
      });
  }
  sendvmail(e) {
    this.props.Sendmail({ email: this.state.email }).then(whatever => {
      if (whatever) {
        this.setState({ sendmail: false });
        this.setState({ sendmailluck: true });
      }
    });
  }
  onChange(event) {
    this.props.authError(null);
    const field = event.target.name;
    const credentials = this.state;
    credentials[field] = event.target.value;
    return this.setState({ credentials: credentials });
  }
  componentWillMount() {
    this.props.authError(null);
  }

  componentDidUpdate() {
    if (this.props.errorMessage) {
      this.props.message(5000, "danger", this.props.errorMessage);
    }
    if (this.state.sendmailluck) {
      this.props.message(
        5000,
        "info",
        " Er is een mail gestuurd om je account te activeren"
      );
    }
  }

  renderAlert() {
    if (this.state.sendmail === true) {
      return (
        <div className="alert alert-danger">
          Je e-mailadres is niet gecontroleerd. Klik
          <strong
            className="pointer"
            onClick={() => {
              this.sendvmail();
            }}
          >
            hier
          </strong>
          om nogmaals je account te activeren
          <br />
        </div>
      );
    }
  }

  render() {   
    return (
      <div className="login-box-body">
        <p className="login-box-msg">Vul je gegevens in om in te loggen</p>
        {this.renderAlert()}
        <form method="post">
          <div className="form-group has-feedback">
            <input
              value={this.state.email}
              onChange={this.onChange}
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
            />
          </div>
          <div className="form-group has-feedback">
            <input
              value={this.state.password}
              onChange={this.onChange}
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
            />
          </div>
          <div className=" form-group has-feedback row">
            <div className="col-xs-8"></div>
            {/* /.col */}
            <div className="col-xs-4">
              <button
                type="submit"
                onClick={e => this.userLogin(e)}
                className="loginbutton btn btn-primary btn-block btn-flat"
              >
                Inloggen
              </button>
            </div>
          </div>
        </form>
        <div className="row">
          <div className="col-8">
            <Link to="/login/forget">Wachtwoord vergeten</Link>
          </div>
          {this.props.config.openregist &&
          <div className="col-4">
            <Link to="/login/forget">Maak Account</Link>
          </div>
  }
        </div>
        <br />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { errorMessage: state.auth.error, config: state.auth.config  };
}

export default connect(mapStateToProps, {
  Sendmail,
  Login,
  authError,
  message
})(LoginPage);
