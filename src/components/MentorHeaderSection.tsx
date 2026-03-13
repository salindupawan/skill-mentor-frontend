import { ShieldCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import Review from "./ui/review";
import { Button } from "./ui/button";
import type { MentorProps } from "@/Types";



export default function MentorHeaderSection({mentor}:MentorProps) {
  return (
    <>
    <Avatar className="size-40">
                <AvatarImage
                  alt={"name"}
                  src={mentor.profileImageUrl}
                  loading="lazy"
                  width="120"
                  height="120"
                />
                <AvatarFallback>ST</AvatarFallback>
              </Avatar>
              <h2 className="text-4xl font-semibold">{mentor.firstName} {mentor.lastName}</h2>
              <p>{mentor.profession} at {mentor.company}</p>
              {
                mentor.isCertified && (
                  <Badge className="bg-green-50 text-green-700 px-3 py-1">
                <ShieldCheck />
                Certified Mentor
              </Badge>
                )
              }
              <p className="text-sm text-muted-foreground">Tutor since {mentor.startYear}</p>
              <Review count={mentor.reviews.length} />
              <Button className="bg-[#4bbeff] hover:bg-[#28adfb]">
                Schedule a Session
              </Button>
    </>
  )
}
