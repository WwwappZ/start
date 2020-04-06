import React, { Component } from "react";
import { Animated } from "react-animated-css";
import { connect } from "react-redux";
class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  

  render() {  
    if (this.props.loading.actief) {
    return (
      <Animated
        animationIn="fadeInDown"
        animationOut="fadeOutUp"
        className="loadingmessage"
        isVisible={this.props.loading.actief}
      >
        <div className={"callout callout-" + this.props.loading.soort}>
          <p>{this.props.loading.message}</p>
        </div>
      </Animated>
    );
  }else {
    return null
  }
}
}

function mapStateToProps(state) {
  return { loading: state.loading.message };
}

export default connect(mapStateToProps, {})(Loading);
