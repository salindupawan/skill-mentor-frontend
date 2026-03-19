/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Users,
  Plus,
  Search,
  X,
  Eye,
  Briefcase,
  Camera,
  Upload,
  AlertCircle,
} from "lucide-react";
import { createNewMentor, getPublicMentors } from "@/lib/api";
import type { CreateMentorRequest, Mentor } from "@/Types";
import { toast } from "sonner";
import { Link } from "react-router";
import { z } from "zod";
import { useAuth } from "@clerk/react";
import { Button } from "@/components/ui/button";

// 1. Define Zod Schema
const mentorSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  title: z.string().min(2, "Title is required (e.g. Mr, Dr)"),
  profession: z.string().min(2, "Profession is required"),
  company: z.string().min(2, "Company name is required"),
  experienceYears: z.coerce.number().min(0, "Years cannot be negative"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  isCertified: z.boolean().default(false),
  startYear: z.coerce.number().min(1900).max(new Date().getFullYear()),
  specializations: z.string().min(2, "At least one specialization is required"),
  profileImageUrl: z.string().optional(),
});

// 2. Derive Type from Schema
export type CreateMentor = z.infer<typeof mentorSchema>;

const MentorManagement: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { getToken } = useAuth();
  const [fileObject, setFileObject] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // Form State & Errors
  const initialFormState: CreateMentor = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    title: "",
    profession: "",
    company: "",
    experienceYears: 0,
    bio: "",
    isCertified: false,
    startYear: new Date().getFullYear(),
    specializations: "",
  };

  const [formData, setFormData] = useState<CreateMentor>(initialFormState);
  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateMentor, string>>
  >({});
  const [mentors, setMentors] = useState<Mentor[]>([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const resp = await getPublicMentors();
        setMentors(resp);
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      }
    };
    fetchMentors();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 1. Store the ACTUAL file for the backend
      setFileObject(file);

      // 2. Create a preview for the frontend (cleaner than FileReader)
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const finalValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({ ...prev, [name]: finalValue }));

    // Clear error when user starts typing
    if (errors[name as keyof CreateMentor]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handlOnSuccess = (mentor: Mentor) =>{
    setMentors([
      ...mentors,
      mentor
    ]);

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 3. Validate with Zod
    const result = mentorSchema.safeParse(formData);

    if (!result.success) {
      const formattedErrors: any = {};
      result.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0]] = issue.message;
      });
      setErrors(formattedErrors);
      toast.error("Please fix the errors in the form");
      return;
    }

    if (fileObject == null) {
        toast.error("Plese upload mentor profile image.");
        return;
      }

    try {
      setIsLoading(true);
      const token = await getToken({ template: "skill-mentor-backend" });

      if (!token) {
        toast.error("You must be logged in to submit a review.");
        return;
      }

      const form = result.data;

      const payLoad: CreateMentorRequest = {
        bio: form.bio,
        company: form.company,
        email: form.email,
        experienceYears: form.experienceYears,
        firstName: form.firstName,
        isCertified: form.isCertified,
        lastName: form.lastName,
        phoneNumber: form.phoneNumber,
        profession: form.profession,
        specializations: form.specializations,
        startYear: form.startYear,
        title: form.title,
      };

      const resp = await createNewMentor({
        token: token,
        data: payLoad,
        file: fileObject,
      });
      if (!resp.ok) {
        throw new Error("Mentor creation failed. try again");
      }
      const json = await resp.json();
      handlOnSuccess(json);
      toast.success("Mentor profile created successfully");

    } catch (error) {
      if (error instanceof Error) toast.error(error.message);

      console.log(error);
    } finally {
      setFileObject(null);
      setPreviewUrl("")
      setIsLoading(false);
      setIsAdding(false);
      setFormData(initialFormState);
    }
  };

  const filtered = useMemo(() => {
    return mentors.filter(
      (m) =>
        m.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.lastName.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, mentors]);

  return (
    <div className="min-h-screen flex flex-col items-center   bg-white p-6 md:p-10 text-slate-900 font-sans">
      <div className="w-full lg:w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b pb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight">Mentors</h1>
            <p className="text-sm text-slate-500">
              Manage expert profiles and onboarding.
            </p>
          </div>
          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-all gap-2"
          >
            <Plus size={16} /> Add Mentor
          </button>
        </div>

        <div className="relative mb-8 max-w-sm">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search mentors..."
            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-10 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-950"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((mentor) => (
            <MentorCard key={mentor.mentorId} mentor={mentor} />
          ))}
        </div>
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-50 bg-slate-900/20 backdrop-blur-sm flex justify-end">
          <div className="h-full w-full sm:max-w-xl bg-white border-l shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="sticky top-0 bg-white z-20 flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Users size={18} /> Mentor Onboarding
              </h2>
              <button
                onClick={() => setIsAdding(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-8 pb-24">
              <div className="space-y-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Eye size={12} /> Live Profile Preview
                </p>
                <div className="border rounded-xl p-6 bg-slate-50/50 flex justify-center">
                  <div className="w-full max-w-[340px] scale-90 origin-top">
                    <MentorCard
                      mentor={
                        {
                          ...formData,
                          mentorId: 0,
                          specialization: formData.specializations || "Skill",
                          profileImageUrl:
                            previewUrl ||
                            "https://placehold.co/400x400?text=Profile",
                        } as any
                      }
                      isPreview
                    />
                  </div>
                </div>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Profile Image</label>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center bg-slate-50 overflow-hidden shrink-0">
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          className="h-full w-full object-cover"
                          alt="Preview"
                        />
                      ) : (
                        <Camera className="text-slate-300" size={24} />
                      )}
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 px-3 py-2 border rounded-md text-xs font-semibold hover:bg-slate-50"
                    >
                      <Upload size={14} /> Upload Photo
                    </button>
                  </div>
                </div>

                {/* Name Inputs */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    error={errors.firstName}
                    onChange={handleInputChange}
                  />
                  <FormField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    error={errors.lastName}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Contact Inputs */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    error={errors.email}
                    onChange={handleInputChange}
                  />
                  <FormField
                    label="Phone"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    error={errors.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Professional Info */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="Title (e.g. Dr.)"
                    name="title"
                    value={formData.title}
                    error={errors.title}
                    onChange={handleInputChange}
                  />
                  <FormField
                    label="Profession"
                    name="profession"
                    value={formData.profession}
                    error={errors.profession}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="Company"
                    name="company"
                    value={formData.company}
                    error={errors.company}
                    onChange={handleInputChange}
                  />
                  <FormField
                    label="Years Exp."
                    name="experienceYears"
                    type="number"
                    value={formData.experienceYears}
                    error={errors.experienceYears}
                    onChange={handleInputChange}
                  />
                </div>

                <FormField
                  label="Specializations"
                  name="specializations"
                  placeholder="React, Java, etc."
                  value={formData.specializations}
                  error={errors.specializations}
                  onChange={handleInputChange}
                />

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Professional Bio
                  </label>
                  <textarea
                    name="bio"
                    rows={4}
                    className={`flex w-full rounded-md border px-3 py-2 text-sm outline-none ${errors.bio ? "border-red-500" : "border-slate-200"}`}
                    value={formData.bio}
                    onChange={handleInputChange}
                  />
                  {errors.bio && (
                    <p className="text-[11px] text-red-500 flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.bio}
                    </p>
                  )}
                </div>

                <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-slate-200 p-4 shadow-sm transition-colors hover:bg-slate-50/50">
                  <div className="flex h-5 items-center">
                    <input
                      id="isCertified"
                      name="isCertified"
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-950 accent-slate-900"
                      checked={formData.isCertified}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-1 leading-none">
                    <label
                      htmlFor="isCertified"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      Certified Mentor Status
                    </label>
                    <p className="text-[12px] text-slate-500">
                      Marking this as verified will add the emerald badge to the
                      mentor's profile card.
                    </p>
                    {errors.isCertified && (
                      <p className="text-[11px] text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle size={10} /> {errors.isCertified}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-6 border-t flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="flex-1 rounded-md border px-4 py-2 text-sm font-medium hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <Button
                  disabled={isLoading}
                    type="submit"
                    className="flex-1 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-all shadow-lg"
                  >
                    {isLoading ? "Onboarding...":"Onboard Mentor"}
                    
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Helper Component for Form Fields ---
const FormField = ({ label, name, error, ...props }: any) => (
  <div className="space-y-1.5 flex-1">
    <label className="text-sm font-medium">{label}</label>
    <input
      name={name}
      className={`flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${error ? "border-red-500 focus-visible:ring-red-500" : "border-slate-200 focus-visible:ring-slate-950"}`}
      {...props}
    />
    {error && (
      <p className="text-[11px] text-red-500 flex items-center gap-1 leading-none">
        <AlertCircle size={10} /> {error}
      </p>
    )}
  </div>
);

// --- Reusable Card ---
const MentorCard = ({
  mentor,
  isPreview = false,
}: {
  mentor: any;
  isPreview?: boolean;
}) => (
  <div
    className={`group rounded-xl border border-slate-200 bg-white p-6 transition-all ${!isPreview && "hover:shadow-md"}`}
  >
    <Link to={isPreview ? "#" : `/mentor/${mentor.mentorId}`}>
      <div className="flex items-center gap-4 mb-4 cursor-pointer">
        <img
          src={mentor.profileImageUrl}
          alt={mentor.firstName}
          className="h-14 w-14 rounded-full object-cover ring-2 ring-slate-50 shadow-sm"
        />
        <div>
          <h3 className="font-bold text-slate-900 text-m leading-tight">
            {mentor.firstName} {mentor.lastName}
          </h3>
          <p className="text-[11px] text-blue-600 font-semibold uppercase tracking-wider mt-0.5">
            {mentor.profession || mentor.jobTitle}
          </p>
        </div>
      </div>
    </Link>

    <div className="space-y-3">
      <div className="flex items-center gap-3 text-[12px] text-slate-400 font-bold uppercase tracking-tighter">
        <span className="flex items-center gap-1">
          <Briefcase size={10} />{" "}
          {mentor.experienceYears ||
            (mentor.startYear
              ? new Date().getFullYear() - mentor.startYear
              : 0)}
          Y Exp
        </span>
        <span className="flex items-center gap-1 text-emerald-600 italic">
          {mentor.isCertified ? "Verified Mentor" : ""}
        </span>
      </div>
      <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed italic">
        "{mentor.bio || "Professional bio goes here..."}"
      </p>
      <div className="flex flex-wrap gap-1.5 pt-1">
        <span className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-100 text-slate-500 text-[11px] font-bold">
          {mentor.specialization || mentor.specializations}
        </span>
      </div>
    </div>
  </div>
);

export default MentorManagement;
