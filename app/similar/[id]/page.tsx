"use client";
import { Card } from "@/app/components/Card";
import { Footer } from "@/app/components/Footer";
import { Navigations } from "@/app/components/navigations";
import { Paginationultra } from "@/app/components/pagination";
import { Morelike, Movie, MovieDetails } from "@/app/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [morelikethis, setMorelikethis] = useState<MovieDetails[]>([]);
  const { id } = useParams();
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=d67d8bebd0f4ff345f6505c99e9d0289&page=${page}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setMorelikethis(data.results);
      });
  }, [id, page]);

  return (
    <div>
      <div>
        <Navigations />
      </div>
      <div className="container  mx-auto py-10">
        <p className="font-semibold tracking-[0.6px] leading-8 text-2xl">
          More like this
        </p>
      </div>
      <div className="container mx-auto grid grid-cols-5 grid-rows-2 gap-10">
        {morelikethis?.map((more) => (
          <Card upcome={more} key={more.id} size="w-[280px]" />
        ))}
      </div>
      <div className="flex justify-end px-83 py-6">
        <Paginationultra page={page} setPage={setPage} />
      </div>
      <Footer />
    </div>
  );
}
