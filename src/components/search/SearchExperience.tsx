import {
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import * as React from "react";

const searchConfig = {
  apiKey: "e9755fac637e4e08de5ebf61be5f1a5e",
  experienceKey: "image-search",
  locale: "en",
};

interface SearchExperienceProps {
  verticalKey?: string;
  children?: React.ReactNode;
}

const SearchExperience = ({ children, verticalKey }: SearchExperienceProps) => {
  const searcher = provideHeadless({
    ...searchConfig,
    verticalKey,
  });

  return (
    <SearchHeadlessProvider searcher={searcher}>
      {children}
    </SearchHeadlessProvider>
  );
};

export default SearchExperience;
