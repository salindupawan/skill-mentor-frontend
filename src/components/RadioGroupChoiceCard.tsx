import { Field, FieldContent, FieldTitle } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useState } from "react";

const timeSlots = [
  { id: "10am", label: "10:00 AM" },
  { id: "11am", label: "11:00 AM" },
  { id: "12pm", label: "12:00 PM" },
  { id: "01pm", label: "01:00 PM" },
];

export function RadioGroupChoiceCard() {
    const [timeSlot,setTimeSlot] = useState("");
    console.log(timeSlot);
    
  return (
    <RadioGroup className="grid grid-cols-2 gap-4 w-fit" onValueChange={(v)=>{setTimeSlot(v)}}>
      {timeSlots.map((slot) => (
        <div key={slot.id}>
          <RadioGroupItem
            value={slot.id}
            id={slot.id}
            className="peer sr-only "
            
          />
          <label
            htmlFor={slot.id}
            className={cn(
              "flex cursor-pointer rounded-lg w-30 border-2 border-muted bg-popover p-4 ",
              "peer-data-[state=checked]:border-0 peer-data-[state=checked]:bg-[#4bbeff] peer-data-[state=checked]:text-white",
            )}
          >
            <Field orientation="horizontal" className="p-0 border-none w-full ">
              <FieldContent className="flex">
                <FieldTitle className="text-sm">{slot.label}</FieldTitle>
              </FieldContent>
            </Field>
          </label>
        </div>
      ))}
    </RadioGroup>
  );
}
