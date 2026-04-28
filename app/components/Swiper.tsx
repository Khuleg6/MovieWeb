import React, { useEffect, useState } from "react";
import { Movie, VideoResult } from "../types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";

export const SwiperM = ({ trend }: { trend: Movie }) => {
  const [trailer, setTrailer] = useState<VideoResult[]>([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${trend.id}/videos?api_key=e9d4d5685134cf9beea42eb980587ebd`,
      )
      .then((res) => {
        const trailers = res.data.results.filter(
          (video: VideoResult) =>
            video.type === "Trailer" && video.site === "YouTube",
        );
        setTrailer(trailers);
      });
  }, []);
  return (
    <div>
      <img
        className="w-full h-[800px] relative object-cover object-center"
        src={`https://image.tmdb.org/t/p/original${trend.backdrop_path}`}
        alt=""
      />
      <div className="absolute z-2 left-[140px] top-[258px] gap-10">
        <p className="text-white font-normal leading-6 text-[18px]">
          Now Playing:
        </p>
        <h1 className="text-white pb-3 font-bold text-5xl leading-10">
          {trend.title}
        </h1>
        <div className="flex items-center gap-1">
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.1667 0.5L15.7717 7.80333L23.8333 8.98167L18 14.6633L19.3767 22.69L12.1667 18.8983L4.95667 22.69L6.33333 14.6633L0.5 8.98167L8.56167 7.80333L12.1667 0.5Z"
              fill="#FDE047"
              stroke="#FDE047"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-white text-[18px] font-bold leading-7">
            {trend.vote_average}
          </span>
          <span className="text-gray-500 text-[14px] font-bold leading-7">
            /10
          </span>
        </div>
        <p className="w-[320px] text-white text-[15px] pb-6 font-normal leading-4 pt-6">
          {trend.overview}
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <button className="h-[40px] py-[8px] px-[16px] bg-white rounded-md flex items-center gap-1.5">
              <svg
                width="11"
                height="13"
                viewBox="0 0 11 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.5 0.5L9.83333 6.5L0.5 12.5V0.5Z"
                  stroke="#18181B"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Watch Trailer
            </button>
          </DialogTrigger>
          <DialogContent
            className="w-full min-w-5xl h-[60vh] p-0 overflow-hidden"
            showCloseButton={false}
          >
            <DialogHeader>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailer[0]?.key}?autoplay=0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-md "
              ></iframe>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
