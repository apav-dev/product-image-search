import * as React from "react";
import DevToIcon from "../icons/DevToIcon";
import GithubIcon from "../icons/GithubIcon";
import TwitterIcon from "../icons/TwitterIcon";

export interface SocialLinksProps {
  twitter?: string;
  github?: string;
  dev_to?: string;
}

const SocialLinks = ({
  twitter,
  github,
  dev_to,
}: SocialLinksProps): JSX.Element => (
  <div className="flex gap-4 py-4">
    {twitter && (
      <a href={twitter} target="_blank" rel="noreferrer">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 shadow-lg">
          <TwitterIcon />
        </div>
      </a>
    )}
    {github && (
      <a href={github} target="_blank" rel="noreferrer">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 shadow-lg">
          <GithubIcon />
        </div>
      </a>
    )}

    {dev_to && (
      <a href={dev_to} target="_blank" rel="noreferrer">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 shadow-lg">
          <DevToIcon />
        </div>
      </a>
    )}
  </div>
);

export default SocialLinks;
