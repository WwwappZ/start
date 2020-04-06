import React, { Component } from "react";

class MessageSucces extends Component {
  state = {
    show: false
  };
  componentWillReceiveProps(nextprops) {
    if (nextprops.success) {
      this.setState({show: true})
      window.setTimeout(() => {
        this.setState({
          show: false
        });
      }, 2000);
    }
  }
  render() {
    if (this.props.success && this.state.show) {
      return (
        <div className="callout callout-info">
          <h4>Gelukt!</h4>
          {this.props.tekst}
        </div>
      );
    } else {
      return "";
    }
  }
}

export default MessageSucces;
