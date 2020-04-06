import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Sitebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { username, profile, token } = this.props;    

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

export default connect(mapStateToProps, {})(Sitebar);

