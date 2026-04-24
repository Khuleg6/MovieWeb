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
      <Star movie={upcome} />
      <p>{upcome.title}</p>
    </div>
  );
};
