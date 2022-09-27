import * as React from "react";
import { GiBrain } from "react-icons/gi";
import { RiHome2Fill } from "react-icons/ri";
import { BsFillEmojiSunglassesFill } from "react-icons/bs";

interface BioSection {
  home?: string;
  skills?: string[];
  interests?: string[];
}

const BioSection = ({ home, skills, interests }: BioSection) => {
  const formatList = (list: string[]): string[] => {
    return list.map((item, index) => {
      if (index === list.length - 1) {
        return item;
      } else {
        return item + ", ";
      }
    });
  };

  return (
    <div className="font-display text-lg">
      {interests && (
        <div className="flex items-center">
          <RiHome2Fill className="mr-1.5" />
          {home}
        </div>
      )}
      {skills && (
        <div className="flex items-center">
          <GiBrain className="mr-1.5" />
          {formatList(skills)}
        </div>
      )}
      {interests && (
        <div className="flex items-center">
          <BsFillEmojiSunglassesFill className="mr-1.5" />
          {formatList(interests)}
        </div>
      )}
    </div>
  );
};

export default BioSection;
