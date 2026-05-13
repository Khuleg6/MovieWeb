"use client";

import { Card } from "@/app/components/Card";
import { Footer } from "@/app/components/Footer";
import { Navigations } from "@/app/components/navigations";
import { Star } from "@/app/components/Star";
import { Morelike, MovieDetails } from "@/app/types";
import Link from "next/link";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function Home() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [morelikethis, setMorelikethis] = useState<Morelike[]>([]);

  const formatRuntime = (runtime?: number) => {
    if (!runtime) return "";
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    if (hours === 0) return `${minutes} min`;
    return `${hours} hour ${minutes} min`;
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=e9d4d5685134cf9beea42eb980587ebd&language=en-US`,
    )
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
      });
  }, [id]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=d67d8bebd0f4ff345f6505c99e9d0289`,
    )
      .then((res) => res.json())
      .then((data) => {
        setMorelikethis(data.results);
      });
  }, [id]);

  return (
    <div className=" w-full flex just-center flex-col items-center">
      <Navigations />
      <div className="container flex flex-col justify-center">
        <div className="pt-[22px] flex w-full gap-6  justify-between items-center">
          <div className="flex w-[211px] flex-col items-start gap-1">
            <p className="text-4xl font-bold leading-10">
              {movie?.original_title}
            </p>
            <p className="text-[18px] w-[500px] font-normal leading-7">
              {movie?.release_date} · {formatRuntime(movie?.runtime)}
            </p>
          </div>
          <div className="flex flex-col items-start">
            <p>Rating</p>
            <div>{movie && <Star rating={movie.vote_average} />}</div>
            <div className="flex h-12 items-center gap-1">
              <p>{movie?.vote_average.toFixed(1)}/10</p>
              <div>
                <p>{movie?.vote_count}K</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-10">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
            className="h-[550px] w-[420px]"
            alt=""
          />

          <iframe
            src={"https://www.vidking.net/embed/movie/" + id}
            width="100%"
            height="550"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="container mx-auto flex  flex-col gap-10">
        <div className="mt-8 flex gap-2">
          {movie?.genres?.map((genre) => (
            <div key={genre.id}>
              <button className="flex py-0.5 text-xs leading-4 font-semibold   px-2.5 gap-2.5 rounded-full border border-gray-300">
                {genre.name}
              </button>
            </div>
          ))}
        </div>
        <p className=" w-full font-xs font-normal leading-7 flex">
          {movie?.overview}
        </p>
        <div className="items-start flex flex-col gap-5">
          <div className="w-full flex flex-col gap-4">
            <div className="flex gap-4">
              <p className="font-bold">Director</p>
              <p>Unknown</p>
            </div>
            <hr className="w-full border border-[#e4e4e7]"></hr>
            <div className="w-full flex gap-4">
              <p className="font-bold">Writers</p>
              <p>Unknown</p>
            </div>
            <hr className="w-full border border-[#e4e4e7]"></hr>
            <div className="w-full flex gap-4 ">
              <p className="font-bold">Stars</p>
              <p>Unknown</p>
            </div>
            <hr className="w-full border border-[#e4e4e7]"></hr>
          </div>

          <div className="flex justify-between pt-5 pb-10 w-full">
            <div>
              <h1 className="w-full font-semibold tracking-[0.6px] leading-8 text-2xl">
                More Like this
              </h1>
            </div>
            <Link href={`/similar/${id}`} className="">
              <p className="flex items-center gap-2 w-full font-normal tracking-[0.6px] leading-8 text-ls">
                See more
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.5 5.16667H9.83333M9.83333 5.16667L5.16667 0.5M9.83333 5.16667L5.16667 9.83333"
                    stroke="#18181B"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </p>
            </Link>
          </div>
        </div>
      </div>

      <div className=" grid grid-cols-5 mx-auto w-fit gap-10 items-center justify-center px-20 ">
        {morelikethis.slice(0, 5).map((movie) => (
          <Card
            size="w-[280px]"
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster={movie.poster_path}
            rating={movie.vote_average}
          />
        ))}
      </div>

      <div className="w-full pt-20">
        <Footer />
      </div>
    </div>
  );
}
