"use client";
import { Card } from "@/app/components/Card";
import { Footer } from "@/app/components/Footer";
import { Iconbutton } from "@/app/components/Iconbutton";
import { Logo } from "@/app/components/Logo";
import { Navigations } from "@/app/components/navigations";
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
      <Navigations />
      <div className="container mx-auto flex pt-20 gap-7  ">
        <div className="grid grid-cols-4 grid-rows-2 gap-10">
          {moviesearch.slice(0, 12).map((movie) => (
            <Card key={movie.id} upcome={movie} size="w-[250px]" />
          ))}
        </div>
        <div className="flex flex-wrap  gap-4 w-[350px] h-[250px]">
          {genres.map((genre) => (
            <Link
              href={`/genre/${genre.id}`}
              key={genre.id}
              className="border rounded-full text-xs font-semibold py-1 px-4 flex items-center gap-2 cursor-pointer transition-all"
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
