import React from 'react';

const ActionButton = ({ onClick, Icon, children, disabled = false, className = '' }) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center justify-center p-4 text-center rounded-xl transition-all duration-300 ${disabled ? 'bg-gray-400 text-gray-100 cursor-not-allowed' : 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 hover:shadow-xl'} ${className}`}
  >
    {Icon && <Icon size={24} className="mr-2" />}
    <span className="font-semibold text-lg">{children}</span>
  </button>
);

export default ActionButton;
