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

export default function SessionCard() {
  return (
    <div className="break-inside-avoid">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div>
              <CardTitle className="text-lg">
                AWS Developer Associate Exam Prep
              </CardTitle>
            </div>
            <div>
              <Avatar className="size-16">
                <AvatarImage
                  alt={"name"}
                  src={"image"}
                  loading="lazy"
                  width="120"
                  height="120"
                />
                <AvatarFallback>ST</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Separator className="mb-4" />
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <Avatar className="cursor-pointer size-6">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="font-semibold">David Kumar</p>
            </div>
            <SessionCardItem
              icon={ThumbsUpIcon}
              text="99% positive feedbacks"
              iconColor="text-gray-600"
            />
            <SessionCardItem
              icon={Building}
              text="Tech lead at IFS"
              iconColor="text-gray-600"
            />
            <SessionCardItem
              icon={CalendarHeart}
              text="Tutor since 2020"
              iconColor="text-gray-600"
            />
            <ExpandableText
              text="Hi! I'm Michelle. Language lover and tutor of English. I specialize in AWS certification preparation and have helped over 150 students achieve their AWS Developer Associate certification. With my background in cloud computing and software development, I can provide practical insights and real-world examples to help you understand complex concepts. I also offer mock interviews and hands-on coding sessions."
              limit={3}
            />

            <CardTitle>Highlights</CardTitle>
            <div className="flex flex-col gap-1">
              <div className="bg-[#7bf1f1]/40 px-4 py-2 rounded flex items-center gap-3">
                <GraduationCap size={20} />
                <p>122 Enrollements</p>
              </div>
              <div className="bg-[#7bf1f1]/40 px-4 py-2 rounded  flex items-center gap-3">
                <ShieldCheck size={20} />
                <p>Certified Teacher</p>
              </div>
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
