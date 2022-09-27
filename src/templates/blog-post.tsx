import * as React from "react";
import "../index.css";
import {
  Template,
  GetPath,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import InfoSection from "../components/info-section";
import { formatDate, renderBlogContent } from "../util";

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return "blog";
};

const BlogPost: Template<TemplateRenderProps> = ({
  document,
}: TemplateProps) => {
  return (
    <>
      <div className="mx-auto flex w-full max-w-4xl flex-col items-start justify-center">
        <InfoSection
          titleCssStyles="text-5xl pb-4"
          title={"BLOG TITLE"}
          date={"INSERT DATE HERE"}
        >
          <div className="font-display">{"INSERT BLOG CONTENT"}</div>
        </InfoSection>
      </div>
    </>
  );
};

export default BlogPost;
