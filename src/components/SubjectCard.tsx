import { GraduationCap } from "lucide-react";
import SessionCardItem from "./SessionCardItem";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

import type { CreateSession, Session, subjectProps } from "@/Types";
import BookSessionDialog from "./BookSessionDialog";
import { createNewSession } from "@/lib/api";
import { useAuth, useUser } from "@clerk/react";
import { PaymentEncryptor } from "@/lib/PaymentEncryptor";
import { useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "sonner";

export default function SubjectCard({ subject }: subjectProps) {
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
    <div className="px-2">
      <Card>
        <CardHeader>
          <img
            src={subject.subjectImageUrl}
            className="rounded-xl shadow-xl"
            alt=""
          />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <CardTitle className="text-lg">{subject.subjectName}</CardTitle>
            <div className="text-gray-600 text-sm mt-1 mb-4">
              {subject.description}
            </div>
            <SessionCardItem
              icon={GraduationCap}
              text={subject.noOfEnrollments.toString() + " Enrollments"}
              iconColor="text-gray-600"
            />
            <BookSessionDialog
              triggerText="new booking"
              isLoading={isLoading}
              onSave={(date, time) => handleBooking(date, time)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
