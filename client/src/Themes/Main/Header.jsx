import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getprofile, signoutUser} from '../../Reducers/auth/actions';
import {fetchprofile} from '../../Pages/Profile/Reducers/actions';
import {message} from "../../Reducers/loading/actions"
import configpack from '../../../package.json'
class Header extends Component {
  componentWillMount() {
    this.props.getprofile().then(data => {
     if(data && data.type ==="auth_error") {
      this.props.signoutUser();
     }
    });
    this.props.fetchprofile();
  }
  Logout() {
    this.props.signoutUser();
    this.props.message(3000, "info" ,"Je bent succesvol uitgelogd")
  }

  render() {
    const {username, profile} = this.props
    const Profileimage = (profile) => {
      if (profile && profile.portimage) {
        return <img src={profile.portimage} className="img-circle" alt="Gebuiker foto"/>
      } else {
        return <img src="/img/nofoto.jpg" className="img-circle" alt=" foto"/>
      }
    }

    const HeaderLetter = (name) => {
      return name.charAt(0)
    }
    return (<header className="main-header">
      <Link to="/" className="logo">
        <span className="logo-mini">
          #<b>{HeaderLetter(configpack.titel)}</b>
        </span>
        <span className="logo-lg">
          <b>{configpack.titel}</b>
        </span>
      </Link>

      <nav className="navbar navbar-static-top">
        {/* Sidebar toggle button */}
        <Link to="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"/>
          <span className="icon-bar"/>
          <span className="icon-bar"/>
        </Link>
        <div className="navbar-custom-menu">
   
          <ul className="nav navbar-nav">
            <li className="dropdown user user-menu">
              <a href="_blank" className="dropdown-toggle" data-toggle="dropdown">
                <span className="hidden-xs">
                  {username.voornaam} {username.achternaam}
                </span>
              </a>
              <ul className="dropdown-menu">
                {/* User image */}
                <li className="user-header">
                  {Profileimage(profile)}
                  <p></p>
                </li>
                <li className="user-footer">
                  <div className="pull-left">
                    <Link to="/admin/profile" className="btn btn-default btn-flat">Profiel</Link>
                  </div>
                  <div className="pull-right">
                    <Link to="/login" onClick={() => this.Logout()} className="btn btn-default btn-flat">Uitloggen</Link>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
  
    </header>);
  }
};

function mapStateToProps(state) {
  return {errors: state.auth.error, username: state.auth.user, profile: state.profile};
}
export default connect(mapStateToProps, {fetchprofile, getprofile, signoutUser, message})(Header);
