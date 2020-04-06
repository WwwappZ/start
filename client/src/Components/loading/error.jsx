import React, {Component} from 'react'

class ErrorMessage extends Component {

  render() {
  
if (this.props.fout.error) {
    return (
      <div className="callout callout-danger">
        <h4>Fout</h4>
        <p>{this.props.fout.error.message}</p>
      <small>{this.props.fout.error.error.message}</small>
      </div>
    ) } else {
      return ""
    }
  }
}

export default ErrorMessage;
