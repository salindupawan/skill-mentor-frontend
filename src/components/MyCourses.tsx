import MyCourseCard from "./MyCourseCard";

export default function MyCourses() {
  return (
    <section>
          <div className="py-16 md:py-32">
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center">
                <h2 className="text-4xl font-semibold">My Courses</h2>
                <p className="mt-4">
                  Let's grow up.
                </p>
              </div>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3   space-y-3 mt-20">
                <MyCourseCard />
                <MyCourseCard />
                <MyCourseCard />
                <MyCourseCard />
                <MyCourseCard />
                <MyCourseCard />
                <MyCourseCard />
                <MyCourseCard />
                <MyCourseCard />
                <MyCourseCard />
                <MyCourseCard />
              </div>
            </div>
          </div>
        </section>
  )
}
