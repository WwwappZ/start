import React, { Component } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";


class Sitebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { username, profile, token } = this.props;    
    const logboekensidebar = () => {
      if (
        token.role === "admin" ||
        token.role === "user" ||
        token.role === "root"
      ) {
        return (
          <li className="treeview">
            <a href="#!">
              <i className="fa fa-book" />
              <span>Logboeken</span>
              <span className="pull-right-container">
                <i className="fa fa-angle-left pull-right" />
              </span>
            </a>
            <ul className="treeview-menu">
              <li>
                <Link to="/logboek">
                  <i className="fa fa-book" />
                  <span>Overzicht</span>
                </Link>
              </li>
              <li>
                <Link to="/vergelijken">
                  <i className="fa fa-book" />
                  <span>Parken Vergelijken</span>
                </Link>
              </li>
              <li>
                <Link to="/logboek/website">
                  <i className="fa fa-book" />
                  <span>Invullen vanuit website</span>
                </Link>
              </li>
              <li>
                <Link to="/logboek/insert">
                  <i className="fa fa-book" />
                  <span>Handmatig Invullen</span>
                </Link>
              </li>
            </ul>
          </li>
        );
      }
    };

    const beeldbankadmin = () => {
      if (token.role === "admin" || token.role === "root") {
        return (
          <li className="treeview">
            <a href="#!">
              <i className="fa fa-dashboard" />
              <span>Administratie</span>
              <span className="pull-right-container">
                <i className="fa fa-angle-left pull-right" />
              </span>
            </a>
            <ul className="treeview-menu">
              <li>
                <Link to="/admin/bedrijven">
                  <i className="fa fa-book" />
                  <span>Bedrijven</span>
                </Link>

                <Link to="/admin/gebruikers/">
                  <i className="fa fa-users" />
                  <span>Gebruikers</span>
                </Link>
              </li>
            </ul>
          </li>
        );
      }
    };

    
    const profileimage = profile => {
      if (profile && profile.portimage) {
        return (
          <img src={profile.portimage} className="img-circle" alt="User" />
        );
      } else {
        return <img src="/img/nofoto.jpg" className="img-circle" alt="User" />;
      }
    };
    return (
      <aside className="main-sidebar" style={{ height: "100%" }}>
        {/* sidebar: style can be found in sidebar.less */}
        <section className="sidebar">
          {/* Sidebar user panel */}
          <div className="user-panel">
            <div className="center-block image">{profileimage(profile)}</div>
            <div className="pull-left info">
              <p>{username.name}</p>
            </div>
          </div>
          {username.role && (
            <ul className="sidebar-menu" data-widget="tree">
              <li className="header">HOOFDMENU</li>
              {beeldbankadmin()}
            </ul>
          )}
        </section>
        {/* /.sidebar */}
      </aside>
    );
  }
}
function mapStateToProps(state) {
  return {
    username: state.auth.user,
    token: state.auth.token,
    profile: state.profile,
  };
}

Sitebar = reduxForm({
  form: "kiesjaar" // a unique identifier for this form
})(Sitebar);

// You have to connect() to any reducers that you wish to connect to yourself
Sitebar = connect(mapStateToProps, {  })(Sitebar);

export default Sitebar;
