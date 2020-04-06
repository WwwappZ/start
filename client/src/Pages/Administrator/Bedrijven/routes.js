import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import RequireAuth from "../../../Auth/require_auth";
import RequireAuthAdmin from "../../../Auth/require_auth_admin";
import BedrijfEditPage from "./edit";
import BedrijvenPage from "./";
import BedrijfInsertPage from "./insert";

class Bedrijven extends Component {
  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/admin/bedrijven"
          component={RequireAuthAdmin(BedrijvenPage)}
        />
        <Route
          exact
          path="/admin/bedrijven/insert"
          component={RequireAuthAdmin(BedrijfInsertPage)}
        />
        <Route
          exact
          path="/admin/bedrijven/edit/:id"
          component={RequireAuthAdmin(BedrijfEditPage)}
        />
      </React.Fragment>
    );
  }
}

export default Bedrijven;
