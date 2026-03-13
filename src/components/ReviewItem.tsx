import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Star } from "lucide-react";
import type { ReviewProps } from "@/Types";
import { cn } from "@/lib/utils";

export default function ReviewItem({ review }: ReviewProps) {
  return (
    <>
      <Card className="py-2 px-0">
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <Avatar className="size-7">
                <AvatarImage
                  alt={"name"}
                  src={review.reviewerProfileImageUrl}
                  loading="lazy"
                  width="120"
                  height="120"
                />
                <AvatarFallback>{review.reviewerFirstName[0]}{review.reviewerLastName[0]}</AvatarFallback>
              </Avatar>
              <p className="text-muted-foreground text-sm">
                {review.reviewerFirstName} {review.reviewerLastName}
              </p>
            </div>
            <p>{review.comment}</p>
            <div className="flex items-center justify-between gap-1">
              <div className="flex">
                {/* Loop 5 times to create 5 stars */}
                {[...Array(5)].map((_, index) => {
                  // index starts at 0, so for a rating of 3:
                  // index 0, 1, 2 will be filled. index 3, 4 will be empty.
                  const isFilled = index < review.rating;

                  return (
                    <Star
                      key={index}
                      size={15}
                      className={cn(
                        "text-yellow-400",
                        isFilled ? "fill-yellow-400" : "fill-transparent",
                      )}
                    />
                  );
                })}
              </div>
              <div className="text-sm text-muted-foreground">
                {review.reviewDate.split("T")[0]}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
