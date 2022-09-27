import {
  SearchHeadlessProvider,
  provideHeadless,
  useSearchActions,
} from "@yext/search-headless-react";
import * as React from "react";
import { useEffect } from "react";

const searchConfig = {
  apiKey: "INSERT_SEARCH_API_KEY",
  experienceKey: "INSERT_SEARCH_EXPERIENCE_KEY",
  locale: "en",
};

interface SearchExperienceProps {
  verticalKey?: string;
  children?: React.ReactNode;
}

const searcher = provideHeadless({
  ...searchConfig,
});

const SearchExperience = ({ children, verticalKey }: SearchExperienceProps) => {
  return (
    <SearchHeadlessProvider searcher={searcher}>
      <StateManager verticalKey={verticalKey}>{children}</StateManager>
    </SearchHeadlessProvider>
  );
};

const StateManager = ({
  children,
  verticalKey,
}: {
  children: React.ReactNode;
  verticalKey?: string;
}) => {
  const searchActions = useSearchActions();

  useEffect(() => {
    verticalKey && searchActions.setVertical(verticalKey);
  }, [verticalKey]);

  return <>{children}</>;
};

export default SearchExperience;
