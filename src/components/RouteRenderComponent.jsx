import React, { Component } from "react";
const { Marker, Polyline } = require("react-google-maps");

class RouteRenderComponent extends Component {
  state = {
    directions: null,
  };


  render() {
    let originMarker = null;
    let destinationMarker = null;
    if (this.props.from != null) {
      console.log(this.props);
      originMarker = (
        <Marker
          defaultLabel={this.props.index.toString()}
          defaultIcon={null}
          position={{
            lat: parseFloat(this.props.from.lat),
            lng: parseFloat(this.props.from.lng)
          }}
        />
      );
    }
    if (this.props.index === this.props.lastData) {
      destinationMarker = (
        <Marker
          label={(this.props.index + 1).toString()}
          defaultIcon={null}
          position={{
            lat: parseFloat(this.props.to.lat),
            lng: parseFloat(this.props.to.lng)
          }}
        />
      );
    }
    return (
      <div>
        {originMarker}
        {destinationMarker}
        <Polyline
          defaultPosition={this.state.center}
          path={[new window.google.maps.LatLng(this.props.from.lat, this.props.from.lng), new window.google.maps.LatLng(this.props.to.lat, this.props.to.lng)]}
          geodesic={true}
          strokeOpacity={1.0}
          strokeWeight={2}
        />
        
      </div>
    );
  }
}

export default RouteRenderComponent;
