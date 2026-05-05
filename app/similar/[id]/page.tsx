"use client";
import { Card } from "@/app/components/Card";
import { Footer } from "@/app/components/Footer";
import { Navigations } from "@/app/components/navigations";
import { Morelike, Movie, MovieDetails } from "@/app/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [morelikethis, setMorelikethis] = useState<MovieDetails[]>([]);
  const { id } = useParams();
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=d67d8bebd0f4ff345f6505c99e9d0289`,
    )
      .then((res) => res.json())
      .then((data) => {
        setMorelikethis(data.results);
      });
  }, []);

  return (
    <div>
      <div>
        <Navigations />
      </div>
      <div>
        {morelikethis?.map((more) => (
          <Card upcome={more} key={more.id} size="w-[270px]" />
        ))}
      </div>
      <Footer />
    </div>
  );
}
