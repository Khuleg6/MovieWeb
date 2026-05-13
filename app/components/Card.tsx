import Link from "next/link";
import { Movie } from "../types";
import { Star } from "./Star";

interface CardProps {
  id: number;
  title: string;
  poster: string | null;
  rating: number;
  size: string;
}

export const Card = ({ id, title, poster, rating, size }: CardProps) => {
  return (
    <Link
      href={`/details/${id}`}
      className={`${size} rounded-xl h-[450px] overflow-hidden bg-gray-200 dark:text-black  shadow-lg dark:bg-black dark:text-white dark:shadow-[#4338CA]  `}
    >
      <img
        className="w-full h-[340px] object-cover"
        src={`https://image.tmdb.org/t/p/w342${poster}`}
        alt=""
      />
      <div className="p-2">
        <Star rating={rating} />
        <p className="text-[18px] pt-[2px] font-normal leading-7">{title}</p>
      </div>
    </Link>
  );
};
