"use client";

import { Upcoming } from "./components/Upcoming";
import { Card } from "./components/Card";
import { Footer } from "./components/Footer";
import { useEffect, useState } from "react";
import { Genres, Movie, MovieSearch } from "./types";

import Link from "next/link";

import { Navigations } from "./components/navigations";

export default function Home() {
  const [toprated, setTopRated] = useState<Movie[]>([]);

  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=d67d8bebd0f4ff345f6505c99e9d0289",
    )
      .then((res) => res.json())
      .then((data) => {
        setUpcoming(data.results);
      });
  }, []);
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=d67d8bebd0f4ff345f6505c99e9d0289",
    )
      .then((res) => res.json())
      .then((data) => {
        setPopular(data.results);
      });
  }, []);
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=d67d8bebd0f4ff345f6505c99e9d0289",
    )
      .then((res) => res.json())
      .then((data) => {
        setTopRated(data.results);
      });
  }, []);

  return (
    <div className="h-[4184px] w-full">
      <Navigations />
      <div className="pt-[22px]">
        <Upcoming />
      </div>
      <div className="flex flex-col items-center w-full pt-[52px] gap-[52px]">
        <div className="container flex justify-between w-full">
          <div>
            <h1 className="w-full font-semibold tracking-[0.6px] leading-8 text-2xl">
              Upcoming
            </h1>
          </div>
          <div className="">
            <Link
              href={`/movies/upcoming`}
              className="flex items-center gap-2 w-full font-normal tracking-[0.6px] leading-8 text-ls"
            >
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
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-5 grid-rows-2 w-[2100px] w-fit relative gap-10 items-center justify-center px-20">
          {upcoming.slice(0, 10).map((upcome) => (
            <Card size="w-[270px]" upcome={upcome} key={upcome.id} />
          ))}
        </div>
        <div className="container flex justify-between w-full">
          <div>
            <h1 className="w-full font-semibold tracking-[0.6px] leading-8 text-2xl">
              Popular
            </h1>
          </div>
          <div className="">
            <Link
              href={`/movies/popular`}
              className="flex items-center gap-2 w-full font-normal tracking-[0.6px] leading-8 text-ls"
            >
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
            </Link>
          </div>
        </div>
        <div className=" grid grid-cols-5 grid-rows-2 w-[2100px] w-fit gap-10 items-center justify-center px-20 ">
          {popular.slice(0, 10).map((upcome) => (
            <Card size="w-[270px]" upcome={upcome} key={upcome.id} />
          ))}
        </div>
        <div className="container flex justify-between w-full">
          <div>
            <h1 className="w-full font-semibold tracking-[0.6px] leading-8 text-2xl">
              Top Rated
            </h1>
          </div>
          <div className="">
            <Link
              href={`/movies/toprated`}
              className="flex items-center gap-2 w-full font-normal tracking-[0.6px] leading-8 text-ls"
            >
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
            </Link>
          </div>
        </div>
        <div className=" grid grid-cols-5 grid-rows-2 w-[2100px] w-fit gap-10 items-center justify-center px-20 ">
          {toprated.slice(0, 10).map((upcome) => (
            <Card size="w-[270px]" upcome={upcome} key={upcome.id} />
          ))}
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
