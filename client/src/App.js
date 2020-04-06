import React, { Component } from "react";
import Header from "./Themes/Main/Header.jsx";
import Sitebar from "./Themes/Main/Sitebar.jsx";
import Footer from "./Themes/Main/Footer.jsx";
import Account from "./Themes/Account";
import { Route, Switch, Redirect } from "react-router-dom";
import Audification from "./Components/Account/routes"
import SignupPage from "./Components/Account/SignUp/Singup.jsx";
import RequireAuth from "./Auth/require_auth";
import RequireAuthAdmin from "./Auth/require_auth_admin";
import ProfilePage from "./Pages/Profile/profile";
import GebruikersPage from "./Pages/Administrator/Gebruikers";
import Bedrijven from "./Pages/Administrator/Bedrijven/routes"
import Loading from "./Components/loading/loading";


class App extends Component {
  render() {
    const { location } = this.props;
    let loc = location.pathname.split("/");
    if (loc[1] === "login" || loc[1] === "signup" || loc[1] === "404") {
      return (
        <Account>
          <Switch>
          <Audification/>
          </Switch>
        </Account>
      );
    } else {
      return (
        <div className="content-page">
          <Header />
          <Sitebar />
          <div className="content-wrapper">
            <Loading />
            <section className="content">
              <Switch>
              <Route exact path="/" component={RequireAuth(ProfilePage)} />
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
                <Bedrijven/>
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
