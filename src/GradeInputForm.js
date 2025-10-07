import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReportCard } from './DataProvider';
import { handleChange, parseIntOrZero } from './utils';

const GradeInputForm = () => {
  const navigate = useNavigate();
  const { grades, addGrade, removeGrade, studentData, schoolType, templateStyle, GRADING_SYSTEMS } = useReportCard();

  useEffect(() => {
    if (!studentData.name || !schoolType || !templateStyle) {
      navigate('/');
    }
  }, [studentData, schoolType, templateStyle, navigate]);

  const config = schoolType ? GRADING_SYSTEMS[schoolType] : null;
  const initialGradeState = config ? config.inputFields.reduce((acc, field) => ({ ...acc, [field]: '' }), {}) : {};
  if (schoolType === 'UNIVERSITY') {
    initialGradeState.units = 3;
  }
  initialGradeState.score = 60;

  const [newGrade, setNewGrade] = useState(initialGradeState);
  if (!schoolType) return null;

  const onChange = handleChange(setNewGrade);

  const handleAddGrade = (e) => {
    e.preventDefault();
    if (newGrade.subject || newGrade.course) {
      addGrade({
        ...newGrade,
        score: parseIntOrZero(newGrade.score),
        units: newGrade.units ? parseIntOrZero(newGrade.units) : undefined
      });
      setNewGrade(initialGradeState);
    }
  };

  const fieldLabels = {
    course: "Course Code/Name",
    subject: "Subject Name",
    units: "Course Units",
    score: "Raw Score (0-100)",
    teacherComment: "Teacher's Comment",
    effort: "Effort Rating (e.g., A/B/C)",
    behavior: "Behavior Rating (e.g., Satisfactory/Excellent)",
  };
  const inputFields = config.inputFields;
  const isUniversity = schoolType === 'UNIVERSITY';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex flex-col items-center justify-center px-4 py-8">
      <div className="bg-white/80 rounded-3xl shadow-xl border-2 border-indigo-200 p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Step 3: Enter Grades</h2>
        <form onSubmit={handleAddGrade} className="space-y-4">
          {inputFields.map(field => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                {fieldLabels[field]}
              </label>
              <input
                type={field === 'score' || field === 'units' ? 'number' : 'text'}
                name={field}
                id={field}
                value={newGrade[field]}
                onChange={onChange}
                min={field === 'score' || field === 'units' ? "0" : undefined}
                required
                className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm border"
              />
            </div>
          ))}
          <button type="submit" className="w-full bg-indigo-700 text-white font-bold py-3 rounded-xl shadow hover:bg-indigo-800 transition-all duration-200">Add Grade</button>
        </form>
        <ul className="mt-8">
          {grades.map(g => (
            <li key={g.id} className="flex items-center justify-between py-2 border-b">
              <div>
                {g.subject || g.course}: Score: {g.score} {isUniversity && `| Units: ${g.units}`}
              </div>
              <button
                onClick={() => removeGrade(g.id)}
                className="ml-4 text-red-500 hover:text-red-700 transition"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => navigate('/reportcard')}
          disabled={grades.length === 0}
          className={`mt-6 w-full py-3 px-4 rounded-md shadow-md text-lg font-medium text-white transition duration-150 ${
            grades.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-700 hover:bg-indigo-800'
          }`}
        >
          Generate Final Report Card
        </button>
      </div>
    </div>
  );
};

export default GradeInputForm;