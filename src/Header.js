import React from 'react';

const Header = ({ title, subtitle, className = '' }) => (
  <div className={`text-center mb-6 pb-4 border-b-2 border-indigo-200 ${className}`}>
    <h2 className="text-4xl font-extrabold text-indigo-800 uppercase">{title}</h2>
    <p className="text-xl text-gray-600 mt-1">{subtitle}</p>
  </div>
);

export default Header;
