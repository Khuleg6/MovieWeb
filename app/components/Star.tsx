import React from "react";
import { Movie } from "../types";

export const Star = ({ movie }: { movie: Movie }) => {
  return (
    <div>
      <div className="flex items-center gap-1">
        <svg
          width="16"
          height="16"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.9997 2.3335L17.6047 9.63683L25.6663 10.8152L19.833 16.4968L21.2097 24.5235L13.9997 20.7318L6.78967 24.5235L8.16634 16.4968L2.33301 10.8152L10.3947 9.63683L13.9997 2.3335Z"
            fill="#FDE047"
            stroke="#FDE047"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-[15px] font-semibold m-0">
          {movie?.vote_average}
        </span>
        <span className="text-[13px] text-gray-400 ml-0">/10</span>
      </div>
    </div>
  );
};
