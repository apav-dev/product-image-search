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
import PageLayout from "../components/PageLayout";
import { SearchBar, VerticalResults } from "@yext/search-ui-react";
import ProductCard from "../components/search/cards/ProductCard";
import Product from "../types/products";
import ImageUploadModal from "../components/ImageUploadModal";
import { useState } from "react";
import { BiImageAdd } from "react-icons/bi";

export const getPath: GetPath<TemplateProps> = () => {
  return `index.html`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = (
  data
): HeadConfig => {
  return {
    title: "Image Search",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const GOOGLE_API_KEY = import.meta.env.YEXT_PUBLIC_GOOGLE_API_KEY;

const Home: Template<TemplateRenderProps> = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleButtonClick = (isOpen: boolean) => {
    setModalOpen(isOpen);
  };

  return (
    <PageLayout>
      <div>{GOOGLE_API_KEY}</div>
      <div className="flex items-start">
        <SearchBar customCssClasses={{ searchBarContainer: "grow" }} />
        <button className="pt-2 pl-2" onClick={() => handleButtonClick(true)}>
          <BiImageAdd color="#3B82F6" size={28} />
        </button>
      </div>
      <ImageUploadModal isOpen={modalOpen} setIsOpen={handleButtonClick} />
      <VerticalResults<Product>
        CardComponent={ProductCard}
        customCssClasses={{
          verticalResultsContainer: "grid grid-cols-3 gap-8 ",
        }}
      />
    </PageLayout>
  );
};

export default Home;
