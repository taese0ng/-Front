import React from 'react'
import '../css/Banner.scss'
import Slider from "infinite-react-carousel";
import arrowRight from '../assets/arrow-right.png'
import arrowLeft from '../assets/arrow-left.png'

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        marginTop: "125px",
        marginRight: "20px",
        height: "50px",
        width: "50px",
      }}
      onClick={onClick}
    >
      <img
        width="50px"
        src={arrowRight}
        alt="arrow-right"
      />
    </div>
  );
}


function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        marginTop: "125px",
        marginLeft: "20px",
        height: "50px",
        width: "50px",
      }}
      onClick={onClick}
    >
      <img
        width="50px"
        src={arrowLeft}
        alt="arrow-left"
      />
    </div>
  );
}

function Banner(){
    const settings = {
      className: "Banner",
      dots:true,
      autoplay: true,
      pauseOnHover: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };

    return (
      <Slider {...settings} className="slider">
        <div>
          <img
            width="100%"
            height="100%"
            alt="피사의사탑"
            src="https://img.huffingtonpost.com/asset/5d81573a230000580556dcd2.jpeg?ops=scalefit_630_noupscale"
          />
        </div>
        <div>
          <img
            height="100%"
            alt="콜로세움"
            src="https://t1.daumcdn.net/cfile/tistory/997861485CE3D49F25"
          />
        </div>
        <div>
          <img
            width="100%"
            height="100%"
            alt="어디 예쁜도시"
            src="https://travelpost.kr/wp-content/uploads/2015/12/venice.jpg"
          />
        </div>
        <div>
          <img
            width="100%"
            height="100%"
            alt="아유타야"
            src="https://img-wishbeen.akamaized.net/spot/1414596460961_t.JPG"
          />
        </div>
        <div>
          <img
            width="100%"
            height="100%"
            alt="유럽이쁜다리"
            src="https://i0.wp.com/www.valisemag.com/wp-content/uploads/2017/01/London-Sights-Featured.jpeg?fit=1910%2C999&ssl=1"
          />
        </div>
      </Slider>
    );
}

export default Banner;