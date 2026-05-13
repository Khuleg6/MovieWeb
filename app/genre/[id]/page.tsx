"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import axios from "axios";
import { Genres, Movie } from "@/app/types";

import { Card } from "@/app/components/Card";
import { Footer } from "@/app/components/Footer";
import { Paginationultra } from "@/app/components/pagination";

import { Navigations } from "@/app/components/navigations";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [genres, setGenres] = useState<Genres[]>([]);
  const [page, setPage] = useState(1);
  const { id } = useParams();

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
      <Navigations />
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
              <Card
                size="w-[300px]"
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster={movie.poster_path}
                rating={movie.vote_average}
              />
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
