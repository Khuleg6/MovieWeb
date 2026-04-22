"use client";
import Image from "next/image";
import { Logo } from "./components/Logo";
import { Iconbutton } from "./components/Iconbutton";
import { Upcoming } from "./components/Upcoming";
import { Card } from "./components/Card";
import { Footer } from "./components/Footer";
import { useEffect, useState } from "react";
import { Movie } from "./types";

export default function Home() {
  const [upcoming, setUpcoming] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=d67d8bebd0f4ff345f6505c99e9d0289",
    )
      .then((res) => res.json())
      .then((data) => {
        setUpcoming(data.results);
      });
  }, []);
  return (
    <div className="h-[4184px] w-full">
      <div className="w-full h-[59px] px-16 flex justify-between items-center">
        <Logo />
        <div className="gap-3 flex">
          <button className="w-[97px] h-[36px] border border-gray-200 rounded-lg">
            Genre
          </button>
          <input className="border h-[36px] rounded-lg border-gray-200 w-[379px] px-[12px]"></input>
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
        {/* <div className="flex flex-col items-start px-20 gap-[32px] ">
          <h1>Popular</h1>
          <Card />
        </div>
        <div className="flex flex-col items-start px-20 gap-[32px] ">
          <h1>Top Rated</h1>
          <Card />
        </div> */}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
