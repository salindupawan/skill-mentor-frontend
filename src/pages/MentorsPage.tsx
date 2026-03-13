import { MentorCard } from "@/components/MentorCard";
import NavBar from "@/components/NavBar";
import { getPublicMentors } from "@/lib/api";
import type { Mentor } from "@/Types";
import { useEffect, useState } from "react";

export  const MentorListPage = () => {
    const [mentors, setMentors] = useState<Mentor[]>([]);
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        getPublicMentors()
          .then((data) => setMentors(data))
          .catch(console.error)
          .finally(() => setLoading(false));
      }, []);
  // Mock data based on your example

  return (
    <>
    <NavBar />
    <div className="max-w-7xl mx-auto py-12 px-6">
      <header className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Expert Mentors</h1>
        <p className="text-muted-foreground mt-2">
          Learn from top industry professionals through 1-on-1 guidance.
        </p>
      </header>

      {/* Responsive Masonry Grid */}
      {
        !loading && (
            <div className="ccolumns-1 sm:columns-2 lg:columns-3 gap-4 space-y-7 mt-20">
        {mentors.map((mentor) => (
          <MentorCard key={mentor.mentorId} mentor={mentor} />
        ))}
      </div>
        )
      }
    </div>
    </>
  );
};