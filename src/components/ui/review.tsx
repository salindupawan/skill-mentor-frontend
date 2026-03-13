import { Star } from "lucide-react";

export default function Review({count}:{count:number}) {
  return (
    <>
      <div className="flex gap-1 items-center">
        <Star size={15} className="text-yellow-400 fill-yellow-400" />
        <Star size={15} className="text-yellow-400 fill-yellow-400" />
        <Star size={15} className="text-yellow-400 fill-yellow-400" />
        <Star size={15} className="text-yellow-400 fill-yellow-400" />
        <Star size={15} className="text-yellow-400 fill-yellow-400" />
        <p className="text-muted-foreground text-sm hover:underline hover:cursor-pointer ml-2">{count} Reviews</p>
      </div>
    </>
  );
}
