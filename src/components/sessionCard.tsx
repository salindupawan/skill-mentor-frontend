import { Separator } from "./ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Building,
  CalendarHeart,
  GraduationCap,
  ShieldCheck,
  ThumbsUpIcon,
} from "lucide-react";
import SessionCardItem from "./SessionCardItem";
import ExpandableText from "./ExpandableText";
import { Button } from "./ui/button";
import type { subjectProps } from "@/Types";
import { Link } from "react-router";

export default function SessionCard({ subject }: subjectProps) {
  return (
    <div className="break-inside-avoid">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div>
              <CardTitle className="text-lg">{subject.subjectName}</CardTitle>
            </div>
            <div>
              <Avatar className="size-16">
                <AvatarImage
                  alt={"name"}
                  src={subject.subjectImageUrl}
                  loading="lazy"
                  width="120"
                  height="120"
                />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Separator className="mb-4" />
          <div className="flex flex-col gap-3">
            <Link to={`/mentor/${subject.mentor.mentorId}`}>
            <div className="flex gap-3 cursor-pointer">
              <Avatar className="cursor-pointer size-6">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="font-semibold">
                {subject.mentor.firstName} {subject.mentor.lastName}
              </p>
            </div>
            </Link>
            <SessionCardItem
              icon={ThumbsUpIcon}
              text={`${subject.mentor.reviews.length}% Positive reviews`}
              iconColor="text-gray-600"
            />
            <SessionCardItem
              icon={Building}
              text={`${subject.mentor.profession} at ${subject.mentor.company}`}
              iconColor="text-gray-600"
            />
            <SessionCardItem
              icon={CalendarHeart}
              text={`Tutor since ${subject.mentor.startYear}`}
              iconColor="text-gray-600"
            />
            <ExpandableText text={subject.description} limit={3} />

            <CardTitle>Highlights</CardTitle>
            <div className="flex flex-col gap-1">
              <div className="bg-[#7bf1f1]/40 px-4 py-2 rounded flex items-center gap-3">
                <GraduationCap size={20} />
                <p>{subject.noOfEnrollments} Enrollements</p>
              </div>
              {subject.mentor.isCertified && (
                <div className="bg-[#7bf1f1]/40 px-4 py-2 rounded  flex items-center gap-3">
                  <ShieldCheck size={20} />
                  <p>Certified Teacher</p>
                </div>
              )}
            </div>
            <Button className="bg-[#4bbeff] hover:bg-[#28adfb]">
              Schedule a session
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
