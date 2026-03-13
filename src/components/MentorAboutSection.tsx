import { Award, Building } from "lucide-react";
import ExpandableText from "./ExpandableText";
import { Badge } from "./ui/badge";
import type { MentorProps } from "@/Types";

export default function MentorAboutSection({mentor}:MentorProps) {
  return (
    <>
      <ExpandableText
        text={mentor.bio}
        limit={2}
      />
      <p className="mt-4 font-bold">Experience</p>
      <div className="bg-[#7bf1f1]/40 px-4 py-2 rounded-xl flex items-center gap-3">
        <Building size={20} />
        <p>{mentor.profession} at {mentor.company} </p>
      </div>
      

      <p className="mt-5 font-bold">Skill & Specializations</p>
      <div className="flex-col justify-center items-center space-x-2 space-y-2.5 gap-3">
        <Badge className="bg-purple-50 text-purple-700 px-3 py-1">
          <Award />
          {mentor.specialization}
        </Badge>
        
      </div>
    </>
  );
}
