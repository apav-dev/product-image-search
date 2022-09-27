import * as React from "react";
import Footer from "../footer";
import PageLayout from "./page-layout";

interface HomeLayoutProps {
  GreetingContent?: () => JSX.Element;
  InfoContent?: () => JSX.Element;
}

const HomeLayout = ({ GreetingContent, InfoContent }: HomeLayoutProps) => {
  return (
    <PageLayout>
      <div className="top-0 flex min-h-[30vh] w-full animate-gradient bg-gradient-to-br from-gray-400 via-gray-600 to-blue-800 bg-overflow pt-[120px] pb-6 text-gray-50 md:fixed md:h-full md:w-1/2 md:items-center">
        {GreetingContent && <GreetingContent />}
      </div>
      <div className="md:absolute md:right-0 md:w-1/2 md:pt-[120px]">
        <div className="w-full pb-[145px] text-gray-800 md:min-h-[calc(100vh-152px)]">
          {InfoContent && <InfoContent />}
          <Footer footerContainerStyle="absolute bottom-0" />
        </div>
      </div>
      <Footer footerContainerStyle="block md:hidden absolute bottom-0" />
    </PageLayout>
  );
};

export default HomeLayout;
