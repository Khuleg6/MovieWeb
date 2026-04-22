import React from "react";
import { Star } from "./Star";
import { Buttons } from "./Buttons";

export const Upcoming = () => {
  return (
    <div className="bg-[url('/images/movie01.jpg')] bg-cover bg-no-repeat h-[910px] w-full bg-center text-white">
      <div className="gap-2 flex flex-col">
        <p className="text-[16px]">Now playing</p>
        <h1 className="text-4xl">Wicked</h1>
        <Star />
        <p className="w-[320px]">
          Elphaba, a misunderstood young woman because of her green skin, and
          Glinda, a popular girl, become friends at Shiz University in the Land
          of Oz. After an encounter with the Wonderful Wizard of Oz, their
          friendship reaches a crossroads.
        </p>
        <Buttons />
      </div>
    </div>
  );
};
