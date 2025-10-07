import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useReportCard } from './DataProvider';

const templateOptions = {
  PRIMARY: [
    { value: 1, label: 'Primary School (Sample A)' },
    { value: 2, label: 'Effort & Behavior (Sample B)' },
    { value: 3, label: 'Term Summary (Sample C)' },
    { value: 4, label: 'Attendance Focus (Sample D)' },
  ],
  SECONDARY: [
    { value: 1, label: 'College/Secondary School (Sample A)' },
    { value: 2, label: 'Subject Breakdown (Sample B)' },
    { value: 3, label: 'Exam Focus (Sample C)' },
    { value: 4, label: 'Behavioral (Sample D)' },
  ],
  UNIVERSITY: [
    { value: 1, label: 'University CGPA (Sample A)' },
    { value: 2, label: 'Unit Summary (Sample B)' },
    { value: 3, label: 'Course Focus (Sample C)' },
    { value: 4, label: 'Semester Overview (Sample D)' },
  ],
};

const TemplateStyleSelection = () => {
  const navigate = useNavigate();
  const { schoolType, setTemplateStyle } = useReportCard();

  if (!schoolType) {
    navigate('/');
    return null;
  }

  const handleSelect = (style) => {
    setTemplateStyle(style);
    navigate('/studentinfo');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex flex-col items-center justify-center px-4 py-8">
      <div className="bg-white/80 rounded-3xl shadow-xl border-2 border-indigo-200 p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Step 2: Select Template Style</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templateOptions[schoolType].map(option => (
            <button
              key={option.value}
              className="bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl shadow hover:bg-indigo-800 transition-all duration-200 text-lg"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateStyleSelection;
