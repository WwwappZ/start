import React, { Component } from "react";
import Header from "./Themes/Main/Header.jsx";
import Sitebar from "./Themes/Main/Sitebar.jsx";
import Footer from "./Themes/Main/Footer.jsx";
import Account from "./Themes/Account";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "./Components/Account/Login/Login.jsx";
import ForgetPage from "./Components/Account/Login/Forget";
import NewPasswordPage from "./Components/Account/Login/NewPassword";
import SmsPage from "./Components/Account/Sms/";
import SignupPage from "./Components/Account/SignUp/Singup.jsx";
import VerficationPage from "./Components/Account/SignUp/Confirmation.jsx";
import RequireAuth from "./Auth/require_auth";
import RequireAuthAdmin from "./Auth/require_auth_admin";
import ProfilePage from "./Pages/Profile/profile";
import GebruikersPage from "./Pages/Administrator/Gebruikers"
import Loading from "./Components/loading/loading"
import NoMatch from "./Themes/Main/404";

class App extends Component {
  render() {
    const { location } = this.props;
    let loc = location.pathname.split("/");
    if (loc[1] === "login" || loc[1] === "signup" || loc[1] === "404") {
      return (
        <Account>
          <Switch>
            <Route exact path="/login" component={LoginPage} {...App} />
            <Route
              exact
              path="/login/sms/:token"
              component={SmsPage}
              {...App}
            />
            <Route exact path="/login/forget" component={ForgetPage} {...App} />
            <Route
              exact
              path="/login/forget/:code"
              component={NewPasswordPage}
            />
            <Route
              exact
              path="/signup/verify/:code"
              component={VerficationPage}
              {...App}
            />
            <Route exact path="/404" component={NoMatch} />
          </Switch>
        </Account>
      );
    } else {
      return (
        <div className="content-page">
          <Header />
          <Sitebar />
          <div className="content-wrapper">
          <Loading/>
            <section className="content">
              <Switch>
                <Route
                  exact
                  path="/admin/signup"
                  component={RequireAuthAdmin(SignupPage)}
                />
                <Route
                  exact
                  path="/admin/profile"
                  component={RequireAuth(ProfilePage)}
                />
                 <Route
                  exact
                  path="/admin/gebruikers"
                  component={RequireAuth(GebruikersPage)}
                />
                <Route exact path="/" component={RequireAuth(ProfilePage)} />
              

                <Route render={() => <Redirect to="/404" />} />
              </Switch>
            </section>
          </div>
          <Footer class="main-footer" />
        </div>
      );
    }
  }
}

export default App;
