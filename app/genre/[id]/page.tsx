"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Genres, Movie, MovieSearch } from "@/app/types";
import { Logo } from "@/app/components/Logo";
import { Iconbutton } from "@/app/components/Iconbutton";
import { Card } from "@/app/components/Card";
import { Footer } from "@/app/components/Footer";
import { Paginationultra } from "@/app/components/pagination";
import { Star } from "@/app/components/Star";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const [moviesearch, setMovieSearch] = useState<MovieSearch[]>([]);
  const [genres, setGenres] = useState<Genres[]>([]);
  const [isVisbile, setisVisible] = useState(false);
  const [query, setQuery] = useState("");

  const [page, setPage] = useState(1);
  const { id } = useParams();

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
  const toggleGenre = (genreId: number) => {
    setSelectedGenres(
      (prev) =>
        prev.includes(genreId)
          ? prev.filter((id) => id !== genreId) // Байвал хасна
          : [...prev, genreId], // Байхгүй бол нэмнэ
    );
    setPage(1); // Төрөл солигдоход хуудсыг 1 болгоно
  };

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=d67d8bebd0f4ff345f6505c99e9d0289",
    )
      .then((res) => res.json())
      .then((data) => setGenres(data.genres));
  }, []);
  useEffect(() => {
    const fetchMoviesByGenres = async () => {
      // Сонгогдсон төрөл байхгүй бол popular кино харуулж болно эсвэл хоосон орхиж болно
      const genreString = selectedGenres.join(",");

      try {
        const res = await axios.get(
          "https://api.themoviedb.org/3/discover/movie",
          {
            params: {
              api_key: "d67d8bebd0f4ff345f6505c99e9d0289",
              with_genres: genreString,
              page: page,
            },
          },
        );
        setMovies(res.data.results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMoviesByGenres();
  }, [selectedGenres, page]);

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
            className=" border h-[36px] rounded-lg border-gray-200 w-[379px] px-[12px]"
          ></input>
          {moviesearch.length === 0 && query !== "" ? (
            <div
              className={`bg-white border border-gray-50 absolute top-12 rounded-lg flex justify-center items-center mt-4 flex-col gap-2  px-4 w-[577px] h-[100px] z-50 ${query.length > 0 ? "visible" : "invisible"} `}
            >
              No results found.
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
            </div>
          )}
        </div>
        <Iconbutton />
      </div>

      <div className="flex items-start w-full pt-[52px] px-16 gap-[52px]">
        <div className="w-[500px] p-16">
          <div>Genres</div>
          <div>See lists of movies by genre</div>
          <hr className="border border-[#e4e4e7] my-4"></hr>
          <div className="flex flex-wrap gap-2.5 w-[300px]">
            {genres.map((g) => {
              const isActive = selectedGenres.includes(g.id); // Сонгогдсон эсэхийг шалгах

              return (
                <button
                  key={g.id}
                  onClick={() => toggleGenre(g.id)}
                  className={`border rounded-full text-xs font-semibold py-1 px-4 flex items-center gap-2 cursor-pointer transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary" // bg-black-ийн оронд primary ашиглах
                      : "border-border text-foreground hover:bg-accent"
                  }`}
                >
                  {g.name}
                  {isActive && <span>✕</span>}{" "}
                  {/* Хасах тэмдэг харуулж болно */}
                </button>
              );
            })}
          </div>
        </div>

        <div className=" p-16 w-full">
          <h1 className="text-xs font-semibold mb-6">Genre: {id}</h1>
          <div className="flex gap-10 flex-wrap">
            {movies.slice(0, 12).map((movie) => (
              <Card key={movie.id} upcome={movie} />
            ))}
          </div>
        </div>
      </div>
      <div className="pt-10 flex justify-end pr-40">
        <Paginationultra page={page} setPage={setPage} />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
