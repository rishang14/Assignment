import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const MyImage = ({ image, alt, width, height,classname,beforeLoad }) => (
  <>
    <LazyLoadImage
      alt={alt}
      height={height}
      src={image}
      wrapperProps={{
        style: { transitionDelay: "1s" },
      }} 
      className={classname}
      width={width} 
      beforeLoad={beforeLoad}
    />
  </>
);

export default MyImage;
