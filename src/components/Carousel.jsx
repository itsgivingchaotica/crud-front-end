import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import { Navigation, Pagination, A11y } from 'swiper/modules';
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Carousel = (props) => {
  return (
    <div className="carousel-container">
    <Swiper className="carousel" modules={[Navigation, Pagination, A11y]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={50}
        slidesPerView={props.numEnrolled <2 ? 1 : 2}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
    >
        {!(props.numEnrolled > 1)? <SwiperSlide>
        <h3 className="carousel-name">No Students Enrolled</h3> 
        <img className="carousel-image" src='data:image/jpeg;base64,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' />
        </SwiperSlide>
    :props.slides.map((slide) => (
        <SwiperSlide key={slide.id}>
            <h1 className="carousel-name" onClick={()=> props.handleSelectStudent(slide.id)}>
                {slide.firstName + " " + slide.lastName} 
            </h1>
            <img className="carousel-image" src={slide.imageUrl}/>
        </SwiperSlide>))}          
    </Swiper>
    </div>
  )
}

export default Carousel