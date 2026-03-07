import { Calendar } from "lucide-react";
import SessionCardItem from "./SessionCardItem";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export default function MyCourseCard() {
  return (
    <div className="px-2">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <Avatar className="size-20">
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
            <div>
              <Badge className="bg-green-50 text-green-700 px-3 py-1">
                Completed
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <CardTitle className="text-lg">AWS Examp prep session</CardTitle>
          <div className="text-gray-600 mt-3 mb-2">
            Mentor: Dr. Tharaka Sankalpa
          </div>
          <SessionCardItem
            icon={Calendar}
            text="Next session: 2/12/2023 8.30 PM"
            iconColor="text-gray-600"
          />
          <Button className="mt-4 bg-[#4bbeff] hover:bg-[#28adfb]">Join Session</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
