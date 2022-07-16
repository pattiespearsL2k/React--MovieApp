import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import movie1 from "../../assets/mp4/movie1.mp4";
import movie2 from "../../assets/mp4/movie2.mp4";
import movie3 from "../../assets/mp4/movie3.mp4";
import TrailerView from "../trailerView/trailerView";
import "./slideHome.css";

SwiperCore.use([Autoplay, Pagination, Navigation]);

SlideHome.propTypes = {};
const moviesSlide = [
  {
    id: 1,
    name: "THOR: LOVE AND THUNDER",
    digital: "2D",
    movieDemo: movie1,
    movieLink: "https://www.youtube.com/watch?v=Rt_UqUm38BI",
  },
  {
    id: 2,
    name: "CONAN: THE BRIDE OF HALLOWEEN",
    digital: "2D",
    movieDemo: movie2,
    movieLink: "https://www.youtube.com/embed/XRm1P7oGpMQ",
  },
  {
    id: 3,
    name: "POPORO: CUỘC PHIÊU LƯU ĐẾN ĐẢO KHỦNG LONG",
    digital: "IMAX",
    movieDemo: movie3,
    movieLink: "https://www.youtube.com/embed/odM92ap8_c0",
  },
];

function SlideHome(props) {
  return (
    <Swiper
      className="mySwiper swiper-container mySwiper"
      loop={true}
      centeredSlides={true}
      autoplay={{
        delay: 30000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
    >
      {moviesSlide.map((movie, index) => (
        <SwiperSlide className="swiper-slide" key={movie.id}>
          <section className="pageMovie">
            <div>
              <video
                src={movie.movieDemo}
                muted="true"
                autoplay="true"
                loop="true"
              ></video>
              <div className="overlay"></div>
              <div className="slideVideo--content">
                <div className="slideVideo--content__name">{movie.name}</div>
              </div>
            </div>
          </section>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SlideHome;
