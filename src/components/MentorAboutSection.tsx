import { Award, Building } from "lucide-react";
import ExpandableText from "./ExpandableText";
import { Badge } from "./ui/badge";

export default function MentorAboutSection() {
  return (
    <>
      <ExpandableText
        text="Hi! I'm Michelle. Language lover and tutor of English. I specialize in AWS certification preparation and have helped over 150 students achieve their AWS Developer Associate certification. With my background in cloud computing and software development, I can provide practical insights and real-world examples to help you understand complex concepts. I also offer mock interviews and hands-on coding sessions."
        limit={2}
      />
      <p className="mt-4 font-bold">Experience</p>
      <div className="bg-[#7bf1f1]/40 px-4 py-2 rounded-xl flex items-center gap-3">
        <Building size={20} />
        <p>Head of Engineering at STEM Link</p>
      </div>
      <div className="bg-[#7bf1f1]/40 px-4 py-2 rounded-xl flex items-center gap-3">
        <Building size={20} />
        <p>Tech Lead at IFS</p>
      </div>
      <div className="bg-[#7bf1f1]/40 px-4 py-2 rounded-xl flex items-center gap-3">
        <Building size={20} />
        <p>Senior Software Engineer at Virtusa</p>
      </div>

      <p className="mt-5 font-bold">Skill & Specializations</p>
      <div className="flex-col justify-center items-center space-x-2 space-y-2.5 gap-3">
        <Badge className="bg-purple-50 text-purple-700 px-3 py-1">
          <Award />
          Maching Learning
        </Badge>
        <Badge className="bg-purple-50 text-purple-700 px-3 py-1">
          <Award />
          Enterprice Development
        </Badge>
        <Badge className="bg-purple-50 text-purple-700 px-3 py-1">
          <Award />
          Cloud Native Architect
        </Badge>
        <Badge className="bg-purple-50 text-purple-700 px-3 py-1">
          <Award />
          Maching Learning
        </Badge>
        <Badge className="bg-purple-50 text-purple-700 px-3 py-1">
          <Award />
          Enterprice Development
        </Badge>
        <Badge className="bg-purple-50 text-purple-700 px-3 py-1">
          <Award />
          Cloud Native Architect
        </Badge>
        <Badge className="bg-purple-50 text-purple-700 px-3 py-1">
          <Award />
          Maching Learning
        </Badge>
        <Badge className="bg-purple-50 text-purple-700 px-3 py-1">
          <Award />
          Enterprice Development
        </Badge>
        <Badge className="bg-purple-50 text-purple-700 px-3 py-1">
          <Award />
          Cloud Native Architect
        </Badge>
      </div>
    </>
  );
}
