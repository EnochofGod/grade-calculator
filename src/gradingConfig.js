export const initialStudentData = {
  name: '',
  studentId: '',
  school: '',
  year: '2025/2026',
};

export const initialGrades = [];

export const GRADING_SYSTEMS = {
  UNIVERSITY: {
    displayName: "University",
    type: "Tertiary",
    schoolName: "University",
    gpaMap: {
      'A': 5.0, 'B': 4.0, 'C': 3.0, 'D': 2.0, 'E': 1.0, 'F': 0.0
    },
    getGrade: (score) => {
      if (score >= 70) return 'A';
      if (score >= 60) return 'B';
      if (score >= 50) return 'C';
      if (score >= 45) return 'D';
      if (score >= 40) return 'E';
      return 'F';
    },
    inputFields: ['course', 'units', 'score'],
  },
  SECONDARY: {
    displayName: "Secondary school",
    type: "Secondary",
    schoolName: "Secondary school, Nigeria",
    getGrade: (score) => {
      if (score >= 75) return 'A1 (Excellent)';
      if (score >= 70) return 'B2 (Very Good)';
      if (score >= 65) return 'B3 (Good)';
      if (score >= 60) return 'C4 (Credit)';
      if (score >= 55) return 'C5 (Credit)';
      if (score >= 50) return 'C6 (Credit)';
      if (score >= 45) return 'D7 (Pass)';
      if (score >= 40) return 'E8 (Pass)';
      return 'F9 (Fail)';
    },
    inputFields: ['subject', 'score', 'teacherComment'],
  },
  PRIMARY: {
    displayName: " Primary School",
    type: "Primary",
    schoolName: "Primary School",
    getGrade: (score) => {
      if (score >= 75) return 'A';
      if (score >= 60) return 'B';
      if (score >= 45) return 'C';
      return 'F';
    },
    inputFields: ['subject', 'score', 'effort', 'behavior'],
  }
};
