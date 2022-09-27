import * as React from "react";

const Header = () => {
  return (
    <div className="absolute top-0 z-10 mx-auto w-full px-5 text-gray-50 md:right-0 md:w-1/2 md:bg-white md:px-14 md:text-gray-900">
      <nav className="flex items-center gap-8 py-10 text-4xl font-bold">
        <div>
          <a className="border-b-4">Home</a>
        </div>
        <div>
          <a className="hover:border-b-4">Blog</a>
        </div>
      </nav>
    </div>
  );
};

export default Header;
