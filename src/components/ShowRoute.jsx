import React, { Component } from "react";
import { compose, withProps } from "recompose";
//Recompse API가 하는 일은 말 그대로 소품들을 다른 방식으로 재구성할 수 있게 해준다.
//보통 우리는 그것들을 부품 안에 넣지만, 이제 우리는 그것들을 앞쪽에 있는 물체에 넣을 수 있어서 우리의 부품들이 덜 어수선해짐
import RouteRenderComponent from "./RouteRenderComponent";
import { G_API_URL } from "./Constants.jsx";
import DummyLocations from "./DummyLocations.jsx";
const { withScriptjs, withGoogleMap, GoogleMap } = require("react-google-maps");

class ShowRoute extends Component {
  state = {
    defaultZoom: 12,
    map: null,
    center: {
      lat: 34.7516329613,
      lng:  127.7140048886
      // TODO 평균 내서 가운데 값 찾기
    }
  };
  render() {
    return (
      <GoogleMap
        defaultZoom={this.state.defaultZoom}
        center={this.state.center}
        defaultCenter={new window.google.maps.LatLng(34.6016329613, 127.7040048886)}
      >
        {DummyLocations.map((elem, index) => {
          return (
            <RouteRenderComponent
              key={index}
              index={index + 1}
              strokeColor={elem.strokeColor}
              from={elem.from}
              to={elem.to}
              lastData={DummyLocations.length}
            />
          );
        })}
      </GoogleMap>
    );
  }
}

export default compose(
  withProps({
    googleMapURL: G_API_URL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `300px` }} />,
    mapElement: <div style={{ height: `100%`, width: `100vw` }} />
  }), // props ( 변하지 않는 데이터 )
  withScriptjs,
  withGoogleMap 
  // 상위 컴포넌트 (수정될 가능성이 있는 구성요소를 반환하는 구성요소)
  //withScriptJS 및 withGoogleMap의 형식화는 일반적으로 HOCS를 보는 더 좋은 방법
)(ShowRoute);
