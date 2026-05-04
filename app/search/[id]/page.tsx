"use client";
import { Card } from "@/app/components/Card";
import { Footer } from "@/app/components/Footer";
import { Iconbutton } from "@/app/components/Iconbutton";
import { Logo } from "@/app/components/Logo";
import { Paginationultra } from "@/app/components/pagination";

import { Genres, Movie, MovieSearch } from "@/app/types";
import axios from "axios";
import { Star } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [moviesearch, setMovieSearch] = useState<MovieSearch[]>([]);
  const [genres, setGenres] = useState<Genres[]>([]);
  const params = useParams();
  const searchId = decodeURIComponent(params.id as string);
  const [isVisbile, setisVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=d67d8bebd0f4ff345f6505c99e9d0289`,
      )
      .then((res) => setGenres(res.data.genres));
  }, []);

  useEffect(() => {
    if (searchId) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?query=${searchId}&api_key=d67d8bebd0f4ff345f6505c99e9d0289&page=${page}`,
        )
        .then((res) => setMovieSearch(res.data.results));
    }
  }, [searchId, page]);

  return (
    <div className=" w-full">
      <div className="w-full px-16 flex justify-between  items-center pt-4">
        <Link href="/">
          <Logo isDark={false} />
        </Link>
        <div className="gap-3 flex ">
          <button
            onClick={() => {
              setisVisible(!isVisbile);
            }}
            className="w-[97px] h-[36px] flex justify-evenly items-center border border-gray-200 rounded-lg"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="#18181B"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Genre
          </button>
          <div
            data-shown={isVisbile}
            className="p-5 w-[557px] bg-white border invisible opacity-0 duration-300 border-[#e4e4e7] rounded-lg z-2 items-start absolute mt-12 data-[shown=true]:visible data-[shown=true]:opacity-100 "
          >
            <div>Genres</div>
            <div>See lists of movies by genre</div>
            <hr className="border border-[#e4e4e7] my-4"></hr>
            <div className="flex  flex-wrap gap-4">
              {genres.map((g) => (
                <Link key={g.id} href={`/genre/${g.id}`}>
                  <button className="border border[#e4e4e7] rounded-full py-0.5 pl-2.5 flex items-center gap-2 cursor-pointer pr-2 hover: opacity-80">
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
                </Link>
              ))}
            </div>
          </div>
          <input
            value={query}
            placeholder="Search..."
            onChange={(e) => {
              setQuery(e.target.value);

              if (isVisbile) {
                setisVisible(false);
              }
            }}
            className=" border h-[36px] rounded-lg border-gray-200 w-[379px] px-[12px]"
          ></input>
          {moviesearch.length === 0 && query !== "" ? (
            <div>
              <div
                className={`bg-white border border-gray-50 absolute top-12 rounded-lg flex justify-center items-center mt-4 flex-col gap-2  px-4 w-[577px] h-[100px] z-50 ${query.length > 0 ? "visible" : "invisible"} `}
              >
                No results found.
              </div>
              <Link href={`/search/${encodeURIComponent(query)}`}>
                <p>
                  See all result for <span>"{query}"</span>
                </p>
              </Link>
            </div>
          ) : (
            <div
              className={`bg-white border border-gray-50 absolute top-12 rounded-lg gap-2  w-[577px] min-h-[128px] mt-4 z-50 ${query.length > 0 ? "visible" : "invisible"} `}
            >
              {moviesearch.slice(0, 5).map((movsearch) => (
                <Link
                  href={`details/${movsearch.id}`}
                  key={movsearch.id}
                  className="flex justify-between items-end p-4 mt-1 border-b border-gray-200"
                >
                  <div className="flex gap-3">
                    <div className="w-[67px] h-[100px]">
                      <img
                        className="w-full h-full rounded-lg "
                        src={`https://image.tmdb.org/t/p/w500${movsearch.poster_path}`}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[20px] font-semibold leading-[28xpx]">
                        {movsearch.title}{" "}
                      </p>
                      <Star movie={movsearch} />
                      <p className="text-[14px] font-medium leading-5 pt-3">
                        {movsearch.release_date?.split("-")[0]}
                      </p>
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
                </Link>
              ))}
              <Link href={`/search/${encodeURIComponent(query)}`}>
                <p>
                  See all result for <span>"{query}"</span>
                </p>
              </Link>
            </div>
          )}
        </div>
        <Iconbutton />
      </div>
      <div className="flex pt-20 gap-7 justify-evenly ">
        <div className="flex flex-wrap  gap-4 w-[350px] h-[350px]">
          {genres.map((genre) => (
            <Link
              href={`/genre/${genre.id}`}
              key={genre.id}
              className="border cursor-pointer duration-300   text-xs font-semibold py-0.5 pl-2.5 pr-2 border-[#E4E4E7] rounded-full flex items-center gap-2  hover:bg-[#E4E4E7]"
            >
              {genre.name}
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
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-4 grid-rows-2 gap-10">
          {moviesearch.slice(0, 12).map((movie) => (
            <Card key={movie.id} upcome={movie} size="w-[250px]" />
          ))}
        </div>
      </div>

      <div className="pt-10 flex justify-center ">
        <Paginationultra page={page} setPage={setPage} />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
