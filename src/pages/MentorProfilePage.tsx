import NavBar from "../components/NavBar";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Award, Building, ShieldCheck } from "lucide-react";
import Review from "../components/ui/review";
import { Button } from "../components/ui/button";
import ExpandableText from "../components/ExpandableText";
import { Separator } from "../components/ui/separator";
import SubjectCard from "../components/SubjectCard";
import StatisticCard from "../components/StatisticCard";
import ReviewItem from "../components/ReviewItem";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import RatingSystem from "../components/RatingSystem";
import MentorHeaderSection from "@/components/MentorHeaderSection";
import MentorAboutSection from "@/components/MentorAboutSection";

export default function MentorProfilePage() {
  return (
    <>
      <NavBar />
      <section>
        <div className="py-16 md:py-22">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col items-center justify-center text-center gap-3">
              <MentorHeaderSection />
              <Separator className="my-4" />
              <MentorAboutSection />
              
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3   space-y-3 mt-20">
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
              <SubjectCard />
            </div>

            <p className="text-2xl mt-7 mb-4">Statistics</p>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <StatisticCard />
              <StatisticCard />
              <StatisticCard />
              <StatisticCard />
            </div>

            <p className="text-2xl mt-7 mb-4">Reviews</p>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                    <ReviewItem />
                    <ReviewItem />
                    <ReviewItem />
                    <ReviewItem />
                    <ReviewItem />
                    <ReviewItem />
                    <ReviewItem />
                    <ReviewItem />
                    <ReviewItem />
                </div>
                <div className="flex flex-col items-center gap-3">
                    <p className="text-lg">Add your Review</p>
                    <Input placeholder="name" />
                    <Textarea placeholder="Enter your review here." className="h-40" rows={5} />
                    <RatingSystem />
                    <Button className="w-full mt-10">
                        Submit
                    </Button>
                </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
}
