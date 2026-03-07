import { GraduationCap } from "lucide-react";
import SessionCardItem from "./SessionCardItem";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import courseImage from "/src/assets/course1.jpeg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "./ui/calendar";
import { useState } from "react";
import { RadioGroupChoiceCard } from "./RadioGroupChoiceCard";

export default function SubjectCard() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div className="px-2">
      <Card>
        <CardHeader>
          <img src={courseImage} className="rounded-xl shadow-xl" alt="" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <CardTitle className="text-lg">AWS Examp prep session</CardTitle>
            <div className="text-gray-600 text-sm mt-1 mb-4">
              Language lover and tutor of English. I specialize in AWS
              certification preparation and have helped over 150 students
              achieve their AWS Developer Associate certification. With my
              background in cloud computing and software development
            </div>
            <SessionCardItem
              icon={GraduationCap}
              text="122 Students Enrolled"
              iconColor="text-gray-600"
            />
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-4 bg-[#4bbeff] hover:bg-[#28adfb]">
                  Book Subject
                </Button>
              </DialogTrigger>
              <DialogContent showCloseButton={false} className="sm:max-w-[650px] w-[95vw] max-h-[90vh] flex flex-col items-center justify-center overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Schedule a Session</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col md:flex-row gap-6 justify-center sm:items-start items-start p-4">
                  <div className="w-fit">
                    <p className="text-sm font-medium mb-2">Choose Date</p>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-lg border shadow-sm"
                      
                    />
                  </div>
                  <div className="w-fit">
                    <p className="text-sm font-medium mb-2">Choose time</p>

                    <RadioGroupChoiceCard />
                  </div>
                
                </div>
                <div className="w-full flex justify-end gap-3">
                      <Button  variant={"outline"}>Close</Button>
                      <Button disabled={true}>Save</Button>
                  </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
