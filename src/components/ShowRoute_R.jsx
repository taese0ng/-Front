/*global kakao*/

import React, { Component } from 'react';
import '../css/ShowRoute.scss';
import { kakaoMapsKey } from '../key';
import icon from '../assets/icon_howto.png';

let map;
let script;
var bounds;

class ShowRoute_R extends Component {
    constructor(props) {
        super(props);
        this.state = {
            polyline: [],
            markers: []
        }
    }

    onUnload(event) {
        alert('page Refreshed')
    }

    componentDidUpdate() {

        const { recommend } = this.props

        // console.log(recommend, "여기다");
        this.state.polyline.forEach(elem => {
            elem.setMap(null);
        })
        this.state.markers.forEach(elem => {
            elem.setMap(null);
        })

        recommend.map((elem, index) => {
            var markerImage = new kakao.maps.MarkerImage(
                `${icon}`, new kakao.maps.Size(52, 72),new kakao.maps.Point(26, 36));
            if (recommend.length > index + 1) {
                var to = new kakao.maps.LatLng(recommend[index + 1].lat, recommend[index + 1].lng);
                var from = new kakao.maps.LatLng(recommend[index].lat, recommend[index].lng);


                

                let markerTemp = new kakao.maps.Marker({
                    map: map, // 마커를 표시할 지도
                    image: markerImage,
                    position: from, // 마커를 표시할 위치
                    title: index + 1 // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                });

                let polylineTemp = new kakao.maps.Polyline({
                    path: [from, to], // 선을 구성하는 좌표배열 입니다
                    strokeWeight: 7, // 선의 두께 입니다
                    strokeColor: '#031EA8', // 선의 색깔입니다
                    strokeOpacity: 0.65, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                    strokeStyle: 'solid' // 선의 스타일입니다

                });

                this.state.polyline.push(polylineTemp);
                this.state.markers.push(markerTemp);

                if (index === recommend.length - 2) {

                    markerTemp = new kakao.maps.Marker({
                        map: map, // 마커를 표시할 지도
                        image: markerImage,
                        position: to, // 마커를 표시할 위치
                        title: index + 2 // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                    });

                    this.state.markers.push(markerTemp);
                }

                bounds.extend(to);
                bounds.extend(from);

                //오류 해결
                try {
                    polylineTemp.setMap(map);
                } catch (err) {
                    console.log(`error 발생 ~! \n${err}`);
                    window.location.reload();
                    //react가 먼저 사라져서 kakako script에서  오류나는 거니까 reload해줌
                }

                map.setBounds(bounds);
                return null;
            }
            return null;

        });
    }

    componentDidMount() {
        let el = document.getElementById('map');
        script = document.createElement('script');
        script.id = "script"
        script.async = true;
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapsKey}&autoload=false`;
        document.head.appendChild(script);

        script.onload = () => {

            kakao.maps.load(() => {
                map = new kakao.maps.Map(el, {
                    center: new kakao.maps.LatLng(34.7516329613, 127.7140048886),
                });
                bounds = new kakao.maps.LatLngBounds();
            });

        };
    }
    render() {

        return (
            <section className="ShowRoute" id="map"></section>
        );

    }
}
export default ShowRoute_R;