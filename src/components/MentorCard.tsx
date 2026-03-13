import { Building, CalendarHeart, ShieldCheck, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import type { Mentor } from "@/Types";
import SessionCardItem from "./SessionCardItem";
import { Link } from "react-router";

interface MentorProfileCardProps {
  mentor: Mentor; // Replace with your Mentor interface
}

export const MentorCard = ({ mentor }: MentorProfileCardProps) => {
  return (
    <div className="break-inside-avoid mb-6">
      <Card className="hover:shadow-lg transition-all duration-300 border-t-4 border-t-primary">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <CardTitle className="text-xl font-bold">
                {mentor.firstName} {mentor.lastName}
              </CardTitle>
              <p className="text-sm font-medium text-primary">
                {mentor.profession}
              </p>
            </div>
            <img 
              src={mentor.profileImageUrl} 
              alt={mentor.firstName}
              className="aspect-square object-cover rounded-full h-20 w-20 shadow-sm border" 
            />
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <SessionCardItem
              icon={Building}
              text={`at ${mentor.company}`}
              iconColor="text-gray-500"
            />
            <SessionCardItem
              icon={CalendarHeart}
              text={`Tutor since ${mentor.startYear}`}
              iconColor="text-gray-500"
            />
            <SessionCardItem
              icon={Star}
              text={`${mentor.reviews?.length || 0} Reviews`}
              iconColor="text-yellow-500"
            />
          </div>

          <Separator />

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase text-muted-foreground tracking-tighter">
              Verified Status
            </p>
            <div className="flex flex-col gap-2">
              {mentor.isCertified && (
                <div className="bg-[#7bf1f1]/30 px-4 py-2 rounded-lg flex items-center gap-3 border border-[#7bf1f1]/50">
                  <ShieldCheck size={18} className="text-cyan-700" />
                  <p className="text-sm font-semibold text-cyan-900">Certified Mentor</p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Link to={`/mentor/${mentor.mentorId}`} className="w-full">
              <Button className="w-full" variant="outline">
                View Profile
              </Button>
            </Link>
            
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
