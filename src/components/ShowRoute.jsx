/*global kakao*/

import React, { Component } from 'react';
import DummyLocations from "./DummyLocations";
import '../css/ShowRoute.scss';



class ShowRoute extends Component {

    componentDidMount() {
        let el = document.getElementById('map');

        const script = document.createElement('script');
        script.async = true;
        script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=60c6aa1625d0fa0ff4875eb7917e607a&autoload=false";
        document.head.appendChild(script);

        script.onload = () => {
            let map;
            kakao.maps.load(() => {


                map = new kakao.maps.Map(el, {
                    center: new kakao.maps.LatLng(34.7516329613, 127.7140048886),
                });
                var bounds = new kakao.maps.LatLngBounds();

                DummyLocations.map((elem, index) => {
                    //     console.log(elem)

                    var to = new kakao.maps.LatLng(elem.to.lat, elem.to.lng);
                    var from = new kakao.maps.LatLng(elem.from.lat, elem.from.lng);
                    var marker = new kakao.maps.Marker({
                        map: map, // 마커를 표시할 지도
                        position: from, // 마커를 표시할 위치
                        title: index + 1 // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                    });

                    var polyline = new kakao.maps.Polyline({
                        path: [from, to], // 선을 구성하는 좌표배열 입니다
                        strokeWeight: 5, // 선의 두께 입니다
                        strokeColor: 'red', // 선의 색깔입니다
                        strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                        strokeStyle: 'dashed' // 선의 스타일입니다

                    });

                    if (index + 1 === DummyLocations.length) {
                        marker = new kakao.maps.Marker({
                            map: map, // 마커를 표시할 지도
                            position: to, // 마커를 표시할 위치
                            title: index + 2 // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                        });
                    }


                    bounds.extend(to);
                    bounds.extend(from);
                    //polyline.setMap(map);
                    return null;
                });
                


                map.setBounds(bounds);
            });

        };
    }

    render() {
        return (
            <div className="ShowRoute" id="map"></div>
        );
    }
}
export default ShowRoute;