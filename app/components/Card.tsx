import { Movie } from "../types";
import { Star } from "./Star";

export const Card = ({ upcome }: { upcome: Movie }) => {
  return (
    <div className="w-[300.73px] rounded-xl h-[480px] overflow-hidden bg-gray-100">
      <img
        className="w-full h-[340px] object-cover"
        src={`https://image.tmdb.org/t/p/w500${upcome.poster_path}`}
        alt=""
      />
      <div className="p-2">
        <Star movie={upcome} />
        <p className="text-[18px] pt-[2px] font-normal leading-7">
          {upcome.title}
        </p>
      </div>
    </div>
  );
};
