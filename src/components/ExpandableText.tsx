import { useState } from "react";
import { Button } from "@/components/ui/button"; // Shadcn button

interface ExpandableTextInfo {
  text: string;
  limit?: number;
}
export default function ExpandableText({
  text,
  limit = 3,
}: ExpandableTextInfo) {
  const [isExpanded, setIsExpanded] = useState(false);
  const limitClass = {
    1: "line-clamp-1",
    2: "line-clamp-2",
    3: "line-clamp-3",
    4: "line-clamp-4",
  }[limit] || "line-clamp-3";

  return (
    <div className="flex flex-col space-y-2">
      <p
        className={`text-gray-600 transition-all duration-300 ${
          isExpanded ? "" : limitClass
        }`}
      >
        {text}
      </p>

      {text.length > 150 && (
        <div className="flex items-end justify-end">
        <Button
          variant="link"
          className="h-auto p-0 text-black font-semibold cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show Less" : "See More"}
        </Button>
        </div>
      )}
    </div>
  );
}
