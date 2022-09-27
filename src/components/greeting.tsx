import * as React from "react";
import { Image, ImageType } from "@yext/pages/components";
import headshotUrl from "../assets/images/headshot.jpeg";

interface GreetingProps {
  name: string;
  role?: string;
  headshot?: ImageType;
}

const Greeting = ({ name, role, headshot }: GreetingProps): JSX.Element => {
  return (
    <div className="flex flex-col px-5 md:px-14">
      <div className="text-7xl font-black">Hey there.</div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="mt-8 text-4xl font-semibold">I&apos;m {name}</h2>
          {role && <p className="mt-2 text-xl font-normal">{role}</p>}
        </div>
        {headshot ? (
          <Image
            className="rounded-full"
            image={headshot}
            layout={"aspect"}
            aspectRatio={1}
            width={80}
          />
        ) : (
          <img className="w-20 rounded-full" src={headshotUrl} />
        )}
      </div>
    </div>
  );
};

export default Greeting;
