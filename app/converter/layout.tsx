import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

const Converter: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default Converter;