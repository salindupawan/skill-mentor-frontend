// import SessionCard from "@/components/sessionCard";

// export default function CreateSubjectPage() {
//   return (

//   )
// }

import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Logo from "/src/assets/logo.jpg";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { subjectSchema } from "@/schemas/subjectScema";
import SubjectCard from "@/components/SubjectCard";

type SubjectForm = z.infer<typeof subjectSchema>;

type Mentor = {
  id: string;
  firstName: string;
  lastName: string;
};

type Subject = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
};

export default function CreateSubjectPage() {
  const [mentors, setMentors] = useState<Mentor[]>([
    {
      id:"1",
      firstName:"salindu",
      lastName:"pawan"
    },
    {
      id:"2",
      firstName:"salindu",
      lastName:"pawan"
    },
    {
      id:"3",
      firstName:"salindu",
      lastName:"pawan"
    },
    {
      id:"4",
      firstName:"salindu",
      lastName:"pawan"
    },
    {
      id:"5",
      firstName:"salindu",
      lastName:"pawan"
    },
    {
      id:"6",
      firstName:"salindu",
      lastName:"pawan"
    },
    {
      id:"7",
      firstName:"salindu",
      lastName:"pawan"
    },
    {
      id:"8",
      firstName:"salindu",
      lastName:"pawan"
    },
  ]);
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id:"2",
      name:"sp",
      description:"wwe",
      imageUrl:"erer"
    },
    {
      id:"2",
      name:"sp",
      description:"wwe",
      imageUrl:"erer"
    },
    {
      id:"2",
      name:"sp",
      description:"wwe",
      imageUrl:"erer"
    },
    {
      id:"2",
      name:"sp",
      description:"wwe",
      imageUrl:"erer"
    },
    {
      id:"2",
      name:"sp",
      description:"wwe",
      imageUrl:"erer"
    },
    {
      id:"2",
      name:"sp",
      description:"wwe",
      imageUrl:"erer"
    },
    {
      id:"2",
      name:"sp",
      description:"wwe",
      imageUrl:"erer"
    },
    {
      id:"2",
      name:"sp",
      description:"wwe",
      imageUrl:"erer"
    },
  ]);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SubjectForm>({
    resolver: zodResolver(subjectSchema),
  });

  const formValues = watch();

  // FETCH MENTORS

  useEffect(() => {
    fetch("/api/v1/mentors")
      .then((res) => res.json())
      .then((data) => setMentors(data))
      .catch(() => toast.error("Failed to load mentors"));
  }, []);

  // FETCH SUBJECTS

  useEffect(() => {
    fetch("/api/v1/subjects")
      .then((res) => res.json())
      .then((data) => setSubjects(data))
      .catch(() => toast.error("Failed to load subjects"));
  }, []);

  // IMAGE PICKER

  const handleImage = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);

      const preview = URL.createObjectURL(file);

      setImagePreview(preview);
    }
  };

  // SUBMIT

  const onSubmit = async (data: SubjectForm) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, String(value));
      });

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch("/api/add-subject", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to create subject");
      }

      toast.success("Subject created successfully");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <section>
      <div className="py-16 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-start">
            <h2 className="text-4xl font-semibold">Create a new Subject</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2  gap-6 mt-20">

             <Card className="w-xl">
              <CardHeader>
                <CardTitle>Create Subject</CardTitle>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="space-y-4">
                    <Label>Subject Name</Label>

                    <Input {...register("name")} />

                    <p className="text-red-500 text-sm">
                      {errors.name?.message}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Label>Description</Label>

                    <Textarea {...register("description")} />

                    <p className="text-red-500 text-sm">
                      {errors.description?.message}
                    </p>
                  </div>

                  {/* IMAGE PICKER */}

                  <div className="space-y-4">
                    <Label>Course Image</Label>

                    <Input
                    
                      type="file"
                      accept="image/*"
                      onChange={handleImage}
                    />
                  </div>

                  {/* MENTOR SELECT */}

                  <div className="space-y-4 ">
                    <Label>Select Mentor</Label>

                    <Select
                    
                      onValueChange={(value) => setValue("mentorId", value)}
                    
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select mentor" />
                      </SelectTrigger>

                      <SelectContent>
                        {mentors.map((mentor) => (
                          <SelectItem key={mentor.id} value={mentor.id}>
                            {mentor.firstName} {mentor.lastName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <p className="text-red-500 text-sm">
                      {errors.mentorId?.message}
                    </p>
                  </div>

                  <Button type="submit" className="w-full">
                    Create Subject
                  </Button>
                </form>
              </CardContent>
            </Card>
            <Card className="shadow-lg w-full">
              <CardHeader>
                <CardTitle>Subject Preview</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}

                <h2 className="text-xl font-bold">
                  {formValues.name}
                </h2>

                <p className="text-gray-600">
                  {formValues.description}
                </p>
              </CardContent>
            </Card>
           

           
            {/* PREVIEW */}
          </div>
          <div className="flex flex-col w-full  rounded-2xl mt-10 ">
            <p className="text-xl my-5 font-bold">Subjects</p>

          <Table>

            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>

              {subjects.map((subject)=>(
                <TableRow key={subject.id}>

                  <TableCell>
                    <img
                      src={Logo}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </TableCell>

                  <TableCell>{subject.name}</TableCell>

                  <TableCell className="max-w-xs truncate">
                    {subject.description}
                  </TableCell>

                </TableRow>
              ))}

            </TableBody>

          </Table>

        
          </div>
        </div>
      </div>
    </section>
  );
}


