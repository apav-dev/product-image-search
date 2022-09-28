import * as React from "react";
import SearchExperience from "./search/SearchExperience";
import { twMerge } from "tailwind-merge";

type Props = {
  children?: React.ReactNode;
  containerCss?: string;
};

const PageLayout = ({ children, containerCss }: Props) => {
  return (
    <SearchExperience verticalKey="products">
      <div className="min-h-screen">
        <div
          className={twMerge(
            "mx-auto max-w-screen-xl px-5 py-8 md:px-14",
            containerCss
          )}
        >
          {children}
        </div>
      </div>
    </SearchExperience>
  );
};

export default PageLayout;
