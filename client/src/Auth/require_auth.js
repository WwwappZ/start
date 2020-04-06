import React, {Component} from 'react';
import {connect} from 'react-redux';
export default function(ComposedComponent) {
  class Authentication extends Component {


    componentWillMount() {
      this.checkAuthentication(this.props);
this.checkpage(this.props)
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.checkAuthentication(this.props);
      }
    }
    checkAuthentication(params) {
      const {history} = params;
      if (!this.props.authenticated) {
        history.replace({pathname: '/login'})
      }
    }
    checkpage(params) {   
      const {history,match, token} = params;
      if (match.path ==="/" && token.role ==="trainer") {
        history.replace({pathname: '/admin/trainingen'})
      }
    }
      render() {
        return <ComposedComponent {...this.props}/>
      }
    }

    function mapStateToProps(state) {
      return {authenticated: state.auth.authenticated, token: state.auth.token};
    }

    return connect(mapStateToProps)(Authentication);
  }
