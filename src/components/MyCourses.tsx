import type { Session } from "@/Types";
import MyCourseCard from "./MyCourseCard";
import { useEffect, useState } from "react";
import { getMyEnrollments } from "@/lib/api";
import { useAuth } from "@clerk/react";
import { toast } from "sonner";

export default function MyCourses() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const { getToken, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    const loadEnrollemnts = async () => {
      if (!isLoaded || !isSignedIn) return;

      try {
        setLoading(true);

        const token = await getToken({ template: "skill-mentor-backend" });

        if (!token) return;

        const data = await getMyEnrollments(token);
        console.log(data)

        setSessions(data);
      } catch (error) {
        toast.error("Failed to fetch enrollments");
        console.error("Failed to fetch enrollments:", error);
      } finally {
        setLoading(false);
      }
    };
    loadEnrollemnts();
  }, [isLoaded, isSignedIn, getToken]);
  return (
    <section>
      <div className="py-16 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-semibold">My Courses</h2>
            <p className="mt-4">Let's grow up.</p>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3   space-y-3 mt-20">
            {!loading &&
              sessions.map((item) => (
                <MyCourseCard key={item.sessionId} session={item} />
              ))
              
              }
          </div>
        </div>
      </div>
    </section>
  );
}
