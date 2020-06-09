/*global kakao*/

import React, { Component } from 'react';
import DummyLocations from "./DummyLocations";
import '../css/ShowRoute.scss';
import { kakaoMapsKey } from '../key'
import { connect } from "react-redux";
let map;
let script;
var bounds;
var polyline =[];
class ShowRoute_R extends Component {


    onUnload(event) {
        alert('page Refreshed')
    }

    componentDidUpdate() {
        
        const { latlng } = this.props

        console.log(latlng,"여기다");
        polyline.forEach(elem =>{
            elem.setMap(null);
        })
    
                latlng.map((elem, index) => 
                {
                    if (latlng.length > index+1) {
                        var to = new kakao.maps.LatLng(latlng[index+ 1].lat, latlng[index+ 1].lng);
                        var from = new kakao.maps.LatLng(latlng[index].lat, latlng[index].lng);
                        var marker = new kakao.maps.Marker({
                            map: map, // 마커를 표시할 지도
                            position: from, // 마커를 표시할 위치
                            title: index + 1 // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                        });

                        let polylineTemp = new kakao.maps.Polyline({
                            path: [from, to], // 선을 구성하는 좌표배열 입니다
                            strokeWeight: 5, // 선의 두께 입니다
                            strokeColor: 'red', // 선의 색깔입니다
                            strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                            strokeStyle: 'dashed' // 선의 스타일입니다

                        });

                        polyline.push(polylineTemp)


                        if (index  === latlng.length-2) {

                            marker = new kakao.maps.Marker({
                                map: map, // 마커를 표시할 지도
                                position: to, // 마커를 표시할 위치
                                title: index + 2 // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                            });
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
                        return null;
                    }

                    
                });



            map.setBounds(bounds);


       
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
function mapStateToProps(state) {
    return {
        latlng: state.latlng
    };
}

export default connect(mapStateToProps)(ShowRoute_R);