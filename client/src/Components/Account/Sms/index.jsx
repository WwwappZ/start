import React, {Component} from 'react';
import {connect} from 'react-redux';
import {confirmationSms,authError} from '../../../Reducers/auth/actions';

class SmsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smscode: '',
      errorMessage: ''
    }
    this.onChange = this.onChange.bind(this);
  }
  confirmationSms(e) {
    e.preventDefault();
    this.props.confirmationSms({"smscode": this.state.smscode, "token": this.props.match.params.token }).then((whatever) => {
      console.log(whatever);
      if(whatever) {
        localStorage.setItem('token', whatever.token);
        setTimeout(function (){
          window.location.replace("/");          
        }, 500); // How long do you want the delay to be (in milliseconds)? 
    }
    });
  }
  onChange(event) {
    this.props.authError(null);
    const field = event.target.name;
    const credentials = this.state;
    credentials[field] = event.target.value;
    return this.setState({credentials: credentials});
  }
  componentWillMount() {
    this.props.authError(null);
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong>
          {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {

    return (
        <div className="login-box-body">
          <p className="login-box-msg">Vul de gegevens in die je hebt ontvangen via de sms</p>
                {this.renderAlert()}
          <form method="post">
            <div className="form-group has-feedback">
              <input value={this.state.smscode} onChange={this.onChange} type="text" name="smscode" className="form-control" placeholder="SMS Code"/>
              </div>
              <div className=" form-group has-feedback row">
                <div className="col-xs-8">
                </div>
              {/* /.col */}
              <div className="col-xs-4">
                <button type="submit" onClick={(e) => this.confirmationSms(e)} className="btn btn-primary btn-block btn-flat">Controleren</button>
              </div>
            </div>
          </form>
        </div>
    );
  }
}
function mapStateToProps(state) {
  return {errorMessage: state.auth.error};
}

export default connect(mapStateToProps, {confirmationSms,authError})(SmsPage);
