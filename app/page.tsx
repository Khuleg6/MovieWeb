"use client";
import Image from "next/image";
import { Logo } from "./components/Logo";
import { Iconbutton } from "./components/Iconbutton";
import { Upcoming } from "./components/Upcoming";
import { Card } from "./components/Card";
import { Footer } from "./components/Footer";
import { useEffect, useState } from "react";
import { Genres, Movie, MovieSearch } from "./types";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Star } from "./components/Star";
import axios from "axios";
import { log } from "console";

export default function Home() {
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [toprated, setTopRated] = useState<Movie[]>([]);
  const [moviesearch, setMovieSearch] = useState<MovieSearch[]>([]);
  const [genres, setGenres] = useState<Genres[]>([]);
  const [isVisbile, setisVisible] = useState(false);
  const [query, setQuery] = useState("");

  const searchMovies = async (q: string) => {
    if (!q) {
      setMovieSearch([]);
      return;
    }
    try {
      const res = await axios.get("https://api.themoviedb.org/3/search/movie", {
        params: {
          api_key: "d67d8bebd0f4ff345f6505c99e9d0289",
          query: q,
        },
      });
      setMovieSearch(res.data.results);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=d67d8bebd0f4ff345f6505c99e9d0289",
    )
      .then((res) => res.json())
      .then((data) => setGenres(data.genres));
  }, []);

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
  // useEffect(() => {
  //   fetch(
  //     "https://api.themoviedb.org/3/discover/movie?api_key=d67d8bebd0f4ff345f6505c99e9d0289",
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setMovieSearch(data.results);
  //     });
  // }, []);

  return (
    <div className="h-[4184px] w-full">
      <div className="w-full px-16 flex justify-between  items-center">
        <Logo />
        <div className="gap-3 flex ">
          <button
            onClick={() => {
              setisVisible(!isVisbile);
            }}
            className="w-[97px] h-[36px] border border-gray-200 rounded-lg"
          >
            Genre
          </button>
          <div
            data-shown={isVisbile}
            className="p-5 w-[557px] bg-white border invisible opacity-0 duration-300 border-[#e4e4e7] rounded-lg  items-start absolute mt-12 data-[shown=true]:visible data-[shown=true]:opacity-100 "
          >
            <div>Genres</div>
            <div>See lists of movies by genre</div>
            <hr className="border border-[#e4e4e7] my-4"></hr>
            <div className="flex  flex-wrap gap-4">
              {genres.map((g) => (
                // <Link key={g.id} href={`/genre/${g.id}`}>
                <button
                  key={g.id}
                  className="border border[#e4e4e7] rounded-full py-0.5 pl-2.5 flex items-center gap-2 cursor-pointer pr-2 hover: opacity-80"
                >
                  {g.name}
                  <svg
                    width="5"
                    height="9"
                    viewBox="0 0 5 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.5 8.5L4.5 4.5L0.5 0.5"
                      stroke="#09090B"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              ))}
            </div>
          </div>
          <input
            value={query}
            placeholder="Search..."
            onChange={(e) => {
              setQuery(e.target.value);
              searchMovies(e.target.value);
              if (isVisbile) {
                setisVisible(false);
              }
            }}
            className=" border h-[36px] rounded-lg border-gray-200 w-[379px] px-[12px]"
          ></input>
          {moviesearch.length === 0 && query !== "" ? (
            <div
              className={`bg-white border border-gray-50 absolute top-12 rounded-lg flex justify-center items-center flex-col gap-2  px-4 w-[577px] min-h-[128px] z-50 ${query.length > 0 ? "visible" : "invisible"} `}
            >
              not found
            </div>
          ) : (
            <div
              className={`bg-white border border-gray-50 absolute top-12 rounded-lg gap-2  px-4 w-[577px] min-h-[128px] z-50 ${query.length > 0 ? "visible" : "invisible"} `}
            >
              {moviesearch.slice(0, 5).map((movsearch) => (
                <div
                  key={movsearch.id}
                  className="flex justify-between items-center border-b border-gray-200 pb-2 mb-2"
                >
                  <div className="flex gap-3">
                    <div className="w-[67px] h-[100px]">
                      <img
                        className="w-full h-full  "
                        src={`https://image.tmdb.org/t/p/w500${movsearch.poster_path}`}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <p>{movsearch.title} </p>
                      <Star movie={movsearch} />
                      <p>{movsearch.release_date?.split("-")[0]}</p>
                    </div>
                  </div>
                  <div className=" flex items-center gap-1 cursor-pointer ">
                    <span>See more</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.33301 7.99967H12.6663M12.6663 7.99967L7.99967 3.33301M12.6663 7.99967L7.99967 12.6663"
                        stroke="#18181B"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div
                    className={`text-[14px] text-center pt-10  ${query !== "" && moviesearch.length === 0 ? "visible" : "invisible"}`}
                  >
                    Not found
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Iconbutton />
      </div>
      <div className="pt-[22px]">
        <Upcoming />
      </div>
      <div className="flex flex-col items-center pt-[52px] gap-[52px]">
        <h1 className="justify-start w-full px-58 font-bold text-3xl">
          Upcoming
        </h1>

        <div className="grid grid-cols-5 grid-rows-2 w-[2100px] gap-10 items-center justify-center px-20">
          {upcoming.slice(0, 10).map((upcome) => (
            <Card upcome={upcome} key={upcome.id} />
          ))}
        </div>
        <h1 className="font-bold text-3xl w-full  px-58 justify-start">
          Popular
        </h1>
        <div className=" grid grid-cols-5 grid-rows-2 w-[2100px] gap-10 items-center justify-center px-20 ">
          {popular.slice(0, 10).map((upcome) => (
            <Card upcome={upcome} key={upcome.id} />
          ))}
        </div>
        <h1 className="font-bold text-3xl w-full  px-58 justify-start">
          Top Rated
        </h1>
        <div className=" grid grid-cols-5 grid-rows-2 w-[2100px] gap-10 items-center justify-center px-20 ">
          {toprated.slice(0, 10).map((upcome) => (
            <Card upcome={upcome} key={upcome.id} />
          ))}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
