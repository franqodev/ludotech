import React from "react";
import { Swiper, SwiperSlide } from "swiper/React";
import SwiperCore, {
  EffectFlip,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";

SwiperCore.use([EffectFlip, Pagination, Navigation, Autoplay]);

const ArticleCaroulsel = (props) => {
  return (
    <div className="swiperBox">
      <Swiper
        effect={"flip"}
        grabCursor={true}
        pagination={true}
        navigation={true}
        className="swiper"
        autoplay={true}
      >
        {props.photos.map((photo) => (
          <SwiperSlide>
            <div
              className="swiperSlide"
              style={{ backgroundImage: `url('${photo}')` }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ArticleCaroulsel;
