import React, { Component } from "react";

class MessageError extends Component {
  state = {
    show: false
  };
  componentWillReceiveProps(nextprops) {
    if (nextprops.error) {
      this.setState({show: true})
      window.setTimeout(() => {
        this.setState({
          show: false
        });
      }, 2000);
    }
  }
  render() {
    if (this.props.error && this.state.show) {
      return (
        <div className="callout callout-warning">
          <h4>Error!</h4>
          {this.props.error}
        </div>
      );
    } else {
      return "";
    }
  }
}

export default MessageError;
