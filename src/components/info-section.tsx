import * as React from "react";
import { twMerge } from "tailwind-merge";
import { Image, ImageType } from "@yext/pages/components";
interface InfoSectionProps {
  title: string;
  titleCssStyles?: string;
  coverPhoto?: ImageType;
  author?: string;
  date?: string;
  children?: React.ReactNode;
}

const InfoSection = ({
  title,
  titleCssStyles,
  coverPhoto,
  author,
  date,
  children,
}: InfoSectionProps): JSX.Element => {
  return (
    <div className="my-4 rounded-2xl bg-gray-200 px-8 py-8 font-display shadow-lg">
      <h2 className={twMerge("pb-2  text-2xl font-bold", titleCssStyles)}>
        {title}
      </h2>
      {coverPhoto && <Image image={coverPhoto} />}
      <div className="flex gap-2">
        {author && <p className="font-semibold">{author}</p>}
        {author && date && <p className="font-semibold">•</p>}
        {date && <p className="font-semibold">{date}</p>}
      </div>
      {children}
    </div>
  );
};

export default InfoSection;
