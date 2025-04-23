
import React from "react";
import { Clock, Book, Users, Globe } from "lucide-react";

interface CourseMaterialsProps {
  duration: string;
  lessons: number;
  enrolled: number;
  language: string;
}

const CourseMaterials = ({ duration, lessons, enrolled, language }: CourseMaterialsProps) => {
  const materials = [
    { icon: <Clock className="w-5 h-5 text-[#8E9196]" />, label: "Duration:", value: duration },
    { icon: <Book className="w-5 h-5 text-[#8E9196]" />, label: "Lessons:", value: lessons },
    { icon: <Users className="w-5 h-5 text-[#8E9196]" />, label: "Enrolled:", value: `${enrolled} students` },
    { icon: <Globe className="w-5 h-5 text-[#8E9196]" />, label: "Language:", value: language }
  ];

  return (
    <div className="grid grid-cols-2 gap-6">
      {materials.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          {item.icon}
          <div>
            <div className="text-sm text-[#8E9196]">{item.label}</div>
            <div className="font-semibold text-[#1A1F2C]">{item.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseMaterials;
