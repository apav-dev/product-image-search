import * as React from "react";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
};

export const renderBlogContent = (content: string) => {
  const blogParts = content.split(/\n/g);
  return (
    <>
      {blogParts.map((part, i) => (
        <p key={`paragraph_${i}`} className="py-1">
          {part}
        </p>
      ))}
    </>
  );
};
