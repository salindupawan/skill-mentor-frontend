import { Calendar } from "lucide-react";
import SessionCardItem from "./SessionCardItem";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { toast } from "sonner";
import type { Session } from "@/Types";

interface sessionProps{
  session:Session;
}

export default function MyCourseCard({session}:sessionProps) {
  const formatTime = (timeString: string) => {
  // We create a dummy date because Intl needs a Date object or a specific time
  const [hours, minutes] = timeString.split(':');
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes));

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};
  return (
    <div className="px-2">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <img src={session.sessionImageUrl} className="aspect-square object-cover object-center rounded-full h-20" />
            </div>
            <div>
              <Badge className="bg-green-50 text-green-700 px-3 py-1">
                {session.sessionStatus}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <CardTitle className="text-lg">{session.sessionTitle}</CardTitle>
            <div className="text-gray-600 mt-3 mb-2">
              Mentor: {session.mentorName}
            </div>
            <SessionCardItem
              icon={Calendar}
              text={`Next session: ${session.sessionDate} ${formatTime(session.startTime)}`}
              iconColor="text-gray-600"
            />
            <Button
              className="mt-4 bg-[#4bbeff] hover:bg-[#28adfb]"
              onClick={()=>{
                toast.success("Meeting link will upload soon.",{
                  position:"top-center",
                })
              }}
            >
              Join Session
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
