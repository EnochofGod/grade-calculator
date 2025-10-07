import React, { useEffect } from 'react';
import { useReportCard } from './DataProvider';
import { useNavigate } from 'react-router-dom';
import ReportCardRenderer from './ReportCardRenderer';


const ReportCard = () => {
  const { studentData, grades, schoolType, templateStyle, GRADING_SYSTEMS, result, resetData } = useReportCard();
  const navigate = useNavigate();
  
  // Guard clause for flow control
  useEffect(() => {
    if (!studentData.name || grades.length === 0 || !schoolType || !templateStyle) {
      navigate('/');
    }
  }, [studentData, grades, schoolType, templateStyle, navigate]);

  if (!studentData.name || grades.length === 0 || !schoolType || !templateStyle) {
    return null; // Don't render while redirecting
  }
  
  // ...existing code...

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex flex-col items-center justify-center px-4 py-8">
      <div className="bg-white/90 rounded-3xl shadow-2xl border-2 border-indigo-200 p-10 w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Report Card Output</h2>
        <ReportCardRenderer
          schoolType={schoolType}
          templateStyle={templateStyle}
          studentData={studentData}
          result={result}
          config={GRADING_SYSTEMS[schoolType]}
          resetData={resetData}
        />
      </div>
    </div>
  );
};


export default ReportCard
