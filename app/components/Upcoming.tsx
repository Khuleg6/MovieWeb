"use client"; // Хэрэв Next.js ашиглаж байгаа бол заавал бичнэ
import React, { useEffect, useState } from "react";
import { Movie, MovieSearch, VideoResult } from "../types";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Star } from "./Star";
import { SwiperM } from "./Swiper";

export const Upcoming = () => {
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [trailer, setTrailer] = useState<VideoResult[]>([]);

  useEffect(() => {
    fetch(
      " https://api.themoviedb.org/3/trending/movie/day?api_key=d67d8bebd0f4ff345f6505c99e9d0289",
    )
      .then((res) => res.json())
      .then((data) => {
        setUpcoming(data.results);
      });
  }, []);
  useEffect(() => {
    fetch(
      " https://api.themoviedb.org/3/movie/550/videos?api_key=e9d4d5685134cf9beea42eb980587ebd",
    )
      .then((res) => res.json())
      .then((data) => {
        setTrailer(data.results);
      });
  }, []);

  return (
    <div className="pt-6">
      <Swiper
        // Модулиудаа идэвхжүүлнэ
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0} // Слайд хоорондын зай
        slidesPerView={1} // Нэг удаа харагдах слайдны тоо
        navigation={true} // Сумнууд харуулах
        pagination={{ clickable: true }} // Доорх цэгүүд
        autoplay={{ delay: 5000 }} // Автоматаар гүйлгэх
        className=""
      >
        {upcoming.slice(0, 5).map((trend) => (
          <SwiperSlide>
            <SwiperM trend={trend} key={trend.id} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Tailwind ашиглан Swiper-ийн сумны өнгийг өөрчлөх "Trick" */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: black !important;
        }
        .swiper-pagination-bullet-active {
          background: #3b82f6 !important;
        }
        .swiper-pagination-bullet {
          background: #888;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};
