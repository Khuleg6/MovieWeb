"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Genres, Movie, MovieSearch } from "@/app/types";
import { Card } from "@/app/components/Card";
import { Footer } from "@/app/components/Footer";
import { Paginationultra } from "@/app/components/pagination";

import { Star } from "@/app/components/Star";
import { Navigations } from "@/app/components/navigations";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { type }: { type: "upcoming" | "popular" | "toprated" } = useParams();
  const [page, setPage] = useState(1);

  const titlechange = () => {
    if (type === "upcoming") {
      return <p>Upcoming</p>;
    } else if (type === "popular") {
      return <p>Popular</p>;
    } else if (type === "toprated") {
      return <p>Top Rated</p>;
    }
  };

  useEffect(() => {
    if (!type) return;

    fetch(
      `https://api.themoviedb.org/3/movie/${type === "toprated" ? "top_rated" : type}?api_key=d67d8bebd0f4ff345f6505c99e9d0289&page=${page}`,
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  }, [type, page]);

  return (
    <div className=" w-full">
      <Navigations />

      <div className="flex flex-col items-center w-full pt-[52px] gap-[52px]">
        <div className="container flex justify-between w-full">
          <div>
            <h1 className="w-full font-semibold tracking-[0.6px] leading-8 text-2xl">
              {titlechange()}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-5 grid-rows-2 w-[2100px] w-fit relative gap-10 items-center justify-center px-20">
          {movies.map((upcome) => (
            <Card size="w-[270px]" upcome={upcome} key={upcome.id} />
          ))}
        </div>
      </div>
      <div className=" pt-10 flex justify-end pr-88">
        <Paginationultra page={page} setPage={setPage} />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
