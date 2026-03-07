import { ShieldCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import Review from "./ui/review";
import { Button } from "./ui/button";

export default function MentorHeaderSection() {
  return (
    <>
    <Avatar className="size-40">
                <AvatarImage
                  alt={"name"}
                  src={"image"}
                  loading="lazy"
                  width="120"
                  height="120"
                />
                <AvatarFallback>ST</AvatarFallback>
              </Avatar>
              <h2 className="text-4xl font-semibold">Dr. Tharaka Sankalpa</h2>
              <p>Senior Lecturer at Java Institute</p>
              <Badge className="bg-green-50 text-green-700 px-3 py-1">
                <ShieldCheck />
                Certified Mentor
              </Badge>
              <p className="text-sm text-muted-foreground">Tutor since 2015</p>
              <Review />
              <Button className="bg-[#4bbeff] hover:bg-[#28adfb]">
                Schedule a Session
              </Button>
    </>
  )
}
