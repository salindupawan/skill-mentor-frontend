import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Star } from "lucide-react";

export default function ReviewItem() {
  return (
    <>
      <Card className="py-2 px-0">
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <Avatar className="size-7">
                <AvatarImage
                  alt={"name"}
                  src={"image"}
                  loading="lazy"
                  width="120"
                  height="120"
                />
                <AvatarFallback>ST</AvatarFallback>
              </Avatar>
              <p className="text-muted-foreground text-sm">Salindu Pawan</p>
            </div>
            <p>
              Salindu Pawan Salindu Pawan Salindu Pawan Salindu Pawan Salindu
              Pawan Salindu Pawan Salindu Pawan Salindu Pawan Salindu Pawan
            </p>
            <div className="flex items-center justify-between gap-1">
                
              <div className="flex">
                <Star size={15} className="text-yellow-400 fill-yellow-400" />
              <Star size={15} className="text-yellow-400 fill-yellow-400" />
              <Star size={15} className="text-yellow-400 fill-yellow-400" />
              <Star size={15} className="text-yellow-400 fill-yellow-400" />
              <Star size={15} className="text-yellow-400" />
              </div>
              <div className="text-sm text-muted-foreground">20/02/2027</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
