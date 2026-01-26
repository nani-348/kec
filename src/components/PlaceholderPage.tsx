import React from 'react';

interface PlaceholderPageProps {
    title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-gray-50">
            <h1 className="text-4xl font-bold font-serif text-primary mb-4">{title}</h1>
            <div className="w-16 h-1 bg-secondary mb-6 rounded-full"></div>
            <p className="text-gray-600 max-w-lg text-lg">
                This page is currently under development. Detailed analysis and data for
                <span className="font-semibold text-gray-800"> {title} </span>
                will be available here soon.
            </p>
        </div>
    );
};

export default PlaceholderPage;
