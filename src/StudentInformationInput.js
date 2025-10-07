import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReportCard } from './DataProvider';
import { handleChange } from './utils';

const StudentInformationInput = () => {
  const navigate = useNavigate();
  const { studentData, setStudentData, schoolType, templateStyle, GRADING_SYSTEMS } = useReportCard();

  const initialDataWithSchool = {
    ...studentData,
    school: schoolType ? GRADING_SYSTEMS[schoolType].schoolName : studentData.school
  };
  const [formData, setFormData] = useState(initialDataWithSchool);

  useEffect(() => {
    if (!schoolType || !templateStyle) navigate('/');
  }, [schoolType, templateStyle, navigate]);

  const onChange = handleChange(setFormData);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStudentData(formData);
    navigate('/gradeinput');
  };

  const inputFields = ['name', 'studentId', 'year'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex flex-col items-center justify-center px-4 py-8">
      <div className="bg-white/80 rounded-3xl shadow-xl border-2 border-indigo-200 p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Step 2: Student Information</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 font-medium">
            Report Type: <span className="text-indigo-800">{GRADING_SYSTEMS[schoolType]?.displayName || 'N/A'} (Style {templateStyle})</span>
          </div>
          {inputFields.map(key => (
            <div key={key}>
              <label htmlFor={key} className="block text-sm font-medium text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <input
                type="text"
                id={key}
                name={key}
                value={formData[key]}
                onChange={onChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 border"
              />
            </div>
          ))}
          <button type="submit" className="w-full bg-indigo-700 text-white font-bold py-3 rounded-xl shadow hover:bg-indigo-800 transition-all duration-200">Continue to Grades</button>
        </form>
      </div>
    </div>
  );
};

export default StudentInformationInput;