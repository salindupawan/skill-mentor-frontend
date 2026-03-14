import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema, type ReviewFormValues } from "@/schemas/reviewSchema";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import RatingSystem from "./RatingSystem";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useAuth } from "@clerk/react";
import { addNewReview } from "@/lib/api";
import type { CreateReview, Review } from "@/Types";

export function AddReviewForm({
  mentorId,
  onSuccess,
}: {
  mentorId: number;
  onSuccess: (review: Review) => void;
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { name: "", comment: "", rating: 0 },
  });

  const { getToken } = useAuth();

  const onSubmit = async (data: ReviewFormValues) => {
    try {
      const token = await getToken();

      if (!token) {
        toast.error("You must be logged in to submit a review.");
        return;
      }

      const payLoad: CreateReview = {
        comment: data.comment,
        mentorId: mentorId,
        rating: data.rating,
      };
      console.log(token);
      const resp = await addNewReview({
        token: token,
        data: payLoad,
      });

      if (!resp.ok) {
        throw new Error("Failed to save review.");
      }

      const json = await resp.json();
      reset();
      onSuccess(json);
      //   console.log(json);
      toast.success("Review submitted successfully.");
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);

      console.error("Submission failed", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-3 w-full"
    >
      <p className="text-lg font-semibold">Add your Review</p>

      {/* Name Input */}
      <div className="w-full">
        <Input {...register("name")} placeholder="Your Name" />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Comment Textarea */}
      <div className="w-full">
        <Textarea
          {...register("comment")}
          placeholder="Enter your review here."
          className="h-40"
          rows={5}
        />
        {errors.comment && (
          <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>
        )}
      </div>

      {/* Rating System - Using Controller because it's a custom component */}
      <div className="flex flex-col items-center">
        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <RatingSystem rating={field.value} setRating={field.onChange} />
          )}
        />
        {errors.rating && (
          <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full mt-4">
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
