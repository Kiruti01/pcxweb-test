import React from "react";
import frameDesktop from "../public/frame-desktop.webp";
import frameTablet from "../public/frame-tablet.webp";
import frameMobile from "../public/frame-mobile.webp";

const WorldMap = () => (
  <div className="w-full h-full">
    <img
      src="/frame-mobile.webp"
      srcSet={`
        /frame-mobile.webp 400w,
        /frame-tablet.webp 800w,
        /frame-desktop.webp 1200w
      `}
      sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
      alt="World currency map"
      className="w-full h-full object-contain object-top"
      fetchPriority="high"
      width="1200"
      height="800"
      loading="eager"
    />
  </div>
);

export default WorldMap;
