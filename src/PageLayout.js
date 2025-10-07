import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { useReportCard } from './DataProvider';

const PageLayout = ({ children, title, backPath }) => {
    const { resetData } = useReportCard();
    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-['Inter']">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-10">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                    <h1 className="text-3xl font-extrabold text-indigo-700 flex items-center">
                    {backPath && (
                        <Link to={backPath} className="mr-3 text-indigo-500 hover:text-indigo-700 transition">
                        <ArrowLeft size={24} />
                        </Link>
                    )}
                    {title}
                    </h1>
                    <Link to="/" onClick={backPath === "/" ? resetData : undefined} className="text-gray-500 hover:text-indigo-600 transition">
                    <Home size={24} />
                    </Link>
                </div>
                {children}
            </div>
        </div>
    );
};

export default PageLayout;
