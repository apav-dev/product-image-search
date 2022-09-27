import * as React from "react";
import Divider from "./divider";
import { twMerge } from "tailwind-merge";
import YextIcon from "../icons/YextIcon";
import ReactIcon from "../icons/ReactIcon";

interface FooterProps {
  footerContainerStyle?: string;
  firstName?: string;
  lastName?: string;
}

const Footer = ({ footerContainerStyle, firstName, lastName }: FooterProps) => {
  return (
    <footer
      className={twMerge(
        "mx-auto w-full px-5 py-4 md:px-14",
        footerContainerStyle
      )}
    >
      <Divider />
      {firstName && (
        <p className="text-xl font-bold">
          &copy; {firstName} {lastName ?? ""}
        </p>
      )}
      <div className="inline-flex items-center">
        <span className="mr-2">Built with</span>
        <ReactIcon />
        <span className="mx-2">on</span>
        <div className="w-7">
          <YextIcon />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
