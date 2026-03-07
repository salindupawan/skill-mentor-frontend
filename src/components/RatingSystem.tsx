import { Star } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function RatingSystem() {
  const [rating, setRating] = useState(0);
  return (
    <>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((starIndex) => (
          <Tooltip key={starIndex}>
            <TooltipTrigger asChild>
              <button
                onClick={() => setRating(starIndex)}
                className="focus:outline-none cursor-pointer"
              >
                <Star
                  size={25}
                  // Change color and fill based on the current rating
                  className={cn(
                    "transition-colors",
                    starIndex <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-yellow-400",
                  )}
                />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>
                {starIndex} {starIndex === 1 ? "Star" : "Stars"}
              </p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </>
  );
}
