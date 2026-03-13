import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "./ui/calendar";
import { RadioGroupChoiceCard } from "./RadioGroupChoiceCard";
import { Loader2 } from "lucide-react";

interface BookingDialogProps {
  triggerText: string;
  onSave: (date: Date | undefined, time: string) => void;
  isLoading?:boolean;
}

export default function BookSessionDialog({
  triggerText,
  onSave,
  isLoading = false
}: BookingDialogProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // RESET EVERYTHING HERE
      setSelectedTime(""); 
      setDate(new Date()); 
    }
  };

  return (
    <>
      <Dialog onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button className="mt-4 bg-[#4bbeff] hover:bg-[#28adfb]">
            {triggerText}
          </Button>
        </DialogTrigger>
        <DialogContent
          showCloseButton={false}
          className="sm:max-w-[650px] w-[95vw] max-h-[90vh] flex flex-col items-center justify-center overflow-y-auto"
        >
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

              <RadioGroupChoiceCard
                value={selectedTime}
                onChange={(item) => setSelectedTime(item)}
              />
            </div>
          </div>
          <div className="w-full flex justify-end gap-3">
            <DialogClose asChild>
                <Button variant={"outline"}>Close</Button>
            </DialogClose>
            <Button
              disabled={!selectedTime}
              onClick={() => onSave(date, selectedTime)}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
