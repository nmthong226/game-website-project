import React, { useState, useEffect } from 'react';

const DynamicImage = ({ src, alt, originalWidth, originalHeight, ratio, className }) => {
    const [dimensions, setDimensions] = useState({
        width: originalWidth,
        height: originalHeight
    });

    const scaleImage = () => {
        const screenWidth = window.innerWidth;
        const scaleFactor = screenWidth / originalWidth * ratio;
        const newWidth = originalWidth * scaleFactor;
        const newHeight = originalHeight * scaleFactor;

        setDimensions({
            width: newWidth,
            height: newHeight
        });
    };

    useEffect(() => {
        // Initial scaling
        scaleImage();

        // Re-scale the image when the window is resized
        window.addEventListener('resize', scaleImage);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener('resize', scaleImage);
    }, [originalWidth]);

    return (
        <img
            src={src}
            alt={alt}
            style={{
                width: `${dimensions.width}px`,
                height: `${dimensions.height}px`
            }}
            className={className}
            draggable="false"
        />
    );
};

export default DynamicImage;