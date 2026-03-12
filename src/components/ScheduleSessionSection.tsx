import { useEffect, useState } from "react";
import SessionCard from "./sessionCard";
import { getPublicSubjects } from "@/lib/api";
import type { Subject } from "@/Types";

export default function ScheduleSessionSection() {
  const [subject, setSubject] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicSubjects()
      .then((data) => setSubject(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);
  return (
    <section>
      <div className="py-16 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-semibold">Schedule a Call</h2>
            <p className="mt-4">Book personalized mentorship to level up .</p>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-7 mt-20">
            
            {!loading &&
              subject.map((item) => (
                <SessionCard key={item.subjectId} subject={item} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
