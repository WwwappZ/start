import React, {Component} from 'react';
import {connect} from 'react-redux';
export default function(ComposedComponent) {
  class Authentication extends Component {


    componentWillMount() {
      this.checkAuthentication(this.props);

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
      if (!this.props.token.role === "admin" || !this.props.token.role === "root") {
        history.replace({pathname: '/'})
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
