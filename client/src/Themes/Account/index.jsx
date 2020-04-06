import React, {Component} from 'react';
import { connect } from "react-redux";
import configpack from '../../../package.json'
import Footer from "../Main/Footer"
import Loading from "../../Components/loading/loading"
import {config} from "../../Reducers/auth/actions"
class Account extends Component {
  componentWillMount() {
    this.props.config();
  }
  render() {
    return (<div className="content-page login-background_recreatie">
      <div className="content-wrapper fullscreen transpbackground">
        <div className="login-box">
          <div className="login-logo">
            <b>#{configpack.titel}</b>
          </div>
          <section className="content">
            <Loading/>
            {this.props.children}
          </section>
          {/* /.content */}
        </div>
      </div>
    <Footer class="main-footer fullscreen"/>
    </div>);
  }
};

function mapStateToProps(state) {
  return { config: state.auth.config };
}

export default connect(
  mapStateToProps,
  { config }
)(Account);
