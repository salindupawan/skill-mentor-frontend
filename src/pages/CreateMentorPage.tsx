import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mentorSchema } from "@/schemas/mentorSchema";
import { z } from "zod";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type MentorForm = z.infer<typeof mentorSchema>;

export default function CreateMentorPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MentorForm>({
    resolver: zodResolver(mentorSchema),
    defaultValues: {
      certified: false,
    },
  });

  // watch form values for preview
  const formValues = watch();

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const onSubmit = async (data: MentorForm) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, String(value));
        }
      });

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch("/api/add-mentor", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to create mentor");
      }

      toast.success("Mentor created successfully");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12 p-10">
      {/* FORM */}

      <Card>
        <CardHeader>
          <CardTitle>Create Mentor</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div >
                <Label className="mb-3">First Name *</Label>
                <Input {...register("firstName")} />
                <p className="text-red-500 text-sm">
                  {errors.firstName?.message}
                </p>
              </div>

              <div>
                <Label>Last Name *</Label>
                <Input {...register("lastName")} />
                <p className="text-red-500 text-sm">
                  {errors.lastName?.message}
                </p>
              </div>
            </div>

            <div>
              <Label>Email *</Label>
              <Input {...register("email")} />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>

            <div>
              <Label>Phone Number</Label>
              <Input {...register("phone")} />
            </div>

            <div>
              <Label>Title</Label>
              <Input
                {...register("title")}
                placeholder="Senior Software Engineer"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Profession</Label>
                <Input {...register("profession")} />
              </div>

              <div>
                <Label>Company</Label>
                <Input {...register("company")} />
              </div>
            </div>

            <div>
              <Label>Experience Years</Label>
              <Input type="number" {...register("experience")} />
            </div>

            <div>
              <Label>Start Year</Label>
              <Input type="number" {...register("startYear")} />
            </div>

            {/* IMAGE */}

            <div>
              <Label>Profile Image</Label>
              <Input type="file" accept="image/*" onChange={handleImage} />
            </div>

            <div>
              <Label>Bio</Label>
              <Textarea {...register("bio")} />
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                onCheckedChange={(val) => setValue("certified", val as boolean)}
              />

              <Label>Certified Mentor</Label>
            </div>

            <Button type="submit" className="w-full">
              Create Mentor
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* PREVIEW */}

      <Card className="shadow-lg border">
        <CardHeader>
          <CardTitle>Mentor Preview</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col items-center text-center space-y-4">
            {imagePreview ? (
              <img
                src={imagePreview}
                className="w-28 h-28 rounded-full object-cover border shadow"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}

            <div>
              <h2 className="text-xl font-bold">
                {formValues.firstName || "First"}{" "}
                {formValues.lastName || "Last"}
              </h2>

              <p className="text-muted-foreground">
                {formValues.title || "Title"}
              </p>
            </div>

            <div className="text-sm text-gray-600">
              {(formValues.profession || formValues.company) && (
                <p>
                  {formValues.profession}{" "}
                  {formValues.company && `@ ${formValues.company}`}
                </p>
              )}

              {formValues.experience && (
                <p>{formValues.experience} years experience</p>
              )}
            </div>

            {formValues.bio && (
              <p className="text-sm text-gray-500 max-w-xs">{formValues.bio}</p>
            )}

            {formValues.certified && (
              <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                Certified Mentor
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
