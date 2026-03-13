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
import type { CreateSession, Session, subjectProps } from "@/Types";
import { Link, useNavigate } from "react-router";
import BookSessionDialog from "./BookSessionDialog";
import { PaymentEncryptor } from "@/lib/PaymentEncryptor";
import { createNewSession } from "@/lib/api";
import { useAuth, useUser } from "@clerk/react";
import { useState } from "react";
import { toast } from "sonner";

export default function SessionCard({ subject }: subjectProps) {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const router = useNavigate();
  const handleBooking = async (date: Date | undefined, time: string) => {
    console.log(date);
    console.log(time);
    console.log(subject.mentor.mentorId);
    if (!date) {
      console.error("Selece a date");
      return;
    }
    if (!user) return;
    const token = await getToken({ template: "skill-mentor-backend" });
    if (!token) return;

    const payload: CreateSession = {
      subjectId: subject.subjectId,
      mentorId: subject.mentor.mentorId,
      sessionDate: date.toISOString().split("T")[0],
      sessionStartTime: formatTo24Hour(time),
    };
    try {
      if (isLoaded && isSignedIn) {
        setIsLoading(true);
        const res = await createNewSession({
          token: token,
          data: payload,
        });
        const json = await res.json();
        const code = PaymentEncryptor.encrypt<Session>(json);
        console.log(json);
        console.log(code);
        router(`/payment/${code}`);
      }
    } catch (error) {
      if(error instanceof Error)
      toast.error(error.message);

      console.log(error);
    }finally{
      setIsLoading(false);
    }
  };

  const formatTo24Hour = (timeStr: string): string => {
    // 1. Split "01:00" and "PM"
    const [time, modifier] = timeStr.split(" ");
    const [rowHours, minutes] = time.split(":");
    let hours = rowHours;

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      // Add 12 to the hours for PM times
      hours = (parseInt(hours, 10) + 12).toString();
    }

    // Pad with a leading zero if needed (e.g., "9:00" -> "09:00")
    return `${hours.padStart(2, "0")}:${minutes}`;
  };
  return (
    <div className="break-inside-avoid">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle className="text-lg">{subject.subjectName}</CardTitle>
            </div>
            <div>
              <img src={subject.subjectImageUrl} className="aspect-square object-cover object-center rounded-full h-20" />
              
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Separator className="mb-4" />
          <div className="flex flex-col gap-3">
            <Link to={`/mentor/${subject.mentor.mentorId}`}>
            <div className="flex gap-3 cursor-pointer">
              <Avatar className="cursor-pointer size-6">
                <AvatarImage src={subject.mentor.profileImageUrl} />
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
                <p>{subject.noOfEnrollments || 0} Enrollements</p>
              </div>
              {subject.mentor.isCertified && (
                <div className="bg-[#7bf1f1]/40 px-4 py-2 rounded  flex items-center gap-3">
                  <ShieldCheck size={20} />
                  <p>Certified Teacher</p>
                </div>
              )}
            </div>
            <BookSessionDialog
                          triggerText="Schedule a session"
                          isLoading={isLoading}
                          onSave={(date, time) => {handleBooking(date,time)}}
                        />
            
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
