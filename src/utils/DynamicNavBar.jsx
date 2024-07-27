import React, { useState, useEffect } from 'react';

const DynamicNavBar = ({ originalWidth, originalHeight, ratio, className }) => {
    const [dimensions, setDimensions] = useState({
        width: originalWidth,
        height: originalHeight
    });

    const scaleNavBar = () => {
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
        scaleNavBar();

        // Re-scale the image when the window is resized
        window.addEventListener('resize', scaleNavBar);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener('resize', scaleNavBar);
    }, [originalWidth]);

    return (
        <div
            style={{
                width: `${dimensions.width}px`,
                height: `${dimensions.height}px`
            }}
            className={className}
        />
    );
};

export default DynamicNavBar;