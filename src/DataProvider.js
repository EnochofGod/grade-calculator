import React, { useState, useEffect, createContext, useContext } from 'react';
import { GRADING_SYSTEMS, initialStudentData, initialGrades } from './gradingConfig';

export const ReportCardContext = createContext();

export const DataProvider = ({ children }) => {
  const [studentData, setStudentData] = useState(initialStudentData);
  const [grades, setGrades] = useState(initialGrades);
  const [nextId, setNextId] = useState(1);
  const [schoolType, setSchoolType] = useState(null);
  const [templateStyle, setTemplateStyle] = useState(null);

  const calculateResult = () => {
    const config = GRADING_SYSTEMS[schoolType];
    if (grades.length === 0 || !config) {
      return { grades: [], gpa: 'N/A', totalUnits: 'N/A' };
    }
    const isUniversity = schoolType === 'UNIVERSITY';
    let totalQualityPoints = 0;
    let totalUnits = 0;
    const processedGrades = grades.map(g => {
      const letterGrade = config.getGrade(g.score);
      let qualityPoint = 'N/A';
      if (isUniversity) {
        qualityPoint = config.gpaMap[letterGrade] || 0;
        totalQualityPoints += qualityPoint * g.units;
        totalUnits += g.units;
      }
      return {
        ...g,
        grade: letterGrade,
        qualityPoint: qualityPoint,
        teacherComment: g.teacherComment || 'Satisfactory',
        effort: g.effort || 'Good',
        behavior: g.behavior || 'Excellent'
      };
    });
    const gpa = isUniversity && totalUnits > 0 ? (totalQualityPoints / totalUnits).toFixed(2) : 'N/A';
    return {
      grades: processedGrades,
      gpa: gpa,
      totalUnits: isUniversity ? totalUnits : 'N/A',
    };
  };
  const result = calculateResult();
  const addGrade = (newGrade) => {
    const processedGrade = {
      ...newGrade,
      score: parseInt(newGrade.score),
      units: newGrade.units ? parseInt(newGrade.units) : undefined
    };
    setGrades(prevGrades => [...prevGrades, { ...processedGrade, id: nextId }]);
    setNextId(prevId => prevId + 1);
  };
  const removeGrade = (id) => {
    setGrades(prevGrades => prevGrades.filter(grade => grade.id !== id));
  };
  const resetData = () => {
    setStudentData(initialStudentData);
    setGrades(initialGrades);
    setNextId(1);
    setSchoolType(null);
    setTemplateStyle(null);
  };
  return (
    <ReportCardContext.Provider value={{
      studentData, setStudentData, grades, addGrade, removeGrade, resetData,
      schoolType, setSchoolType, templateStyle, setTemplateStyle,
      result, GRADING_SYSTEMS
    }}>
      {children}
    </ReportCardContext.Provider>
  );
};

export const useReportCard = () => useContext(ReportCardContext);
