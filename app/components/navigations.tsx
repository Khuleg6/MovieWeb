"use client";
import { useEffect, useState } from "react";
import { Genres, MovieSearch } from "../types";
import { Logo } from "./Logo";
import Link from "next/link";
import { Iconbutton } from "./Iconbutton";
import axios from "axios";
import { Star } from "./Star";
import { useTheme } from "next-themes";

export const Navigations = () => {
  const [moviesearch, setMovieSearch] = useState<MovieSearch[]>([]);
  const [genres, setGenres] = useState<Genres[]>([]);
  const [isVisbile, setisVisible] = useState(false);
  const [query, setQuery] = useState("");
  const { theme, setTheme } = useTheme();

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
  return (
    <div className=" px-60 w-full flex p-8 justify-between  items-center bg-white dark:bg-gray-900">
      <Link href={"/"}>
        <Logo isDark={false} />
      </Link>

      <div className="gap-3 flex ">
        <button
          onClick={() => {
            setisVisible(!isVisbile);
          }}
          className="w-[97px] h-[36px] flex justify-evenly items-center border border-gray-200 rounded-lg"
        >
          {" "}
          {theme === "light" ? (
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
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="#FFFFFF"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          Genre
        </button>
        <div
          data-shown={isVisbile}
          className="p-5 w-[557px] bg-white border invisible opacity-0 duration-300 border-[#e4e4e7] rounded-lg z-2 items-start absolute mt-12 data-[shown=true]:visible data-[shown=true]:opacity-100 dark:bg-black "
        >
          <div>Genres</div>
          <div>See lists of movies by genre</div>
          <hr className="border border-[#e4e4e7] my-4"></hr>
          <div className="flex  flex-wrap gap-4">
            {genres.map((g) => (
              <Link key={g.id} href={`/genre/${g.id}`}>
                <button className="border border[#e4e4e7] text-xs font-semibold leading-4 rounded-full py-0.5 pl-2.5 flex items-center gap-2 cursor-pointer pr-2 hover: opacity-80">
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
            searchMovies(e.target.value);
            if (isVisbile) {
              setisVisible(false);
            }
          }}
          className=" border h-[36px] rounded-lg border-gray-200 w-[379px] px-[12px] outline-0"
        ></input>
        {moviesearch.length === 0 && query !== "" ? (
          <div
            className={`bg-white border border-gray-50 absolute top-12 rounded-lg flex justify-center items-center mt-7 flex-col gap-2  px-4 w-[577px] h-[100px] z-50 ${query.length > 0 ? "visible" : "invisible"} dark:bg-black `}
          >
            No results found.
          </div>
        ) : (
          <div
            className={`bg-white border border-gray-50 absolute top-12 rounded-lg gap-2  w-[577px] min-h-[128px] mt-7 z-50 ${query.length > 0 ? "visible" : "invisible"} dark:bg-black`}
          >
            {moviesearch.slice(0, 5).map((movsearch) => (
              <Link
                href={`/details/${movsearch.id}`}
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
              <p className="my-3 mx-4 text-[14px] font-medium">
                See all result for <span>"{query}"</span>
              </p>
            </Link>
          </div>
        )}
      </div>
      <Iconbutton />
    </div>
  );
};
