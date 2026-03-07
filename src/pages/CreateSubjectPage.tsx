import SessionCard from "@/components/sessionCard";

export default function CreateSubjectPage() {
  return (
    <section>
          <div className="py-16 md:py-16">
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-start">
                <h2 className="text-4xl font-semibold">Create a new Subject</h2>
              </div>
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-7 mt-20">
                <SessionCard />
                <SessionCard />
                <SessionCard />
                <SessionCard />
                <SessionCard />
                <SessionCard />
                <SessionCard />
                <SessionCard />
                <SessionCard />
              </div>
            </div>
          </div>
        </section>
  )
}
