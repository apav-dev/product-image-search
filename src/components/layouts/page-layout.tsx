import * as React from "react";
import Header from "../header";

type Props = {
  children?: React.ReactNode;
};

const PageLayout = ({ children }: Props) => {
  return (
    <div className="relative min-h-screen font-display ">
      <Header />
      {children}
    </div>
  );
};

export default PageLayout;
