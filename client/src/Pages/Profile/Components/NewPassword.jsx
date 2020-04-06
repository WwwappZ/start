import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NewPasswordlog,authError} from '../../../Reducers/auth/actions';
import {message} from "../../../Reducers/loading/actions"
class NewPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passwordcheck:'',
      errorMessage: ''
    }
    this.onChange = this.onChange.bind(this);
  }
  userForget(e) {
    e.preventDefault();
    if (this.state.password === this.state.passwordcheck) {
      this.props.NewPasswordlog({"password": this.state.password}).then((whatever) => {
        if (whatever === true) {
          this.props.message(3000, "success" ,"Je profiel is goed opgeslagen")
        } else {
          this.props.message(5000, "danger" ,"Er is een fout opgtreden")
        }
      });
    } else {
      this.props.message(5000, "danger" ,"De wachtwoorden zijn niet gelijk aan elkaar")
    }
  }
  componentWillMount() {
    this.props.authError(null);
  }
  onChange(event) {
    this.props.authError(null);
    const field = event.target.name;
    const credentials = this.state;
    credentials[field] = event.target.value;
    return this.setState({credentials: credentials});
  }

  render() {
    return (
                  <form method="post">
            <div className="box-body">
                <div className="form-group has-feedback col-xs-6">
                  <input value={this.state.password} onChange={this.onChange} name="password" type="password" className="form-control" placeholder="Wachtwoord"/>
                  <span className="glyphicon glyphicon-lock form-control-feedback"/>
                </div>
                <div className="form-group has-feedback col-xs-6 ">
                  <input value={this.state.passwordcheck} onChange={this.onChange} name="passwordcheck" type="password" className="form-control" placeholder="Herhaal wachtwoord"/>
                  <span className="glyphicon glyphicon-log-in form-control-feedback"/>
                </div>
                <div className="col-xs-5 loginheight">
                  <button onClick={(e) => this.userForget(e)} type="submit" className="btn btn-next btn-fill btn-success btn-wd btn-sm">Wijzigen</button>
                </div>
              </div>
            </form>
        );
  }
};
function mapStateToProps(state) {
  return {errorMessage: state.auth.error, signupmsg: state.auth.signupmsg};
}

export default connect(mapStateToProps, {NewPasswordlog,authError, message})(NewPasswordPage);
