import React from 'react';
interface LayoutProps {
    children: React.ReactNode;
}

const Converter: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className='flex justify-center items-center mt-[100px]'>
            {children}
        </div>
    );
};

export default Converter;