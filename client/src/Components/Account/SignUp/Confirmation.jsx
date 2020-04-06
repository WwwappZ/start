import React, {Component} from 'react';
import {connect} from 'react-redux';
import {confirmationPost} from '../../../Reducers/auth/actions';
import {Link} from 'react-router-dom';
class VerficationPage extends Component {

  componentWillMount() {
      this.props.confirmationPost({"code": this.props.match.params.code}).then((whatever) => {
        if (whatever === true) {
          setTimeout(() => {
            this.props.history.push('/login');
          }, 3000);
        }
      });
    }

  renderAlert() {
    if (this.props.errorMessage) {
      return (<div className="alert alert-danger">
        <strong>Oops!
        </strong>
        {this.props.errorMessage}
      </div>);
    }
  }

  renderOKAlert() {
    if (this.props.signupmsg) {
      return (<div className="alert alert-success">
        <strong>Super!
        </strong>
        {this.props.signupmsg}
      </div>);
    }
  }
  render() {
    return (
          <div className="login-box-body">
            <p className="login-box-msg">Verification van je account</p>
            {this.renderAlert()}
            {this.renderOKAlert()}
            <div className="span12">
              <Link to="/login" className="text-center">Ik heb al een account</Link>
            </div>
          </div>
        );
  }
};
function mapStateToProps(state) {
    return {errorMessage: state.auth.error, signupmsg: state.auth.signupmsg};
}

export default connect(mapStateToProps, {confirmationPost})(VerficationPage);
