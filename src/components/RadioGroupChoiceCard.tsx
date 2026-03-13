import { Field, FieldContent, FieldTitle } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

const timeSlots = [
  { id: "10:00", label: "10:00 AM" },
  { id: "11:00", label: "11:00 AM" },
  { id: "12:00", label: "12:00 PM" },
  { id: "13:00", label: "01:00 PM" },
];

interface ChoiceCardProps {
  value:string;
  onChange: (v: string) => void;
}

export function RadioGroupChoiceCard({value, onChange }: ChoiceCardProps) {

  // const handleValueChange = (v: string) => {
  //   setTimeSlot(v); // Update local state (for UI/logging)
  //   onChange(timeSlot); // Pass the value up to the parent!
  // };

  return (
    <RadioGroup
      className="grid grid-cols-2 gap-4 w-fit"
      value={value}
      onValueChange={(v) => {
        
        onChange(v)
      }}
    >
      {timeSlots.map((slot) => (
        <div key={slot.id}>
          <RadioGroupItem
            value={slot.label}
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
