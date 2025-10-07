
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { School, BookOpen, GraduationCap } from 'lucide-react';
import { useReportCard } from './DataProvider';

const templates = {
  PRIMARY: [
    { name: 'Lagos State Basic', sample: 'Sample A' },
    { name: 'Effort & Behavior', sample: 'Sample B' },
    { name: 'Term Summary', sample: 'Sample C' },
    { name: 'Attendance Focus', sample: 'Sample D' },
  ],
  SECONDARY: [
    { name: "King's College Classic", sample: 'Sample A' },
    { name: 'Subject Breakdown', sample: 'Sample B' },
    { name: 'Exam Focus', sample: 'Sample C' },
    { name: 'Behavioral', sample: 'Sample D' },
  ],
  UNIVERSITY: [
    { name: 'Unilag CGPA', sample: 'Sample A' },
    { name: 'Unit Summary', sample: 'Sample B' },
    { name: 'Course Focus', sample: 'Sample C' },
    { name: 'Semester Overview', sample: 'Sample D' },
  ],
};

const schoolTypes = [
  {
    type: 'PRIMARY',
    icon: <School size={40} className="icon" />,
    title: 'Primary School',
    templates: templates.PRIMARY,
  },
  {
    type: 'SECONDARY',
    icon: <BookOpen size={40} className="icon" />,
    title: 'Secondary School',
    templates: templates.SECONDARY,
  },
  {
    type: 'UNIVERSITY',
    icon: <GraduationCap size={40} className="icon" />,
    title: 'University',
    templates: templates.UNIVERSITY,
  },
];

const SchoolTypeSelection = () => {
  const navigate = useNavigate();
  const { setSchoolType } = useReportCard();
  const handleSelect = (type) => {
    setSchoolType(type);
    navigate('/templatestyle');
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4 drop-shadow-lg text-center">Welcome to Report Card Generator</h1>
      <p className="text-lg md:text-xl text-gray-600 mb-10 text-center">Select your institution type below to begin:</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {schoolTypes.map(school => (
          <div key={school.type} className="bg-white rounded-3xl shadow-xl border-2 border-indigo-200 hover:border-indigo-500 transition-all p-8 flex flex-col items-center">
            <div className="mb-4">{school.icon}</div>
            <h2 className="text-2xl font-bold text-indigo-800 mb-1">{school.title}</h2>
            <p className="text-sm text-gray-500 mb-4">{school.desc}</p>
            <div className="w-full mb-6">
              <h3 className="text-indigo-600 font-semibold mb-2 text-center">Templates</h3>
              <div className="grid grid-cols-2 gap-3">
                {school.templates.map((tpl, idx) => (
                  <div key={tpl.name} className="bg-indigo-50 rounded-lg px-3 py-2 flex flex-col items-center border border-indigo-100">
                    <span className="text-indigo-700 font-medium text-sm">{tpl.name}</span>
                    <span className="text-xs text-gray-400 mt-1">{tpl.sample}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="mt-auto bg-indigo-700 text-white font-bold py-2 px-6 rounded-xl shadow hover:bg-indigo-800 transition-all duration-200"
              onClick={() => handleSelect(school.type)}
            >
              Select {school.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchoolTypeSelection;
