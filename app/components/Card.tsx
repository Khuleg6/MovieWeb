import Link from "next/link";
import { Movie } from "../types";
import { Star } from "./Star";

export const Card = ({ upcome, size }: { upcome: Movie; size: string }) => {
  return (
    <Link
      href={`/details/${upcome.id}`}
      className={`${size} rounded-xl h-[480px] overflow-hidden bg-gray-200 dark:text-black dark:bg-white`}
    >
      <img
        className="w-full h-[340px] object-cover"
        src={`https://image.tmdb.org/t/p/w342${upcome.poster_path}`}
        alt=""
      />
      <div className="p-2">
        <Star movie={upcome} />
        <p className="text-[18px] pt-[2px] font-normal leading-7">
          {upcome.title}
        </p>
      </div>
    </Link>
  );
};
