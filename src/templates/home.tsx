import * as React from "react";
import "../index.css";
import {
  Template,
  GetPath,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import SocialLinks from "../components/social-links";
import HomeLayout from "../components/layouts/home-layout";
import InfoSection from "../components/info-section";
import BioSection from "../components/bio-section";
import Greeting from "../components/greeting";

export const getPath: GetPath<TemplateProps> = () => {
  return `index.html`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = (
  data
): HeadConfig => {
  return {
    title: "My Personal Site",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const Home: Template<TemplateRenderProps> = () => {
  return (
    <>
      <HomeLayout
        GreetingContent={() => (
          <Greeting name="Aaron" role="Developer Evangelist @ Yext" />
        )}
        InfoContent={() => (
          <div className="centered-container">
            <SocialLinks
              twitter="https://twitter.com/apav_dev"
              github="https://github.com/apav-dev"
              dev_to="https://dev.to/apavlick"
            />
            <InfoSection title="Introduction">
              <p className=" text-lg">
                My name is Aaron and I&apos;m a developer evangelist at Yext.
                This is my first Developer Relations role and I&apos;m really
                enjoying it! We have a lot of cool, new tools for people looking
                to build websites and I&apos;m excited to demonstrate how to use
                them. Before I started working at Yext, I worked as a software
                engineer at a bank and a healthcare company.
              </p>
            </InfoSection>
            <InfoSection title="Bio">
              <BioSection
                home="New York, NY"
                skills={["Yext", "React", "Typescript", "Deno"]}
                interests={["Skiing", "Podcasts", "TV", "Music"]}
              />
            </InfoSection>
          </div>
        )}
      />
    </>
  );
};

export default Home;
