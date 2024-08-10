import React, { useState, useEffect } from 'react';


const DynamicImage = ({
  src,
  alt,
  originalWidth,
  originalHeight,
  ratio,
  className,
  style
}) => {
  const [imageDimensions, setImageDimensions] = useState({
    width: originalWidth,
    height: originalHeight
  });

  const scaleImage = () => {
    const screenWidth = window.innerWidth;
    const scaleFactor = screenWidth / originalWidth * ratio;
    const newWidth = originalWidth * scaleFactor;
    const newHeight = originalHeight * scaleFactor;

    setImageDimensions({
      width: newWidth,
      height: newHeight
    });
  };

  useEffect(() => {
    scaleImage();

    window.addEventListener("resize", scaleImage);

    return () => {
      window.removeEventListener("resize", scaleImage);
    };
  }, [originalWidth]);

  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: `${imageDimensions.width}px`,
        height: `${imageDimensions.height}px`,
        ...style
      }}
      className={className}
      draggable="false"
    />
  );
};

export default DynamicImage;