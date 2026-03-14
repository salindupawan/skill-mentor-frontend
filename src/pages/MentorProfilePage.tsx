import NavBar from "../components/NavBar";
import { Separator } from "../components/ui/separator";
import SubjectCard from "../components/SubjectCard";
import StatisticCard from "../components/StatisticCard";
import ReviewItem from "../components/ReviewItem";
import MentorHeaderSection from "@/components/MentorHeaderSection";
import MentorAboutSection from "@/components/MentorAboutSection";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getMentoById } from "@/lib/api";
import type { Mentor, Review } from "@/Types";
import { AddReviewForm } from "@/components/AddReviewForm";

export default function MentorProfilePage() {
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [loading, setLoading] = useState(true);

  const { mentorId } = useParams<{ mentorId: string }>();
  const mentorIdInt = Number(mentorId);

  useEffect(() => {
    getMentoById(mentorIdInt)
      .then((data) => setMentor(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [mentorIdInt]);

  const handleAddNewreview = (review : Review) =>{
    if(!mentor) return;

    setMentor({
      ...mentor,
      reviews: [review, ...mentor.reviews]
    });

  };

  // 2. Calculate the Average (Total / Number of Reviews)
  // We use a fallback of 0 to avoid dividing by zero if there are no reviews
  let averageRating;
  let yearsOfExperience = 0;
  if (mentor) {
    const currentYear = new Date().getFullYear();
    yearsOfExperience = currentYear - mentor.startYear;

    const totalRatingSum = mentor.reviews.reduce(
      (acc, review) => acc + review.rating,
      0,
    );

    averageRating =
      mentor.reviews.length > 0
        ? (totalRatingSum / mentor.reviews.length).toFixed(1)
        : 0;
  }

  return (
    <>
      <NavBar />
      {!loading && mentor && (
        <section>
          <div className="py-16 md:py-22">
            <div className="mx-auto max-w-7xl px-6">
              <div className="flex flex-col items-center justify-center text-center gap-3">
                <MentorHeaderSection mentor={mentor} />
                <Separator className="my-4" />
                <MentorAboutSection mentor={mentor} />
              </div>

              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3   space-y-3 mt-20">
                {mentor.subjects.map((item) => (
                  <SubjectCard key={item.subjectId} subject={item} />
                ))}
              </div>

              <p className="text-2xl mt-7 mb-4">Statistics</p>

              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <StatisticCard
                  text="Total Students taught"
                  count={mentor.totalStudents}
                  colour="border-amber-400"
                />
                <StatisticCard
                  text="Years of experience"
                  count={yearsOfExperience}
                  colour="border-red-400"
                />
                <StatisticCard
                  text="Positive Review Rate"
                  count={averageRating + "%"}
                  colour="border-green-400"
                />
                <StatisticCard
                  text="Number of subject taught"
                  count={mentor.subjects.length}
                  colour="border-pink-400"
                />
              </div>

              <p className="text-2xl mt-7 mb-4">Reviews</p>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  {
                    mentor.reviews.map((item,i)=>(
                  <ReviewItem key={i} review={item} />

                    ))
                  }
                  
                </div>
                
                <AddReviewForm mentorId={mentor.mentorId} onSuccess={handleAddNewreview} />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
