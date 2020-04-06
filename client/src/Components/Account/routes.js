import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "./Login/Login.jsx";
import ForgetPage from "./Login/Forget";
import NewPasswordPage from "./Login/NewPassword";
import SmsPage from "./Sms/";
import VerficationPage from "./SignUp/Confirmation.jsx";
import NoMatch from "../../Themes/Main/404";
class Audification extends Component {
  render() {
    return (
      <React.Fragment>
              <Route exact path="/login" component={LoginPage} {...Audification} />
            <Route
              exact
              path="/login/sms/:token"
              component={SmsPage}
              {...Audification}
            />
            <Route exact path="/login/forget" component={ForgetPage} {...Audification} />
            <Route
              exact
              path="/login/forget/:code"
              component={NewPasswordPage}
            />
            <Route
              exact
              path="/signup/verify/:code"
              component={VerficationPage}
              {...Audification}
            />
            <Route exact path="/404" component={NoMatch} />
      </React.Fragment>
    );
  }
}

export default Audification;
