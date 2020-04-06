import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withGoogleMap, GoogleMap, Circle } from "react-google-maps";

class Maps extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: { lat: 52.2387683, lng: 5.8322737 },
      position: [],
      radius: 5000
    };
  }
  mapMounted = ref => {
    this.map = ref;
  };

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  getvalues = e => {
    const radius = this.map.getRadius();
    const center = this.map.getCenter();
    this.setState({ radius: radius });
    this.setState({
      "location.lat": center.lat(),
      "location.lng": center.lng()
    });
    this.props.getvals({location:{
      "lat": center.lat(),
      "lng": center.lng(),
      "radius": radius
    }
  });
}

  render() {
    const MapWithAMarker = withGoogleMap(props => (
      <GoogleMap defaultZoom={11} defaultCenter={this.state.location}>
        <Circle
          ref={this.mapMounted.bind(this)}
          radius={this.state.radius}
          editable={true}
          onRadiusChanged={props.getval}
          onDragEnd={props.getval}
          draggable={true}
          visible={true}
          center={this.state.location}
        />
      </GoogleMap>
    ));

    return (
          <MapWithAMarker
            getval={this.getvalues.bind(this)}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />

    );
  }
}
function mapStateToProps(state) {
  return {};
}
export default connect(
  mapStateToProps,
  {}
)(Maps);
