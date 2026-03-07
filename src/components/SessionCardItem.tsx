import { type LucideIcon } from "lucide-react";

interface SessionCardItemProps {
  icon: LucideIcon;
  text: string;
  iconColor?: string;
}

export default function SessionCardItem({ 
  icon: Icon,
  text, 
  iconColor = "text-primary" 
}: SessionCardItemProps) {
  return (
    <div className="flex gap-3 items-center">
      <Icon size={20} className={iconColor} />
      <p className={iconColor} >{text}</p>
    </div>
  );
}
