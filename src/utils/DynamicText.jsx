import React, { useState, useEffect } from 'react';

const DynamicText = ({ children, originalWidth, className }) => {
    const [fontSize, setFontSize] = useState('1em');
    const scaleText = () => {
        const screenWidth = window.innerWidth;
        const scaleFactor = screenWidth / originalWidth;
        const newFontSize = `${scaleFactor}em`;
        setFontSize(newFontSize);
    };

    useEffect(() => {
        scaleText();
        window.addEventListener('resize', scaleText);
        return () => window.removeEventListener('resize', scaleText);
    }, [originalWidth]);

    return (
        <span
            style={{
                fontSize: fontSize
            }}
            className={className}
        >
            {children}
        </span>
    );
};

export default DynamicText;