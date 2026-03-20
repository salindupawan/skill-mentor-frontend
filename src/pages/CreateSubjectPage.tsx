/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Plus,
  Search,
  MoreHorizontal,
  X,
  Eye,
  Camera,
  Upload,
} from "lucide-react";
import {
  createNewSubject,
  getPublicMentors,
  getPublicSubjects,
} from "@/lib/api";
import type { CreateSubjectRequest, Mentor, Subject } from "@/Types";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubjectSchema, type SubjectFormData } from "@/schemas/subjectScema";
import { toast } from "sonner";
import { useAuth } from "@clerk/react";

const SubjectsPage: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      setIsLoading(true);
      const json = await getPublicSubjects();
      setSubjects(json);
      setIsLoading(false);
    };
    fetchSubjects();
  }, []);

  useEffect(() => {
    const fetchMentors = async () => {
      const json = await getPublicMentors();
      setMentors(json);
    };
    fetchMentors();
  }, []);

  const filtered = useMemo(() => {
    return subjects.filter(
      (s) =>
        s.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.mentor?.firstName.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, subjects]);

  // 1. React Hook Form Setup with explicit Generics
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SubjectFormData>({
    resolver: zodResolver(SubjectSchema),
    defaultValues: { 
      name: "", 
      description: "", 
      mentorId: "", // Cast string to number to satisfy schema type
      image: undefined 
    },
  });

  const watchedValues = watch();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file, { shouldValidate: true });
      if (previewUrl) URL.revokeObjectURL(previewUrl); // Clean up old memory
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleOnSuccess = (newSubject: Subject) => {
    setSubjects((prev) => [...prev, newSubject]);
  };

  // 2. Typed Submit Handler
  const onSubmit: SubmitHandler<SubjectFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      const token = await getToken({ template: "skill-mentor-backend" });

      if (!token) {
        toast.error("You must be logged in to perform this action.");
        return;
      }

      const payLoad: CreateSubjectRequest = {
        subjectName: data.name,
        description: data.description,
        mentorId: Number(data.mentorId), // Ensure mentorId is a number
      };

      const resp = await createNewSubject({
        token,
        data: payLoad,
        file: data.image,
      });

      if (!resp.ok) {
        throw new Error("Subject creation failed. Please try again.");
      }

      const json = await resp.json();
      handleOnSuccess(json);
      toast.success("Subject created successfully");
      
      // Reset everything
      reset();
      setPreviewUrl("");
      setIsAdding(false);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-10 text-slate-900">
      <div className="w-full lg:w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10 border-b pb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight">Subjects</h1>
            <p className="text-sm text-slate-500">Manage curriculum and platform courses.</p>
          </div>
          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors gap-2"
          >
            <Plus size={16} /> Add Subject
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Filter subjects..."
            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-10 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!isLoading ? filtered.map((subject) => (
            <SubjectCard key={subject.subjectId} subject={subject} />
          )) : (
            Array(6).fill({}).map((_, i) => (
              <div key={i} className="animate-pulse rounded-lg border border-slate-200 bg-white p-4">
                <div className="mb-4 h-32 w-full rounded-md bg-slate-200" />
                <div className="h-4 w-3/4 rounded-md bg-slate-200 mb-2" />
                <div className="h-3 w-1/2 rounded-md bg-slate-200" />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Drawer */}
      {isAdding && (
        <div className="fixed inset-0 z-50 bg-slate-900/20 backdrop-blur-sm flex justify-end">
          <div className="h-full w-full sm:max-w-xl bg-white border-l shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold italic flex items-center gap-2">
                <Plus size={18} /> New Subject
              </h2>
              <button
                onClick={() => setIsAdding(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-8 pb-24">
              {/* Live Preview */}
              <div className="space-y-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Eye size={12} /> Live Card Preview
                </p>
                <div className="border rounded-xl p-4 bg-slate-50/50">
                  <div className="max-w-[300px] mx-auto scale-95 origin-top">
                    <SubjectCard
                      subject={{
                        subjectId: 0,
                        subjectName: watchedValues.name || "Subject Title",
                        description: watchedValues.description || "Description will appear here...",
                        subjectImageUrl: previewUrl || "https://placehold.co/400x250?text=Cover+Preview",
                        noOfEnrollments: 0,
                        mentor: mentors[0] || {
                          mentorId: 0,
                          firstName: "",
                          lastName: "",
                          email: "",
                          phoneNumber: "",
                          title: "",
                          profession: "",
                          company: "",
                          experienceYears: 0,
                          bio: "",
                          profileImageUrl: "",
                          isCertified: false,
                          startYear: 0,
                          specialization: "",
                          totalStudents: 0,
                          subjects: [],
                          reviews: []
                        },
                      }}
                      isPreview
                    />
                  </div>
                </div>
              </div>

              {/* Form */}
              <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject Name</label>
                  <input
                    {...register("name")}
                    className={`flex h-10 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 ${errors.name ? "border-red-500 focus:ring-red-200" : "border-slate-200 focus:ring-slate-950"}`}
                  />
                  {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject Description</label>
                  <textarea
                    rows={5}
                    {...register("description")}
                    className={`flex w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 ${errors.description ? "border-red-500 focus:ring-red-200" : "border-slate-200 focus:ring-slate-950"}`}
                  />
                  {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Assign Mentor</label>
                  <select
                    {...register("mentorId")}
                    className={`flex h-10 w-full rounded-md border px-3 text-sm outline-none bg-white focus:ring-2 transition-all ${errors.mentorId ? "border-red-500 focus:ring-red-200" : "border-slate-200 focus:ring-slate-950"}`}
                  >
                    <option value="">Select a mentor</option>
                    {mentors.map((mentor) => (
                      <option key={mentor.mentorId} value={`${mentor.mentorId}`}>
                        {mentor.firstName} {mentor.lastName}
                      </option>
                    ))}
                  </select>
                  {errors.mentorId && <p className="text-xs text-red-500">{errors.mentorId.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject Image</label>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
                      {previewUrl ? (
                        <img src={previewUrl} className="h-full w-full object-cover" alt="Preview" />
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
                  {errors.image && <p className="text-xs text-red-500">{errors.image.message as string}</p>}
                </div>

                <div className="pt-6 border-t flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="flex-1 rounded-md border px-4 py-2 text-sm font-medium hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:bg-slate-400 transition-all shadow-md"
                  >
                    {isSubmitting ? "Creating..." : "Create Subject"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Subject Card Component
const SubjectCard = ({ subject, isPreview = false }: { subject: Subject; isPreview?: boolean }) => (
  <div className={`group rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm transition-all mx-auto ${!isPreview && "hover:shadow-md"}`}>
    <div className="aspect-video w-full overflow-hidden rounded-t-lg border-b bg-slate-100">
      <img
        src={subject.subjectImageUrl}
        alt={subject.subjectName}
        className="h-full w-full object-cover transition-transform group-hover:scale-105"
      />
    </div>
    <div className="p-4 space-y-2">
      <span className="inline-flex items-center rounded-full border border-slate-100 bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-slate-500">
        {subject.noOfEnrollments} Enrollments
      </span>
      <h3 className="font-semibold leading-tight text-md">{subject.subjectName}</h3>
      <p className="text-xs text-slate-500 line-clamp-2">{subject.description}</p>
      {!isPreview && (
        <div className="flex items-center justify-between pt-2 border-t mt-2">
          <div className="flex items-center gap-2 text-[10px] font-medium text-slate-600">
            <div className="h-5 w-5 rounded-full bg-slate-900 text-white flex items-center justify-center uppercase">
              {subject.mentor?.firstName.charAt(0)}
            </div>
            {subject.mentor?.firstName} {subject.mentor?.lastName}
          </div>
          <MoreHorizontal size={14} className="text-slate-400" />
        </div>
      )}
    </div>
  </div>
);

export default SubjectsPage;